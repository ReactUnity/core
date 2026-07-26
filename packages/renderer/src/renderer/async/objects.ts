export class ObjectsRepo<T = any> {
  indices: Record<string, unknown>[] = [{}];
  objects = new WeakMap<object, T>();

  setObject = (index: number, item: T) => {
    let it = this.indices[index];
    if (!it) {
      it = this.indices[index] = {};
    }
    this.objects.set(it, item);
  };

  addObject = (item: T) => {
    if (!item) return -1;

    const it = {};
    const ind = this.indices.length;
    this.indices.push(it);
    this.objects.set(it, item);

    return ind;
  };

  getObject = (index: number) => {
    if (index < 0) return undefined;
    const it = this.indices[index];
    return this.objects.get(it);
  };
}
