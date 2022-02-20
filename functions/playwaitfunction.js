/*

    This is kind of like currLoc.activate except it plays over multiple different locations

*/


playWaitFunction = function(waitFunc,time){    
    queFunction = function(){ 
        if(currDialogue == null && currLoc.constructor.name == "Location" && gamePause == false && fadeOutPhase == 0){ 
            // only play the sunset if you are during game play
            waitFunc();
        } else { // otherwise play the sunset 10 frames afterwards
            setTimeout(queFunction,frameRate * 10);
        }
    }
    setTimeout(queFunction,frameRate * time);
}