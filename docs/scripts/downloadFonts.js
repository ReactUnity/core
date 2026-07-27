/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/*
 * The Optimistic faces are licensed to Meta, not to this project, so they are gitignored
 * and fetched at build time -- serving them from our own origin instead of hotlinking is
 * better for performance. Source Code Pro is checked in.
 *
 * This runs before `astro build`, not after: Astro copies public/ into the output as part
 * of the build, so a font that lands later never makes it into the site.
 */
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const FONTS = [
  'Optimistic_Display_W_Lt.woff2',
  'Optimistic_Display_W_Md.woff2',
  'Optimistic_Display_W_Bd.woff2',
];
const BASE_URL = 'https://conf.reactjs.org/fonts';
const OUT_DIR = join(process.cwd(), 'public', 'fonts');

mkdirSync(OUT_DIR, { recursive: true });

for (const font of FONTS) {
  const target = join(OUT_DIR, font);
  if (existsSync(target)) {
    console.log(`${font} is already present, skipping`);
    continue;
  }

  try {
    const response = await fetch(`${BASE_URL}/${font}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    writeFileSync(target, Buffer.from(await response.arrayBuffer()));
    console.log(`downloaded ${font}`);
  } catch (error) {
    // Not fatal: the stylesheet lists fallbacks, so a build without these still renders
    // -- in the wrong typeface. Worth a warning, not a failed build (offline, say).
    console.warn(
      `could not download ${font} (${error.message}); the page will fall back to a system font`
    );
  }
}
