mrface = new Object(
    "mrface",
    {
        "still": "mrfaceright",
        "walking": animationDic["mrface/right"],
        "stillleft": "mrfaceleft",
        "walkingleft": animationDic["mrface/left"],
        "stillaway": "mrfaceaway",
        "walkingaway": animationDic["mrface/away"],
        "stillforward": "mrfaceforward",
        "walkingforward": animationDic["mrface/forward"],
        "mrfacedestroysvape": new Animation("mrfacedestroysvape",[1,2,1,2,2,2,2,2],false,function(){mrface.phase ++;mrface.changeFace("stillforward");})
    },
    function(){
        //ACTIONS
        if(flagDic["story"] == "DAY 3"){
            this.act(
                [
                    function(){
                        mrface.relocate(202,90);
                        mrface.phase ++;
                    },
                    function(){
                        mrface.walkTo("y",92,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",140,function(){mrface.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY 3 MRFACE"].appear();
                        mrface.changeFace("stillforward");
                        mrface.phase = 0;
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 4"){
            this.act(
                [
                    function(){
                        mrface.relocate(202,90);
                        mrface.phase ++;
                    },
                    function(){
                        mrface.walkTo("y",92,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",140,function(){mrface.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY4CLASS outro"].appear();
                        mrface.changeFace("stillforward");
                        mrface.phase = 0;
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 8"){
            this.act(
                [
                    function(){
                        mrface.relocate(202,90);
                        mrface.phase ++;
                    },
                    function(){
                        mrface.walkTo("y",92,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",140,function(){mrface.phase ++; mrface.changeFace("stillforward");});
                    },
                    function(){
                        dialogueDic["DAY8CLASS TALK outro"].appear();
                    },
                    function(){
                        mrface.walkTo("y",110,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",60,function(){mrface.changeFace("stillforward"); mrface.phase ++;});
                    },
                    function(){
                        mrface.waitUntil(5,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.changeFace("mrfacedestroysvape");
                    },
                    function(){
                        dialogueDic["DAY 8 CLASS 2"].appear();
                        mrface.phase = 0;
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 8 mrface" || flagDic["story"] == "DAY 8 office"){
            this.act(
                [   
                    function(){
                        say([
                            ["mrfaceav","Hold on!",function(){pauseGame(); mrface.phase ++}]
                        ]);
                    },
                    function(){
                        
                        mrface.walkTo("y",player.y,function(){mrface.phase ++; });
                    },
                    function(){
                        mrface.walkTo("x",player.x + 10,function(){mrface.phase ++; mrface.changeFace("stillleft");});
                    },
                    function(){
                        mrface.waitUntil(10,function(){mrface.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY 8 MR FACE"].appear();
                        mrface.selectType = "none";
                        gamePause = false;
                    },
                    function(){
                        mrface.walkTo("x",295,function(){
                            mrface.phase ++;
                            mrface.disappear();
                            mrface.appear(20,player.y,hallwayii);
                            flagDic["story"] = "DAY 8 office";
                        });
                    },
                    function(){
                        mrface.walkTo("x",90,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("y",90,function(){
                            mrface.phase ++;
                            mrface.disappear();
                            mrface.appear(139,98,office);
                            mrface.changeFace("stillforward");
                            mrface.selectType = "none";
                        });
                    },
                    function(){
                        mrface.waitUntil(20,function(){mrface.phase ++;});
                    },
                    function(){
                        say([["mrfaceav","Take a seat Celeste.",function(){mrface.phase = 0;}]]);
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 9"){
            this.act(
                [
                    function(){
                        mrface.relocate(202,90);
                        mrface.phase ++;
                    },
                    function(){
                        mrface.walkTo("y",92,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",140,function(){
                            mrface.changeFace("stillforward");
                            mrface.phase ++;
                        });
                    },
                    function(){
                        dialogueDic["DAY9CLASS mrface"].appear();
                        mrface.phase = 0;
                    }
                ]
            );
        } else if(flagDic["story"] == "DAY 10"){
            this.act(
                [
                    function(){
                        mrface.walkTo("y",113,function(){mrface.phase ++;});
                    },
                    function(){
                        dialogueDic["DAY 10 CLASS"].appear();   
                        
                    },
                    function(){
                        mrface.walkTo("x",128,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("y",82,function(){
                            mrface.changeFace("stillforward");
                            mrface.phase ++;
                        });
                    },
                    function(){
                        dialogueDic["DAY10CLASS MRFACE outro"].appear();
                        mrface.phase = 0;
                    }
                ]
            )
        } else if(flagDic["story"] == "DAY 11"){
            this.act(
                [
                    function(){
                        mrface.relocate(202,90);
                        mrface.phase ++;
                    },
                    function(){
                        mrface.walkTo("y",92,function(){mrface.phase ++;});
                    },
                    function(){
                        mrface.walkTo("x",140,function(){
                            mrface.changeFace("stillforward");
                            mrface.phase ++;
                        });
                    },
                    function(){
                        dialogueDic["DAY 11 CLASS 2"].appear();
                        mrface.phase = 0;
                    }
                ]
            );
        }
    },
    function(){
        if(flagDic["story"] == "DAY 1" ||
            flagDic["story"] == "DAY 2"
          ){
            say([["mrfaceav","Please sit down!",null]]);  
        } else if(flagDic["story"] == "DAY 8 mrface"){
            mrface.phase = 5;
        }
    },
    [[0,64],[19,64]],
    "select",
    [null,null,null,5],
    null,
    [
        [[0,64],[19,65]]
    ],
    2
);

mrface.changeFace("stillforward");