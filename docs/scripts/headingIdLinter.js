import generateHeadingIds from './headingIDHelpers/generateHeadingIDs.js';
import validateHeaderIds from './headingIDHelpers/validateHeadingIDs.js';

/**
 * pnpm lint-heading-ids --> Checks all files and causes an error if heading ID is missing
 * pnpm fix-headings --> Fixes all markdown file's heading IDs
 * pnpm lint-heading-ids path/to/markdown.mdx --> Checks that particular file for missing heading ID (path can denote a directory or particular file)
 * pnpm fix-headings path/to/markdown.mdx --> Fixes that particular file's markdown IDs (path can denote a directory or particular file)
 */

const markdownPaths = process.argv.slice(2);
if (markdownPaths.includes('--fix')) {
  await generateHeadingIds(markdownPaths.filter((path) => path !== '--fix'));
} else {
  await validateHeaderIds(markdownPaths);
}
