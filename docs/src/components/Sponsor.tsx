/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 */

import cn from 'classnames';
import * as React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  image: string;
  link: string;
  title: string;
}

export function Sponsor({
  title,
  image,
  link,
  className,
  children,
}: ButtonProps) {
  return (
    <a
      href={link}
      rel="noopener noreferrer" target="_blank"
      className={cn(
        className,
        'text-base flex-row leading-tight font-bold border rounded-md py-5 px-5 inline-flex items-center my-1',
      )}>
      <img src={image} className='w-16 h-16 mr-4' />
      <div className={'flex-col'}>
        <div className={'text-lg font-bold'}>{title}</div>
        <div className={'text-sm'}>{children}</div>
      </div>
    </a>
  );
}
