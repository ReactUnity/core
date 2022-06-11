import { RichTextNode } from '../async/types';

function kebabize(str: string): string {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter;
  }).join('');
};

export function stringifyStyle(style: any): string {
  if (typeof style === 'string') return style;

  const acc: string[] = [];

  for (const key in style) {
    if (Object.prototype.hasOwnProperty.call(style, key)) {
      const element = style[key];

      if (element != null) {
        acc.push(kebabize(key));
        acc.push(':');
        acc.push(element);
        acc.push(';');
      }
    }
  }

  return acc.join('');
}


export function stringifySVG(node: RichTextNode): string {
  if (node.hidden) return '';

  if ('text' in node) return node.text;

  const acc: string[] = [];

  const tag = node.tag;

  if (tag) {
    acc.push('<');
    acc.push(tag);

    for (const key in node.attributes) {
      if (Object.prototype.hasOwnProperty.call(node.attributes, key)) {
        let element = node.attributes[key];

        if (key === 'style') element = stringifyStyle(element);

        if (element != null) {
          acc.push(' ');
          acc.push(kebabize(key));
          acc.push('="');
          acc.push(element);
          acc.push('"');
        }
      }
    }
  }

  if (node.children?.length > 0) {
    if (tag) acc.push('>');

    for (const child of node.children) {
      acc.push(stringifySVG(child));
    }

    if (tag) {
      acc.push('</');
      acc.push(tag);
      acc.push('>');
    }
  }
  else {
    if (tag) acc.push(' />');
  }

  return acc.join('');
}
