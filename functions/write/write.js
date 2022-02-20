/*

    This is a function that plays every frame. It essencially determines what point
    in the game you are, and draws the frame based off of that

*/

function write(){
    // Uncomment to see the player's location
    /*if(player != undefined && player.appeared == true){
        console.log(player.x + ", " + player.y);
    }*/
    // This is the function that gets called every frame.

    // Also good to keep in mind... the program stores the coordinate like player.x player.y as normal
    // coordinates where 0,0 is the top left corner, but DRAWS them a little bit downward to make room
    // for the header. I'm a genius!

    ctx.beginPath();

    
        

    if(fadeOutPhase == 2){
        // If the screen is on maximum fadout, just draw a black box
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,headerH,canvas.width,stageHeight);
        // fade Out phase of 2, means the whole screen is dark
        fadeOutWait ++;
        if(fadeOutWait == fadeOutTime * 3){
            fadeOutFunction();
            fadeOutFunction = null;
            fadeOutWait = 0;
            fadeOutPhase ++;
        }
    } else if(currLoc.constructor.name == "Location"){
        // Business as usual, draw all of the screen, and the inventory if applicable
        writeDrawScreen();

        writeDrawInventory();

    } else if(currLoc.constructor.name == "Cutscene"){
        // You're on a cutscene, draw the cutscene's current image 
        
        // Draw the current image
        ctx.drawImage(graphicDic[currLoc.giveFrame()]["image"],0,headerH);

    }

    if(currDialogue == null && currLoc.constructor.name == "Location" && inventoryOpened == false && fadeOutPhase == 0){ 
        // Update the animations and the things that move if there is no
        // current dialogue, no cutscene, no inventory, and no current fade out
        writeCycle();


    } else if(currDialogue != null){
        // Draw the dialogue, if applicable
        writeDrawText();
        
    }

    // Now draw the header with score. This will be visible ALL the time,
    // No matter what.

    writeDrawScore();
    

    ctx.closePath();

    setTimeout(write, frameRate); // calls the function again after (framerate) milliseconds
}