import { RichTextNode } from '../async/types';

export function stringifyRichText(node: RichTextNode): string {
  if (node.hidden) return '';

  if ('text' in node) return node.text;

  const acc: string[] = [];

  const tag = node.tag;

  if (tag) {
    acc.push('<');
    acc.push(tag);

    if (node.attributes?.value != null) {
      acc.push('="');
      acc.push(node.attributes.value);
      acc.push('"');
    }

    for (const key in node.attributes) {
      if (key === 'value') continue;
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        const value = node.attributes[key];

        if (value != null) {
          acc.push(' ');
          acc.push(key);

          if (typeof value === 'number') {
            acc.push('=');
            acc.push(value + '');
          }
          else {
            acc.push('="');
            acc.push(value);
            acc.push('"');
          }
        }
      }
    }
    acc.push('>');
  }


  if (node.children?.length > 0) {
    for (const child of node.children) {
      acc.push(stringifyRichText(child));
    }

    if (tag) {
      acc.push('</');
      acc.push(tag);
      acc.push('>');
    }
  }

  return acc.join('');
}
