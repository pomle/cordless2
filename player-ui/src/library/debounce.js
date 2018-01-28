export function debounce(func, wait = 500) {
  let timeout;
  return function debounceWrapper(...args) {
    clearTimeout(timeout);
    const context = this;
    return new Promise(resolve => {
      function later() {
        timeout = null;
        resolve(Reflect.apply(func, context, args));
      }

      timeout = setTimeout(later, wait);
    });
  };
}
