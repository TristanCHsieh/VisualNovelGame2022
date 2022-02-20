lexi = new Object(
    "lexi",
    this.faces = {
        "still": "lexiright",
        "walking": animationDic["lexi/right"],
        "stillleft": "lexileft",
        "walkingleft": animationDic["lexi/left"],
        "stillaway": "lexiaway",
        "walkingaway": animationDic["lexi/away"],
        "stillforward": "lexiforward",
        "walkingforward": animationDic["lexi/forward"]
    },
    function(){ 
        
        followPlayer(this,20,20); //if the object is set to follow the player, follow the player
        
        if(this.playerFollow != true){ // otherwise act on preset commands
            if(flagDic["story"] == "DAY 2"){
                this.act(
                    [
                        function(){
                            lexi.walkTo("x",185,function(){lexi.phase ++;});
                        },
                        function(){
                            dialogueDic["DAY 2 CLASS 2"].appear();
                            lexi.phase ++;
                        },
                        function(){

                        },
                        function(){
                            lexi.walkTo("x",158,function(){lexi.phase ++;});
                        },
                        function(){
                            dialogueDic["DAY 2 CLASS 3"].appear();
                            lexi.changeFace("stillforward");
                            lexi.phase ++;
                        },
                        function(){

                        },
                        function(){
                            lexi.walkTo("y", 104, function(){lexi.phase ++;});
                        },
                        function(){
                            lexi.walkTo("x", 226, function(){lexi.phase ++;});
                        },
                        function(){
                            lexi.walkTo("y", 118, function(){lexi.phase ++;});
                        },
                        function(){
                            lexi.walkTo("x", 250, function(){lexi.phase ++;});
                        },
                        function(){
                            lexi.walkTo("y", 128, function(){lexi.phase ++;});
                        },
                        function(){
                            lexi.relocate(1000,1000);
                            lexisitting.appear(233,146);
                            lexi.phase ++;
                        },
                        function(){
                            lexi.waitUntil(10,function(){lexi.phase ++;});
                        },
                        function(){
                            dialogueDic["DAY 2 CLASS 4"].appear();
                            lexi.phase = 0;
                        }
                    ]
                );
            } else if(flagDic["story"] == "DAY 11 lexi"){
                this.act([
                    function(){
                        lexi.walkTo("y",player.y,function(){lexi.phase ++;});
                    },
                    function(){
                        lexi.walkTo("x",player.x - 15,function(){lexi.phase ++; lexi.changeFace("still"); dialogueDic["DAY 11 LEXI 2"].appear();});
                    },
                    function(){
                        lexi.waitUntil(10,function(){
                            lexi.changeFace("stillforward"); 
                            flagDic["story"] = "DAY 11 night"; 
                            lexi.phase = 0;
                        });
                    }
                ]);
            } else if(flagDic["story"] == "LABYRINTH"){
                this.act([
                    function(){
                        lexi.walkTo("y",140,function(){lexi.phase ++;});
                    },
                    function(){
                        lexi.changeFace("still");
                        lexi.phase = 0;
                    }
                ]);
            } else if(flagDic["story"] == "DAY 12 class" || flagDic["story"] == "ABANDON"){
                this.act([
                    function(){
                        lexi.walkTo("y",player.y,function(){lexi.phase ++;});
                    },
                    function(){
                        lexi.walkTo("x",player.x - 15,function(){ 
                            lexi.changeFace("still");
                            dialogueDic["DAY 12 LEXI 2"].appear();
                        });
                    },
                    function(){
                        gamePause = false;
                        lexi.phase ++;
                    },
                    function(){
                        lexi.walkTo("y",120,function(){lexi.phase ++;});
                    },
                    function(){
                        lexi.walkTo("x",-30,function(){
                            lexi.phase = 0;
                        });
                    }
                ]);
            }
        }
        
         
        
    },
    function(){
        if(flagDic["story"] == "DAY 2"){
            say([
                ["lexiav","...hi?"],
                ["mrfaceav","Celeste, please sit down.",null]
            ]);
        } else if(flagDic["story"] == "DAY 11 night"){
            say("Good luck!");
        }
    },
    [[0,55],[14,55]],
    "select",
    [0,56,12,5],
    [4,-9],
    [
       [[0,55],[14,55]] 
    ],
    2
);



lexibig = new Object(
    "lexibig",
    this.faces = {
        "still": "lexibigright",
        "walking": animationDic["lexibig/right"],
        "stillleft": "lexibigleft",
        "walkingleft": animationDic["lexibig/left"],
        "stillaway": "lexibigaway",
        "walkingaway": animationDic["lexibig/away"],
        "stillforward": "lexibigforward",
        "walkingforward": animationDic["lexibig/forward"],
        "die": new Animation(
            "lexidie",
            [5,5],
            false,
            function(){
                lexibig.intSquare = [-24,72-5,64,10];
                lexibig.blinkLoc = [-2,72-13];
                lexibig.noCross = [];
                lexibig.updateLine();
                lexibig.selectType = "select";
                lexibig.hasDied = true;
            }
        )
    },
    function(){
        
        followPlayer(this,30,30);
        
        if(this.playerFollow != true){
            if(flagDic["story"] == "DAY 11 night"){
                this.act([
                    function(){
                        lexibig.walkTo("x",25,function(){lexibig.phase ++;});
                    },
                    function(){
                        lexibig.walkTo("y",106 + 2,function(){lexibig.changeFace("still"); lexibig.phase ++;});
                    },
                    function(){},
                    function(){
                        lexibig.walkTo("y",300,function(){
                            lexibig.phase = 0; 
                            lexibig.disappear();
                        })
                    }
                ]);
            }
        }
    },
    function(){
        if(flagDic["story"] == "DAY 10 lexi"){
            dialogueDic["DAY 10 LEXI"].appear();
        } else if(flagDic["story"] == "DAY 10 texts" || flagDic["story"] == "DAY 10 night"){
            say("Thanks for studying with me...");
        } else if(this.hasDied == true){
            if(flagDic["story"] == "DAY 11 night"){
                say("You peer over Lexi's corpse. Violet's pet has punctured her abdomen causing her to bleed out.");
            } else {
                say("You peer over Lexi's corpse. She still looks afraid from the creature who killed her. You can only really stand to look for a few seconds before feeling sick to the stomach.");
            }
            
        }
    },
    [[0,72],[18,72]],
    "select",
    [0,72,16,5],
    [4,-9],
    [
       [[0,72],[18,72]] 
    ],
    3
);

