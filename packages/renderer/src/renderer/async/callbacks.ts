import { AsyncCallback } from './commands';
import { ObjectsRepo } from './objects';

export class CallbacksRepo extends ObjectsRepo<AsyncCallback> {
  constructor() {
    super();
  }

  call = (ind: number, args: any[]) => {
    const cb = this.getObject(ind);

    if ('Length' in args) {
      const newArgs = [];

      const length = args['Length'];

      for (let index = 0; index < length; index++) {
        const element = args[index];
        newArgs.push(element);
      }

      args = newArgs;
    }
    return cb.apply(null, args);
  };
}
