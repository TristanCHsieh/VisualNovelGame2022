class Object {
    constructor(name, 
                faces, 
                behavior = function(){}, 
                action = function(){}, 
                block = [[0,1],[1,1]], 
                selectType = "none", 
                intSquare = null, 
                blinkLoc = null, 
                noCross = [], 
                moveInc = 1){
        
        // Initialize variables
        
        // NAME AND FACE
        this.name = name;
        if(faces != null && (faces.constructor.name == "Animation" || faces.constructor.name == "String")){ // one face, user passed a string (for graphic) or an animation
            this.faces = {
                "still": faces
            } // Dictionary containing all the possible stills and animations that represent the object
        } else { // only one face, and that will always be still
            this.faces = faces;
        }
        
        // Set the objects current face. The default is the face
        // Labeled "still"... if this.faces is null because the user has inputed a default faces value of null on a player object
        // then the default face is the right instance of player.
        if(this.faces == null){ //it's a player oject with default faces settings
            this.face = this.name + "right";
        } else {
            this.face = this.faces["still"];
        }
        
        // FUNCTIONS
        this.behavior = behavior; // Function - What does the object do every frame?
        this.action = action; // Function - what happens when the player interacts with the object?
        
        // COORDINATES AND SELECTING
        this.block = [[block[0][0],block[0][1] + headerH],[block[1][0],block[1][1] + headerH]]; 
            // A line that represents the part of the player that interacts with the rest of the world
            // I added the height of the header. 0,0 will be the point right below the header
        
        this.intSquare = intSquare;
        this.blinkLoc = blinkLoc;
        
        this.selectType = selectType; // Does the action play when the player presses space or automatically or not at all?
        this.noCross = noCross; // Array of lines that the player can't cross relative to the origin
        this.moveInc = moveInc; // How fast does the object move? Mainly used for player
        

        
        //Initialize other variables that can be deduced from user defined 
        this.appeared = false;

        // Every object starts out with no x and y
        this.x = null;
        this.y = null;

        // Every object starts out with no movement
        this.delta = 0;
        this.direction = null;
        this.walking = false;

        //Phase will denote which one of the behaviors the object will adopt
        this.phase = 0;

        // Wait is a timer that keeps track of how many frames have passed...
        // When wait reaches a certain number an action can play
        this.wait = 0;
    }
    appear(x,y,loc = currLoc){ // Makes the object present in the room at x, y
        // if ther are are any variables that depend on graphic's dimensions, initialize them when they appear.
        if(this.face.constructor.name == "String"){ // Accounts for whether the face is an animation or not
            this.faceImg = this.face;    
        } else {
            this.faceImg = this.face.giveFrame();
        }
        if(this.intSquare == null){
            this.intSquare = [0,graphicDic[this.faceImg].h,graphicDic[this.faceImg].w,100] // Where does the player need to be to interact with the object [x,y,w,h]
        } else {
            // you can even leave certain elements blank and it will fill them in for you
            if(this.intSquare[0] == null){
                this.intSquare[0] = 0;
            } else {
                this.intSquare[0] = this.intSquare[0];
            }

            if(this.intSquare[1] == null){
                this.intSquare[1] = graphicDic[this.faceImg].h;
            } else {
                this.intSquare[1] = this.intSquare[1];
            }

            if(this.intSquare[2] == null){
                this.intSquare[2] = graphicDic[this.faceImg].w;
            } else {
                this.intSquare[2] = this.intSquare[2];
            }

            if(this.intSquare[3] == null){
                this.intSquare[3] = 100;
            } else {
                this.intSquare[3] = this.intSquare[3];
            }

        }

        if(this.blinkLoc == null){
            this.blinkLoc = [Math.floor(graphicDic[this.faceImg].w/2) - 3, -7];
        } else {
            if(this.blinkLoc[0] == null){
                this.blinkLoc[0] = Math.floor(graphicDic[this.faceImg].w/2) - 3;
            } else {
                this.blinkLoc[0] = this.blinkLoc[0];
            }
            if(this.blinkLoc[1] == null){
                this.blinkLoc[1] = -7;
            } else {
                this.blinkLoc[1] = this.blinkLoc[1];
            }
            // Where is the blinker placed relative to the players origin
        }
        
        
        
        this.x = x;
        this.y = y;
        this.appeared = true; // This may be inconsistant
        loc.appeared.push(this); // The object in appeared will change
        this.updateLine(); // Initialize the object's line and interaction square
    }
    disappear(){ // Removes the object from the room
        if(this.appeared == true){ // if the object is there in the first place
            this.x = null;
            this.y = null;
            this.appeared = false;
            this.disIdx = currLoc.appeared.indexOf(this);
            currLoc.appeared.splice(this.disIdx, 1); 
            //remove 1 element from whatever index your object is at
            this.removeLine();
            // Remove the line from the gamefield... 
            // so that the object doesn't "accientally" keep interacting
            // with the world after they are gone. All their variables
            // should be set to null.
        }
    }
    changeFace(label){ // Changes the object's appearance to label
        this.face = this.faces[label];
    }
    giveFace(){
        // This returns the label of the face's image, or whatever frame
        // the face's animation is on
        if(typeof(this.face) == "string"){ //if the face is a string
            return this.face;
        } else { // otherwise it's an animation
            return this.face.giveFrame();
        }
    }
    updateLine(){ 
        // updates the objects specific coordinates... 
        // makes the absolute coordinates from relative ones
        this.line = [
            [this.x + this.block[0][0],this.y + this.block[0][1]],
            [this.x + this.block[1][0],this.y + this.block[1][1]]
        ];

        this.interactSquare = [
            this.x + this.intSquare[0],
            this.y + this.intSquare[1],
            this.intSquare[2],
            this.intSquare[3]
        ]; // Update the square too.

        this.blinkArea = [this.x + this.blinkLoc[0], this.y + this.blinkLoc[1] + headerH];

        // Find the relative coordinates for the lines of no crossing
        this.noCrossLines = [];
        for(this.i = 0; this.i < this.noCross.length; this.i ++){
            this.noCrossLines.push(
            [[this.x + this.noCross[this.i][0][0],this.y + this.noCross[this.i][0][1]],
             [this.x + this.noCross[this.i][1][0],this.y + this.noCross[this.i][1][1]]]
            )
        }

    }
    removeLine(){ 
        // makes the lines back to null - the object is no longer in the game
        this.line = [[1000],[1000]]; 
        // This one is going to be 1000,1000, because if the player gets removed,
        // You don't want the program to freak out

        this.interactSquare = null;

        this.blinkArea = null;

        this.noCrossLines = null;

    }
    move(direction,delta){
        //This function moves the object in direction (x/y) by delta units

        this.direction = direction;
        this.delta = delta;
        if(this.direction == "x"){
            this.x += this.delta;
        } else if(this.direction == "y"){
            this.y += this.delta;
        }
        this.updateLine();
    }
    relocate(x,y){
        // Moves the object to a specific x and y coordinate
        
        
        if(x != null){
            this.x = x;
        }
        if(y != null){
            this.y = y;
        }
        
        this.updateLine();
    }
    rectHitTest(testRect,testLine){
        // This function tests if a rectangle is overlapping a line
        this.testRect = testRect;
        this.testLine = testLine;

        for (this.j = 0; this.j < this.testRect.length; this.j ++){
            if(hitTest(this.testRect[this.j],this.testLine) == true){ //if the proposed movement will hit
                return true; // tell the program
            }
        }
        return false;
    }
    createRectangle(direction,delta){
        // This function returns a rectangle that represents
        // where the sprite will be given a direction and a delta
        // this rectangle will be used to determine if the proposed
        // move is legal or not

        this.rectDirection = direction;
        if(this.rectDirection == null){
            this.rectDirection = "x";
        }
        this.rectDelta = delta;
        if(this.rectDelta == null){
            this.rectDelta = 0;
        }
        if(this.rectDirection == "x"){ // Horizontal movement
            return [
                [[this.line[0][0] + this.rectDelta,this.line[0][1]],[this.line[1][0] + this.rectDelta,this.line[1][1]]]
            ]; // Sonic's line of collision will just be the line shifted the appropriate amount
        } else if(this.rectDirection == "y"){ // Verticle movement
            return [
                [[this.line[0][0],this.line[0][1] + this.rectDelta],[this.line[1][0],this.line[1][1] + this.rectDelta]],
                [[this.line[0][0],this.line[0][1]],[this.line[1][0],this.line[1][1]]],
                [[this.line[0][0],this.line[0][1] + this.rectDelta],[this.line[0][0],this.line[0][1]]],
                [[this.line[1][0],this.line[1][1] + this.rectDelta],[this.line[1][0],this.line[1][1]]]
            ]; // Create a rectangle with two sides being the original line and the new line
        }
    }
    hitDetect(moveDir,moveDelt){
        // This function predicts the objects next location given
        // a direction and a delta compared to all the lines on the screen that, 
        // can't be hit, returns true if that next move is legal
        // and false if the next move is illegal


        if(currLoc.constructor.name == "Location"){ // Just in case this function tries to get called during a cutscene

            //this.direction = direction;
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
            this.rect = this.createRectangle(this.moveDir,this.moveDelt);


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
    halt(){
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
        this.delta = 0;
        this.walking = false;
    }
    walk(direction, delta){ 
        // force an object to walk to a certain destination.
        // instead of being forcibly moved to one place, the object
        // will literally walk a certain place

        // The object will be walking
        this.walking = true;

        // Set the direction of the object
        this.direction = direction;
        this.delta = delta;

        // Change the face of the object... if the
        // object doesn't need to be changed, then
        // just don't change faces at all
        if(this.direction == "x"){
            if(this.delta > 0){
                if(this.hitDetect("x",this.moveInc) == false){
                    if(this.faces["walking"] != undefined){
                        this.changeFace("walking");
                    }
                    this.move("x",this.moveInc);
                } else {
                    if(this.faces["still"] != undefined){
                        this.changeFace("still");
                    }
                }
            } else {
                if(this.hitDetect("x",-this.moveInc) == false){
                    if(this.faces["walkingleft"] != undefined){
                        this.changeFace("walkingleft");
                    }
                    this.move("x",-this.moveInc);
                } else {
                    if(this.faces["stillleft"] != undefined){
                        this.changeFace("stillleft");
                    }
                }
            }
        }
        if(this.direction == "y"){
            if(this.delta > 0){
                if(this.hitDetect("y",this.moveInc) == false){
                    if(this.faces["walkingforward"] != undefined){
                        this.changeFace("walkingforward");
                    }
                    this.move("y",this.moveInc);
                } else {
                    if(this.faces["stillforward"] != undefined){
                        this.changeFace("stillforward");
                    }
                }
            } else {
                if(this.hitDetect("y",-this.moveInc) == false){
                    if(this.faces["walkingaway"] != undefined){
                        this.changeFace("walkingaway");
                    }
                    this.move("y",-this.moveInc);
                } else {
                    if(this.faces["stillaway"] != undefined){
                        this.changeFace("stillaway");
                    }
                }
            }
        }
    }
    
    walkTo(walkToDir,walkToLoc,walkToEndFunc){
        this.walkToDir = walkToDir;
        this.walkToLoc = walkToLoc;
        this.walkToEndFunc = walkToEndFunc;
        
        if(this.walkToDir == "x"){
            if(this.x < this.walkToLoc - this.moveInc){
                this.move(this.walkToDir,this.moveInc);
                if(this.faces["walking"] != undefined){
                    this.changeFace("walking");
                }
            } else if(this.x > this.walkToLoc + this.moveInc){
                this.move(this.walkToDir,-this.moveInc);
                if(this.faces["walkingleft"] != undefined){
                    this.changeFace("walkingleft");
                }
            } else {
                this.walkToEndFunc();
            }
        }
        
        if(this.walkToDir == "y"){
            if(this.y < this.walkToLoc - this.moveInc){
                this.move(this.walkToDir,this.moveInc);
                if(this.faces["walkingforward"] != undefined){
                  this.changeFace("walkingforward");
                }
            } else if(this.y > this.walkToLoc + this.moveInc){
                this.move(this.walkToDir,-this.moveInc);
                if(this.faces["walkingaway"] != undefined){
                    this.changeFace("walkingaway");
                }
            } else {
                this.walkToEndFunc();
            }
        }
    }
    
    waitUntil(waitUntilTime,waitUntilEndFunc){
        this.waitUntilTime = waitUntilTime;
        this.waitUntilEndFunc = waitUntilEndFunc;
        if(this.wait == undefined){
            this.wait = 0;
        }
        this.wait ++;
        if(this.wait == this.waitUntilTime){
            this.waitUntilEndFunc();
            this.wait = undefined;
        }
    }
    act(act_arr){
        this.act_arr = act_arr;

        if(this.phase == undefined){
            this.phase = 0;
        }

        if(this.phase > 0 && this.phase <= this.act_arr.length){
            this.act_arr[this.phase - 1](); // if it's within index ... act like the first index is 1.... so phase one will trigger index 0 and son on
        }

    }
}