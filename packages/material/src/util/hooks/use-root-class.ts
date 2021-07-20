import clsx, { ClassValue } from 'clsx';
import { useEffect } from 'react';

export default function useRootClass(className: ClassValue) {
  const classes = clsx(className);

  useEffect(
    () => {
      const classArray = classes.split(' ').filter(x => x);
      if (classArray.length) {
        for (const cls of classArray) {
          HostContainer.ClassList.Add(cls);
        }
        return () => {
          for (const cls of classArray) {
            HostContainer.ClassList.Remove(cls);
          }
        };
      }
    },
    [classes],
  );
}
