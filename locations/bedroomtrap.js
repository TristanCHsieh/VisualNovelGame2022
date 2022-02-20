ashidanbeast = new Object(
    "ashidanbeast",
    {
        "still": "ashidanbeastright",
        "walking": animationDic["ashidanbeast/right"],
        "stillleft": "ashidanbeastleft",
        "walkingleft": animationDic["ashidanbeast/left"],
        "stillaway": "ashidanbeastaway",
        "walkingaway": animationDic["ashidanbeast/away"],
        "stillforward": "ashidanbeastforward",
        "walkingforward": animationDic["ashidanbeast/forward"]
    },
    function(){
        
        this.act([
            function(){
                huntTarget(ashidanbeast,ashidanbeast.target,15);
            },
            function(){
                
                //ashidanbeast.target.disappear();
                labyrinthLivesIdx ++;
                ashidanbeast.phase ++;
            },
            function(){
                ashidanbeast.walkTo("x", 58, function(){ ashidanbeast.phase ++; });
            },
            function(){
                ashidanbeast.walkTo("y", 90, function(){ ashidanbeast.changeFace("stillforward"); ashidanbeast.phase ++; });
            },
            function(){
                ashidanbeast.waitUntil(10,function(){
                    ashidanbeast.phase ++;
                    bedroomtrapdoor.changeFace("open");
                });
                
            }
        ]);
    },
    function(){
        if(this.phase == 0){
            say([["ashidanbeastav","...",null]]);
        } else if(this.phase == 1){
            /*audioDic["disgusting"].pause();
            audioDic["sector"].pause();
            clearTimeout(sectorLoopTimeout);
            say([
                [null,"You have been killed by the beast...",function(){
                    end("death");
                }]
            ]);*/
        }
        
    },
    [[0,62],[22,62]],
    "select",
    [-2,62 -3, 22+2, 6],
    null,
    [
        [[0,62],[22,62]]
    ],
    3
);

bedroomtrapdoor = new Object(
    "bedroomtrap_door",
    {
        "still": "bedroomtrap_door",
        "close": new Animation("bedroomtrapclose",[10,10,10],false,function(){
            ashidanbeast.phase = 1; 
            ashidanbeast.selectType = "none";
            ashidanbeast.target = labyrinthLives[labyrinthLivesIdx]
            audioDic["disgusting"].play();
            sectorloop();
            
            /*currLoc.activate([
                [function(){},40],
                [function(){say("The door behind you is gone, and you are trapped in the labyrinth forever.")},10],
                [function(){end("death");},null]
            ]);*/
        }),
        "open": new Animation(
            "bedroomtrapopen",
            [
                ["1bedroomtrapclose",10],
                ["bedroomtrap_door",10]
            ],
            false,
            function(){
                audioDic["sector"].pause();
                clearTimeout(sectorLoopTimeout);
                bedroomtrapdoor.changeFace("still");
                bedroomtrapdoor.selectType = "select";
            }
        )
    },
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
    },
    function(){
        enterDoor(labdic[labCoords[0]][labCoords[1]  - 2],227,87,null,"stillleft");
    },
    [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
    "select",
    [0,107 - 22,36,22], // rectangle of interaction
    [15,-10] //blinker
);


bedroomtrap = new Location(
    "bedroomtrap",
    [0,166,178,1000],
    [ // barriers
        [[0,185],[66,144]],
        [[66,144],[109,143]],
        [[108,143],[85,165]],
        [[85,166],[109,165]],
        [[109,165],[110,176]],
        [[110,176],[175,176]],
        [[175,176],[178,166]],
        [[178,166],[221,165]],
        [[221,165],[206,144]],
        [[206,144],[231,144]],
        [[231,144],[295,185]],
        
        // Closes off the room
        [[0,185],[0,stageHeight + 10]], 
        [[295,185],[canvas.width,stageHeight + 10]],

        [[0,stageHeight + 10],[canvas.width,stageHeight + 10]] // so that you can't walk off the bottom of the screen
    ],
    [ // event lines
        [
            [[119,0],[119,stageHeight + 10]],
            function(){
                if(bedroomtrapdoor.activated != true){
                    bedroomtrapdoor.changeFace("close");
                    bedroomtrapdoor.selectType = "none";
                    bedroomtrapdoor.activated = true;
                }
            }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        ashidanbeast.changeFace("stillforward");
        labCoords = this.labCoords;
    },
    [
        // Door to upstairs
        [
            bedroomtrapdoor,15,70
        ],
        [
            ashidanbeast,58,90
        ]
    ],
    "red"
)
