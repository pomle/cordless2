import {loadImage} from './image.js';

export class ImagePool {
  constructor(storage) {
    this.storage = storage;
  }

  get(url) {
    debugger;
    if (!this.storage.get(url)) {
      const promise = loadImage(url);
      this.storage.add(url, promise);
    }
    return this.storage.get(url);
  }
}
