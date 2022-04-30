import { CallbacksRepo } from './callbacks';
import { ObjectsRepo } from './objects';

export const callbacksRepo = new CallbacksRepo();
export const objectsRepo = new ObjectsRepo();

// Separates properties in 3 categories: regular props, callbacks and non-serializable objects
export function convertPropsToSerializable(props: any) {
  const res: { p: any, o: any, e: any } = {} as any;

  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      const value = props[key];

      if (value == null) {
        (res.p || (res.p = {}))[key] = null;
      }
      else if (key === 'style') {
        (res.p || (res.p = {}))[key] = convertPropsToSerializable(value);
      }
      else if (key[0] === 'o' && key[1] === 'n' && typeof value === 'function') {
        const ind = callbacksRepo.addObject(value);
        (res.e || (res.e = {}))[key] = ind;
      }
      else if (typeof value === 'object' || typeof value === 'function') {
        const ind = objectsRepo.addObject(value);
        (res.o || (res.o = {}))[key] = ind;
      }
      else {
        (res.p || (res.p = {}))[key] = value;
      }
    }
  }

  return res;
}
