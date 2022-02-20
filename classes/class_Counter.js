class Counter extends Object {
    // This is an object that will "play out a scene" so to speak.
    // Just appear it into whatever location needs it, and call the 
    // "activate" function with directions
    activate(directions){
        console.log(this.name + ", has been activated");
        this.directions = directions;
        this.wait = 1;
        this.timeStamp = 1;
        this.i = 0;
    }
    pause(){
        this.wait = 0;
    }
}