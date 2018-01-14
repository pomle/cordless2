export function onChange(checkFn, fn) {
  let oldValue;
  return function(newValue) {
    if (checkFn(newValue, oldValue)) {
      oldValue = newValue;
      fn(newValue);
    }
  };
}

export function is(a, b) {
  return a && a !== b;
}

export function compareObjectURIs(a, b) {
  if (!a) return false;

  if (a.uri) {
    if (!b) return true;
    if (a.uri === b.uri) return false;
    return true;
  }
}

export function onURIChange(fn) {
  return onChange(compareObjectURIs, fn);
}
