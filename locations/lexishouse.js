lexishouse = new Location(
    "lexishouse",
    [0,133,131,143,132],
    [ // barriers
        [[0-15,125],[295+15,125]],
        
        //left bush
        [[0,143],[9,143]],
        [[9,143],[42,131]],
        [[42,131],[16,131]],
        [[16,131],[43,123]],
        
        //middle bush
        
        [[157,132],[160,143]],
        [[160,143],[188,143]],
        [[188,143],[181,132]],
        [[181,132],[157,132]],
        
        //right bush
        [[210,133],[295,133]],
        
        //second pillar
        [[147,130],[143,131]],
        [[143,131],[151,131]],
        [[151,131],[147,130]],
        
        //first pillar
        [[67,130],[63,131]],
        [[63,131],[72,131]],
        [[72,131],[67,130]],
        
        // Keeps the player from going off screen
        [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]],
        [[-8,0],[-8,stageHeight + 10]],
        [[0,stageHeight + 10],[canvas.width,stageHeight + 10]]
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
            this.fistTime = true;
        }
        //what happens when you enter the screen.
    },
    [
        [
            //lexi's front door
            new Object(
                "lexishouse_door",
                "lexishouse_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(leximainroom,252,99,bigplayer,"stillleft");
                },
                [[0,1],[1,1]],
                "select",
                [9,80,33,5],
                [26,0]
            ),80,47
        ],
        [
            //car
            celestecar,115,138
        ]
    ],
    "day/night"
)
