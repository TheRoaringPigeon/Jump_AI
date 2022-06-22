class Platform{
  constructor(x, y, s){
    this.pos = createVector(x, y);
    this.size = s;
  }
  show(){
    fill(0);
    rectMode(CENTER);
    rect(this.pos.x, this.pos.y, this.size, 10);
  }
  land(x, y){
    return (x < this.pos.x + this.size/2 && x > this.pos.x - this.size/2 && y < this.pos.y && y > this.pos.y - size);
  }
}
