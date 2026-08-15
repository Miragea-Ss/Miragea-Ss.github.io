# Media Vault — smartphone navigation handoff

## Completed

- Added an independent smartphone navigation row for Collection, Sites, and Watch.
- Limited it to `720px` and below; it does not exist visually at `721px` or above.
- Preserved the existing desktop navigation and desktop composition.
- Localized the navigation and accessible label in EN, JA, and ZH.
- Restored reliable sticky behavior on smartphone only and added anchor clearance for the taller header.
- Added a responsive contract test to prevent future desktop/mobile selector leakage.

## Measured verification

- Desktop 1280×720 before and after: top bar `75.99px`, desktop navigation `flex`, mobile navigation `none`, hero top `75.99px`, no horizontal overflow.
- Smartphone 390×844: top bar `115.01px`, desktop navigation `none`, mobile navigation `grid`, document width `375px`, no horizontal overflow.
- Smartphone after navigating to Sites: sticky header top `0`, Sites section top approximately `124px`, heading remains unobscured.
- Width 721px: mobile navigation `none`, preserving the non-smartphone layout.
- EN, JA, and ZH labels and accessible navigation names verified in the rendered page.

## Approval boundary

The changes remain local. They have not been committed or pushed pending the user's explicit publication instruction.
