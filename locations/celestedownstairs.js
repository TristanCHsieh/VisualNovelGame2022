celestedownstairs_door = new Object(
    "celestedownstairs_door",
    {
        "still": "celestedownstairsdoor/closed",
        "open": "celestedownstairsdoor/open",
        "openkate": "celestedownstairsdoor/openkate"
    },
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
    },
    function(){
        if(flagDic["story"] == "DAY 7 kate"){
            celestedownstairs_door.changeFace("openkate");
            dialogueDic["DAY 7 BENADRYL"].appear();
        } else {
            enterDoor(celestehouse,148,76,smallplayer,"stillforward");
        }
    },
    [[0,0],[0,0]],
    "select",
    [0,84,36,21],
    [18,-10]
);


celestedownstairs = new Location(
    "celestedownstairs",
    [-1,0,146],
    [
        [[288,0],[151,108]],
        [[151,108],[151,0]],
        [[294,17],[170,117]],
        [[170,117],[1,117]],
        [[2,117],[65,92]]
    ],
    [
        [
            [[0,44],[canvas.width,44]], 
                function(){
                    changeLocation(celesteupstairs,175,stageHeight - 37,null);
                }
        ],
        [
            [[0,stageHeight + 35],[canvas.width,stageHeight + 35]], 
                function(){
                    player.delta = player.moveInc;
                    player.direction = "x";
                    player.changeFace("walking")
                    changeLocation(celestekitchen,10,86,null);
                }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(player.y >= 74){ // DESCENDING NO MATTER WHAT ... so if you've never been to this screen yet, make sure that the priorities are set right
            currLoc.graphArr[1][1] = 1000;
            currLoc.lineImg = [

                [[211,147],[151,100]],
                [[151,101],[151,stageHeight]],
                [[192,92],[64,92]],

                [[243,153],[231,140]],
                [[231,140],[205,118]],
                [[205,118],[177,81]],
                [[242,153],[295,185]],

                [[66,93],[2,114]],
                [[213,148],[153,147]],
                [[153,147],[153,stageHeight + 35]],

                [[295,stageHeight],[295,stageHeight + 35]]

            ];
        } else if(player.y <= 20){
            currLoc.graphArr[1][1] = 0; //change the priority of the top stairs
            currLoc.lineImg = [
                [[288,0],[151,108]],
                [[151,108],[151,0]],
                [[294,17],[170,117]],
                [[170,117],[1,117]],
                [[2,117],[65,92]]
            ];
        }
        
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 7 kate"){
                katebig.appear(1000,1000);
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(player.x <= 133){
                        if(player.y < 38){ // DESCENDING
                            currLoc.graphArr[1][1] = 1000;
                            currLoc.lineImg = [

                                [[211,147],[151,100]],
                                [[151,101],[151,stageHeight]],
                                [[192,92],[64,92]],

                                [[243,153],[231,140]],
                                [[231,140],[205,118]],
                                [[205,118],[177,81]],
                                [[242,153],[295,185]],

                                [[66,93],[2,114]],
                                [[213,148],[153,147]],
                                [[153,147],[153,stageHeight + 35]],

                                [[295,stageHeight],[295,stageHeight + 35]]

                            ];
                        } else { // ASCENDING
                            currLoc.graphArr[1][1] = 0; //change the priority of the top stairs
                            currLoc.lineImg = [
                                [[288,0],[151,108]],
                                [[151,108],[151,0]],
                                [[294,17],[170,117]],
                                [[170,117],[1,117]],
                                [[2,117],[65,92]]
                            ];
                        }
                    } else { 
                        
                    }
                }
            ),0,0 // This keeps track of the changing priorities
        ],
        [
            celestedownstairs_door,243,77
        ]
    ],
    "day/nightinside"
);