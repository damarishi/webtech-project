export class Position {
  x: Number;
  y: Number;

  constructor(number: number, number1: number);
  constructor(x:number | string, y?:number) {
    if(typeof x == "string") {
      const matches = x.match(/-?\d+(\.\d+)?/g);
      if(!matches) {
        throw new Error('Invalid POINT format');
      }
      this.x = Number(matches[0]);
      this.y = Number(matches[1]);
      return;
    }
    if(typeof y == "number") {
      this.x = x;
      this.y = y;
      return;
    }
    throw new Error("Invalid POINT format");
  }
  getPair(){
    return `(${this.x}, ${this.y})`
  }
}
