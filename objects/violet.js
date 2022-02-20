violet = new Object(
    "violet",
    {
        "still": "violetright",
        "walking": animationDic["violet/right"],
        "stillleft": "violetleft",
        "walkingleft": animationDic["violet/left"],
        "stillaway": "violetaway",
        "walkingaway": animationDic["violet/away"],
        "stillforward": "violetforward",
        "walkingforward": animationDic["violet/forward"],
        "violetsitdown": new Animation("violetsitdown",[10],false,function(){violet.phase ++; violet.changeFace("still");}),
    },
    function(){
        
        followPlayer(this,20,20); //if the object is set to follow the player, follow the player
        
        if(this.playerFollow != true){ // otherwise act on preset commands
            if(flagDic["story"] == "DAY 3"){
                this.act(
                    [
                        function(){
                            violet.relocate(200,90);
                            violet.phase ++;
                        },
                        function(){
                            violet.walkTo("y",100,function(){violet.phase++;});
                        },
                        function(){
                            dialogueDic["DAY3CLASS COMPLIMENT outro 2"].appear();
                            violet.phase ++;
                        },
                        function(){},
                        function(){
                            violet.walkTo("y",118,function(){violet.phase ++;});
                        },
                        function(){
                            violet.walkTo("x",150,function(){violet.phase ++;});
                        },
                        function(){
                            violet.changeFace("violetsitdown");
                        },
                        function(){
                            violet.disappear();
                            violetsitting.appear(154,129);
                            violet.phase = 0;
                        }
                    ]
                );

            } else if(flagDic["story"] == "DAY 4 violet" && 
                    flagDic["DAY4CLASS BIRTHDAY come"] != true &&
                    flagDic["DAY4CLASS BIRTHDAY come"] != false
                      ){
                this.act(
                    [
                        function(){
                            pauseGame();
                            violet.phase ++;
                        },
                        function(){
                            violet.walkTo("y",player.y,function(){violet.phase ++});
                        },
                        function(){
                            violet.changeFace("still");
                            dialogueDic["DAY 4 VIOLET"].appear();
                            violet.phase = 0;
                        }
                    ]
                );

            } else if(flagDic["story"] == "DAY 4 violet" || flagDic["story"] == "DAY 4 night"){
                this.act(
                    [
                        function(){
                            //move down and to the right
                            violet.selectType = "none"; //not selectable while moving
                            violet.walkTo("y",129,function(){violet.phase ++});
                        },
                        function(){
                            violet.walkTo("x",138,function(){
                                violet.disappear();
                                violet.phase = 0;

                                violetbig.appear(124,100,jamies);
                                violetbig.changeFace("still");
                                violetbig.selectType = "none";
                                violetbig.phase ++;
                            });
                        }
                    ]
                );
            } else if(flagDic["story"] == "DAY 8"){
                this.act(
                    [
                        function(){
                            violet.changeFace("stillforward");
                            violet.relocate(200,90);
                            violet.phase ++;
                        },
                        function(){
                            violet.walkTo("y",110,function(){violet.phase ++});
                        },
                        function(){
                            violet.walkTo("x",254,function(){violet.phase ++});
                        },
                        function(){
                            violet.walkTo("y",128,function(){mrface.phase ++; violet.phase ++});
                        },
                        function(){
                            violet.walkTo("x",276,function(){violet.phase ++});
                        },
                        function(){
                            violet.walkTo("y",150,function(){violet.phase ++});
                        },
                        function(){
                            violet.disappear();
                            violetsitting.appear(240,170);
                            violet.phase = 0;
                        }
                    ]
                )
            } else if(flagDic["story"] == "DAY 9 hangout"){
                this.act(
                    [
                        function(){
                            violet.walkTo("x",160,function(){violet.changeFace("stillforward"); violet.phase ++;});
                        },
                        function(){
                            violet.waitUntil(10,function(){violet.phase ++;});
                        },
                        function(){
                            dialogueDic["DAY9VIOLET bathroom"].appear();
                            violet.phase = 0;
                        }
                    ]
                );
            } else if(flagDic["story"] == "LABYRINTH"){
                this.act([
                    function(){
                        violet.walkTo("x",100-20,function(){violet.phase ++;});
                    },
                    function(){
                        violet.changeFace("still");
                        violet.phase = 0;
                    }
                ]);
            }
        }
        
        
    },
    function(){
        if(flagDic["story"] == "DAY 4 violet"){
            if(currLoc.name == "jamiesinterior"){
                if(this.phase == 0){
                    dialogueDic["DAY 4 BAKERY"].appear();
                }
            } else if(flagDic["DAY4CLASS BIRTHDAY come"] == undefined){
                dialogueDic["DAY 4 VIOLET"].appear();
            } else if(flagDic["DAY4CLASS BIRTHDAY come"] == true){
                say([
                    ["violetav","See you there...",null]
                ]);
            } else if(flagDic["DAY4CLASS BIRTHDAY come"] == false){
                say([
                    ["violetav","See you tomorrow I guess...",null]
                ]);
            }
        } else if(flagDic["story"] == "DAY 4 night" && currLoc.name == "violetbedroom"){
            say([["violetav","Thanks for coming over!",null]]);
        } else if(flagDic["story"] == "DAY 9 night"){
            say([["violetav","Thanks for coming over...",null]]);
        }
    },
    [[0,59],[14,59]],
    "select",
    [-4,59-4,14 + (4*2),(4*2)],
    [3,-7],
    [
        [[0,58.5],[14,59.5]]
    ],
    2
);

violetbig = new Object(
    "violetbig",
    {
        "still": "violetbigright",
        "walking": animationDic["violetbig/right"],
        "stillleft": "violetbigleft",
        "walkingleft": animationDic["violetbig/left"],
        "stillaway": "violetbigaway",
        "walkingaway": animationDic["violetbig/away"],
        "stillforward": "violetbigforward",
        "walkingforward": animationDic["violetbig/forward"],
        "violetkilllexi": new Animation("violetkilllexi",[10,10],false,function(){dialogueDic["DAY11CONFLICT MURDER"].appear(); violet.changeFace("still");}),
        "die": new Animation(
            "violetdie",
            [5,5],
            false,
            function(){
                violetbig.intSquare = [-24,72-5,64,10];
                violetbig.blinkLoc = [-2,72-13];
                violetbig.noCross = [];
                violetbig.updateLine();
                violetbig.selectType = "select";
                violetbig.hasDied = true;
            }
        )
    },
    function(){
        
        followPlayer(this,30,30);
        
        if(this.playerFollow != true){
            if(flagDic["story"] == "DAY 4 violet" || flagDic["story"] == "DAY 4 night"){
                this.act(
                    [
                        function(){
                            //keep moving right
                            violetbig.walkTo("x",295,function(){
                                violetbig.phase ++;
                                violetbig.disappear();
                                violetbig.appear(40,100,forest);
                            });
                        },
                        function(){
                            //keep moving right until you get to the house
                            violetbig.walkTo("x",295,function(){
                                violetbig.phase ++;
                                violetbig.disappear();
                                violetbig.appear(40,100,fountain);
                            });
                        },
                        function(){
                            violetbig.walkTo("x",113,function(){violetbig.phase ++});
                        },
                        function(){
                            violetbig.walkTo("y",61,function(){violetbig.phase ++});
                        },
                        function(){
                            violetbig.walkTo("x",248,function(){violetbig.phase ++});
                        },
                        function(){
                            violetbig.walkTo("y",53,function(){
                                violetbig.phase ++;
                                violetbig.disappear();
                                violetmini.appear(165,87,violetdownstairs);
                                violetmini.changeFace("stillforward");
                                violetmini.phase = 1;
                            });
                            flagDic["DAY 4 VIOLET DOOR unlocked"] = true;
                        },
                        function(){
                            violetbig.walkTo("x",158,function(){violetbig.phase ++});
                        }, 
                        function(){
                            violetbig.changeFace("stillforward");
                            violetbig.phase ++;
                        },
                        function(){
                            violetbig.waitUntil(20,function(){dialogueDic["DAY4BAKERY CONVERSATION"].appear();});
                        }, 
                        function(){
                            violetbig.selectType = "select";
                            violetbig.phase = 0;
                        }
                    ]
                );
            } else if(flagDic["story"] == "DAY 9 hangout"){
                this.act([
                    function(){
                        violetbig.walkTo("x",140,function(){violetbig.changeFace("stillforward"); violetbig.phase ++;});
                    },
                    function(){
                        violetbig.waitUntil(10,function(){violetbig.phase ++;})
                    },
                    function(){
                        dialogueDic["DAY9VIOLET poster"].appear();
                    },
                    function(){
                        violetbig.walkTo("x",74,function(){violetbig.phase ++;});
                    },
                    function(){
                        violetbig.walkTo("y",123,function(){
                            violetbig.phase = 0;
                            violetbig.disappear();
                            violetbedroom_bottomdoor.unLocked = true;

                            violet.appear(144,68,violetbathroom);
                            violet.selectType = "none";
                            violet.phase ++;
                        });
                    }
                ]);
            } else if(flagDic["story"] == "DAY 11 night"){
                this.act([
                    function(){
                        violetbig.waitUntil(20,function(){violetbig.changeFace("stillleft");  violetbig.phase ++;});
                    },
                    function(){
                        violetbig.waitUntil(40,function(){violetbig.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY 11 CONFLICT"].appear();
                        violetbig.phase ++ ;
                    },
                    function(){},
                    function(){
                        violetbig.walkTo("x",45,function(){violetbig.phase ++;});
                    },
                    function(){
                        violetbig.changeFace("violetkilllexi");
                        stopFollowingPlayer("lexi"); 
                        lexibig.disappear();
                        violetbig.phase = 0;
                    }
                ])
            }
        }
    },
    function(){
        if(flagDic["story"] == "DAY 4 night" && currLoc.name == "violetbedroom"){
            say([["violetav","Thanks for coming over!",null]]);
        } else if(flagDic["story"] == "DAY 11 night") {
            if(lexibig.hasDied == true){
                say([["violetav","...",null]]);    
            } else {
                say([["violetav","See you on saturday... I guess...",null]]);    
            }
            
        } else if(this.hasDied == true){
            say("Violet's dead. You're on your own now.");
        }
    },
    [[0,76],[18,76]],
    "select",
    [-4, 76-4, 18 + (4*2), (4*2)],
    [3,-7],
    [
        [[0,76],[18,77]]
    ],
    3
);


violetmini = new Object(
    "violetmini",
    {
        "still": "minivioletright",
        "walking": animationDic["miniviolet/right"],
        "stillleft": "minivioletleft",
        "walkingleft": animationDic["miniviolet/left"],
        "stillaway": "minivioletaway",
        "walkingaway": animationDic["miniviolet/away"],
        "stillforward": "minivioletforward",
        "walkingforward": animationDic["miniviolet/forward"]
    },
    function(){
        
        if(flagDic["story"] == "DAY 4 violet" || flagDic["story"] == "DAY 4 night"){
            this.act(
                [
                    function(){
                        violetmini.waitUntil(20,function(){dialogueDic["DAY4BAKERY SHOCK"].appear();});
                    }, 
                    function(){
                        violetmini.walkTo("x",183,function(){violetmini.phase ++});
                    },
                    function(){
                        violetmini.walkTo("y",63,function(){violetmini.phase ++});
                    },
                    function(){
                        violetmini.walkTo("x",249,function(){
                            violetmini.phase = 0;
                            violetmini.disappear();
                            
                            violetbig.appear(52,101,violetbedroom);
                        });
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 9 hangout"){
            this.act(
                [
                    function(){
                        violetmini.selectType = "none";
                        violetmini.phase ++;
                    },
                    function(){
                        violetmini.walkTo("x",183,function(){violetmini.phase ++});
                    },
                    function(){
                        violetmini.walkTo("y",63,function(){violetmini.phase ++});
                    },
                    function(){
                        violetmini.walkTo("x",249,function(){
                            violetmini.phase = 0;
                            violetmini.disappear();
                            
                            violetbig.appear(52,101,violetbedroom);
                            violetbig.phase ++;
                        });
                    }
                ]
            );
        }
    },
    function(){
        if(flagDic["story"] == "DAY 9 hangout"){
            dialogueDic["DAY 9 VIOLET"].appear();
        }
    },
    [[0,41],[11,41]],
    "select",
    [-4, 40-4, 11 + (4*2), (4*2)],
    [3,-7],
    [
        [[0,41],[11,41.5]]
    ],
    2
);


