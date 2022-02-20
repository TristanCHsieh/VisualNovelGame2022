ashidaPlayerHeight = 55; //This might change Idk

ashidanpumpkinobj = new Object(
    "ashidanpumpkinobj",
    "ashidanpumpkinobj",
    function(){},
    function(){
        obtainItem(ashidanpumpkin);
        this.disappear();
    },
    [[0,23],[25,23]],
    "auto",
    [0,22,25,3]
);

ashida = new Location(
    "ashidai",
    [0,130-20,131-20,138-20],
    [ // barriers
        
        //left trees
        [[0,130-20],[85,130-20]],
        
        //middle trees
        [[200,130-20],[222,130-20]],
        
        //right trees
        [[223,138-20],[295,138-20]],
        [[224,137-20],[229,132-20]],
        [[229,132-20],[295,132-20]]
    ],
    [ // event lines
        [
            [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]], //down
                function(){
                    // Move player to the other side of the screen
                    player.relocate(player.x,105-ashidaPlayerHeight);
                    
                    // Change the screen number
                    currLoc.ashidaNum = (currLoc.ashidaNum + 1) % 4;
                    
                    // Update the screen
                    currLoc.changeInfo();
                    
                }
        ],
        [
            [[-8,103],[canvas.width+8,103]], // up
                function(){
                    player.relocate(player.x,stageHeight+25-ashidaPlayerHeight);
                    
                    
                    currLoc.ashidaNum --;
                    if(currLoc.ashidaNum == -1){
                        currLoc.ashidaNum = 3;
                    }
                    
                    currLoc.changeInfo();
                    
                }
        ],
        [
            [[-8,0],[-8,stageHeight+27]], //left
                function(){
                    player.relocate(canvas.width-9,player.y);
                    
                    currLoc.ashidaNum --;
                    if(currLoc.ashidaNum == -1){
                        currLoc.ashidaNum = 3;
                    }
                    
                    currLoc.changeInfo();
                }
        ],
        [
            [[canvas.width+8,0],[canvas.width+8,stageHeight]], //right
                function(){
                    player.relocate(-6,player.y);
                    
                    currLoc.ashidaNum = (currLoc.ashidaNum + 1) % 4;
                    
                    currLoc.changeInfo();
                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.hasEvent){
            if(flagDic["story"] == "DAY 9 night"){
                currLoc.activate(
                    [
                        [function(){},10],
                        [function(){
                            dialogueDic["DAY9DREAM cry"].appear();
                        },null]
                    ]
                );
            }
            
            this.hasEvent = false;
        }
    },
    [],
    "red"
);

// Keeps track of which screen the player is on.
ashida.ashidaNum = 0;
ashida.ashidaCount = 0;

// Will change screens based off of where the player is 
ashida.changeInfo = function(){
    this.name = ashidaInfo[this.ashidaNum]["name"];
    this.graphArr = [];
    for(this.i = 0; this.i < ashidaInfo[this.ashidaNum]["graphicArr"].length; this.i ++){
        this.graphArr.push([this.i + "" + this.name, ashidaInfo[this.ashidaNum]["graphicArr"][this.i]])
    }
    this.lineImg = ashidaInfo[this.ashidaNum]["lineImg"];
    
    
    /* This next part is basically to ensure that the player always 
    ends up in the playable area, and they don't end up say... inside a tree */
    
    if(player.x < canvas.width/2){ //left half of the screen
        if(player.y+ashidaPlayerHeight >= ashidaInfo[this.ashidaNum]["leftEdge"][0] && player.y+ashidaPlayerHeight <= ashidaInfo[this.ashidaNum]["leftEdge"][1]){
            player.relocate(player.x, ashidaInfo[this.ashidaNum]["leftEdge"][0] - 1 - ashidaPlayerHeight); // just above the no go zone  
        }
    } else { //right half of the screen
        if(player.y+ashidaPlayerHeight >= ashidaInfo[this.ashidaNum]["rightEdge"][0] && player.y+ashidaPlayerHeight <= ashidaInfo[this.ashidaNum]["rightEdge"][1]){
            player.relocate(player.x, ashidaInfo[this.ashidaNum]["rightEdge"][0] - 1 - ashidaPlayerHeight); // just above the no go zone
        }
    }
    
    
    // make this more specific later -- conditions for the Ashidan Pumpkin
    if(ashidanpumpkinobj.appeared != true){
        ashidanpumpkinobj.appear(100,140);
        ashidanpumpkinobj.appeared = true;
    }
    
    
    if(flagDic["story"] == "DAY 9 night"){
        ashida.ashidaCount ++;
        if(ashida.ashidaCount == 3){
            pauseGame();
            kate.appear(160,100);
            kate.phase ++;
            
            aqsa.appear(120,100);
            
            demonspider.appear(30,30);
        }
    } else if(flagDic["story"] == "DAY 11 night"){
        kate.appear(100,100);
        kate.selectType = "select";
        
    }
}


// Stores all the info for each background in Ashida
ashidaInfo = [
    {
        "name": "ashidai",
        "graphicArr": [0,130-20,131-20,138-20],
        "lineImg": [ // barriers

            //left trees
            [[0,130-20],[85,130-20]],

            //middle trees
            [[200,130-20],[222,130-20]],

            //right trees
            [[223,138-20],[295,138-20]],
            [[224,137-20],[229,132-20]],
            [[229,132-20],[295,132-20]]
        ],
        "leftEdge": [110,110],
        "rightEdge": [112,118]
    },
    {
        "name": "ashidaii",
        "graphicArr": [0,126,136],
        "lineImg": [ // barriers
            //left trees
            [[0,126],[17,126]],
            [[17,126],[16,119]],
            [[16,119],[0,119]],

            // center trees
            [[40,126],[90,126]],
            [[90,126],[87,122]],
            [[87,122],[42,122]],
            [[42,122],[40,126]],

            // right tree
            [[250,136],[295,136]],
            [[251,136],[254,127]],
            [[254,127],[295,127]]
        ],
        "leftEdge":[119,126],
        "rightEdge":[127,136]
    },
    {
        "name": "ashidaiii",
        "graphicArr": [0,0,120],
        "lineImg": [ // barriers
            [[95,128],[0,128]],
            [[95,128],[92,120]],
            [[92,120],[0,120]],

            [[201,128],[230,128]],
            [[230,128],[232,120]],
            [[232,120],[202,120]],
            [[202,120],[201,128]],

            [[250,127],[294,127]],
            [[249,127],[251,120]],
            [[251,120],[294,120]]
        ],
        "leftEdge": [120,128],
        "rightEdge": [120,127]
    },
    {
        "name": "ashidaiiii",
        "graphicArr": [0,124],
        "lineImg": [ // barriers
            [[114,124],[0,124]],
            [[114,124],[108,115]],
            [[108,115],[0,115]],

            [[177,124],[295,124]],
            [[177,124],[172,119]],
            [[172,119],[295,119]]
        ],
        "leftEdge": [115,124],
        "rightEdge": [119,124]
    },
    
]

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


