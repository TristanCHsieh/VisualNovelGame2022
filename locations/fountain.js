violetsmonster = new Object(
    "violetsmonster",
    {
        "still": "violetsmonster",
        "twitch": new Animation("monstertwitch",[1,4,1],false,function(){}),
        "kill": new Animation("monsterkillslexi",[2,2,4,1,8,4,2,30],false,function(){dialogueDic["DAY11CONFLICT MURDER let"].appear();})
    },
    function(){},
    function(){},
    [[0,175.5],[1,175.5]]
);

fountain = new Location(
    "fountain",
    [0,117.5,121,175,1000],
    [ // barriers
        //back
        //[[115,103],[0,103]],
        //[[115,103],[104,121]],
        [[0,123],[204,123]],
        [[204,123],[204,118]], 
        [[204,118],[295 + 7,118]],
        
        //fountain
        [[147,185],[132,175]],
        [[132,174],[180,156]],
        [[180,156],[227,150]],
        [[227,150],[295 + 7,150]],
        
        [[147,185],[250,185 + 10]],
        
        //left tree
        [[0,121],[17,120]],
        [[17,120],[60,145]],
        [[60,145],[90,138]],
        [[90,138],[36,115]],
        [[36,115],[0,115]],
        
        //trap
        [[0,stageHeight + 10],[295 + 7, stageHeight + 10]],
        [[295 + 7,0],[295 + 7,stageHeight + 10]]
    ],
    [
        [
            [[-8,0],[-8,stageHeight + 10]], 
                function(){
                    if(player.y < 78 && player.y > 63){
                        changeLocation(forest,canvas.width-8,78,null);
                    } else {
                        changeLocation(forest,canvas.width-8,null,null);
                    }
                }
        ],
    ],
    function(){
        //what happens when you enter the screen.
        
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(this.hasEvent == true){
            if(flagDic["DAY 11 HELPERS"] == "both" && flagDic["story"] == "DAY 11 night"){

                violetbig.appear(112,106);
                violetbig.changeFace("still");
                pauseGame();

                if(lexi.playerFollow == true){
                    stopFollowingPlayer("lexi");
                    lexibig.phase ++;
                }

                new Object(
                    "movecelesteright",
                    "blinkerinv",
                    function(){
                        if(this.counter == undefined){
                            this.counter = 0;
                        }

                        if(this.counter == 17){
                            player.changeFace("still");
                            this.disappear();
                        } else {
                            player.changeFace("walking");
                            player.move("x",player.moveInc);
                            this.counter ++;
                        }
                    }
                ).appear(0,0);
                
                
                violetsmonster.appear(0,0);

                violetbig.phase ++;
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "fountain_door",
                "fountain_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    if(flagDic["story"] == "DAY 11 night"){
                        if(flagDic["DAY 11 HELPERS"] == "violet"){
                            dialogueDic["DAY 11 VIOLET"].appear();
                        } else {
                            audioDic["select"].currentTime = 0;
                            audioDic["select"].play();
                            say([
                                [null,"You knock on the door."],
                                [null,"..."],
                                [null,"No response.",null]
                            ]);
                        }
                        
                    } else if((flagDic["story"] == "DAY 4 violet" && flagDic["DAY 4 VIOLET DOOR unlocked"] == true) || 
                              (flagDic["story"] == "DAY 9 hangout")){
                        enterDoor(violetdownstairs,141,155,miniplayer,"stillforward");
                    } else {
                        audioDic["select"].currentTime = 0;
                        audioDic["select"].play();
                        say([
                            [null,"You knock on the door."],
                            [null,"..."],
                            [null,"No response.",null]
                        ]);
                    }
                },
                [[0,67.5],[66,67.5]],
                "select",
                [null,null,null,5],
                [30,-7]
            ),225,51
        ],
        [
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(player.x < 0){
                        if(player.y >= 51){
                            currLoc.graphArr[2][1] = 121; 
                        } else {
                            currLoc.graphArr[2][1] = 138;
                        }
                    }
                    if(player.y >= 69){
                        if(player.x >= 89){
                            currLoc.graphArr[2][1] = 138;
                        } else {
                            currLoc.graphArr[2][1] = 121;
                        }
                    }
                }
            ),0,0
        ]
    ],
    "day/night"
)
