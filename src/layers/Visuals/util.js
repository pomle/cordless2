export function onChange(checkFn, fn) {
  let oldValue;
  return function(newValue) {
    if (checkFn(newValue, oldValue)) {
      oldValue = newValue;
      fn(newValue);
    }
  };
}

export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.addEventListener('load', () => {
      resolve(image);
    });
    image.addEventListener('error', reject);
    image.src = url;
  });
}

export function compareObjectURIs(a, b) {
  if (!a) return false;

  if (a.uri) {
    if (!b) return true;
    if (a.uri === b.uri) return false;
    return true;
  }
}

export function lookAt(prop, callback) {
  let last = {};

  return function onData(data) {
    if (data) {
      if (last[prop] !== data[prop]) {
        callback(data);
      }
      last = data;
    }
  };
}
