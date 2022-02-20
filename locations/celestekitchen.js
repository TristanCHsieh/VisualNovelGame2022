celestekitchentable = new Object(
    "celestekitchentable",
    {
        "still": "celestekitchentable/empty",
        "hw": "celestekitchentable/hw",
        "full": "celestekitchentable/full"
    },
    function(){},
    function(){
        fadeOut(function(){
            pauseGame();
            celestekitchentable.changeFace("full");
            player.relocate(1000,1000);
            
            currLoc.activate([
                [function(){
                    
                },20],
                [function(){
                    say("You read a little bit of chapter 5 in your history text book. It's hard to pay attention since the wording is so boring. Hopefully Mr. Face will explain it all tomorrow.");
                },20],
                [function(){
                    fadeOut(function(){
                        increaseScore(10);
                        player.relocate(190,122);
                        gamePause = false;
                        celestekitchentable.changeFace("hw");
                        celestekitchentable.selectType = "none";
                    })
                }]
            ])
        })
    },
    [[0,133],[35,133]],
    "select",
    [109,30,24,10],
    [109 + 5,-4]
);

celestekitchen = new Location(
    "celestekitchen",
    [0],
    [ // barriers
        [[58,185],[167,185]],
        
        [[0,stageHeight + 10],[58,stageHeight + 10]],
        [[167,stageHeight + 10],[295,stageHeight + 10]],
        
        [[58,stageHeight],[58,stageHeight + 10]],
        [[167,stageHeight],[167,stageHeight + 10]],
        
        
        [[295,184],[240,151]],
        [[240,151],[57,149]],
        [[57,149],[50,154]],
        [[50,154],[37,154]],
        [[37,154],[38,97]]
    ],
    [ // event lines
        [
            [[9,0],[9,stageHeight + 10]], 
                function(){
                    player.changeFace("walkingaway");
                    player.delta = -(player.moveInc);
                    player.direction = "y";
                    changeLocation(celestedownstairs,canvas.width - 60,stageHeight - 37,null);

                }
        ],
        [
            [[0,136],[38,136]], 
                function(){
                    player.changeFace("walkingaway");
                    player.delta = -(player.moveInc);
                    player.direction = "y";
                    changeLocation(celestedownstairs,canvas.width - 60,stageHeight - 37,null);

                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.firstTime == true){
            if(
                flagDic["story"] == "DAY 6" ||
                flagDic["story"] == "DAY 6 night"
              ){
                celestekitchentable.changeFace("hw");
                celestekitchentable.selectType = "select";
            } else {
                celestekitchentable.changeFace("still");
                celestekitchentable.selectType = "none";
            }
            this.firstTime = false;
        }
        
        
    },
    [
        [
            new Object(
                "fridge",
                "blinkerinv",
                function(){
                },
                function(){
                    if(this.exausted != true){
                        say(
                            [
                                [null,"You open the fridge and find... an eggplant.",function(){ obtainItem(basiceggplant); }]
                            ]
                        );
                        this.exausted = true;
                    } else {
                        say("The fridge is empty.")
                    }
                },
                [[0,1000],[1,1000]],
                "select",
                [0,0,41,8],
                [17,-84]
            ),201,151
        ],
        [
            celestekitchentable,51,152
        ]
    ],
    "day/nightinside"
)
