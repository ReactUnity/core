/*
 * Turns the code fences nested inside `<Sandpack>` into a serialized file map.
 *
 * The Next.js version of this site read those fences off `props.children` at render
 * time (src/components/MDX/Sandpack/createFileMap.ts, now deleted). That worked because
 * MDX handed the component real React elements, so it could reach into each `<pre>` for
 * its className and `meta`. Under Astro, `<Sandpack>` is an island: children arrive as
 * already-rendered HTML through a slot, and props have to survive JSON serialization.
 *
 * So the file map is built here, at compile time, from the mdast `code` nodes -- the same
 * rules as before (`hidden`/`active` flags, an explicit filename, or a default path per
 * language) -- and passed down as a `filesJson` attribute. The fences are then dropped
 * from the tree: Shiki would otherwise highlight them into markup nobody renders.
 */
import { visit } from 'unist-util-visit';

const DEFAULT_PATHS = {
  js: '/App.js',
  jsx: '/App.js',
  css: '/styles.css',
  html: '/index.html',
};

export function remarkSandpackFiles() {
  return (tree, file) => {
    visit(tree, 'mdxJsxFlowElement', (node) => {
      if (node.name !== 'Sandpack') return;

      const files = {};
      for (const child of node.children) {
        if (child.type !== 'code') continue;

        let filePath;
        let hidden = false;
        let active = false;

        if (child.meta) {
          const params = child.meta.split(' ').filter(Boolean);
          if (params.includes('hidden')) {
            hidden = true;
            params.splice(params.indexOf('hidden'), 1);
          }
          if (params.includes('active')) {
            active = true;
            params.splice(params.indexOf('active'), 1);
          }
          if (params[0]) filePath = `/${params[0]}`;
        }

        if (!filePath) filePath = DEFAULT_PATHS[child.lang];
        if (!filePath) {
          throw new Error(
            `${file.path}: <Sandpack> code block in an unrecognised language (${child.lang}) needs a filename in its meta`
          );
        }
        if (files[filePath]) {
          throw new Error(
            `${file.path}: file ${filePath} was defined multiple times. Each snippet needs a unique path`
          );
        }

        files[filePath] = { code: child.value, hidden, active };
      }

      // Sandpack always wants a stylesheet, and the tab it opens on has to be decided
      // before the island hydrates -- both used to happen inside SandpackRoot.
      files['/styles.css'] = {
        code: '',
        hidden: false,
        active: false,
        ...files['/styles.css'],
      };
      if (!Object.values(files).some((f) => f.active)) {
        const fallback = files['/index.html'] ?? files['/App.js'];
        if (fallback) fallback.active = true;
      }

      node.children = [];
      node.attributes = [
        ...node.attributes.filter((a) => a.name !== 'filesJson'),
        {
          type: 'mdxJsxAttribute',
          name: 'filesJson',
          value: JSON.stringify(files),
        },
      ];
    });
  };
}
