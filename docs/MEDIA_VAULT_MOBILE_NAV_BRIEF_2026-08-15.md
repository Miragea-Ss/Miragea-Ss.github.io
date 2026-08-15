# Media Vault — smartphone navigation brief

## Objective

Add practical top navigation for smartphone visitors without changing the approved desktop design.

## Responsive boundary

- Smartphone: `720px` and below. Show an independent three-link navigation row.
- Tablet and desktop: `721px` and above. Keep the existing layout and behavior unchanged.
- Desktop baseline at 1280×720: top bar approximately 76px high, desktop navigation visible, hero begins immediately below it.

## Smartphone navigation

- Collection / 収蔵内容 / 收藏内容
- Sites / サイト / 网站
- Watch / 映像 / 影像

The row belongs to the existing sticky top bar and uses the current dark, cyan, rose, and gold visual language. Anchor destinations must clear the taller smartphone header.

## Acceptance criteria

- Desktop top-bar height and desktop navigation remain unchanged.
- The mobile row is absent at widths above 720px.
- The mobile row is visible and usable at 390px width.
- EN, JA, and ZH labels switch with the existing language control.
- No horizontal overflow, overlap, or hidden anchor headings.
- No publishing without a separate user instruction.
