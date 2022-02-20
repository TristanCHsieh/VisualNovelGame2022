labdic = [
            [0,0,0,0,2,1,2,1,2,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0],
            [2,1,2,1,2,1,2,1,2,0,2,0,0,0,0,0],
            [0,0,1,0,0,0,0,0,1,0,1,0,0,0,0,0],
            [0,0,2,1,2,0,2,1,2,1,2,1,2,0,0,0],
            [0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0],
            [0,0,2,1,2,1,2,0,2,1,2,1,2,1,2,0],
            [0,0,0,0,1,0,0,0,1,0,0,0,1,0,0,0],
            [0,0,2,1,2,1,2,1,2,0,0,0,2,0,0,0],
            [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        ];
        
testString = "";
labCoords = [0,0]; // Keeps track of where you are in the labyrinth. Structered like Y,X.

for(labY = 0; labY < labdic.length; labY += 2){ // every row
    for(labX = 0; labX < labdic[labY].length; labX += 2){ // every element
        if(labdic[labY][labX] == 2){ // If it's a room
            testString += "#"
            
            // Create the room
            if(labY == 2 && labX == 0){
                labdic[labY][labX] = donutshop;
                
            } else if(labY == 0 && labX == 8){
                labdic[labY][labX] = bedroomtrap;
                
            } else if(labY == 6 && labX == 10){
                labdic[labY][labX] = secretroom;
                   
            } else if(labY == 4 && labX == 6){
                labdic[labY][labX] = anxietyroom;
                   
            } else {
                // create the room itself and store it in the dictionary
                labdic[labY][labX] = new Location(
                    "labyrinth",
                    [0,1000],
                    [
                        [[0,178],[66,136]],
                        [[66,136],[231,136]],
                        [[231,136],[295,178]],

                        [[0,178],[0,192]],
                        [[295,178],[295,192]],
                        [[0,192],[295,192]]
                    ],
                    [],
                    function(){
                        if(this.firstTime == false){
                            this.firstTime = true;
                        }
                        
                        labCoords = this.labCoords; // Basically makes the variable inside variable inside the Location object accessable outside the object. For example if your in a function.
                    },
                    [],
                    "night"
                );
                
                // Add the doors based on if they need to be there or not
                //labdic[labY][labX].inherantObjects = []; //This will store all the objects in the specific room... mainly doors
                if(labY != 0 && labdic[labY - 1][labX] == 1){ // Up exists
                    if(labY == 4 && labX == 10){ // If the room north of you is kate's heart, play kates heart
                        labdic[labY][labX].inherantObjects.push([
                            new Object(
                                "labyrinth_forwarddoor",
                                "labyrinth_forwarddoor",
                                function(){
                                    if(this.willBeep == undefined){
                                        this.willBeep = false;
                                    }
                                },
                                function(){
                                    // behanvior when the player interacts with the object
                                    
                                    if(flagDic["story"] == "LABYRINTH"){
                                        audioDic["dooropen"].currentTime = 0;
                                        audioDic["dooropen"].play();

                                        fadeOut(function(){
                                            increaseScore(30);
                                            
                                            player.halt();
                                            player.changeFace("stillaway");
                                            
                                            //clean up any secondary players any secondary players
                                            if(lexi.playerFollow == true && currLoc.appeared.includes(lexi)){
                                                lexi.disappear();
                                            } else if(lexibig.playerFollow == true && currLoc.appeared.includes(lexibig)){
                                                lexibig.disappear();
                                            }

                                            if(violet.playerFollow == true && currLoc.appeared.includes(violet)){
                                                violet.disappear();
                                            } else if(violetbig.playerFollow == true && currLoc.appeared.includes(violetbig)){
                                                violetbig.disappear();
                                            }
                                            katesheart.play();
                                        });
                                    } else {
                                        say("This is the room where Kate's heart was. No way you're going back in there.");
                                    }
                                    
                                },
                                [[0,0],[1,0]], // priority lines of the object
                                "select",
                                [0,67,37,7], // rectangle of interaction
                                [15,-10]
                            ),130,70
                        ]);

                    } else {
                        labdic[labY][labX].inherantObjects.push([
                            new Object(
                                "labyrinth_forwarddoor",
                                "labyrinth_forwarddoor",
                                function(){
                                    if(this.willBeep == undefined){
                                        this.willBeep = false;
                                    }
                                },
                                function(){
                                    // behanvior when the player interacts with the object
                                    enterDoor(labdic[labCoords[0] - 2][labCoords[1]],139,106,null,"stillaway");
                                },
                                [[0,0],[1,0]], // priority lines of the object
                                "select",
                                [0,67,37,7], // rectangle of interaction
                                [15,-10] //blinker
                            ),130,70
                        ]);
                    }
                }

                if(labY != labdic.length - 1 && labdic[labY + 1][labX]){ // Down exists
                    labdic[labY][labX].graphArr[1] = ["2labyrinth",1000];

                    labdic[labY][labX].inherantObjects.push([
                        new Object(
                            "labyrinth_awaydoor",
                            "blinkerinv",
                            function(){
                                if(this.willBeep == undefined){
                                    this.willBeep = false;
                                }
                            },
                            function(){
                                // behanvior when the player interacts with the object
                                enterDoor(labdic[labCoords[0] + 2][labCoords[1]],139,75,null,"stillforward");
                            },
                            [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                            "select",
                            [0,0,65,22], // rectangle of interaction
                            [29,-70] //blinker
                        ),116,178
                    ]);
                }

                if(labX != 0 && labdic[labY][labX - 1] == 1){ // Left exists
                    labdic[labY][labX].inherantObjects.push([
                        new Object(
                            "labyrinth_leftdoor",
                            "labyrinth_leftdoor",
                            function(){
                                if(this.willBeep == undefined){
                                    this.willBeep = false;
                                }
                            },
                            function(){
                                // behanvior when the player interacts with the object
                                enterDoor(labdic[labCoords[0]][labCoords[1] - 2],227,87,null,"stillleft");
                            },
                            [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                            "select",
                            [0,107 - 22,36,22], // rectangle of interaction
                            [15,-10] //blinker
                        ),15,62
                    ]);

                }

                if(labX != labdic[labY].length - 1 && labdic[labY][labX + 1] == 1){ // Right exists
                    labdic[labY][labX].inherantObjects.push([
                        new Object(
                            "labyrinth_rightdoor",
                            "labyrinth_rightdoor",
                            function(){
                                if(this.willBeep == undefined){
                                    this.willBeep = false;
                                }
                            },
                            function(){
                                // behanvior when the player interacts with the object
                                enterDoor(labdic[labCoords[0]][labCoords[1] + 2],50,87,null,"still");
                            },
                            [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                            "select",
                            [0,107 - 22,36,22], // rectangle of interaction
                            [15,-10] //blinker
                        ),245,62
                    ]);
                }
            }   

            labdic[labY][labX].labCoords = [labY,labX]; // Store the coordinates within the class.
            labdic[labY][labX].isInLabyrinth = true; // This will indicate if a location is in a labyrinth... which makes it easier to refer to the locations inside the labytinynth as something other than labdic[0][0] or whatever
        } else {
            testString += "."
        }
    }
    testString += "\n";
}

// Store the starting room so that you can reference it more easily 
labyrinth = labdic[8][4];

labyrinthLives = [lexibig,violetbig,bigplayer];
labyrinthLivesIdx = 0;


//Uncomment to see the map of the labyrinth
//console.log(testString)