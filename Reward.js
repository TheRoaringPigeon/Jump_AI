class Reward{
  constructor(x, y, s, i){
    this.pos = createVector(x, y);
    this.size = s;
    this.number = i;
  }
  show(){
    fill(color('blue'));
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, this.size);
  }
  reached(x, y){
    return (dist(x, y, this.pos.x, this.pos.y) < this.size);
  }
  number(){
    return this.number;
  }
}
