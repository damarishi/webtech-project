export class Position {
  x: Number;
  y: Number;

  constructor(x:string, y:string) {
    this.x = Number(x);
    this.y = Number(y);
  }
  getPair(){
    return `(${this.x}, ${this.y})`
  }
}
