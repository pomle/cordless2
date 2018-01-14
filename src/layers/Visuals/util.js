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
