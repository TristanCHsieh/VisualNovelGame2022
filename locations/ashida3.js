ashida3 = new Location(
    "ashida3",
    [0,124],
    [ // barriers
        
        [[95,128],[0,128]],
        [[95,128],[92,120]],
        [[92,120],[0,120]],

        [[201,128],[230,128]],
        [[230,128],[232,120]],
        [[232,120],[202,120]],
        [[202,120],[201,128]],

        [[250,127],[294,127]],
        [[249,127],[251,120]],
        [[251,120],[294,120]],
        
        
        [[-8,0],[-8,stageHeight+27]], //left
        [[canvas.width+8,0],[canvas.width+8,stageHeight+27]], //right   
    ],
    [ // event lines
        [
            [[-8,103],[canvas.width+8,103]], //up
                function(){
                    changeLocation(ashida,null,stageHeight+25-ashidaPlayerHeight,null);
                }
        ],
        [
            [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]], //down
                function(){
                    changeLocation(ashida2,null,105-ashidaPlayerHeight,null);
                }
        ]
    ],
    function(){},
    [
        [
            new Object(
                "",
                "blinkerinv",
                function(){
                    if(player.x <= 78 || player.x >= 182){
                        ashida3.filterTag = "night";
                    } else {
                        ashida3.filterTag = "red";
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