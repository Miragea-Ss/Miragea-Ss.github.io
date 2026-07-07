#!/usr/bin/env node
/**
 * Adapt ComfyUI UI-format workflows for high VRAM (48–96GB class).
 * - Bypass PurgeVRAM nodes
 * - Disable VAE tiling where exposed
 * - Increase tile sizes / latent dimensions (capped)
 * - Bump scale_to_length on aspect-ratio nodes
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join, basename } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'public/eliora/workflows/high-vram');

const MAX_EDGE = 2560;
const MIN_TILE = 1024;
const MAX_TILE = 4096;

export function widgetIndex(node, name) {
  let idx = 0;
  for (const input of node.inputs || []) {
    if (input.widget) {
      if (input.widget.name === name || input.name === name) return idx;
      idx += 1;
    }
  }
  return -1;
}

export function setWidget(node, name, value) {
  const idx = widgetIndex(node, name);
  if (idx >= 0 && Array.isArray(node.widgets_values)) {
    node.widgets_values[idx] = value;
    return true;
  }
  return false;
}

export function getWidget(node, name) {
  const idx = widgetIndex(node, name);
  if (idx >= 0 && Array.isArray(node.widgets_values)) return node.widgets_values[idx];
  return undefined;
}

function round64(n) {
  return Math.min(MAX_EDGE, Math.max(64, Math.round(n / 64) * 64));
}

function scaleInt(value, factor = 1.35) {
  if (typeof value !== 'number') return value;
  return round64(value * factor);
}

export function adaptWorkflow(workflow) {
  const changes = [];
  if (!workflow.nodes) return { workflow, changes };

  for (const node of workflow.nodes) {
    const type = node.type || '';

    if (type.includes('PurgeVRAM')) {
      node.mode = 4;
      changes.push(`${type}#${node.id}: bypass`);
    }

    if (type === 'EmptyLatentImage') {
      const w = getWidget(node, 'width');
      const h = getWidget(node, 'height');
      if (typeof w === 'number') setWidget(node, 'width', scaleInt(w));
      if (typeof h === 'number') setWidget(node, 'height', scaleInt(h));
      changes.push(`EmptyLatentImage#${node.id}: ${w}x${h} → larger`);
    }

    if (type.includes('ImageScaleByAspectRatio')) {
      const len = getWidget(node, 'scale_to_length');
      if (typeof len === 'number' && len < MAX_EDGE) {
        setWidget(node, 'scale_to_length', Math.min(MAX_EDGE, len + 512));
        changes.push(`ImageScale#${node.id}: scale_to_length ${len}→${getWidget(node, 'scale_to_length')}`);
      }
    }

    for (const flag of ['encode_tiled', 'decode_tiled']) {
      if (widgetIndex(node, flag) >= 0) {
        setWidget(node, flag, false);
        changes.push(`${type}#${node.id}: ${flag}=false`);
      }
    }

    for (const tileKey of ['tile_width', 'tile_height', 'encode_tile_size', 'decode_tile_size']) {
      const v = getWidget(node, tileKey);
      if (typeof v === 'number' && v < MAX_TILE) {
        const next = Math.min(MAX_TILE, Math.max(MIN_TILE, v * 2));
        setWidget(node, tileKey, next);
        changes.push(`${type}#${node.id}: ${tileKey} ${v}→${next}`);
      }
    }

    if (type.includes('TTP_Tile_image_size') || type.includes('TTP_Image_Tile')) {
      for (const key of ['tile_width', 'tile_height', 'max_tile_size', 'overlap']) {
        const v = getWidget(node, key);
        if (typeof v === 'number' && key.includes('tile') && v < MAX_TILE) {
          setWidget(node, key, Math.min(MAX_TILE, v * 2));
        }
      }
      changes.push(`TTP#${node.id}: tiles enlarged`);
    }

    if (type === 'WanImageToVideo' || type.includes('Wan')) {
      const w = getWidget(node, 'width');
      const h = getWidget(node, 'height');
      if (typeof w === 'number' && w <= 1280) setWidget(node, 'width', round64(w * 1.25));
      if (typeof h === 'number' && h <= 720) setWidget(node, 'height', round64(h * 1.25));
      if (typeof w === 'number' || typeof h === 'number') {
        changes.push(`Wan#${node.id}: frame size bumped`);
      }
    }
  }

  workflow._miragea_meta = {
    profile: 'high-vram-96gb',
    adaptedAt: new Date().toISOString(),
    note: 'Tuned for 48–96GB VRAM. fp8 checkpoints kept — swap to fp16/bf16 locally if you have headroom.',
    changes: changes.slice(0, 40),
  };

  return { workflow, changes };
}

function main() {
  const sourcesPath = join(ROOT, 'scripts/workflow-sources.json');
  const sources = JSON.parse(readFileSync(sourcesPath, 'utf8'));
  mkdirSync(OUT_DIR, { recursive: true });

  const manifest = {
    generatedAt: new Date().toISOString(),
    profile: 'high-vram',
    targetVram: '48–96 GB',
    policy: 'Adapted from author ComfyUI/Bilibili sources. Local execution only. Verify model paths on your machine.',
    workflows: [],
  };

  for (const entry of sources) {
    const raw = JSON.parse(readFileSync(entry.source, 'utf8'));
    const { workflow, changes } = adaptWorkflow(raw);
    const outPath = join(OUT_DIR, entry.out);
    writeFileSync(outPath, JSON.stringify(workflow, null, 2), 'utf8');
    manifest.workflows.push({
      id: entry.id,
      file: `/eliora/workflows/high-vram/${entry.out}`,
      line: entry.line,
      credit: entry.credit,
      title: entry.title,
      desc: entry.desc,
      minVramGb: entry.minVramGb,
      sourceFile: basename(entry.source),
      changeCount: changes.length,
    });
    console.log(`✓ ${entry.out} (${changes.length} tweaks)`);
  }

  writeFileSync(join(OUT_DIR, 'manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  console.log(`Wrote manifest: ${manifest.workflows.length} workflows`);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) main();