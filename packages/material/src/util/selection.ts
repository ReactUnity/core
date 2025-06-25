export interface SelectionElement {
  get selected(): boolean;
  set selected(val: boolean);
  get value(): any;

  addOnChange: (callback: () => void) => () => void;
}

export class SelectionState<T = any, ElementType extends SelectionElement = SelectionElement> {
  elements: { el: ElementType; listener: () => void }[] = [];
  value: T | T[];
  any: boolean;
  all: boolean;

  // Fired when there is a change to the selected state
  onChange: (val: T | T[], all: boolean, any: boolean) => void;

  // Fired when there is a change to the registered elements or their selected state
  onUpdate: (state: this) => void;

  constructor(
    public readonly allowMultiple: boolean,
    public readonly initialValue: any | any[],
  ) {
    this.value = initialValue || (allowMultiple ? [] : undefined);

    if (this.allowMultiple) {
      if (!Array.isArray(this.value)) this.value = [this.value];
      this.any = this.all = this.value.length > 0;
    } else {
      this.any = this.all = !!this.value;
    }
  }

  private changed(sender?: ElementType): T | T[] {
    if (this.allowMultiple) {
      let all = true;
      let any = false;
      const res = [];
      for (let index = 0; index < this.elements.length; index++) {
        const element = this.elements[index];
        if (element.el.selected) {
          res.push(element.el.value);
          any = true;
        } else all = false;
      }
      this.value = res;
      this.all = all;
      this.any = any;
      return;
    } else {
      this.all = false;
      let firstChecked = sender;

      if (!firstChecked) {
        for (let index = 0; index < this.elements.length; index++) {
          const element = this.elements[index];
          if (element.el.selected) {
            firstChecked = element.el;
            break;
          }
        }
      }

      if (!firstChecked) {
        this.value = undefined;
        this.any = false;
        return;
      }

      if (!firstChecked.selected) firstChecked.selected = true;

      for (let index = 0; index < this.elements.length; index++) {
        const element = this.elements[index];
        if (element.el !== firstChecked) element.el.selected = false;
      }

      this.value = firstChecked.value;
      this.any = true;
    }
  }

  triggerChange() {
    this.onChange?.(this.value, this.all, this.any);
  }

  triggerUpdate() {
    this.onUpdate?.(this);
  }

  register(el: ElementType) {
    const listener = el.addOnChange(() => {
      this.changed(el);
      this.triggerChange();
      this.triggerUpdate();
    });

    this.elements.push({ el, listener });

    if (typeof el.value !== 'undefined') {
      if (this.allowMultiple && Array.isArray(this.value)) el.selected = this.value.includes(el.value);
      else el.selected = this.value === el.value;
    }

    if (this.allowMultiple) {
      if (this.all && !el.selected) {
        this.all = false;
        this.triggerChange();
      }

      if (!this.any && el.selected) {
        this.any = true;
        this.triggerChange();
      }
    }

    this.triggerUpdate();

    return () => {
      this.unregister(el);
    };
  }

  unregister(el: ElementType) {
    const ind = this.elements.findIndex((x) => x.el === el);
    if (ind >= 0) {
      const item = this.elements[ind];
      this.elements.splice(ind, 1);
      if (item.listener) item.listener();
    }

    this.triggerUpdate();
  }

  setAll(checked?: boolean) {
    if (!this.allowMultiple && checked) throw new Error('Multiple values cannot be selected for this selection state');

    checked = !!checked;

    this.all = checked;
    this.any = checked;

    const values = [];
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      element.el.selected = checked;
    }

    this.value = this.allowMultiple ? values : undefined;
    this.all = checked;
    this.any = checked;
    this.triggerChange();
    this.triggerUpdate();
  }

  getSelectedElements(): ElementType[] {
    const res: ElementType[] = [];
    for (let index = 0; index < this.elements.length; index++) {
      const { el } = this.elements[index];

      const isSelected =
        typeof el.value !== 'undefined' &&
        (this.allowMultiple && Array.isArray(this.value) ? this.value.includes(el.value) : this.value === el.value);
      if (isSelected) res.push(el);
    }

    return res;
  }
}
