lexibedroom = new Location(
    "lexibedroom",
    [0,1000],
    [ // barriers

        // walls you're facing
        [[0,185],[66,144]],
        [[66,144],[161,144]],
        [[161,144],[163,158]],
        [[163,158],[253,158]],
        [[253,158],[295,185]],
    
        //wall with desk
        [[0,185+20],[58,185+20]],
        [[58,185+20],[68,185+10]],
        [[68,185+10],[175,185+10]],
        [[175,185+20],[175,185+10]],
        [[175,185+20],[295,185+20]],
        
        //trap
        [[0,185],[0,185+20]],
        [[295,185],[295,185+20]],
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
        if(this.firstTime == false){
            
            this.firstTime = true;
            
        }
    },
    [
        [
            // Door to upstairs
            new Object(
                "lexibedroom_door",
                "lexibedroom_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(lexihallway,227,null,null,"stillleft");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),15,70
        ]
    ],
    "day/nightinside"
)
