class Square {
    constructor(x,y,img,boolean) {
      this.x = x;
      this.y = y;
      this.img = img;
      this.boolean = boolean;
    }
    show() {
        ctx.beginPath();
        ctx.drawImage(this.img, this.x, this.y, square_size, square_size);
    }
  }