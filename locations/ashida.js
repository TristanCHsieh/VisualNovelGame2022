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
    "select",
    [-3,13,29,18],
    null,
    [
        [[0,23],[25,23]],
        [[0,16],[25,16]],
        
        [[0,16],[0,23]],
        [[25,16],[25,23]]
    ],
);

ashida = new Location(
    "ashida",
    [0,126,136],
    [ // barriers
        
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
        [[254,127],[295,127]],
        
        
    ],
    [ // event lines
        [
            [[-8,0],[-8,stageHeight+27]], //left
                function(){
                    if(player.y+ashidaPlayerHeight <= 126){
                        player.relocate(player.x, 127 - ashidaPlayerHeight); // just above the no go zone  
                    }
                    changeLocation(pumpkinpatch,canvas.width-9,null,null);
                }
        ],
        [
            [[canvas.width+8,0],[canvas.width+8,stageHeight+27]], //right
                function(){
                    if(player.y+ashidaPlayerHeight >= 120 && player.y+ashidaPlayerHeight <= 128){
                        player.relocate(player.x, 82); // just above the no go zone
                    }
                    changeLocation(kateshouse,-6,null,null);
                }
        ],
        [
            [[-8,103],[canvas.width+8,103]], //up
                function(){
                    changeLocation(ashida2,null,stageHeight+25-ashidaPlayerHeight,null);
                }
        ],
        [
            [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]], //down
                function(){
                    changeLocation(ashida3,null,105-ashidaPlayerHeight,null);
                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.hasEvent){
            if(flagDic["story"] == "DAY 9 dream"){
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
    [
        [
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(player.x <= 64 || player.x >= 246){
                        ashida.filterTag = "night";
                    } else {
                        ashida.filterTag = "red";
                    }
                },
                function(){},
                [[0,1],[1,1]],
                "none"
            ),0,0
        ]
    ],
    "red"
);