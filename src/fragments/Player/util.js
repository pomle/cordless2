export function equals(a, b) {
    return a !== b;
}

export function onChange(fn, checkFn = equals) {
  let oldValue;
  return function(newValue) {
    if (checkFn(newValue, oldValue)) {
      oldValue = newValue;
      fn(newValue);
    }
  };
}
