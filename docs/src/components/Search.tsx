/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import { IconSearch } from 'components/Icon/IconSearch';
import type * as React from 'react';
import { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { siteConfig } from 'siteConfig';

export interface SearchProps {
  searchParameters?: Record<string, unknown>;
}

function Hit({
  hit,
  children,
}: {
  hit: { url: string };
  children: React.ReactNode;
}) {
  return <a href={hit.url}>{children}</a>;
}

function Kbd(props: { children?: React.ReactNode }) {
  return (
    <kbd
      className="h-6 w-6 border border-transparent mr-1 bg-wash dark:bg-wash-dark text-gray-30 align-middle p-0 inline-flex justify-center items-center  text-xs text-center rounded"
      {...props}
    />
  );
}

// Copy-pasted from @docsearch/react to avoid importing the whole bundle.
// Slightly trimmed to features we use.
// (c) Algolia, Inc.
function isEditingContent(event: KeyboardEvent) {
  const element = event.target as HTMLElement;
  const tagName = element.tagName;
  return (
    element.isContentEditable ||
    tagName === 'INPUT' ||
    tagName === 'SELECT' ||
    tagName === 'TEXTAREA'
  );
}

function useDocSearchKeyboardEvents({
  isOpen,
  onOpen,
  onClose,
}: {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      function open() {
        // We check that no other DocSearch modal is showing before opening
        // another one.
        if (!document.body.classList.contains('DocSearch--active')) {
          onOpen();
        }
      }
      if (
        (event.key === 'Escape' && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey)) ||
        (!isEditingContent(event) && event.key === '/' && !isOpen)
      ) {
        event.preventDefault();
        if (isOpen) {
          onClose();
        } else if (!document.body.classList.contains('DocSearch--active')) {
          open();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}

const options = {
  appId: siteConfig.algolia.appId,
  apiKey: siteConfig.algolia.apiKey,
  indexName: siteConfig.algolia.indexName,
};

// The modal is the bulk of DocSearch, so it stays out of the initial bundle and is
// fetched the first time someone opens search. `<link rel="preconnect">` for the Algolia
// host lives in BaseLayout so the request is warm by then.
let DocSearchModal: React.ComponentType<any> | null = null;

export function Search({ searchParameters = { hitsPerPage: 5 } }: SearchProps) {
  const [isShowing, setIsShowing] = useState(false);

  const importDocSearchModalIfNeeded = useCallback(async () => {
    if (DocSearchModal) return;
    const docsearch = await import('@docsearch/react');
    DocSearchModal = docsearch.DocSearchModal;
  }, []);

  const onOpen = useCallback(() => {
    importDocSearchModalIfNeeded().then(() => {
      setIsShowing(true);
    });
  }, [importDocSearchModalIfNeeded]);

  const onClose = useCallback(() => {
    setIsShowing(false);
  }, []);

  useDocSearchKeyboardEvents({ isOpen: isShowing, onOpen, onClose });

  return (
    <>
      <button
        aria-label="Search"
        type="button"
        className="inline-flex md:hidden items-center text-lg p-1 ml-4 lg:ml-6"
        onClick={onOpen}>
        <IconSearch className="align-middle" />
      </button>

      <button
        type="button"
        className="hidden md:flex relative pl-4 pr-1 py-1 h-10 bg-secondary-button dark:bg-gray-80 outline-none focus:ring focus:outline-none betterhover:hover:bg-secondary-button/80 dark:betterhover:hover:bg-gray-80/80 pointer items-center shadow-inner text-left w-full text-gray-30 rounded-md align-middle text-sm"
        onClick={onOpen}>
        <IconSearch className="mr-3 align-middle text-gray-30 shrink-0 group-betterhover:hover:text-gray-70" />
        Search
        <span className="ml-auto hidden sm:flex item-center">
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </span>
      </button>

      {isShowing &&
        DocSearchModal &&
        createPortal(
          <DocSearchModal
            {...options}
            initialScrollY={window.scrollY}
            searchParameters={searchParameters}
            onClose={onClose}
            navigator={{
              navigate({ itemUrl }: { itemUrl: string }) {
                window.location.assign(itemUrl);
              },
            }}
            transformItems={(items: { url: string }[]) =>
              items.map((item) => {
                const url = new URL(item.url);
                return {
                  ...item,
                  // The crawled URLs are absolute, and used to carry Next's #__next anchor.
                  url: item.url.replace(url.origin, ''),
                };
              })
            }
            hitComponent={Hit}
          />,
          document.body
        )}
    </>
  );
}
