kateshouse = new Location(
    "kateshouse",
    [0,127,136,134,158],
    [ // barriers
        
        // left tree and house
        [[0,136],[21,136]],
        [[21,136],[16,127]],
        [[16,127],[238,127]],
        [[238,127],[227,103]],
        [[227,103],[300,103]],
        
        //right tree
        [[255,158],[289,158]],
        
        //pillars and bush
        [[52,133],[60,134]],
        [[118,133],[126,134]],
        [[159,134],[236,134]],
        
        [[-8,stageHeight+27],[canvas.width+8,stageHeight+27]] //down
        //[[-8,103],[canvas.width+8,103]] // up
        
    ],
    [ // event lines
        [
            [[-8,0],[-8,stageHeight+27]], //left
                function(){
                    //if(player.y+ashidaPlayerHeight >= 127 && player.y+ashidaPlayerHeight <= 136){
                    //    player.relocate(player.x, 127 - 1 - ashidaPlayerHeight); // just above the no go zone  
                    //}
                    changeLocation(ashida,canvas.width-9,null,null);
                }
        ],
        [
            [[canvas.width+8,0],[canvas.width+8,stageHeight+27]], //right
                function(){
                    changeLocation(ashidaclearing,-6,null,null);
                }
        ]
    ],
    function(){
        //what happens when you enter the screen.
        if(this.hasEvent){
            this.hasEvent = false;
        }
    },
    [],
    "red"
);