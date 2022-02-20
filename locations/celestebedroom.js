celestebedroom_bed = new Object(
    "celestebedroom_bed",
    {
        "still": "celestebedroom_bed",
        "fullbed": "celestebedroom_fullbed",
        "fullbedsitup": "celestebedroom_fullbedsitup"
    },
    function(){},
    function(){
        if(flagDic["time"] == "night"){
            fadeOut(function(){
                asleep.play();
            });
        } else {
            say("You think maybe going back to sleep isn't the best idea...");
        }
    },
    [[0,40.5],[1,40.5]],
    "select",
    [0,0,70,47]
);

celestebedroom = new Location(
    "celestebedroom",
    [0,166,178,1000],
    [
        [[0,185],[66,144]],
        [[66,144],[108,143]],
        [[108,143],[85,165]],
        [[85,165],[109,165]],
        [[109,165],[110,176]],
        [[110,176],[175,176]],
        [[175,176],[178,166]],
        [[178,166],[221,165]],
        [[221,165],[206,144]],
        [[206,144],[231,144]],
        [[231,144],[295,185]],
        
        // Closes off the room
        [[0,185],[0,stageHeight + 10]], 
        [[295,185],[canvas.width,stageHeight + 10]],

        [[0,stageHeight + 10],[canvas.width,stageHeight + 10]] // so that you can't walk off the bottom of the screen
    ],
    [
        [
            [[80,0],[80,stageHeight]],
            function(){
                if(flagDic["story"] == "DAY 10 texts" && flagDic["DAY 10 KATE"] == true){
                    dialogueDic["DAY 10 TEXTS"].appear();
                    flagDic["story"] = "DAY 10 kate";
                }
            }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        } 
        
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 1"){
                //bed
                celestebedroom_bed.changeFace("fullbed");


                currLoc.activate([
                    [function(){
                        pauseGame();
                    },70], 
                    [function(){
                        celestebedroom_bed.changeFace("fullbedsitup");
                    },50],
                    [function(){
                        say("You wake with a start from your nightmare")
                    },20],
                    [function(){
                        say([
                                [null,"Your name is Celeste. You are seventeen years old."],
                                [null,"After losing a long argument with your mother, your family has resolved to move to Stanton. A new town that you had never even heard of, let alone know anything about."],
                                [null,"Today is your first day of summer school. You're taking World History AP in order to free up your schedule for your upcoming senior year."],
                                [null,"Unfortunately for you, you just woke up way later than you were expecting, and you're officially running late."],
                                [null,"On the first day."],
                                [null,"Let's hope the teacher isn't too strict.",null]
                            ]);
                    },1],
                    [function(){
                        fadeOut(function(){
                            celestebedroom_bed.changeFace("still");
                            gamePause = false;
                            player.changeFace("stillforward");
                            player.relocate(134,118);
                        });
                    },3],
                    [function(){
                        phone.obtained = true;
                        inventory.push(phone);
                        flagDic["DAY 1 phone"] = true;
                        audioDic["celestetheme"].currentTime = 0; 
                        audioDic["celestetheme"].play();
                    }]
                ]);
            } else if(flagDic["story"] == "DAY 6"){
                //bed
                celestebedroom_bed.changeFace("fullbed");


                currLoc.activate([
                    [function(){
                        pauseGame();
                    },10], 
                    [function(){
                        celestebedroom_bed.changeFace("fullbedsitup");
                    },20],
                    [function(){
                        fadeOut(function(){
                            celestebedroom_bed.changeFace("still");
                            player.changeFace("stillforward");
                            player.relocate(134,118);
                        });
                    },5],
                    [function(){
                        gamePause = false;
                        flagDic["story"] = "DAY 6 night";
                        playEvening(1000);
                    },null]
                ]);
            } else if(flagDic["story"] == "DAY 7"){
                //bed
                celestebedroom_bed.changeFace("fullbed");


                currLoc.activate([
                    [function(){
                        pauseGame();
                    },10], 
                    [function(){
                        celestebedroom_bed.changeFace("fullbedsitup");
                    },20],
                    [function(){
                        fadeOut(function(){
                            celestebedroom_bed.changeFace("still");
                            player.changeFace("stillforward");
                            player.relocate(134,118);
                        });
                    },5],
                    [function(){
                        gamePause = false;
                    },null]
                ]);
            } else if(
                flagDic["story"] == "DAY 2" ||
                flagDic["story"] == "DAY 3" ||
                flagDic["story"] == "DAY 4" ||
                flagDic["story"] == "DAY 5" ||
                flagDic["story"] == "DAY 8" ||
                flagDic["story"] == "DAY 9" ||
                flagDic["story"] == "DAY 10" ||
                flagDic["story"] == "DAY 11" ||
                flagDic["story"] == "DAY 12" ||
                flagDic["story"] == "ISOLATION DREAM"
            ){
                //bed
                celestebedroom_bed.changeFace("fullbed");


                currLoc.activate([
                    [function(){
                        pauseGame();
                    },10], 
                    [function(){
                        celestebedroom_bed.changeFace("fullbedsitup");
                    },20],
                    [function(){
                        fadeOut(function(){
                            celestebedroom_bed.changeFace("still");
                            gamePause = false;
                            player.changeFace("stillforward");
                            player.relocate(134,118);
                        });
                    },null]
                ]);
            }

            this.hasEvent = false;
        }
        
    },
    [
        [
            // Door to upstairs
            new Object(
                "celestebedroom_door",
                "celestebedroom_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(celesteupstairs,227,null,null,"stillleft");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),15,70
        ],
        [
            celestebedroom_bed,108,136
        ]
    ],
    "day/night"
);