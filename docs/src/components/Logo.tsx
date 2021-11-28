/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import * as React from 'react';

export function Logo(props: JSX.IntrinsicElements['img']) {
  return (
    <img
      height="100%"
      alt="Logo"
      src="/images/logo.png"
      {...props} />
  );
}
