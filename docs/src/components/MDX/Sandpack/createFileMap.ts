/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import type { SandpackFile } from '@codesandbox/sandpack-react';

export const createFileMap = (codeSnippets: any) => {
  return codeSnippets.reduce(
    (result: Record<string, SandpackFile>, codeSnippet: React.ReactElement) => {
      if ((codeSnippet.type as any).mdxName !== 'pre') {
        return result;
      }
      const { props } = codeSnippet.props.children;
      let filePath; // path in the folder structure
      let fileHidden = false; // if the file is available as a tab
      let fileActive = false; // if the file tab is shown by default

      if (props.meta) {
        const params = props.meta.split(' ');
        if (params.includes('hidden')) {
          fileHidden = true;
          params.splice(params.indexOf('hidden'), 1);
        }
        if (params.includes('active')) {
          fileActive = true;
          params.splice(params.indexOf('active'), 1);
        }

        if (params[0]) {
          filePath = '/' + params[0];
        }
      }

      if (!filePath) {
        if (props.className.includes('language-js')) {
          filePath = '/App.js';
        } else if (props.className.includes('language-css')) {
          filePath = '/styles.css';
        } else if (props.className.includes('language-html')) {
          filePath = '/index.html';
        } else {
          throw new Error(
            `Code block is missing a filename: ${props.children}`
          );
        }
      }
      if (result[filePath]) {
        throw new Error(
          `File ${filePath} was defined multiple times. Each file snippet should have a unique path name`
        );
      }
      result[filePath] = {
        code: (props.children || '') as string,
        hidden: fileHidden,
        active: fileActive,
      };

      return result;
    },
    {}
  );
};
