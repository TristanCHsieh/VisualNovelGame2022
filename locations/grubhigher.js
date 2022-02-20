goldenbananaobj = new Object(
    "goldenbananaobj",
    "goldenbananaobj",
    function(){},
    function(){
        obtainItem(goldenbanana);
        this.disappear();
    },
    [[0,1000],[1,1000]],
    "auto",
    [0,0,15,20]
);

grubhigher = new Location(
    "grubhigher",
    [0],
    [ // barriers
        //[[x1,y2],[x2,y2]]
    ],
    [ // event lines
        [
            [[0,stageHeight+9],[295,stageHeight+9]],
            function(){
                changeLocation(grublower,180,-8);
            }
        ],
    ],
    function(){
        //what happens when you enter the screen.
        if(this.firstTime == false){
            this.firstTime == true;
        }
    },
    [
        [
            new Object(
                "grubhigher_door",
                "grubhigher_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    
                    audioDic["select"].pause();
                    audioDic["dooropen"].currentTime = 0;
                    audioDic["dooropen"].play();

                    fadeOut(function(){
                        audioDic["sector"].pause();
                        try {
                            clearInterval(sectorLoopTimeout);
                        } catch(error){
                            console.log(error);
                        }
                        
                        
                        changeLocation(classroomtrap,200,90,astronautsmall);
                        player.halt();
                        player.changeFace("stillforward");
                    });
                },
                [[0,1],[1,1]],
                "select",
                [0,0,18,30],
                [5,-6]
            ),112,7
        ],
        [
            goldenbananaobj,258,22
        ]
    ]
);
