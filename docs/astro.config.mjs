import { unified } from '@astrojs/markdown-remark';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';
import { remarkHeaderCustomIds } from './plugins/remark-header-custom-ids.js';
import { remarkSandpackFiles } from './plugins/remark-sandpack-files.js';
import { sandpackShikiThemes } from './plugins/shiki-theme.js';

// https://astro.build/config
export default defineConfig({
  // Used for canonical URLs and og:url. The site is served from the gh-pages branch
  // of ReactUnity/reactunity.github.io -- see .github/workflows/docs.yml.
  site: 'https://reactunity.github.io',

  integrations: [
    // Only the interactive pieces ship JS: everything without a `client:` directive is
    // rendered to HTML at build time and the React runtime never reaches the browser.
    react(),
    mdx(),
  ],

  markdown: {
    // Plugins go through `unified()` rather than `markdown.remarkPlugins`, which Astro 7
    // deprecated in favour of configuring the processor directly.
    //
    // remarkSandpackFiles has to run before anything looks at code fences: it moves the
    // fences inside <Sandpack> out of the tree entirely.
    processor: unified({ remarkPlugins: [remarkSandpackFiles, remarkHeaderCustomIds] }),
    shikiConfig: {
      themes: sandpackShikiThemes,
      // Both themes are emitted as CSS variables and src/styles/index.css picks between
      // them off `html.dark`, the same class the inline theme script in BaseLayout sets.
      defaultColor: false,
      wrap: false,
    },
  },

  vite: {
    plugins: [tailwindcss()],
  },
});
