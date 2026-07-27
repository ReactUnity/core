/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

/*!
 * Based on 'gatsby-remark-autolink-headers'
 * Original Author: Kyle Mathews <mathews.kyle@gmail.com>
 * Updated by Jared Palmer;
 * Copyright (c) 2015 Gatsbyjs
 */

/*
 * Every heading in src/content carries an explicit id, written as `## Title {/*title*\/}`
 * and kept honest by `pnpm fix-headings`. They exist so translations and refactors can
 * change heading text without breaking inbound anchors, so they have to win over the
 * slug Astro would otherwise derive from the text.
 *
 * Astro's own rehypeHeadingIds runs after this and leaves a heading alone once it has an
 * id, which is why this sets `hProperties.id`: the id ends up in the HTML *and* in the
 * `headings` array a page renders its table of contents from.
 */
import { toString } from 'mdast-util-to-string';
import { slug as toSlug } from 'github-slugger';
import { visit } from 'unist-util-visit';

export function remarkHeaderCustomIds() {
  return (tree, file) => {
    const ids = new Set();
    visit(tree, 'heading', (node) => {
      const children = [...node.children];
      let id;
      const last = children[children.length - 1];
      if (last && last.type === 'mdxTextExpression') {
        // # My header {/*my-header*/}
        id = children.pop().value;
        const isValidCustomId = id.startsWith('/*') && id.endsWith('*/');
        if (!isValidCustomId) {
          throw new Error(
            `${file.path}: expected header ID to be like: {/*some-header*/}. Instead, received: ${id}`
          );
        }
        id = id.slice(2, id.length - 2);
        if (id !== toSlug(id)) {
          throw new Error(
            `${file.path}: expected header ID to be a valid slug. You specified: {/*${id}*/}. Replace it with: {/*${toSlug(id)}*/}`
          );
        }
        // The expression node is dropped so `{/*my-header*/}` never reaches the page.
        node.children = children;
      } else {
        // # My header
        id = toSlug(toString(node));
      }

      if (ids.has(id)) {
        throw new Error(
          `${file.path}: cannot have a duplicate header with id "${id}" on the page. ` +
            'Rename the section or give it an explicit unique ID. For example: #### Arguments {/*setstate-arguments*/}'
        );
      }
      ids.add(id);

      node.data ??= {};
      node.data.id = id;
      node.data.hProperties = { ...node.data.hProperties, id };
    });
  };
}
