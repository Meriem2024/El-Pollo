class DrawableObject {
  imgCache = {};
  x = 120;
  y = 250;
  width = 155;
  height = 255;
  currentImg = 0;
  img;

  /**
   * Loads an image from the specified path and stores it.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the image on the canvas at the specified position with the given dimensions.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from an array and caches them for later use.
   */
  loadImages(imagePaths) {
    let cacheImages = (paths, cache) => {
      paths.forEach((path) => {
        let img = new Image();
        img.src = path;
        cache[path] = img;
      });
    };

    cacheImages(imagePaths, this.imgCache);
  }
}
