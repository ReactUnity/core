import { glob } from 'astro/loaders';
// `z` re-exported from 'astro:content' is deprecated in Astro 7; the bundled Zod lives at
// 'astro/zod'.
import { z } from 'astro/zod';
import { defineCollection } from 'astro:content';

const docs = defineCollection({
  loader: glob({
    pattern: '**/*.mdx',
    base: './src/content',
    // Ids stay as the on-disk path minus the extension ('reference/css/color',
    // 'learn/index'), instead of the loader's default of collapsing '/index' away.
    // src/pages/[...slug].astro does that collapsing when it builds the URL, and it
    // needs the untouched path to report which file a bad page came from.
    generateId: ({ entry }) => entry.replace(/\.mdx$/, ''),
  }),
  /*
   * Frontmatter here is thin by design: the sidebar JSON files own titles, ordering and
   * tags for every page that appears in navigation, and `title` is only the override for
   * pages whose heading should differ from their sidebar label.
   *
   * Every page also used to carry `layout: API` (or `Home`), left over from the react.dev
   * template and read by nothing. Those are gone, and not just for tidiness: `layout` is
   * a reserved frontmatter key in Astro, which resolves it as a component to import --
   * so `layout: API` failed the build with "Rolldown failed to resolve import 'API'".
   */
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    id: z.string().optional(),
    permalink: z.string().optional(),
    component: z.string().optional(),
  }),
});

export const collections = { docs };
