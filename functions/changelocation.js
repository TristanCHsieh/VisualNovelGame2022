/* 

    Given a location object and an x and y value
    change the location. null x and ys just retain the player's
    original x and y
 
*/



function changeLocation(loc, playerX, playerY, newPlayer){
    

    // Change the location
    start = false; 
    // Play the event function of whatever location you're going to
    blinker.reset(); // Reset the blinker animation

    // Save the x and y values before removing the player... just in case
    if(currLoc.constructor.name != "Cutscene"){ // The player doesn't exist in a cutscene
        var tempX = player.x;
        var tempY = player.y;
        
        
        player.disappear(); // Take the player off the screen... your "cleaning up after yourself" in order to prevent multiple players appearing on the screen
        
        //clean up any secondary players any secondary players
        if(lexi.playerFollow == true && currLoc.appeared.includes(lexi)){
            lexi.disappear();
        } else if(lexibig.playerFollow == true && currLoc.appeared.includes(lexibig)){
            lexibig.disappear();
        }
        
        if(violet.playerFollow == true && currLoc.appeared.includes(violet)){
            violet.disappear();
        } else if(violetbig.playerFollow == true && currLoc.appeared.includes(violetbig)){
            violetbig.disappear();
        }
    }
    // Change the location
    currLoc = loc;
    if(newPlayer != null){
        player = newPlayer;
    }
    if(currLoc.constructor.name != "Cutscene"){ // The player doesn't exist in a cutscene
        // Bring the player back in the appropriate spot
        if(playerX != null && playerY != null){
            // If both playerX and playerY are defined,
            // bring the player back in those coordinates
            player.appear(playerX,playerY);
        } else if(playerX == null && playerY != null){
            player.appear(tempX,playerY);
        } else if(playerX != null && playerY == null){
            player.appear(playerX,tempY);
        } else if(playerX == null && playerY == null){
            player.appear(tempX,tempY);
        }
    }
    
    
    
    //generate secondary players
    
    outdoors_arr = 
    [
        anxietyroom,
        ashidaclearing,
        ashida,
        ashida2,
        ashida3,
        bedroomtrap,
        celestehouse,
        donutshop,
        forest,
        fountain,
        jamies,
        kateshouse,
        labyrinth,
        lexishouse,
        pumpkinpatch,
        school,
        secretroom,
    ];
    
    outdoor_sizeDic =
    {
        "anxietyroom": "big",
        "ashidaclearing": "normal",
        "ashida": "normal",
        "ashida2": "normal",
        "ashida3": "normal",
        "bedroomtrap": "big",
        "celestehouse": "normal",
        "donutshop": "big",
        "forest": "big",
        "fountain": "big",
        "jamies": "big",
        "kateshouse": "normal",
        "labyrinth": "big",
        "lexishouse": "normal",
        "pumpkinpatch": "normal",
        "school": "normal",
        "secretroom": "big"
    };
    
    if(outdoors_arr.includes(currLoc) || currLoc.isInLabyrinth == true){
        if(lexi.playerFollow == true){
            if(outdoor_sizeDic[currLoc.name] == "normal"){
                lexi.appear(player.x,player.y);
            } else if(outdoor_sizeDic[currLoc.name] == "big"){
                lexibig.appear(player.x,player.y + 1);
            }
        }
        
        if(violet.playerFollow == true){
            if(outdoor_sizeDic[currLoc.name] == "normal"){
                violet.appear(player.x,player.y - 1);
            } else if(outdoor_sizeDic[currLoc.name] == "big"){
                violetbig.appear(player.x,player.y - 3);
            }
        }
    }
}