class Jumper {
  constructor(directions) {
    if (directions) {
      this.directions = directions;
    } else {
      this.directions = new Directions();
    }
    this.pos = createVector(25, height - size);
    this.vel = createVector();
    this.acc = createVector();
    this.completed = false;
    this.rewards = [];
    this.step = 0;
    this.fitness = 0;
    this.done = false;
    this.landed = false;
  }
  show() {
    fill(color("red"));
    ellipseMode(CENTER);
    ellipse(this.pos.x, this.pos.y, size);
  }
  calcFitness() {
    let d = dist(this.pos.x, this.pos.y, rewards[4].pos.x, rewards[4].pos.y);
    let s = this.step;
    s = map(s, 1, lifespan + 2, lifespan, 0);
    this.fitness = map(d, 1, width, width, 1);
    if (this.rewards.length > 0) {
      this.fitness *= this.rewards.length + 2;
    }else{
      this.fitness /= 10;
    }
    if (this.completed){
      this.fitness *= 10;
    }
    this.fitness *= s;
  }
  applyForce(force){
    this.acc.add(force);
  }
  fall(force){
    if (!this.landed){
      this.applyForce(force);
    }
  }
  update(){
    if (this.rewards.length == rewards.length){
      this.completed = true;
      this.done = true;
      return;
    }
    if (this.step > lifespan){
      this.done = true;
      return;
    }
    this.checkPlatforms();
    this.checkRewards();
    this.checkGround();
    this.checkWalls();
    this.nextJump();
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.pos.y = constrain(this.pos.y, 0, height-size/2);
    this.acc.mult(0);
    this.vel.limit(maxSpeed);
  }
  checkWalls(){
    if (this.pos.x <= 0 || this.pos.x >= width){
      this.vel.x *= -1;
      if (this.pos.x < 100){
        this.pos.x = size;
      }else{
        this.pos.x = width-size;
      }
    }
  }
  nextJump(){
    if (!this.landed){
      return;
    }
    this.applyForce(this.directions.list[this.step]);
    this.step++;
    this.landed = false;
  }
  checkRewards(){
    for (let i = 0; i < rewards.length; i++){
      if (rewards[i].reached(this.pos.x, this.pos.y) && !this.rewards.includes(rewards[i].number)){
        this.rewards.push(rewards[i].number);
        break;
      }
    }
  }
  checkPlatforms(){
    for (let i = 0; i < platforms.length; i++){
      if (platforms[i].land(this.pos.x, this.pos.y)){
        this.landed = true;
        break;
      }
    }
  }
  checkGround(){
    if (this.pos.y > height - size && this.pos.y < height){
      this.landed = true;
    }
  }
}












