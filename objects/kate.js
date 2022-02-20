kate = new Object(
    "kate",
    this.faces = {
        "still": "kateright",
        "walking": animationDic["kate/right"],
        "stillleft": "kateleft",
        "walkingleft": animationDic["kate/left"],
        "stillaway": "kateaway",
        "walkingaway": animationDic["kate/away"],
        "stillforward": "kateforward",
        "walkingforward": animationDic["kate/forward"]
    },
    function(){
        if(flagDic["story"] == "DAY 3"){
            this.act(
                [
                    function(){
                        kate.walkTo("y",116,function(){kate.phase ++;});
                    },
                    function(){
                        kate.walkTo("x",62,function(){kate.phase ++;});
                    },
                    function(){
                        kate.relocate(1000,1000);
                        katesitting.appear(57,125);
                        kate.phase ++;
                    },
                    function(){
                        kate.waitUntil(10,function(){
                            dialogueDic["DAY3CLASS VIOLET"].appear(); 
                            kate.phase = 0;
                        });
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 9 dream"){
            this.act(
                [
                    function(){
                        kate.waitUntil(30,function(){
                            dialogueDic["DAY9DREAM kate"].appear(); 
                            kate.phase = 0;
                        });
                    }
                ]
            );
            
        } else if(flagDic["story"] == "DAY 10"){
            this.act(
                [
                    function(){
                        kate.relocate(70,110);
                        katesitting.disappear();
                        kate.phase ++;
                    },
                    function(){
                        kate.walkTo("x",162,function(){kate.phase ++;});
                    },
                    function(){
                        katesitting.appear(157,129);
                        kate.relocate(1000,1000);
                        kate.waitUntil(10,function(){kate.phase ++;});
                    },
                    function(){
                        kate.phase = 0;
                        
                        kate.disappear();
                        dialogueDic["DAY10CLASS 2"].appear();
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 10 kate"){
            this.act(
                [
                    function(){
                        kate.selectType = "none";
                        kate.phase ++;
                    },
                    function(){
                        kate.walkTo("x",-30,function(){ flagDic["story"] = "DAY 10 night"; kate.phase = 0; });
                    }
                ]
            );
        } else if(flagDic["story"] == "LABYRINTH"){
            this.act(
                [
                    function(){
                        kate.waitUntil(10,function(){kate.phase ++;});
                    },
                    function(){
                        ashida_door.changeFace("appear");
                        ashida_door.appear(120,94);
                        kate.phase ++;
                    },
                    function(){
                        kate.waitUntil(10,function(){kate.phase ++; dialogueDic["ASHIDA door"].appear();});
                    },
                    function(){},
                    function(){
                        
                        // Move Player
                        new Object(
                            "","blinkerinv",
                            function(){
                                if(this.stage == undefined){
                                    this.stage = "y";
                                } else if(this.stage == "y"){ // Go to correct y
                                    if(player.y < 120){
                                        player.changeFace("walkingforward");
                                        player.move("y",player.moveInc);
                                    } else if(player.y > 120){
                                        player.changeFace("walkingaway");
                                        player.move("y",-player.moveInc);
                                    }
                                    if(player.y == 120 || player.y == 121){
                                        this.stage = "x";
                                    }
                                } else if(this.stage == "x"){ // Go to correct x 
                                    if(player.x < 100){
                                        player.changeFace("walking");
                                        player.move("x",player.moveInc);
                                    } else if(player.x > 100){
                                        player.changeFace("walkingleft");
                                        player.move("x",-player.moveInc);
                                    }
                                    if(player.x == 100 || player.x == 101){ 
                                        player.halt();
                                        player.changeFace("still");

                                        this.disappear();
                                    }
                                }
                            }
                        ).appear(0,0); 
                        
                        
                        // if applicable, move lexi and/or violet
                        if(
                            flagDic["DAY 11 HELPERS"] == "both confirm" ||
                            flagDic["DAY 11 HELPERS"] == "lexi" 
                          ){
                            lexi.appear(100-20,190);
                            lexi.phase ++;    
                        }
                        if(
                            flagDic["DAY 11 HELPERS"] == "both confirm" ||
                            flagDic["DAY 11 HELPERS"] == "violet confirm" 
                        ){
                            violet.appear(-10,100);
                            violet.phase ++;
                        }
                        
                        
                        
                        kate.phase ++;
                        
                    },
                    function(){
                        kate.walkTo("x",182,function(){kate.phase ++;});
                    },
                    function(){
                        kate.walkTo("y",120,function(){
                            kate.changeFace("stillleft");
                            kate.phase ++;
                        })
                    },
                    function(){
                        kate.waitUntil(20,function(){
                            if(
                                flagDic["DAY 11 HELPERS"] == "both confirm" ||
                                flagDic["DAY 11 HELPERS"] == "violet confirm" ||
                                flagDic["DAY 11 HELPERS"] == "lexi" 
                            ){
                                dialogueDic["ASHIDA 3"].appear();
                            } else {   
                                dialogueDic["ASHIDA lonely"].appear();
                            }
                            
                        })
                    },
                    function(){
                        kate.selectType = "none";
                        gamePause = false;
                        kate.phase ++;
                    },
                    function(){
                        kate.walkTo("x",300,function(){kate.phase = 0; gamePause = false;});
                    }
                ]
            );
        }
    },
    function(){
        if(flagDic["story"] == "DAY 10 kate"){
            dialogueDic["DAY 10 KATE"].appear();
        } else if(flagDic["story"] == "DAY 11 night"){
            dialogueDic["ASHIDA"].appear();
            pauseGame();
            flagDic["story"] = "LABYRINTH";
        } else {
            say([
                ["kateav","Hey...",null]
            ]);
        }
    },
    [[0,59],[14,59]],
    "select",
    [-4,59-4,14 + (4*2),(4*2)],
    [3,-7],
    [
        [[0,59],[14,60]]
    ],
    2
);


katebig = new Object(
    "katebig",
    this.faces = {
        "still": "katebigright",
        "walking": animationDic["katebig/right"],
        "stillleft": "katebigleft",
        "walkingleft": animationDic["katebig/left"],
        "stillaway": "katebigaway",
        "walkingaway": animationDic["katebig/away"],
        "stillforward": "katebigforward",
        "walkingforward": animationDic["katebig/forward"]
    },
    function(){
        if(flagDic["story"] == "DAY 7 kate" || flagDic["story"] == "DAY 7 night"){
            this.act(
                [
                    function(){
                        katebig.relocate(242,95);
                        katebig.phase ++; 
                        player.changeFace("stillleft");
                    },
                    function(){
                        katebig.walkTo("x",202, function(){katebig.phase ++; katebig.changeFace("still");});
                    },
                    function(){
                        katebig.waitUntil(10,function(){katebig.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY7BENADRYL TREE choices"].appear();
                        katebig.phase ++;
                    },
                    function(){
                    },
                    function(){
                        katebig.walkTo("x",242,function(){katebig.phase ++;});
                    },
                    function(){
                        katebig.disappear();
                        katebig.phase = 0;
                        
                        celestedownstairs_door.changeFace("still");
                        
                        gamePause = false;
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 10 lexi"){
            this.act(
                [
                    function(){
                        katebig.walkTo("x",219, function(){katebig.changeFace("stillleft"); katebig.phase ++;});
                    },
                    function(){
                        katebig.waitUntil(20,function(){katebig.phase = 0; dialogueDic["DAY 10 LEXI 2"].appear();});
                    }
                ]
            )
        }
    },
    function(){
        if(flagDic["story"] == "DAY 10 texts" && flagDic["DAY 10 POISON"] == "lexi"){
            if(flagDic["DAY10LEXI 911 run"] == true){
                say("The police should be here any minute now...");
            } else {
                say("Hopefully this doesn't come back to bite us in the butt...");
            }
        }
    },
    [[0,74],[16,74]],
    "select",
    [-4,74-4,18 + (4*2),(4*2)],
    [3,-7],
    [
        [[0,74],[18,74]]
    ],
    3
);



