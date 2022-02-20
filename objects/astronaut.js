astronaut = new Player(
    "astronaut",
    animationDic["astronaut"],null,
    null,
    [[0,34],[16,34]],
    [0,0,1,1],
    [],
    1
);

bigastronautarr = [
0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,
0,0,1,1,1,1,1,1,1,1,1,1,1,1,0,0,
0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
0,1,1,0,1,1,1,1,1,1,1,1,0,1,1,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,
0,0,0,0,1,1,1,1,1,1,1,1,0,0,0,0
];

astronaut.rows = 253;
astronaut.columns = 504;

astronaut.playerRows = 34;
astronaut.playerColumns = 16;

// When the player firsts enter the Magenta Sector, what will their coordinates be?
astronaut.tempX = 100;
astronaut.tempY = 100;

astronaut.maxSpeed = 1; // How fast does the astronaut go in pixels per frame. Once the astronaut hits this number, it stops accelarating
astronaut.increment = .25; // How fast does it get faster
astronaut.minSpeed = .25; // When you stop the object, how fast does the leftover inertia take it.
astronaut.moveObj = astronaut; //Which object is being moved. This switches between the player and everything else, depending on if the player is scrolling the camera

astronaut.appear = function(x,y){ // Makes the object present in the room at x, y
    this.x = x;
    this.y = y;
    this.appeared = true;
    
    
    this.deltaX = 0;
    this.deltaY = 0;
    
    currLoc.appeared.push(this); // The object in appeared will change
    this.updateLine(); // Initialize the object's line and interaction square
    this.rect = this.createRectangle("x",0,34); // Initialize rectangle... I used to rely on the rectangle being initialized by the constant hitDetect in behavior, but now hitDetect only gets called when the astronaut is moving.
}


/*
    I'm rewiring the tripWireTest, createRectangle, and hitDetect in order to make the astronaut's 
    rectangle of interaction a sqaure that encompasses the astronaut as opposed to a line. Right now
    the astronaut interacts with the objects via it's line as oppsed to it's rectangle. I might need to change this.

*/
astronaut.tripWireTest = function(){
    // This function tests when the player crosses any event trigger lines,
    // And only works when the player is actually on a Location
    if(currLoc.constructor.name == "Location"){
        // Create a speculative rectangle, and then compare it to the event lines
        this.rect = this.createRectangle("x",0,34);
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

astronaut.createRectangle = function(rectDirection,rectDelta,rectHeight){
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

astronaut.hitDetect = function(moveDir,moveDelt){
    // This function predicts the objects next location given
    // a direction and a delta compared to all the lines on the screen that, 
    // can't be hit, returns true if that next move is legal
    // and false if the next move is illegal


    if(currLoc.constructor.name == "Location"){ // Just in case this function tries to get called during a cutscene

        this.moveDir = moveDir
        this.moveDelt = moveDelt;
        this.lines = currLoc.lineImg.concat();
        // I added concat here to prevent the lineImg from changing with this.lines
        // Now go through all the uncrossable objects... and add
        // Now add the object lines that can't be crossed

        for(this.i = 0; this.i < currLoc.appeared.length; this.i ++){
            if(currLoc.appeared[this.i].name != this.name && currLoc.appeared[this.i].noCrossLines.length > 0){
            // You don't want the object running into itself do you?
                this.lines = this.lines.concat(currLoc.appeared[this.i].noCrossLines);
            }
        }

        //Calculate proposed movement
        this.rect = this.createRectangle(this.moveDir,this.moveDelt,34);


        // Now test to see if the object has collided with an illegal line

        this.willHit = false; // Assume you're not going to hit a rectangle until proven otherwise
        for(var i = 0; i < this.lines.length; i ++){
            if(this.rectHitTest(this.rect,
                                [
                                    [this.lines[i][0][0],this.lines[i][0][1] + headerH],
                                    [this.lines[i][1][0],this.lines[i][1][1] + headerH]
                                ]
                               ) == true){ 
                // exit the loop if the object hits hits
                this.willHit = true;
                this.halt(); // Stop the player
                break;
            }
        }
        return this.willHit;

    }

}

astronaut.lineAndRectHitDetect = function(line,interactRect){
    /* 
        I'm changing this to where it bascially tells you if the player's rect is 
        inside the given rectangle of interaction... instead of the traditional line vs rect.
        
        I'm doing it by taking the top left corner of each rectangle and the bottom right corner of each
        rectangle. You can use this to tell if a rectangle is inside eachother or not.
    */

    //interactRect = [x,y,w,h]

    this.l1 = this.rect[1][0]; //top left corner of rect
    this.l2 = [interactRect[0],interactRect[1]]; //top left corner of interactRect... x,y
    
    this.r1 = this.rect[3][0]; //bottom right corner of rect
    this.r2 = [interactRect[0] + interactRect[2],interactRect[1] + interactRect[3]]; ////bottom right corner of interactRect
    
    // Uncomment to visualize collision between player and interaction square 
    /*ctx.beginPath();
    ctx.strokeStyle = "#FFFFFF";
    ctx.moveTo(this.l1[0],this.l1[1]);
    ctx.lineTo(this.r1[0],this.r1[1]);
    ctx.stroke();

    ctx.moveTo(this.l2[0],this.l2[1]);
    ctx.lineTo(this.r2[0],this.r2[1]);
    ctx.stroke();
    
    ctx.closePath();*/
    
    // check x values... 
    if (this.l1[0] >= this.r2[0] || this.l2[0] >= this.r1[0]){
        return false; 
    }
    // check y values.
    if (this.l1[1] >= this.r2[1] || this.l2[1] >= this.r1[1]){
        return false;
    }
    return true; 
}

sectorCameraX = 80; // how wide you want the camera
sectorCameraY = 80; // how tall you want the camera

sectorCameraX = (canvas.width-sectorCameraX)/2; //distance between left side of screen and start of camera
sectorCameraY = (stageHeight-sectorCameraY)/2; //distance between top part of screen and start of camera 


/*
    The next functions take care of how the astronaut moves. Instead of the traditional right is right movement,
    The astronaut increases it's velocity when you press right, and decreases when you press right again. Also the
    astronaut keeps moving due to its inertia.

*/

astronaut.behavior = function(){
    if(this.walking == true){
        // While the player is moving, check if they trigger the event lines, then
        // Move them if they can legally
        this.tripWireTest();

        if(this.direction == "x"){
            this.deltaX += this.accelaration;
            if(this.deltaX == this.maxSpeed + this.increment){
                this.deltaX = this.maxSpeed;
            } else if(this.deltaX == (-1 * this.maxSpeed) - this.increment){
                this.deltaX = -1 * this.maxSpeed;
            }
        } else if(this.direction = "y"){
            this.deltaY += this.accelaration;
            if(this.deltaY == this.maxSpeed + this.increment){
                this.deltaY = this.maxSpeed;
            } else if(this.deltaY == (-1 * this.maxSpeed) - this.increment){
                this.deltaY = -1 * this.maxSpeed;
            }
        }
    } else {
        
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
    
    
    // Then move the player... or move the camera... for example if you are heading right, and you go to far off screen then it will take the background with it.

    if(
        (this.deltaX > 0 && this.hitDetect("x",Math.ceil(this.deltaX)) == false) ||
        (this.deltaX < 0 && this.hitDetect("x",Math.floor(this.deltaX)) == false)
    
    ){
        if(this.x > (canvas.width - sectorCameraX - 16) && 
            (
                (this.direction == "x" && this.delta > 0) || // to account for the little time spent between changing directions
                (this.deltaX > 0)
            ) 
        ){
            this.move(currLoc.appeared,"x");
        } else if(this.x < (sectorCameraX) && 
            (
                (this.direction == "x" && this.delta < 0) ||
                (this.deltaX < 0)
            )
        ){
            this.move(currLoc.appeared,"x");
        } else {
            this.move(this,"x");
        }
    }
    if(
        (this.deltaY > 0 && this.hitDetect("y",Math.ceil(this.deltaY)) == false) ||
        (this.deltaY < 0 && this.hitDetect("y",Math.floor(this.deltaY)) == false)
    ){
        if(this.y > (stageHeight - sectorCameraY - 34) && 
            (
                (this.direction == "y" && this.delta > 0) ||
                (this.deltaY > 0)
            ) 
        ){
            this.move(currLoc.appeared,"y");
        } else if(this.y < (sectorCameraY) && 
            (
                (this.direction == "y" && this.delta < 0) ||
                (this.deltaY < 0)
            )
        ){
            this.move(currLoc.appeared,"y");
        } else {
            this.move(this,"y");
        }
    }
    
    // The following function checks if the astronaut is touching the grub on day 5.
    if(flagDic["story"] == "DAY 5 night" && grubfront.isSucking != true){
        for(this.hitIdx = 0; this.hitIdx < bigastronautarr.length; this.hitIdx ++){
            if(bigastronautarr[this.hitIdx] == 1){
                
                if(grubfront.x != null){ // if the grub is appeared in the first place
                    if(
                       (this.x + this.playerColumns) - grubfront.x < this.columns && 
                       (this.y + this.playerRows) - grubfront.y < this.rows &&
                       this.x - grubfront.x > 0 &&
                       this.y - grubfront.y > 0
                      ){
                        this.coordinate = 
                            (((this.y - grubfront.y)) * this.columns + Math.floor(this.hitIdx/this.playerColumns) * this.columns) + 
                            (((this.x - grubfront.x) + this.hitIdx % this.playerRows)); // NOTE TO SELF: Relabel variables
                        if(grubbodyarr[this.coordinate] == 1){// collision! 
                            grubfront.action();
                            console.log("HIT" + this.coordinate);
                            break;
                        }
                        //console.log("IN");
                    }
                    
                } else {
                    this.coordinate = null;
                }
                
                
            }
        }
    }
}

astronaut.startOrStop = function(dir,delt){ 
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
        this.moveObj = this;
        
    }
}

astronaut.break = function(){ // this will slow the player down
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

astronaut.halt = function(){
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
    this.deltaX = 0;
    this.deltaY = 0;
    this.delta = 0;
    this.accelaration = 0;
    this.walking = false;
}

astronaut.move = function(moveObj,direction){
    
    //This function moves the object in direction (x/y) by delta units
    
    this.moveObj = moveObj;
    
    if(this.moveObj == this){
        if(direction == "x"){
            this.tempX += this.deltaX;
            this.x = Math.floor(this.tempX);
        } else if(direction == "y"){
            this.tempY += this.deltaY;
            this.y = Math.floor(this.tempY);
        }

        this.updateLine();
    } else {
        if(direction == "x"){
            sectorOriginTempX -= this.deltaX;
            sectorOriginX = Math.floor(sectorOriginTempX);

        } else if(direction == "y"){
            sectorOriginTempY -= this.deltaY;
            sectorOriginY = Math.floor(sectorOriginTempY);
            
        }
        
    }
    
    
}

