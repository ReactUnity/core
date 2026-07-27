import fs from 'node:fs';

export default function walk(dir) {
  let results = [];
  /**
   * If the param is a file we can return it directly
   */
  if (dir.endsWith('.md') || dir.endsWith('.mdx')) {
    return [dir];
  }
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const path = `${dir}/${file}`;
    const stat = fs.statSync(path);
    if (stat && stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(walk(path));
    } else {
      /* Is a file */
      results.push(path);
    }
  });
  return results;
}
