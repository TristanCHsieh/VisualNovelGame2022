class Location {
    constructor(name, graphArr, lineImg, rectArr, events, inherantObjects = [], filterTag = ""){
        this.name = name;
        
        this.graphArr = graphArr
        
        if(typeof(this.graphArr[0]) == "number"){
            this.graphArr = [];
            
            for(this.i = 0; this.i < graphArr.length; this.i ++){
                this.graphArr.push([this.i + "" + this.name, graphArr[this.i]])
            }
        }
        
        this.lineImg = lineImg; // Where the player can't go
        this.rectArr = rectArr; // Event lines
        // RectArr is a 3D array containing lines and a function that gets
        // called when the player colides with the line
        // [[[x1,y1],[x2,y2]],function(){}]

        this.events = events; 
        // What happens on this screen? Plays once when the player
        // enters the screen
        
        this.inherantObjects = inherantObjects; //contains all the objects that are inherantly contained within the location
        
        this.filterTag = filterTag; // in certain locations, all the objects will appear with a certain tint to it for atmospheric purposes. Possible values: "day/night", "dark", "red", "green", ""

        this.appeared = []; // This array contains every object that has appeared thus far

        this.firstTime = false; // Becomes  true after the player has visited the screen for the first time
        this.hasEvent = true;
        
    }
    
    activate(directions){
        this.directions = directions;
        this.wait = 1;
        this.timeStamp = 1;
        this.counterIdx = 0;
    }
    pause(){
        this.wait = 0;
    }
    counter(){
        if(this.wait > 0){
            if(this.wait >= this.timeStamp){
                this.directions[this.counterIdx][0]();
                if(this.directions[this.counterIdx][1] == null){
                    this.wait = -1; // -1 because it's going to get increased later on in the if statement
                    this.directions = null;
                } else {
                    this.timeStamp += this.directions[this.counterIdx][1];
                    this.counterIdx ++; 
                }
            }
            this.wait ++;
        }
    }
}