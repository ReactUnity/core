
export const unityLocalStorage = {
  getItem: x => {
    const item = localStorage.getItem(x);
    if (item) {
      try {
        return Promise.resolve(JSON.parse(item));
      } catch { }
    }
    return Promise.resolve(null);
  },
  setItem: (x, v) => { localStorage.setItem(x, JSON.stringify(v)); return Promise.resolve(); },
  removeItem: (x) => { localStorage.removeItem(x); return Promise.resolve(); },
};
