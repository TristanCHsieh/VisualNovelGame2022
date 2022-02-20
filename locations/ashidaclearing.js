ashida_door = new Object(
    "ashida_door",
    {
        "still": "1ashidadoorappear",
        "appear": new Animation("ashidadoorappear",[10,10],false,function(){ashida_door.changeFace("still");})
    },
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
    },
    function(){
        if(flagDic["DAY 11 HELPERS"] == "both confirm"){
            labyrinthLives = [lexibig,violetbig,bigplayer];
        } else if(flagDic["DAY 11 HELPERS"] == "violet confirm"){
            labyrinthLives = [violetbig,bigplayer];
        } else if(flagDic["DAY 11 HELPERS"] == "lexi"){
            labyrinthLives = [lexibig,bigplayer];
        } else {
            labyrinthLives = [bigplayer];
        }
        
        
        enterDoor(labyrinth,139,118,bigplayer,"stillforward");
    },
    [[0,74],[51,74]],
    "select",
    [0,74 - 2,51,7],
    null,
    [
        [[0,74],[51,74]]
    ]
);

aqsa = new Object(
    "aqsa",
    {
        "still": "aqsasideways",
        "die": new Animation("aqsadie",[10,10,10],false)
    },
    function(){},
    function(){},
    [[0,1000],[1,1000]]
);

ashidaclearing = new Location(
    "ashidaclearing",
    [0,130-20,131-20,138-20],
    [ // barriers
        
        //left trees
        [[0,130-20],[85,130-20]],
        
        //middle trees
        [[200,130-20],[222,130-20]],
        
        //right trees
        [[223,138-20],[295,138-20]],
        [[224,137-20],[229,132-20]],
        [[229,132-20],[295,132-20]],
        
        
        [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]], //down
        [[-8,103],[canvas.width+8,103]], // up
        [[-8,0],[-8,stageHeight+27]] //left
        
    ],
    [ // event lines
        [
            [[-8,0],[-8,stageHeight+27]], //left
                function(){
                    changeLocation(kateshouse,canvas.width-9,null,null);
                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.hasEvent){
            if(flagDic["story"] == "DAY 9 dream"){
                pauseGame();
                kate.appear(185,117);
                kate.changeFace("stillleft")
                kate.phase ++;

                aqsa.appear(135,120);

                demonspider.appear(25,250);
            } else if(flagDic["story"] == "DAY 11 night"){
                kate.appear(100,100);
                kate.selectType = "select";

            }
            
            this.hasEvent = false;
        }
    },
    [],
    "red"
);