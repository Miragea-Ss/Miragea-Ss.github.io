import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const canvasPath = path.join(root, 'public', 'eliora', 'infinite-canvas.html');
const fixturePath = path.join(root, 'tests', 'fixtures', 'comfy-dev-cjk.json');
const charterPath = path.join(root, 'docs', 'INFINITE_CANVAS_PRODUCT_CHARTER_2026-08-15.md');
const protocolPath = path.join(root, 'docs', 'INFINITE_CANVAS_AGENT_PROTOCOL_2026-08-15.md');
const bridgePath = path.join(root, 'public', 'eliora', 'eliora-comfy-bridge.py');

const [canvas, fixture, charter, protocol, bridge] = await Promise.all([
  readFile(canvasPath, 'utf8'),
  readFile(fixturePath, 'utf8'),
  readFile(charterPath, 'utf8'),
  readFile(protocolPath, 'utf8'),
  readFile(bridgePath, 'utf8'),
]);

const inlineScripts = [...canvas.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)].map((match) => match[1]);
let inlineScriptsParse = true;
try {
  inlineScripts.forEach((source, index) => new vm.Script(source, { filename: `infinite-canvas-inline-${index + 1}.js` }));
} catch (error) {
  inlineScriptsParse = false;
  console.error(error.stack || error);
}

const checks = [
  ['all inline JavaScript parses', inlineScripts.length > 0 && inlineScriptsParse],
  ['passthrough import keeps raw JSON', canvas.includes('const cleaned = raw;')],
  ['old CJK scrub is absent', !canvas.includes("const scrubbed = raw.replace(/[\\u3400-\\u9FFF\\uF900-\\uFAFF]+/g, '');")],
  ['wrapped prompt API graphs are accepted', canvas.includes("if (data.prompt && typeof data.prompt === 'object') return apiRoot(data.prompt);")],
  ['wrapped DEV API graphs are accepted', canvas.includes("if (data.api && typeof data.api === 'object') return apiRoot(data.api);")],
  ['agent review is the default', canvas.includes("localAgentModeKey) === 'off' ? 'off' : 'review'")],
  ['agent default scope forbids delete', canvas.includes("localAgentScopeKey) === 'full' ? 'full' : 'compose'")],
  ['agent operations are bounded', canvas.includes('const AGENT_MAX_OPS = 100;')],
  ['browser and bridge share the 100-operation ceiling', bridge.includes('MAX_ACTION_OPS = 100') && bridge.includes('len(ops) > MAX_ACTION_OPS')],
  ['agent delete-all is rejected', canvas.includes("delete-all is never accepted; list edge IDs")],
  ['bridge also rejects delete-all', bridge.includes('delete-all is never accepted; list connection IDs')],
  ['agent protocol documents review scopes', protocol.includes('`Review required` + `Compose`') && protocol.includes('`Review required` + `Full`')],
  ['automation probe cannot bypass review', canvas.includes("__elioraApplyAgentOpsProbe = (ops) => ({ changed: false")],
  ['international BYOK includes OpenRouter', canvas.includes('<option value="openrouter">OpenRouter</option>')],
  ['diagnostics use the Log surface', canvas.includes('Diagnostics live in the dedicated Log modal')],
  ['Comfy capabilities come from object_info', canvas.includes("const response = await comfyRequest('/object_info');")],
  ['Comfy DEV/custom capability is visible', canvas.includes("['DEV/Custom', caps.custom, 'dev']")],
  ['large boards use viewport virtualization', canvas.includes('const VIRTUALIZE_AT = 180;') && canvas.includes('computeRenderedNodeIds()')],
  ['virtualization preserves selected context', canvas.includes("selectedIds.forEach((id) => keep.add(String(id)))")],
  ['fixture contains Japanese prompt', fixture.includes('月光の都市を描く')],
  ['fixture contains Chinese prompt', fixture.includes('描绘月光之城')],
  ['fixture contains future DEV field', fixture.includes('future-field')],
  ['product charter forbids real-name dependency', charter.includes('No Chinese real-name-verification service is required')],
  ['public guide has three usable sections', canvas.includes("data-help-tab=\"start\"") && canvas.includes("data-help-tab=\"operate\"") && canvas.includes("data-help-tab=\"compare\"")],
  ['public guide supports a direct start link', canvas.includes("get('guide')") && canvas.includes("setTimeout(showHelp, 120)")],
  ['public entry can request the supported interface language', canvas.includes("get('lang')") && canvas.includes("['en', 'ja'].includes(requestedUiLang)")],
  ['public guide explains local Comfy launch order', canvas.includes('START-ELIORA-CANVAS.bat') && canvas.includes('ComfyUIを開くだけでは足りません')],
  ['comparison is presented as purpose map, not universal ranking', canvas.includes('This is a purpose map, not a universal winner table.') && canvas.includes('総合順位ではなく「目的の地図」')],
  ['comparison links every requested official repository', [
    'github.com/basketikun/infinite-canvas', 'github.com/hero8152/Infinite-Canvas',
    'github.com/serge-rgb/milton', 'github.com/lkwq007/stablediffusion-infinity',
    'github.com/obsidianmd/jsoncanvas', 'github.com/xiaoiver/infinite-canvas-tutorial',
  ].every((source) => canvas.includes(source))],
];

const failed = checks.filter(([, ok]) => !ok);
for (const [label, ok] of checks) console.log(`${ok ? 'PASS' : 'FAIL'}: ${label}`);
if (failed.length) process.exitCode = 1;
