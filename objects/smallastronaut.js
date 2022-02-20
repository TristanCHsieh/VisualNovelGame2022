smallastronaut = new Player(
    "smallastronaut",
    animationDic["smallastronaut"],null,
    null,
    [[0,18],[11,18]],
    [0,0,1,1],
    [],
    1
);

/* Here's how this next part works. I want the collision/boundries in the grub intestine scene to be pixel perfect. In order to do this I created two arrays filled with 1s and 0s, one of them contains a bitmap of the current location (either grublower or grubhigher), and the other contains a bitmap of the player. I changed the function hitDetect for smallastronaut (since hitDetect basically tells you if the player can make the move or not) to detect if the potential move will overlap pixels by using math and the two arrays */

smallAstronautArr = [

0,0,0,0,1,1,1,0,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,1,1,1,1,1,1,1,0,0,
0,1,1,1,1,1,1,1,1,1,0,
1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,
0,1,1,1,1,1,1,1,1,1,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0,
0,0,0,1,1,1,1,1,0,0,0

];

smallastronaut.rows = 295;
smallastronaut.columns = 185;

smallastronaut.playerRows = 11;
smallastronaut.playerColumns = 12;

smallastronaut.maxSpeed = .8;
smallastronaut.increment = .2;
smallastronaut.minSpeed = .201;

smallastronaut.hitDetect = function(moveDir,moveDelt){
    // This function predicts the objects next location given
    // a direction and a delta compared to all the lines on the screen that, 
    // can't be hit, returns true if that next move is legal
    // and false if the next move is illegal


    if(currLoc.constructor.name == "Location"){ // Just in case this function tries to get called during a cutscene

        this.moveDir = moveDir
        this.moveDelt = moveDelt;

        if(this.moveDir == "x"){
            this.testY = this.y
            this.testX = Math.floor(this.tempX + this.moveDelt);
        } else if(this.moveDir == "y"){
            this.testY = Math.floor(this.tempY + this.moveDelt);
            this.testX = this.x;
        }

        for(this.hitIdx = 0; this.hitIdx < smallAstronautArr.length; this.hitIdx ++){
            if(smallAstronautArr[this.hitIdx] == 1){
                this.coordinate = (this.testY*this.rows + Math.floor(this.hitIdx/this.playerColumns)*this.rows) + this.testX + this.hitIdx % this.playerRows
                if((currLoc.name == "grublower" || currLoc.name == "grubhigher") && //You don't want the program to throw an error when it gets to a non-grub room
                    grubBitmap[currLoc.name][this.coordinate] == 1){// collision! 
                    return true;
                }

            }
        }
        return false;

    }

}

smallastronaut.appear = function(x,y){ // Makes the object present in the room at x, y
    this.x = x;
    this.y = y;
    this.tempX = x;
    this.tempY = y;
    this.appeared = true;
    
    
    this.deltaX = 0;
    this.deltaY = 0;
    
    //this.delta = null; // this won't be used.

    currLoc.appeared.push(this); // The object in appeared will change
    this.updateLine(); // Initialize the object's line and interaction square
}

smallastronaut.createRectangle = function(rectDirection,rectDelta,rectHeight){
    // A version of the previous function, create rectangle, except it makes the rectangle around the entire body.

    this.rectDirection = rectDirection;
    this.rectDelta = rectDelta;
    this.rectHeight = rectHeight;
    if(this.rectDirection == "x"){ // Horizontal movement
        return [
            [[this.line[0][0] + this.rectDelta,this.line[0][1]],[this.line[1][0] + this.rectDelta,this.line[1][1] ]],
            [[this.line[0][0] + this.rectDelta,this.line[0][1] - this.rectHeight],[this.line[1][0] + this.rectDelta,this.line[1][1] - this.rectHeight]],
            [[this.line[0][0] + this.rectDelta,this.line[0][1]],[this.line[0][0] + this.rectDelta,this.line[0][1] - this.rectHeight]],
            [[this.line[1][0] + this.rectDelta,this.line[1][1]],[this.line[1][0] + this.rectDelta,this.line[1][1] - this.rectHeight]],
        ]; // Create a rectangle with two sides being the original line and the new line
    } else if(this.rectDirection == "y"){ // Verticle movement
        return [
            [[this.line[0][0],this.line[0][1] + this.rectDelta],[this.line[1][0],this.line[1][1] + this.rectDelta]],
            [[this.line[0][0],this.line[0][1] + this.rectDelta - this.rectHeight],[this.line[1][0] + this.rectDelta,this.line[1][1] + this.rectDelta - this.rectHeight]],
            [[this.line[0][0],this.line[0][1] + this.rectDelta],[this.line[0][0],this.line[0][1] + this.rectDelta - this.rectHeight]],
            [[this.line[1][0],this.line[1][1] + this.rectDelta],[this.line[1][0],this.line[1][1] + this.rectDelta - this.rectHeight]],
        ]; // Create a rectangle with two sides being the original line and the new line
    }
}

smallastronaut.tripWireTest = function(){
    // This function tests when the player crosses any event trigger lines,
    // And only works when the player is actually on a Location
    if(currLoc.constructor.name == "Location"){
        // Create a speculative rectangle, and then compare it to the event lines
        this.rect = this.createRectangle("x",0,18);
        
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

smallastronaut.behavior = function(){
    this.tripWireTest(); // check if the player is going to trigger any event lines anywayds... so that the player doesn't just "drift" through them...
    
    if(this.walking == true){
        // While the player is moving, check if they trigger the event lines, then
        // Move them if they can legally

        if(this.direction == "x"){ //add speed to the x direction until you reach the threshold
            this.deltaX += this.accelaration;
            if(this.deltaX == this.maxSpeed + this.increment){
                this.deltaX = this.maxSpeed;
            } else if(this.deltaX == (-1 * this.maxSpeed) - this.increment){
                this.deltaX = -1 * this.maxSpeed;
            }
        } else if(this.direction = "y"){ //add speed to the y direction until you reach the threshold
            this.deltaY += this.accelaration;
            if(this.deltaY == this.maxSpeed + this.increment){
                this.deltaY = this.maxSpeed;
            } else if(this.deltaY == (-1 * this.maxSpeed) - this.increment){
                this.deltaY = -1 * this.maxSpeed;
            }
        }
    } else { // The player is not moving
        
        //slow down the player
        if(this.deltaX > this.minSpeed){
           this.deltaX -= this.increment; 
        } else if(this.deltaX < this.minSpeed * -1){
            this.deltaX += this.increment;
        } 
        
        if(this.deltaY > this.minSpeed){
           this.deltaY -= this.increment; 
        } else if(this.deltaY < this.minSpeed * -1){
            this.deltaY += this.increment;
        } 
    }
    
    
    // Then move the player...
    if(this.hitDetect("x",this.deltaX) == false){
        this.move("x");
    } else {
        this.deltaX = 0;
    }
    if(this.hitDetect("y",this.deltaY) == false){
        this.move("y");
    } else {
        this.deltaY = 0;
    }
}

smallastronaut.startOrStop = function(dir,delt){ 
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

        this.break();
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
        this.delta = this.delt;
        this.accelaration = this.delta * this.increment;
        this.walking = true;
        
    }
}

smallastronaut.break = function(){ // this will slow the player down
    // This function stops the player
    if(this.walking == true){ // If the player is moving in the first place...
        // Stop the player
        if(this.delta < 0){
            if(this.direction == "x"){
                this.changeFace("stillleft");
            } else if(this.direction == "y"){
                this.changeFace("stillaway");
            }
        } else if(this.delta > 0){
            if(this.direction == "x"){
                this.changeFace("still");
            } else if(this.direction == "y"){
                this.changeFace("stillforward");
            }
        }
    }

    // Then reset the variables
    this.direction = null;
    this.walking = false;
}

smallastronaut.halt = function(){
    // This function stops the player
    if(this.walking == true){ // If the player is moving in the first place...
        // Change the player facve
        if(this.delta < 0){
            if(this.direction == "x"){
                this.changeFace("stillleft");
            } else if(this.direction == "y"){
                this.changeFace("stillaway");
            }
        } else if(this.delta > 0){
            if(this.direction == "x"){
                this.changeFace("still");
            } else if(this.direction == "y"){
                this.changeFace("stillforward");
            }
        }
    }

    // Then reset the variables
    this.direction = null;
    this.deltaX = 0;
    this.deltaY = 0;
    this.delta = 0;
    this.accelaration = 0;
    this.walking = false;
}

smallastronaut.move = function(direction){
    
    //This function moves the object in direction (x/y) by delta units
    
    if(direction == "x"){
        this.tempX += this.deltaX;
        this.x = Math.floor(this.tempX);
    } else if(direction == "y"){
        this.tempY += this.deltaY;
        this.y = Math.floor(this.tempY);
    }

    this.updateLine();
    
    
}