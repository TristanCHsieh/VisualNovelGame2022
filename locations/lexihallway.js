lexihallway = new Location(
    "lexihallway",
    [0],
    [ // barriers
        [[0,157],[45,157]],
        [[45,157],[66,144]],
        [[66,144],[231,144]],
        [[231,144],[295,185]],

        [[295,185],[295,185 + 20]],
        [[295,185 + 20],[-10,185 + 20]]
    ],
    [ // event lines
        /*[
            [[0,157],[39,157]],
            function(){
                player.delta = player.moveInc;
                player.direction = "y";
                player.changeFace("walkingforward")
                changeLocation(leximainroom,204,84,null);
            }
        ],*/
        [
            [[19,0],[19,300]],
            function(){
                player.delta = player.moveInc;
                player.direction = "y";
                player.changeFace("walkingforward")
                changeLocation(leximainroom,204,84,null);
            }
        ],
        [
            [[100,0],[100,300]],
            function(){
                if(currLoc.hasDone != true && flagDic["story"] == "DAY 9 dream"){
                    say([["lextharav","Where are you going, Celeste?",null]]);
                    currLoc.hasDone = true;
                }
            }
        ]
    ],
    function(){
        if(this.firstTime == false){
            // right door
            
            
            this.firstTime = true;
        }
    },
    [
        [
            new Object(
                "lexihallway_door",
                "lexihallway_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(lexibedroom,50,null,null,"still");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),245,70
        ]
    ],
    "day/nightinside"
)
