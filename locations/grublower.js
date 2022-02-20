grubDifference = 18

grublower = new Location(
    "grublower",
    [0],
    [ // barriers
    ],
    [ // event lines
        [
            [[0,-9],[295,-9]],
            function(){
                changeLocation(grubhigher,180,stageHeight-10);
            }
        ],
        [
            [[0,stageHeight+9],[295,stageHeight+9]],
            function(){
                say("The muscles that pulled you in have contracted, sealing off the enterance.");
                
                player.direction = null;
                player.deltaX = 0;
                player.deltaY =  -player.deltaY;
                player.delta = 0;
                player.accelaration = 0;
            }
        ],
    ],
    function(){
        //what happens when you enter the screen.
    }
)
