violetdownstairs = new Location(
    "violetdownstairs",
    [0,2,1000],
    [
        [[89,163],[106,132]],
        [[206,163],[190,132]],
        [[105,132],[85,107]],
        [[113,100],[124,114]],
        [[124,114],[172,114]],
        [[172,114],[183,100]],
        [[190,132],[211,108]],
        [[211,108],[295,108]],
        [[295,108],[242,92]],
        [[242,92],[50,92]],
        [[50,92],[0,107]],
        [[1,107],[85,108]],
        [[112,100],[183,100]],

        [[0,stageHeight + 10],[295,stageHeight + 10]]
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
        
        if(this.hasEvent == true && flagDic["story"] == "DAY 9 hangout"){
            violetmini.appear(165,87);
            violetmini.changeFace("stillforward");
            violetmini.selectType = "select";
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(player.y >= 124){
                        if(player.x >= 78 && player.x <= 207){
                            currLoc.lineImg = [
                                [[89,163],[106,132]],
                                [[206,163],[190,132]],
                                [[105,132],[85,107]],
                                [[113,100],[124,114]],
                                [[124,114],[172,114]],
                                [[172,114],[183,100]],
                                [[190,132],[211,108]],
                                [[211,108],[295,108]],
                                [[295,108],[242,92]],
                                [[242,92],[50,92]],
                                [[50,92],[0,107]],
                                [[1,107],[85,108]],
                                [[112,100],[183,100]],

                                [[0,stageHeight + 10],[295,stageHeight + 10]]
                            ];
                            
                            //currLoc.graphArr[1][1] = 0;
                            player.forcedP = null;
                        } else {
                            currLoc.lineImg = [
                                [[0,163],[51,138]],
                                [[51,138],[109,138]],
                                [[109,138],[89,164]],
                                [[207,163],[185,135]],
                                [[242,138],[187,138]],
                                [[241,138],[295,161]],

                                [[0,stageHeight + 10],[295,stageHeight + 10]],
                                [[0,163],[0,stageHeight + 10]],
                                [[295,161],[295,stageHeight + 10]]
                            ]
                            //currLoc.graphArr[1][1] = 163;
                            player.forcedP = 1;
                        }
                    }
                }
            ),0,0
        ],
        [
            new Object(
                "violetdownstairs_exit",
                "blinkerinv",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    // behanvior when the player interacts with the object
                    enterDoor(fountain,250,52,bigplayer,"stillforward");
                    /*fadeOut(function(){
                        changeLocation(fountain,250,52,bigplayer);
                        player.halt();
                        player.changeFace("stillforward");

                    });*/
                },
                [[0,1],[1,1]], // priority lines of the object... this object is always behind the player
                "select",
                [0,0,65,22], // rectangle of interaction
                [27,-29] //blinker
            ),116,178 
        ],
        [
            new Object(
                "violetdownstairs_bedroomdoor",
                "violetdownstairs_bedroomdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(violetbedroom,35,92,bigplayer,"still");
                },
                [[0,1],[1,1]],
                "select",
                [0,49,22,6],
                [8,-4]
            ),251,46
        ]
    ]
)
