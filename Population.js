class Population{
  constructor(){
    this.jumpers = [];
    this.matingPool = [];
    this.done = false;
    for (let i = 0; i < populationSize; i++){
      this.jumpers[i] = new Jumper();
    }
    this.bestEver = 0;
    this.lastBest = 0;
  }
  evaluate(){
    let maxFit = 0;
    for (let i = 0; i < populationSize; i++){
      this.jumpers[i].calcFitness();
      if (this.jumpers[i].fitness > maxFit){
        maxFit = this.jumpers[i].fitness;
      }
    }
    for (let i = 0; i < populationSize; i++){
      this.jumpers[i].fitness /= maxFit;
    }
    this.matingPool = [];
    for (let i = 0; i < populationSize; i++){
      let f = this.jumpers[i].fitness * 100;
      for (let j = 0; j < f; j++){
        this.matingPool.push(this.jumpers[i]);
      }
    }
    this.lastBest = maxFit;
    if (maxFit > this.bestEver){
      this.bestEver = maxFit;
    }
  }
  selection(){
    let newJumpers = [];
    for (let i = 0; i < populationSize; i++){
      let parentA = random(this.matingPool).directions;
      let parentB = random(this.matingPool).directions;
      let child = parentA.crossover(parentB);
      child.mutation();
      newJumpers[i] = new Jumper(child);
    }
    this.jumpers = newJumpers;
    this.done = false;
  }
  jump(gravity){
    let done = true;
    for (let i = 0; i < populationSize; i++){
      this.jumpers[i].fall(gravity);
      this.jumpers[i].update();
      this.jumpers[i].show();
      if (!this.jumpers[i].done){
        done = false;
      }
    }
    if (done){
      this.done = true;
    }
  }
}










