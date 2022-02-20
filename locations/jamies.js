jamies = new Location(
    "jamies",
    [0,132.5,0,143,154,1000],
    [ // barriers
        //building
        [[295,103],[180,103]],
        [[180,103],[191,133]],
        [[191,133],[0,133]],
        
        //bush
        [[174,143],[235,143]],
        
        //tree
        [[202,154],[270,154]],
        [[270,154],[262,159]],
        [[262,159],[247,169]],
        [[247,169],[203,155]],
        
        [[-8,stageHeight + 10],[295,stageHeight+10]],
        [[-8,0],[-8,stageHeight + 10]]
    ],
    [ // event lines
        [
            [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]], 
                function(){
                    if(player.y < 51 && player.y > 36){
                        changeLocation(forest,-7,51,null);
                    } else {
                        changeLocation(forest,-7,null,null);
                    }
                }
        ],
    ],
    function(){
        //what happens when you enter the screen.
        if(this.firstTime == false){
            this.firstTime = true;
        }
    },
    [
        [
            new Object(
                "jamies_door",
                "jamies_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(jamiesinterior,142,129,smallplayer,"stillaway");
                },
                [[0,82.5],[85,82.5]],
                "select",
                [0,83,85,10],
                [40,-7]
            ),43,51
        ],
        [
            celestecar,115,138
        ]
    ],
    "day/night"
)
