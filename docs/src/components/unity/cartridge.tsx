import classNames from 'classnames';
import { useEffectSkipFirst } from 'hooks/use-effect-skip-first';
import { useLatest } from 'hooks/use-latest';
import React, { forwardRef, useCallback, useEffect } from 'react';
import { getInsertedTo, useGlobalUnity } from './global';
import styles from './index.module.scss';

interface Props {
  script?: string | null;
  html?: string | null;
  css?: string | null;
  className?: string;
  style?: React.CSSProperties;
  autoActivate?: boolean;
  hideActivateButton?: boolean;
}

export interface UnityCardridgeRef {
  isActive: () => boolean;
  activate: (reset: boolean) => void;
}

/*
 * A slot the shared Unity player can be plugged into. Only one cartridge holds the
 * player at a time -- activating one moves the player's DOM node into it -- which is why
 * every example on a page can offer a live preview without every example loading Unity.
 */
export const UnityCardridge = forwardRef<UnityCardridgeRef, Props>(
  function UnityCardridge(
    {
      script,
      html,
      css,
      style,
      className,
      hideActivateButton,
      autoActivate = true,
    },
    ref
  ) {
    const latestScript = React.useRef(script);
    const latestHtml = React.useRef(html);
    const latestStyle = React.useRef(css);

    const unityContainer = React.useRef<HTMLDivElement | null>(null);
    const setRef = useCallback((el: HTMLDivElement | null) => {
      if (el) unityContainer.current = el;
    }, []);
    const { instance, insertTo } = useGlobalUnity();

    const instanceRef = useLatest(instance);

    const isActive = useCallback(() => {
      return (
        unityContainer.current != null &&
        unityContainer.current === getInsertedTo()
      );
    }, []);

    const activate = useCallback(
      (reset = false) => {
        if (unityContainer.current && !isActive())
          insertTo(unityContainer.current);

        if (reset)
          instanceRef.current?.SetReactScript(
            latestScript.current || '',
            latestHtml.current || '',
            latestStyle.current || ''
          );
      },
      [insertTo, isActive, instanceRef]
    );

    React.useImperativeHandle(ref, () => ({ activate, isActive }), [
      activate,
      isActive,
    ]);

    // Set instance style after style changes (except first time)
    useEffectSkipFirst(
      () => {
        latestStyle.current = css;
        if (autoActivate) {
          instance?.ReplaceCSS(css || '');
          activate();
        }
      },
      [css, instance, autoActivate, activate],
      () => !instance
    );

    // Set instance script after script changes (except first time)
    useEffectSkipFirst(
      () => {
        latestScript.current = script;
        if (autoActivate) {
          instance?.SetReactScript(
            script || '',
            html || '',
            latestStyle.current || ''
          );
          activate();
        }
      },
      [script, html, instance, autoActivate, activate],
      () => !instance
    );

    // Insert cartridge if none is installed yet
    useEffect(() => {
      const current = unityContainer.current;
      if (!current) return;
      if (!getInsertedTo()) activate(true);

      return () => {
        if (getInsertedTo() === current) insertTo(undefined);
      };
    }, [insertTo, activate]);

    // Set script after Unity instance is loaded
    useEffect(() => {
      if (instance && isActive()) activate(true);
    }, [activate, instance, isActive]);

    return (
      <div
        ref={setRef}
        style={style}
        className={classNames(className, styles.cartridge)}>
        {!hideActivateButton && !isActive() && (
          <button type="button" onClick={() => activate(true)}>
            Show Preview
          </button>
        )}
      </div>
    );
  }
);
