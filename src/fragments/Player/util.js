export function strictEquals(a, b) {
    return a !== b;
}

export function onChange(fn, checkFn = strictEquals) {
  let oldValue;
  return function(newValue) {
    if (checkFn(newValue, oldValue)) {
      oldValue = newValue;
      fn(newValue);
    }
  };
}
