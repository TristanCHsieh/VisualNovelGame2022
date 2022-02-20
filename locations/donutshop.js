ashidancashier = new Object(
    "ashidancashier",
    {
        "still": "ashidancashier"
    },
    function(){},
    function(){
        say([
            ["ashidancashierav","RAWR!!"],
            ["celesteav","...uh ..."],
            ["celesteav","Do I just order something?"],
            ["ashidancashierav","RAWR!!",null]
        ]);
    },
    [[0,61],[22,61]],
    "select",
    [0,61 + 5, 22, 8],
    null
);


donutshop = new Location(
    "donutshop",
    [0,159,179,1000,1000],
    [ // barriers
        
        //left wall and display
        [[295,185],[252,159]],
        [[252,159],[131,159]],
        [[131,159],[134,150]],
        [[134,150],[235,150]],
        [[235,150],[228,143]],
        
        //wall that you're facing
        [[65,145],[233,145]],
        
        //right wall
        [[65,145],[0,185]],
        
        //chairs
        [[54,172],[112,175]],
        [[112,175],[109,179]],
        [[109,179],[81,179]],
        [[81,179],[78,182]],
        [[78,182],[44,182]],
        [[44,182],[54,172]],
        
        //trap
        [[105,stageHeight + 10],[295,stageHeight + 10]],
        [[0,stageHeight],[105,stageHeight]],
        [[105,stageHeight],[105,stageHeight + 10]],
        [[295,stageHeight],[295,stageHeight + 10]]
        
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
            increaseScore(30);
            this.firstTime = true;  
        }
        
        player.x = 237;
        player.y = 100;
        
        if(lexi.playerFollow == true){
            lexibig.x = 237;
            lexibig.y = 100 + 1;
        }
        
        if(violet.playerFollow == true){
            violetbig.x = 237;
            violetbig.y = 100 - 3;
        }
        
        labCoords = this.labCoords;
    },
    [
        [
            new Object(
                "donutshop_door",
                "donutshop_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    // behanvior when the player interacts with the object
                    enterDoor(labdic[labCoords[0]][labCoords[1] + 2],50,87,null,"still");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),255,78
        ],
        [
            ashidancashier, 162, 92
        ]
    ]
)
