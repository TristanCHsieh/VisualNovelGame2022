

sectorImgWidth = 590;
sectorImgHeight = 370;
sectorOriginX = 0;
sectorOriginY = 0;
sectorOriginTempX = 0;
sectorOriginTempY = 0;

/* create the sector backgrounds... the idea is that they loop infinitely in all directions.
I did this by having 4 versions of the background. Imagine them on a four coordinate grid. 
As soon as one goes completely out of site, it moves to the opposite end and passes by the player again.
This takes 2 versions of the background for each dimension, and there are 2 dimensions so 2*2 = 4 backgrounds total
*/



sectorBk = [];
sectorBkPosition = [
    [0,0], // original background
    [0,1], // to the right of the original background
    [1,0], // right below the original background
    [1,1] // both to the right and below
];
for(sectorIdx = 0; sectorIdx < 4; sectorIdx ++){
    sectorBk.push(
        new Object(
            "",
            "sector", // you can also just put one graphic or one animation and it should work
            function(){
                //initialize relX and relY
                if(this.relX == undefined){
                    this.relX = this.x - sectorOriginX;
                }
                if(this.relY == undefined){
                    this.relY = this.y - sectorOriginY;
                }
                

                // wrap around... as soon as the player can't see it, it goes to the opposite side so that the player can see it.
                // it tests "out of bounds" with it's absolute x/y value, and it changes it's x/y value relative to the origin
                // accordingly. (since the only real way to move objects in the Magenta sector is by changing relX and relY...
                // otherwise they'd just snap right back)
                if(this.x < -sectorImgWidth){
                    this.relX += 2*sectorImgWidth;
                }

                if(this.x > sectorImgWidth){
                    this.relX -= 2*sectorImgWidth;
                }

                if(this.y < -sectorImgHeight){
                    this.relY += 2*sectorImgHeight;
                }

                if(this.y > sectorImgHeight){
                    this.relY -= 2*sectorImgHeight;
                }

                // Line it up perfectly with the main BK... everything is relative to the main bk
                if(this.sectorBKCoord != [0,0]){ // it is the main background image, no work needs to be done
                    // The background is either directly to the right, directly to the left, or the exact same x
                    // value as the main background. Same can be said about it's y value.
                    if(this.sectorBKCoord[0] == 1){ 
                        if(this.relX < sectorBk[0].relX){
                            this.relX = sectorBk[0].relX - sectorImgWidth;
                        } else {
                            this.relX = sectorBk[0].relX + sectorImgWidth;
                        }
                    } else {
                        this.relX = sectorBk[0].relX;
                    }

                    if(this.sectorBKCoord[1] == 1){
                        if(this.relY < sectorBk[0].relY){
                            this.relY = sectorBk[0].relY - sectorImgHeight;
                        } else {
                            this.relY = sectorBk[0].relY + sectorImgHeight;
                        }
                    } else {
                        this.relY = sectorBk[0].relY;
                    }
                }

                // position the object around the origin, which moves... all sectorese objects need to do this.
                this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);

            },
            function(){},
            [[-1000,-1000],[-1000,-1001]] //priority lines
        )
    );
    sectorBk[sectorIdx].sectorBKCoord = sectorBkPosition[sectorIdx]; // tells you which quadrant this background is in.
}

sector = new Location(
    "sector",
    [-2000], 
    // the real background for this location is a black square, but the player will (hopefully) never see this, because 
    // the sector background objects will always cover it up. The objects have a priority of -1000, and the *real* background
    // has a priority of -2000... therefore the appeared array will always be like [real background, background objects, everything else...]
    [],
    [],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        
        // Lexthar appears happens so often, I made it a built in function
        
        this.lextharAppears = function(dialogueTag){
            currLoc.activate([
                [function(){},10],
                [function(){
                    lexthar.changeFace("appear");
                    lexthar.relX = undefined;
                    lexthar.relY = undefined;
                    lexthar.appear(Math.floor(player.x + 50),player.y);
                },50],
                [function(){
                        dialogueDic[dialogueTag].appear();
                },null]
            ]);
        }

        if(flagDic["story"] == "PROLOGUE explore"){
                // airlock door to the spaceship
                new Object(
                    "sector_smalldoor",
                    "sector_smalldoor",
                    function(){
                        // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                        if(this.relX == undefined){
                            this.relX = this.x - sectorOriginX;
                        }
                        if(this.relY == undefined){
                            this.relY = this.y - sectorOriginY;
                        }
                        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                        // ^^^^^^^^
                    },
                    function(){
                        //enterDoor(firstroom,137,61,bigplayer,"stillforward");
                        say("It would be best if you checked out the debris damage before going back inside. You don't want to get in trouble with mission control.")
                    },
                    [[0,2],[2,2]],
                    "select",
                    [0,0,36,36],
                    null
                ).appear(83,100);

                // spaceship
                new Object(
                    "sector_spaceship",
                    "sector_spaceship",
                    function(){
                        // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                        if(this.relX == undefined){
                            this.relX = this.x - sectorOriginX;
                        }
                        if(this.relY == undefined){
                            this.relY = this.y - sectorOriginY;
                        }
                        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                        // ^^^^^^^^
                    }
                ).appear(-239, -23);

                currLoc.activate([
                    [function(){},150],
                    [function(){
                        new Object(
                            "debris",
                            animationDic["debris"],
                            function(){
                                // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                                if(this.relX == undefined){
                                    this.relX = this.x - sectorOriginX;
                                }
                                if(this.relY == undefined){
                                    this.relY = this.y - sectorOriginY;
                                }
                                this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                                // ^^^^^^^^
                                
                                this.relX += 30;
                                this.relY -= 1;
                            },
                            function(){
                            },
                            [[0,1000],[1000,1000]],
                            "auto",
                            [0,0,10,10]
                        ).appear(-10,20);
                        audioDic["debrissound"].play();
                    },40],
                    [function(){
                        say("You see a piece of debris fly by. Better be careful!");
                    },80],
                    [function(){
                        new Object(
                            "debris",
                            animationDic["debris"],
                            function(){
                                // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                                if(this.relX == undefined){
                                    this.relX = this.x - sectorOriginX;
                                }
                                if(this.relY == undefined){
                                    this.relY = this.y - sectorOriginY;
                                }
                                this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                                // ^^^^^^^^
                                
                                this.relX += 30;
                                this.relY += 1;
                            },
                            function(){
                            },
                            [[0,1000],[1000,1000]],
                            "auto",
                            [0,0,10,10]
                        ).appear(-10,160);
                        audioDic["debrissound"].play();
                    },80],
                    [function(){
                        new Object(
                            "debris",
                            animationDic["debris"],
                            function(){
                                // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                                if(this.relX == undefined){
                                    this.relX = this.x - sectorOriginX;
                                }
                                if(this.relY == undefined){
                                    this.relY = this.y - sectorOriginY;
                                }
                                this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                                // ^^^^^^^^
                                
                                this.relX += 30;
                                this.relY += 1;
                            },
                            function(){
                            },
                            [[0,1000],[1000,1000]],
                            "auto",
                            [0,0,10,10]
                        ).appear(-10,150);
                        audioDic["debrissound"].play();
                    },70],
                    [function(){
                        new Object(
                            "debris",
                            animationDic["debris"],
                            function(){
                                // position the object around the origin, which moves ALL SECTOR OBJECTS MUST HAVE THE FOLLOWING CODE VVVVVV
                                if(this.relX == undefined){
                                    this.relX = this.x - sectorOriginX;
                                }
                                if(this.relY == undefined){
                                    this.relY = this.y - sectorOriginY;
                                }
                                this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
                                // ^^^^^^^^
                                
                                this.relX += 30;
                                this.relY += 1;
                                
                                //makes it fullproof... even if it "misses" the player, it will still trigger the function
                                if(this.x > player.x){
                                    audioDic["debrissound"].pause();
                                    audioDic["sector"].pause();
                                    clearTimeout(sectorLoopTimeout);
                                    audioDic["debriscrash"].play();
                                    knockout.play();
                                }
                            },
                            function(){
                                audioDic["debrissound"].pause();
                                audioDic["sector"].pause();
                                clearTimeout(sectorLoopTimeout);
                                audioDic["debriscrash"].play();
                                knockout.play();
                            },
                            [[0,1000],[1000,1000]],
                            "auto",
                            [0,0,10,10]
                        ).appear(-10,player.y + 10);
                        audioDic["debrissound"].play();
                    },null]
                ]);
        } else if(flagDic["story"] == "DAY 1 class"){
            currLoc.activate([
                [function(){
                    say([
                        [null,"Suddenly you jolt awake."],
                        [null,"It all comes back to you: the ship, the crash, the debris..."],
                        [null,"In a panic you look around quickly and notice your ship is gone."],
                        [null,"Did they forget to take you?!",null]
                    ])
                },200],
                [function(){
                    lexthar.changeFace("appear");
                    lexthar.appear(player.x + 50,player.y);
                },50],
                [function(){
                    dialogueDic["DAY 1 DREAM"].appear();
                },null]
            ]);
        } else if(flagDic["story"] == "DAY 2 class"){
            shinyeggplantobj.appear(300,100);
            
            currLoc.activate([
                [function(){},500],
                [function(){
                    wakeup();
                },null]
            ]);
        } else if(flagDic["story"] == "DAY 3 class"){
            this.lextharAppears("DAY 3 DREAM");
        } else if(flagDic["story"] == "DAY 4 night"){
            this.lextharAppears("DAY 4 DREAM");
        } else if(this.hasEvent == true && flagDic["story"] == "DAY 5 night"){ // grub dream... only happens once
            
            currLoc.activate([
                [function(){},700],
                [function(){
                    wakeup();
                },null]
            ]);
            
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(this.count == undefined){
                        this.count = 0;
                    }
                    if(this.grubPhase == undefined){
                        this.grubPhase = "appear";
                    }
                    
                    this.count ++;
                    if(this.count > 20){
                        if(player.delta < 0 && player.direction == "x" && player.x <= sectorCameraX){ // up and to the left
                            
                            this.normalCurve = function(x){
                                return Math.round(
                                    10 *
                                    (5/2) * 
                                    (1/(Math.PI) ** (1/2)) *
                                    (Math.E ** 
                                        (-1 * (
                                            ((x)-.5)/(.2)
                                        ) ** 2)
                                    )
                                )
                            }
                            
                            if(this.grubPhase == "appear"){
                                grubfront.appear(-494,-20);
                                grubback.appear(-494,-20);
                                this.grubPhase = "moveCamera";
                            }
                            
                        }
                    }
                    
                    // move the grub
                    
                    if(this.grubPhaseLength == undefined){
                        this.grubPhaseLength = 40;
                    }
                    if(this.grubPhase == "moveCamera"){
                        if(this.grubIdx == undefined){
                            this.grubIdx = 0;
                        } else {
                            this.grubIdx ++;
                        }
                        if(this.grubIdx == 20){
                            sectorloop();
                            audioDic["disgusting"].play();
                        }

                        this.delta = this.normalCurve(this.grubIdx/this.grubPhaseLength);
                        sectorOriginTempX += this.delta;
                        sectorOriginX = Math.floor(sectorOriginTempX);
                        player.tempX += this.delta;
                        player.x = Math.floor(player.tempX);

                        if(this.grubIdx == this.grubPhaseLength){
                            this.disappear;
                        }
                    }
                    
                }
            ).appear(0,0);
            this.hasEvent = false;
        } else if(flagDic["story"] == "DAY 7 night"){
            this.lextharAppears("DAY 7 DREAM");
        } else if(flagDic["story"] == "DAY 8 night"){
            this.lextharAppears("DAY 8 DREAM");
        } else if(flagDic["story"] == "DAY 9 dream"){
            this.lextharAppears("DAY 9 DREAM");
        } else if(flagDic["story"] == "DAY 10 night" && flagDic["DAY 10 BET"] == true){
            this.lextharAppears("DAY 10 DREAM");
        } else if(flagDic["story"] == "DAY 11 night 2"){
            this.lextharAppears("DAY 11 DREAM");
        } else if(flagDic["story"] == "ABANDON" || flagDic["story"] == "DAY 12 class"){
            currLoc.activate([
                [function(){},150],
                [function(){
                    dialogueDic["DAY 12 DREAM"].appear();
                },50],
                [function(){
                    dialogueDic["DAY 12 DREAM oxygen"].appear();
                }]
            ]);
        } else {
            flagDic["story"] = "ISOLATION DREAM";
            this.lextharAppears("ISOLATION DREAM");
        }
        
        
    },
    [
        // The backgrounds appear for the first time
        [sectorBk[0],0,0],
        [sectorBk[1],sectorImgWidth,0],
        [sectorBk[2],0,sectorImgWidth],
        [sectorBk[3],sectorImgWidth,sectorImgWidth]
    ]
);

/*
    Lexthar the destroyer object.
*/

lexthar = new Object(
    "lexthar",
    {
        "still": "1lextharappear",
        "appear": new Animation("lextharappear",[5,5],false,function(){
            this.reset(); 
            lexthar.intSquare = [-10,-10,32 + 20,34 + 20]
            lexthar.changeFace("still");
        }),
        "transform": new Animation("lexthartransform",[15,1,1,1,1,1,1,10],false,function(){
            lexthar.changeFace("transformstill"); 
            dialogueDic["DAY10DREAM TRANSFORM"].appear();
            lexthar.intSquare = [-17 - 10, -31 - 10, 69+20, 97+20];
        }),
        "transformstill": "7lexthartransform"
    },
    function(){
        //initialize relX and relY
        if(this.relX == undefined){
            this.relX = this.x - sectorOriginX;
        }
        if(this.relY == undefined){
            this.relY = this.y - sectorOriginY;
        }
        
        
        // either completely to the right, completely to the left, completely on top, or completely on bottom.
        // there will be no "overwriting" so to speak because you when you're in the middle, where both of these labels apply, there's
        // no way you can hit the interact square 
        if(player.x < this.x - 16 + this.intSquare[0]){ 
            this.playerToObject = "left";
        }
        if(player.x > (this.x + this.intSquare[0]) + this.intSquare[2]){
            this.playerToObject = "right";
        }
        if(player.y < this.y - 34 + this.intSquare[1]){
            this.playerToObject = "up";
        }
        if(player.y > (this.y + this.intSquare[1]) + this.intSquare[3]){
            this.playerToObject = "down";
        }
        
        
        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
    },
    function(){

        /*
            This "bounces back" the player. Depending which side of the sqaure the player is hitting from (determined by the player's x and y value)
            before hand, this will ensure that the player is forced to move away from Lexthar and never touch her.
        */
        
        if(this.playerToObject == "left"){ // hitting it from the left
            player.direction = "x"; // send the player back where they came from
            player.accelaration = -player.increment;
            if(player.walking == false){ // also account for if the player is drifting as opposed to actually moving
                player.deltaX = -player.minSpeed;
            }
            
        } else if(this.playerToObject == "right"){
            player.direction = "x";
            player.accelaration = player.increment;
            if(player.walking == false){
                player.deltaX = player.minSpeed;
            }
            
        } else if(this.playerToObject == "up"){
            player.direction = "y";
            player.accelaration = -player.increment;
            if(player.walking == false){
                player.deltaY = -player.minSpeed;
            }
            
        } else if(this.playerToObject == "down"){
            player.direction = "y";
            player.accelaration = player.increment;
            if(player.walking == false){
                player.deltaY = player.minSpeed;
            }
            
        }
        
    },
    [[1000,1000],[1001,1000]],
    "auto",
    [-10,-10,32 + 20,34 + 20]
);

shinyeggplantobj = new Object(
    "shinyeggplantobj",
    "shinyeggplantobj",
    function(){
        //initialize relX and relY
        if(this.relX == undefined){
            this.relX = this.x - sectorOriginX;
        }
        if(this.relY == undefined){
            this.relY = this.y - sectorOriginY;
        }
        
        this.relocate(sectorOriginX + this.relX,sectorOriginY + this.relY);
        
        if(this.seCount == undefined){
            this.seCount = 0;
        }
        this.seCount ++;
        
        if(this.seCount == 4){
            this.relX += 1;
            this.seCount = 0;
        }
    },
    function(){
        obtainItem(shinyeggplant);
        this.disappear();
    },
    [[0,19],[14,19]],
    "auto",
    [0,0,19,14]
);

/*
    Lastly, I'm changing the changeLocation function to make it specific to the Magenta Sector.
    It's straight forward. The state of all the objects in the sector are preserved for when you come back.
*/

function changeLocationSector(){
    // Given a location object and an x and y value
    // chane the location. null x and ys just retain the player's
    // original y

    // Change the location
    start = false; 
    // Play the event function of whatever location you're going to
    blinker.reset(); // Reset the blinker animation

    // Save the x and y values before removing the player... just in case
    player.disappear(); // Take the player off the screen... your "cleaning up after yourself" in order to prevent multiple players appearing on the screen
    // Change the location
    currLoc = sector;
    player = astronaut;
    player.halt(); // Usually when you change players, you don't want them to already be walking. Cased closed.
    // Bring the player back in the appropriate spot
    player.appear(Math.floor(astronaut.tempX),Math.floor(astronaut.tempY)); //astronaut's tempX and tempY store the astronaut's previous positions
    
    if(flagDic["story"] != "DAY 5 night" &&
      flagDic["story"] != "DAY 10 night"
      ){
        sectorloop();
    }
    

}


function sectorloop(){
    //if(currLoc == sector || currLoc == grublower || currLoc == grubhigher){
        audioDic["sector"].currentTime = 0;
        audioDic["sector"].play();
    //}
    //if(currLoc == sector || currLoc == grublower || currLoc == grubhigher){
        sectorLoopTimeout = setTimeout(sectorloop,8108);
    //}

}