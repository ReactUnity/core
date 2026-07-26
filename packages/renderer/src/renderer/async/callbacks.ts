import { System } from '../../models/generated';
import { AsyncCallback } from './commands';
import { ObjectsRepo } from './objects';

export class CallbacksRepo extends ObjectsRepo<AsyncCallback> {
  call = (ind: number, args: any[]) => {
    const cb = this.getObject(ind);

    const argsAsList = args as unknown as System.Collections.Generic.List<any>;
    const argsAsArray = args as unknown as System.Array;

    if (typeof argsAsArray.Length === 'number') {
      // C# Array
      args = [];
      const length = argsAsArray.Length;
      for (let index = 0; index < length; index++) args.push(argsAsArray.GetValue(index));
    } else if (typeof argsAsList.Count === 'number') {
      // C# List
      args = [];
      const length = argsAsList.Count;
      for (let index = 0; index < length; index++) args.push(argsAsList[index]);
    } else if (typeof argsAsList.Count === 'function') {
      // C# IList
      args = [];
      const length = (argsAsList.Count as any)();
      for (let index = 0; index < length; index++) args.push(argsAsArray.GetValue(index));
    }

    return cb.apply(null, args);
  };
}
