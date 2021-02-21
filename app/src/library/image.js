import {fromJS} from "immutable";

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

export function largest(images) {
  images = fromJS(images);
  let largest = images.get(0);
  for (const image of images) {
    if (image.get('width') > largest.get('width')) {
      largest = image;
    }
  }
  return largest.toJS();
}
