firstroom = new Location(
    "firstroom",
    [0],
    [ // barriers
        [[100,130],[74,156]],
        [[74,156],[220,156]],
        [[220,156],[192,130]],
        [[192,130],[100,130]]
    ],
    [ // event lines
        /*[
            [[x1,y2],[x2,y2]],
            function(){
                //what happens when you cross the line
            }
        ]*/
    ],
    function(){
        //what happens when you enter the screen.
        if(this.firstTime == false){
            this.firstTime = true;
        }
        
        //Events in the room
        if(this.hasEvent == true && flagDic["story"] == "INSTRUCTIONS" || flagDic["story"] == "PROLOGUE"){

            currLoc.activate([
                [function(){},400],
                [function(){
                    //Play the crash sound
                    pauseGame();
                    audioDic["firstroomcrash"].play();
                    headerH += 3;
                },1],
                [function(){headerH -= 6;},1],
                [function(){headerH += 6;},1],
                [function(){headerH -= 6;},1],
                [function(){headerH += 4;},1],
                [function(){headerH -= 1;},25],
                [function(){
                    say("You feel something shake the room. Based on prior experience, it's probably debris of some kind."); 
                    gamePause = false;
                },300],
                [function(){
                    currLoc.appeared[2].changeFace("on");
                    say([
                        [null,"Suddenly the screen to your right lights up. It looks like another task from mission control."],
                        ["missioncontrolav","This is mission control, come in Celeste. We have reports of damage on the ship due to debris. Could you go and check it out? Thank you.",function(){
                            currLoc.appeared[2].changeFace("still");
                            flagDic["story"] = "PROLOGUE exit";
                        }]
                    ]);
                },null]
            ]);
            
            this.hasEvent = false;
        }
            
    },
    [
        [
            // Airlock door
            new Object(
                "firstroom_door",
                "firstroom_door",
                function(){
                    if(flagDic["story"] == "PROLOGUE exit" && this.willBeep == undefined){ 
                        // turn will beep off as soon as you can exit the airlock door
                        this.willBeep = false;
                    }
                },
                function(){
                    if(flagDic["story"] == "PROLOGUE"){
                        say("The door to the airlock. Unfortunately you've had to do more space walks than would be ideal. They're usually more of a hassle than anything.");
                    } else if(flagDic["story"] == "PROLOGUE exit"){
                        increaseScore(4);
                        fadeOut(function(){
                            new Cutscene(
                                "",
                                [
                                    ["0blank","You put on your suit and head into the airlock to prepare for a space walk."]
                                ],
                                function(){
                                    changeLocationSector();
                                }
                            ).play();
                        });

                        flagDic["story"] = "PROLOGUE explore"
                    } else {
                        fadeOut(function(){
                            changeLocationSector();
                        });
                    }

                },
                [[0,1],[1,1]],
                "select",
                [5,null,45,10],
                null
            ),114,60
        ],
        [
            // Computer where mission control contacts you.
            new Object(
                "firstroom_rightcomputer",
                {
                    "still": "firstroom_rightcomputer",
                    "on": "firstroom_rightcomputer_on"
                },
                function(){},
                function(){
                    say("This is the main computer... most of your communication with mission control happens here.");
                },
                [[0,2],[2,2]],
                "select",
                [null,null,100,50],
                [18,48],
                [
                    [[180-179,130-31],[191-179,145-31]],
                    [[191-179,145-31],[214-179,145-31]]
                ]
            ),179,31
        ],
        [
            new Object(
                "firstroom_bed",
                "firstroom_bed",
                function(){},
                function(){},
                [[0,1000],[1,1000]],
                "null",
                [null,null,100,100]
            ),97,144
        ],
        /*[
            new Object(
                "firstroom_bed_dialogue",
                "blinkerinv",
                function(){},
                function(){
                    say("This is where you sleep. It's the bare minimum, but it's usable.");
                },
                [[0,1],[1,1]],
                "select",
                [3,2,93 - 3,12 - 2],
                [40,-8]
            ),101,142
        ],*/
        [
            new Object(
            "firstroom_leftcomputer_dialogue",
            "blinkerinv",
            function(){},
            function(){
                say([
                    [null,"A couple of moniters that show the stats of the ship."],
                    [null,"Estimated time until arrival on Neptune: Around 12 days"],
                    ["firstroomav","Ugh... these are going to be the longest 12 days of my life.",null]
                ]);
            },
            [[0,1],[1,1]],
            "select",
            [0,0,26,23],
            [10,-87]
            ),75,131
        ]
    ]
)
