class Directions{
  constructor(list){
    if (list){
      this.list = list;
    }else{
      this.list = [];
      for (let i = 0; i < lifespan; i++){
        this.list[i] = p5.Vector.random2D();
        this.list[i].setMag(random(0.2, maxForce));
      }
    }
  }
  crossover(partner){
    let newInstructions = [];
    let mid = floor(random(this.list.length));
    for (let i = 0; i < this.list.length; i++){
      if (i > mid){
        newInstructions[i] = this.list[i];
      }else{
        newInstructions[i] = partner.list[i];
      }
    }
    return new Directions(newInstructions);
  }
  mutation(){
    for (let i = 0; i < this.list.length; i++){
      if (random(1) < 0.01){
        this.list[i] = p5.Vector.random2D();
        this.list[i].setMag(random(0.02, maxForce));
      }
    }
  }
}
