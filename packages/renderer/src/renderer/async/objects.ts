
export class ObjectsRepo<T = any> {

  indices: {}[] = [{}];
  objects = new WeakMap<object, T>();

  constructor() {
  }

  addObject = (cb: T) => {
    if (!cb) return 0;

    const it = {};
    const ind = this.indices.length;
    this.indices.push(it);
    this.objects.set(it, cb);

    return ind;
  };

  getObject = (ind: number) => {
    const it = this.indices[ind];
    return this.objects.get(it);
  };
}
