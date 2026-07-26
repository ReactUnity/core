'use client';

import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { Children, PropsWithChildren, ReactElement, cloneElement, useCallback } from 'react';
import styles from './MDXComponents.module.css';

export function EmblaCarousel({ children }: PropsWithChildren) {
  const items =
    (Children.map(children, (child, index) => (typeof child === 'string' && !child.trim() ? null : child))?.filter(
      Boolean,
    ) as ReactElement[]) ?? [];

  const slides = items.map((child, index) =>
    typeof child === 'object' && child.type === 'video' ? (
      cloneElement(child, { controls: true, autoPlay: true })
    ) : (
      <div className={styles.emblaSlide} key={index}>
        {child}
      </div>
    ),
  );

  const [emblaRef, emblaApi] = useEmblaCarousel({}, [
    Autoplay({
      delay: (x, api) => {
        return api.slideNodes().map((x) => (x.tagName === 'VIDEO' ? 10000 : 3000));
      },
      stopOnInteraction: true,
    }),
  ]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <div className={styles.carousel}>
      <div className={styles.embla}>
        <div className={styles.emblaViewport} ref={emblaRef}>
          <div className={styles.emblaContainer}>{slides}</div>
        </div>

        <button className={styles.emblaPrev} onClick={scrollPrev}>
          Prev
        </button>
        <button className={styles.emblaNext} onClick={scrollNext}>
          Next
        </button>
      </div>

      <div className={styles.thumbnails}>
        {items.map((child, index) => (
          <div className={styles.thumbnail} key={index} onClick={() => emblaApi?.scrollTo(index)}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
