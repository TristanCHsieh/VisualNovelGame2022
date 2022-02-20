/*

    Called within an object: makes that object follow the player.
    Feed it an object along with how much room you want to leave in between
    The object and the player (on both the x and the y values)

*/


function followPlayer(objToMove,xBuffer,yBuffer){
    
    if(objToMove.playerFollow == true){
    
        if(objToMove.frame == undefined){
            objToMove.frame = 0
        } else if(objToMove.frame != 4){
            
            objToMove.frame ++;
        } else {
            
            
            
            // If the second character is out of bounds, move them closer to the player
            if(objToMove.x < player.x - xBuffer){
                objToMove.tempMoveDirection = 11;
            } else if(objToMove.x > player.x + xBuffer){
                objToMove.tempMoveDirection = 12;
            } else if(objToMove.y < player.y - yBuffer){
                objToMove.tempMoveDirection = 13;
            } else if(objToMove.y > player.y + yBuffer){
                objToMove.tempMoveDirection = 14;
            } else { // otherwise move them randomly

                if(objToMove.tempMoveDirection > 10){ // pause if already moving
                    objToMove.tempMoveDirection = 0;            
                } else { //otherwise roll the dice and move the character again
                    objToMove.tempMoveDirection = Math.floor(Math.random() * 15);
                }

            }

            objToMove.frame = 0;

        }
        
        if(objToMove.tempMoveDirection <= 10){
            objToMove.halt();
        } else if(objToMove.tempMoveDirection == 11){
            objToMove.walk("x",objToMove.moveInc);
        } else if(objToMove.tempMoveDirection == 12){
            objToMove.walk("x",-objToMove.moveInc);
        } else if(objToMove.tempMoveDirection == 13){
            objToMove.walk("y",objToMove.moveInc);
        } else if(objToMove.tempMoveDirection == 14){
            objToMove.walk("y",-objToMove.moveInc);
        }
        
    }
    
}

function startFollowingPlayer(label){
    labelToCharacter = {
        "lexi": [lexi,lexibig],
        "violet": [violet,violetbig]
    }
    
    for(scIdx = 0; scIdx < labelToCharacter[label].length; scIdx ++){
        labelToCharacter[label][scIdx].playerFollow = true;
        labelToCharacter[label][scIdx].noCross = [];
        labelToCharacter[label][scIdx].noCrossLines = [];
        labelToCharacter[label][scIdx].selectType = "none";
    }
}

function stopFollowingPlayer(label){
    
    // basically if you make the label either lexi or lexibig -- it will turn off all of lexi's sprites
    // violet or violetbig will do the same
    labelToCharacter = {
        "lexi": [lexi,lexibig],
        "violet": [violet,violetbig],
        "lexibig": [lexi,lexibig],
        "violetbig": [violet,violetbig]
    }
    
    
    characterSpecs = {
        "lexi":[
           [[0,55],[14,55]] 
        ],
        "lexibig":[
           [[0,72],[18,72]] 
        ],
        "violet":[
            [[0,59],[14,60]]
        ],
        "violetbig":[
            [[0,76],[18,77]]
        ],
    }

    
    for(scIdx = 0; scIdx < labelToCharacter[label].length; scIdx ++){
        labelToCharacter[label][scIdx].playerFollow = false;
        labelToCharacter[label][scIdx].noCross = characterSpecs[labelToCharacter[label][scIdx].name];
        labelToCharacter[label][scIdx].noCrossLines = characterSpecs[labelToCharacter[label][scIdx].name];
    }
}


function huntTarget(hunter,hunted,yBuffer){ // the hunter object will follow the hunted object and then kill it. Y buffer accounts for differences in height

    
    
    if(
        hunter.y < hunted.y + yBuffer - 3 ||
        hunter.y > hunted.y + yBuffer + 3
    ){
        if(hunter.y > hunted.y + yBuffer){
            hunter.walk("y",-hunter.moveInc);
        } else if(hunter.y < hunted.y + yBuffer){
            hunter.walk("y",hunter.moveInc);
        }
    } else if(
        hunter.x < hunted.x - 4 ||
        hunter.x > hunted.x + 4
    ){
        if(hunter.x > hunted.x){
            hunter.walk("x",-hunter.moveInc);
        } else if(hunter.x < hunted.x){
            hunter.walk("x",hunter.moveInc);
        }
    } else {
        hunter.halt();
        audioDic["violeteat"].play();
        
        if(hunted == player){
            pauseGame();
            currLoc.activate([
                [function(){
                    //wait for 40 seconds before dying
                },40],
                [function(){
                    say([
                        [null,"You have been killed...",function(){
                            audioDic["disgusting"].pause();
                            audioDic["sector"].pause();
                            clearTimeout(sectorLoopTimeout);
                            end("death");
                        }]
                    ]);
                },null]
            ]);
            hunter.phase ++;
        } else {
            if(hunted.name == "lexibig"){
               flagDic["LABYRINTH lexi"] = true; 
            }
            stopFollowingPlayer(hunted.name);
            hunter.phase ++;
        }
        hunted.changeFace("die");
        
    }
}