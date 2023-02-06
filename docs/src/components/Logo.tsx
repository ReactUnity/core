/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

export function Logo(props: JSX.IntrinsicElements['img']) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      height="100%"
      alt="Logo"
      src="/images/logo.png"
      {...props} />
  );
}
