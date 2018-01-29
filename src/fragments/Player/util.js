export function looseEquals(a, b) {
    return a != b;
}

export function onChange(fn, checkFn = looseEquals) {
  let oldValue;
  return function(newValue) {
    if (checkFn(newValue, oldValue)) {
      oldValue = newValue;
      fn(newValue);
    }
  };
}
