let platforms, rewards, jumpers, size;
let lifespan, populationSize, maxForce, maxSpeed;
let gravity;
let loops;
let lastBest, bestEver;
let nLoops;
function setup() {
  createCanvas(windowWidth, windowHeight);
  platforms = [];
  rewards = [];
  size = 20;
  lifespan = 100;
  populationSize = 100;
  maxForce = 150;
  maxSpeed = 15;
  loops = 10;
  lastBest = "0";
  bestEver = "0";
  nLoops = 1;
  jumpers = new Population();
  gravity = createVector(0, 0.5);
  platforms.push(new Platform(width / 2, height - 70, 300));
  platforms.push(new Platform(40, height - 200, 150));
  platforms.push(new Platform(width / 2, height - 350, 300));
  platforms.push(new Platform(width - 50, height - 500, 150));
  platforms.push(new Platform(width / 2, height - 650, 300));
  rewards.push(new Reward(width / 2, height - 85, 20, 1));
  rewards.push(new Reward(40, height - 215, 20, 2));
  rewards.push(new Reward(width / 2, height - 365, 20, 3));
  rewards.push(new Reward(width - 50, height - 515, 20, 4));
  rewards.push(new Reward(width / 2, height - 665, 20, 5));
}

function draw() {
  background(220);
  for (let i = 0; i < platforms.length; i++) {
    platforms[i].show();
    rewards[i].show();
  }
  for (let i = 0; i < loops; i++) {
    jumpers.jump(gravity);
    if (jumpers.done) {
      jumpers.evaluate();
      jumpers.selection();
      bestEver = jumpers.bestEver.toString();
      lastBest = jumpers.lastBest.toString();
      nLoops++;
    }
  }
  textSize(20);
  fill(0);
  text("Best score so far: " + bestEver, 10, 20);
  text("Best score last round: " + lastBest, 10, 40);
  text("Total rounds: " + nLoops.toString(), 10, 120);
  rectMode(CORNER);
  rect(10, 60, 150, 40);
  fill(255);
  text("Toggle Speed", 20, 85);
}

function mouseClicked(){
  if (mouseX > 10 && mouseX < 160 && mouseY > 60 && mouseY < 100){
    if (loops == 1){
      loops = 10;
    }else if (loops == 10){
      loops = 20;
    }else{
      loops = 1;
    }
  }
}
