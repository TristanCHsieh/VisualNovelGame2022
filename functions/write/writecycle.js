writeCycle = function(){

    currLoc.counter(); // look at whatever functions are in the counter qeue first... just in case currLoc changes in behavior

    for(i = 0; i < currLoc.appeared.length; i ++){ // go through the appeared array and run every object. Save the player object for last
        if(currLoc.appeared[i] != player){
            currLoc.appeared[i].behavior();
        }

    }
    player.behavior();


    // Now find out which objects are in the player's vacinity... the "selected" objects.

    selectedObject = null; // So that if no object is selected, the variable becomes null

    for(i = 0; i < currLoc.appeared.length; i ++){
        if(player.appeared == true && // only select objects if the player is on the screen in the first place
            currLoc.appeared[i].name != player.name && //If the sqaure of interaction is not the player's own
            player.lineAndRectHitDetect(player.line,[
            currLoc.appeared[i].interactSquare[0],
            currLoc.appeared[i].interactSquare[1] + headerH,
            currLoc.appeared[i].interactSquare[2],
            currLoc.appeared[i].interactSquare[3]
        ]) == true
            //And the player has entered a square of interaction
          ){
            if(currLoc.appeared[i].selectType == "select"){
                selectedObject = currLoc.appeared[i]; 
                // If the object is selectable
                // Put the selected object in the variable, 
                // and break out of the loop
                break;
            } else if(currLoc.appeared[i].selectType == "auto"){
                // If the object is an automatic trigger, then
                // Run the action right away
                currLoc.appeared[i].action();
            }
        }


        // Uncomment to see the interaction squares
        /*ctx.fillStyle = "#0088FF";
        ctx.fillRect(
            currLoc.appeared[i].interactSquare[0],
            currLoc.appeared[i].interactSquare[1] + headerH,
            currLoc.appeared[i].interactSquare[2],
            currLoc.appeared[i].interactSquare[3]
        );*/
    }

    // If no object is selected, reset the blinker animation
    if(selectedObject == null){
        blinker.currentFrame = 0;
        blinker.wait = 0;
    } else if(selectedObject != null && gamePause != true){ // If there is a selected object
        // Place the blinker on top of the selected object. 
        // This gets highest priority because the blinker should show up,
        // Even if the selected object is behind something.
        ctx.drawImage(graphicDic[blinker.giveFrame()]["image"],selectedObject.blinkArea[0],selectedObject.blinkArea[1]);
    }
}