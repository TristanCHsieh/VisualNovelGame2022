class Cutscene {
    constructor(name, cutsArr, endFunc){
        this.name = name;
        
        for(this.i = 0; this.i < cutsArr.length; this.i ++){
            this.cutsArr = [];
            
            if(cutsArr[this.i].length == 1){ // [animation]
                cutsArr[this.i] = cutsArr[this.i];
                
            } else if(cutsArr[this.i][1].constructor.name == "Number"){ //["graphic name",length of time]
                cutsArr[this.i] = [new Animation(cutsArr[this.i][0],[cutsArr[this.i][1]],false,function(){this.reset();  currLoc.update();})];
                
            } else if(cutsArr[this.i][1].constructor.name == "String"){ //[animation/"graphic","single piece of dialogue"]
                cutsArr[this.i] = [cutsArr[this.i][0],new Dialogue("",cutsArr[this.i][1],null,function(){currLoc.update();})];
                
            } else { // [animation/"graphic",dialogue object]
                cutsArr[this.i] = cutsArr[this.i];
                
            }
            
        }
        this.cutsArr = cutsArr
        
        
        
        this.endFunc = endFunc; //Where does the player go after the scene is over?

        this.appeared = false; 
        // has the dialogue box for the current scene already appeared?
        // This keeps the program from recalling the appear function

        this.currScene = 0;
        // Keeps track of which scene of the cutscene the program is on
    }
    giveFrame(){
        // Returns a sting with the label of the next image that should be displayed

        // And play the dialogue, if any (this will only happen once)
        // Thanks to this.appeared
        if(this.cutsArr[this.currScene].length == 2 && this.appeared == false){
            this.cutsArr[this.currScene][1].appear();
            this.appeared = true;
        }
        //give the program the label of the current picture of the cutscene
        if(typeof(this.cutsArr[this.currScene][0]) == "string"){
            return this.cutsArr[this.currScene][0];
        } else if(this.cutsArr[this.currScene][0].constructor.name == "Animation"){
            return this.cutsArr[this.currScene][0].giveFrame();
        }
    }
    play(){
        // Starts the cutscene
        player.disappear(); // Take the player off the screen... your "cleaning up after yourself" in order to prevent multiple players appearing on the screen
        
        currLoc = this;
    }
    update(step){
        // Moves to the "step"th slide of the cutscene
        // Or if no step is given, just move to the next slide

        this.step = step;
        // Moves to the next section of the cutscene
        if(this.cutsArr[this.currScene][0].constructor.name == "Animation"){
            // For all the animations
            // Reset the animation for the next time
            this.cutsArr[this.currScene][0].reset(); 
        }

        if(this.step == null){
            if(this.currScene < this.cutsArr.length - 1){
                // Update the current scene if there are still scenes to be updated

                this.currScene ++;
                this.appeared = false; // Play the dialogue again

            } else {
                this.currScene = 0; // Reset the slideshow so to speak
                this.appeared = false; // Play the dialogue again
                this.endFunc(); // Then play the end function
            }
        } else if(this.step == "end"){
            this.currScene = 0; // Reset the slideshow so to speak
            this.appeared = false; // Play the dialogue again
            this.endFunc(); // Then play the end function
        } else {
            this.currScene = this.step; // Go to the specific frame
            this.appeared = false;// Play the dialogue again
        }
    }
}