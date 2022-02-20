ending = new Cutscene(
    "ending",
    [
        /*[new Animation("ending",[10,10,0],false,function(){
            audioDic["ending"].position = 0;
            audioDic["ending"].play();
            currLoc.update(); 
        })],*/
        ["endingstill",100]
    ],
    function(){
        console.log("end");
        
        // bting the player back to the begining... right now this just throws an error
        currLoc = null;
    }
)