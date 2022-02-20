class Player extends Object { 
    // The player object needs to know when it hits an event line
    // and the interaction sqaures of the other objects
    // The player also needs to change its bearing based on
    // How it's currently moving
    constructor(name, faces, behavior, action, block, intSquare, noCross = [], moveInc){
        super(name, 
            faces, 
            behavior, 
            action, 
            block, 
            "none",
            intSquare, 
            [[0,0],[0,0]], 
            noCross, 
            moveInc
        );
        // super needs to be called in an inherited object
        // or else it won't work. It recalls the constructor function
        
        // the player NEEDS to have these faces or else it won't work.
        if(this.faces == null){
            this.faces = {
                "still": this.name + "right",
                "walking": animationDic[this.name + "/right"],
                "stillleft": this.name + "left",
                "walkingleft": animationDic[this.name + "/left"],
                "stillaway": this.name + "away",
                "walkingaway": animationDic[this.name + "/away"],
                "stillforward": this.name + "forward",
                "walkingforward": animationDic[this.name + "/forward"]
            }
        } else if(this.faces.constructor.name != "object"){
            //This is if the user puts one image or animation in the faces space. It will fill everything in.
            this.faces = {
                "still": this.faces["still"],
                "walking": this.faces["still"],
                "stillleft": this.faces["still"],
                "walkingleft": this.faces["still"],
                "stillaway": this.faces["still"],
                "walkingaway": this.faces["still"],
                "stillforward": this.faces["still"],
                "walkingforward": this.faces["still"]
            }
            // You have to put "still" because object will already have made a dictionary. You're just expanding it.
        }
        // the player will pretty much always have this as a behavior function
        if(this.behavior == null){
            this.behavior = function(){
                if(this.walking == true){
                    // Then move the player, if the move is legal
                    if(this.hitDetect(this.direction,this.delta) == false){
                        this.move(this.direction,this.delta);
                    }
                    // check if they trigger the event lines
                    this.tripWireTest();
                }
            }
        }
    }
    
    tripWireTest(){
        // This function tests when the player crosses any event trigger lines,
        // And only works when the player is actually on a Location
        if(currLoc.constructor.name == "Location"){
            // Create a speculative rectangle, and then compare it to the event lines
            this.rect = this.createRectangle(this.direction,this.delta);
            for(this.i = 0; this.i < currLoc.rectArr.length; this.i ++){
                if(this.rectHitTest(this.rect,
                                   [
                                        [
                                        currLoc.rectArr[this.i][0][0][0],
                                        currLoc.rectArr[this.i][0][0][1] + headerH
                                        ],
                                        [
                                        currLoc.rectArr[this.i][0][1][0],
                                        currLoc.rectArr[this.i][0][1][1] + headerH
                                        ],
                                    ] // Keeping in mind headers
                                   ) == true){ 
                    //If the player has collided with an event line
                    currLoc.rectArr[this.i][1](); // call the function that event contains
                    break; //So that the player doesn't trip over multiple wires at once
                }
            }
        }
    }
    lineAndRectHitDetect(line,rect){
        // Takes the interact sqaure and the player's line, and determines if they cross
        // This function is more efficiant than rectHitTest, but it doesn't
        // Work with diagonal lines. So it will be used in place of rectHitTest specifically
        // For checking when the players horizontal interact line overlaps an interaction
        // square

        this.l1 = [line[0][0],line[0][1]];
        this.r1 = [line[1][0],line[1][1]];
        this.l2 = [rect[0],rect[1]];
        this.r2 = [rect[0]+rect[2],rect[1]+rect[3]];

        // Uncomment to see interaction squares
        /*ctx.beginPath();
        ctx.fillStyle = "#FF99FF";
        ctx.fillRect(this.l1[0],this.l1[1],this.r1[0]-this.l1[0],1);
        ctx.fillRect(this.l2[0],this.l2[1],this.r2[0]-this.l2[0],this.r2[1]-this.l2[1]);
        ctx.closePath();*/

        if(this.r1[0] < this.l2[0] || this.r2[0] < this.l1[0]){ 
            // If the line is to the right or left of the rectangle
            return false;
        } else if(this.r1[1] < this.l2[1] || this.r2[1] < this.l1[1]){
            // If the line is above or below the rectangle
            return false;
        }

        return true;
    }
    startOrStop(dir,delt){ 
        // Given a direction and a positive or negative value
        // This function will change direction, delta, and walking
        // Status of the character depending on the current status

        // direction and delta representthe players current movement
        // dir and delt represent the movement that the user inputs
        // and will determine how the player will change
        this.dir =  dir;
        this.delt = delt; 

        if(
            this.delta*this.delt > 0 // Positive and postive will return true, negative and negative will return true
            && this.direction == this.dir
          ){
            // If already moving
            // Reset the movement directions, and stop the player

            this.halt();
        } else {
            // Otherwise start the player walking again
            if(this.delt < 0){
                if(this.dir == "x"){
                    this.changeFace("walkingleft");
                } else if(this.dir == "y"){
                    this.changeFace("walkingaway");
                }
            } else if(this.delt > 0){
                if(this.dir == "x"){
                    this.changeFace("walking");
                } else if(this.dir == "y"){
                    this.changeFace("walkingforward");
                }
            }

            this.direction = this.dir;
            this.delta = (this.delt)*this.moveInc;
            this.walking = true;
        }
    }
}