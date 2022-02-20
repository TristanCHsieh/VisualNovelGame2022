class Animation {
    constructor(name, graphArr, loop = false, endFunc =  null){
        this.name = name;
        if(typeof(graphArr) == "number"){ // you can take a short cut and just put a number of frames you want
            this.graphArr = [];
            for(this.i = 0; this.i < graphArr; this.i ++){
                this.graphArr.push([this.i + "" + this.name]);
            }
        } else if(typeof(graphArr[0]) == "number"){ //or you could give a list of numbers
            this.graphArr = [];
            for(this.i = 0; this.i < graphArr.length; this.i ++){
                this.graphArr.push([this.i + "" + this.name,graphArr[this.i]]);
            }
        } else {
            this.graphArr = graphArr; //2D array [["frame1",length],["frame2",length]] 
        }
        
        this.loop = loop; // Boolean.. does it loop?
        this.endFunc = endFunc; // What happens when the animation is complete?
        this.endFuncComplete = false; // Has the end function already been called? Keeps the end function from being called over and over again

        this.currentFrame = 0; // Contains the index of which point in the Array you want to start
        this.wait = 0; // Denotes how long the program has lasted on a certain frame.
    }
    giveFrame(){
        // Get the label of the next frame

        this.currFrameString = this.graphArr[this.currentFrame][0];

        // Now prepare numbers for the next frame
        if(currDialogue == null && inventoryOpened == false && fadeOutPhase == 0 || 
           currLoc.constructor.name == "Cutscene"){
            // If there is a dialogue, inventory box open, or the screen is fading out
            // the animation does not mov forward. Except during cutscenes, where the 
            // animation always moves forward if exists.
            if(this.graphArr[this.currentFrame][1] > 1 && this.wait < this.graphArr[this.currentFrame][1]){
            // If you are currently on an image that lasts more than one frame
            // Increase wait by one. When the program has waited the right amount
            // Of time, increase frame.
                this.wait ++;
            } else {
                this.wait = 0;
                if(this.loop == true){
                    // If you loop just update frames automatically
                    this.currentFrame = (this.currentFrame + 1) % this.graphArr.length; 
                } else if(this.currentFrame < this.graphArr.length-1){
                    // If it isn't looping but it hasn't reached the end yet, increase the frame
                    this.currentFrame ++;
                } else {
                    // Otherwise, the animation has completed... play the end function if there is one
                    if(this.endFunc != null && this.endFuncComplete == false){
                        this.endFuncComplete = true;
                        this.endFunc();
                        
                    }
                }
            }
        }

        // Return the current frame's label
        
        return this.currFrameString;
    }
    reset(){
        // Reset the animation so that the next time it can play from the beginning
        this.wait = 0;
        this.currentFrame = 0;
        this.endFuncComplete = false;
    }
}