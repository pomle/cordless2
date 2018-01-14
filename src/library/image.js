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
  let largest = images[0];
  for (const image in images) {
    if (image.width > largest.width) {
      largest = image;
    }
  }
  return largest;
}
