pumpkinpatch = new Location(
    "pumpkinpatch",
    [0,1000],
    [ // barriers
        

        [[295,126],[400,126]],
        
        [[295,126],[243,115]],
        [[243,115],[124,115]],
        [[124,115],[113,126]],
        [[113,126],[77,136]],
        [[77,136],[74,146]],
        [[74,146],[84,185]],
        
        [[84,185],[84,185]],

        
        [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]], //down
        //[[-8,103],[canvas.width+8,103]], // up
        //[[-8,0],[-8,stageHeight+27]] //left
        
    ],
    [ // event lines
        [
            [[canvas.width+8,0],[canvas.width+8,stageHeight+27]], //right
                function(){
                    changeLocation(ashida,-6,null,null);

                    if(player.y+ashidaPlayerHeight >= 119 && player.y+ashidaPlayerHeight <= 126){
                        player.relocate(player.x, 119 - 1 - ashidaPlayerHeight); // just above the no go zone
                    }
                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.hasEvent){
            this.hasEvent = false;
        }
    },
    [
        [ashidanpumpkinobj,80,140]
    ],
    "red"
);