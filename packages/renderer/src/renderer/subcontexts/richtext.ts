import { RichTextNode } from '../async/types';

export function parametrizeValue(value: string | number) {
  if (typeof value === 'number') return value + '';
  value = value + '';

  if (value.includes(' ') || value.includes('-')) return '"' + value + '"';
  return value;
}

export function stringifyRichText(node: RichTextNode): string {
  if (node.hidden) return '';

  if ('text' in node) return node.text;

  const acc: string[] = [];

  const tag = node.tag;

  if (tag) {
    acc.push('<');
    acc.push(tag);

    if (node.attributes?.value != null) {
      const value = node.attributes?.value;
      acc.push('=');
      acc.push(parametrizeValue(value));
    }

    for (const key in node.attributes) {
      if (key === 'value') continue;
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        const value = node.attributes[key];

        if (value != null) {
          acc.push(' ');
          acc.push(key);
          acc.push('=');
          acc.push(parametrizeValue(value));
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
