function keyPush(e){ // Sonic moves when you use the arrow keys... THIS MAY NEED TO BE CLEANED UP
    
    if(seal == true){
        seal = false;
        library();
    } else if(e.keyCode == 32 && titleseal == 0){
        console.log("early");
        titleseal ++; 
        titleText.changeFace("pressspace");
        audioDic["lextharstheme"].currentTime = 11.245;
        audioDic["choose"].play();

    } else if(e.keyCode == 32 && titleseal == 1){
        audioDic["lextharstheme"].pause();
        audioDic["itemget"].play();
        titleseal ++;
        prologue.play();
    } else {
    
        if(keyReleased == true){
            keyReleased = false;
            // This if statement is necessary because it basically
            // Says to only call the key functions if the key is not already down
            // This will prevent these functions from running over and over again
            // by holding down the key

            // Here is what happens when you press a key
            // 1. If inventory is not opened, judge using not open controls
            //      1. If the game is normal, no cutscene, no pause, no fadeout
            //          LEFT move character left w/ startorstop
            //          UP move character up
            //          RIGHT move character right
            //          DOWN move character down
            //          SPACE play the selected character's action
            //          SHIFT open inventory
            //      2. If game is paused (player can't move)
            //          SHIFT open inventory
            //      3. If the player is on a regular dialogue
            //          **** THIS PART I WILL NEED TO LOOK INTO
            //      4. If the player is on a choice dialogue
            //          UP move up a selection
            //          DOWN move down a selection
            //          SPACE select the current selection
            // 2. If inventory is opened judge using inventory opened controls
            //          LEFT move backwards one item
            //          RIGHT move forwards one item
            //          SPACE select item
            //          SHIFT close inventory

            if(inventoryOpened == false){

                if(currDialogue == null && currLoc.constructor.name == "Location" && gamePause == false && fadeOutPhase == 0){
                    // First scenario: there is no dialogue, you are in a location, the game isn't paused, and there is no fadeout
                    switch(e.keyCode){
                        case 37: //left
                            player.startOrStop("x",-1); //Move in the negative x direction
                            break;
                        case 38: //up
                            player.startOrStop("y",-1); //Move in the negative y direction
                            break;
                        case 39: //right
                            player.startOrStop("x",1); //Move in the positive x direction
                            break;
                        case 40: //down
                            player.startOrStop("y",1); //Move in the positive y direction
                            break;
                        case 32: //space
                            if(selectedObject != null){
                                if(selectedObject.willBeep != false){
                                    audioDic["select"].currentTime = 0;
                                    audioDic["select"].play(); 
                                    selectedObject.action();
                                } else {
                                    selectedObject.action();
                                }
                            }
                            
                            break;
                        case 13: //enter
                            audioDic["invopen"].currentTime = 0;
                            audioDic["invopen"].play();
                            if(inventory.length > 0){
                                // Open the inventory and the first item's description
                                inventoryOpened = true;
                                inventory[0].descDialogue.appear();
                            } else {
                                blankInventory.appear();
                            }
                            break;
                        case 192: //DEBUG - top left, change location
                            if(canDebug == true){
                                say([
                                    [null,
                                        [
                                            ["ashida",function(){goTo("ashida");}],
                                            ["labyrinth",function(){goTo("labyrinth");}],
                                            ["sector",function(){goTo("sector");}],
                                            ["grubhigher",function(){goTo("grubhigher");}],
                                            ["hallwayi",function(){goTo("hallwayi");}],
                                            ["forest",function(){goTo("forest");}],
                                            ["lexishouse",function(){goTo("lexishouse");}],
                                            ["celestebedroom",function(){goTo("celestebedroom");}],
                                        ]   
                                    ]
                                ]);
                            }
                            break;
                        case 49: //DEBUG: Change story code
                            if(canDebug == true){
                                debugStoryString = "Currently on: " + flagDic["story"];
                                say([
                                    [null,debugStoryString,function(){dialogueDic["PAGE 1"].appear();}],

                                ]);
                            }
                            
                    }
                } else if(currDialogue == null && gamePause == true && e.keyCode == 16){
                    // You can still open the inventory while player can't move
                    if(inventory.length > 0){
                        // Open the inventory and the first item's description
                        inventoryOpened = true;
                        inventory[0].descDialogue.appear();
                    } else {
                        blankInventory.appear();
                    }
                } else if(currDialogue != null && e.keyCode == 32 && currDialogue.currLetter == currDialogue.brokenString.length-1){
                    // If space has been pushed and the program has reached the last letter, it is now ok to shut the box
                    // Let the current dialoge know that it is okay to shut the box
                    currDialogue.pushFlag = true;
                } else if(currDialogue != null && e.keyCode == 81){ // DEBUG - q to skip the dialogue really quickly
                    if(canDebug == true){
                        currDialogue.skip();
                    }
                } else if(currDialogue != null && e.keyCode == 87){ // DEBUG - w to close the dialogue
                    if(canDebug == true){
                        currDialogue.close();
                    }
                } else if(currDialogue != null && typeof(currDialogue.text) == "object"){
                    // Another scenario: you are on a choice box
                    switch(e.keyCode){
                        case 38: //up
                            currDialogue.changeSelect("up");
                            break;
                        case 40: //down
                            currDialogue.changeSelect("down");
                            break;
                        case 16: //shift
                            audioDic["choose"].currentTime = 0;
                            audioDic["choose"].play();
                            currDialogue.procede();
                            break;
                    }
                }
            } else if(inventoryOpened == true){
                // here are the controls for the inventory screen
                switch(e.keyCode){

                    // Scrolls left and right, making the respective dialogue boxes appear
                    case 37: // left
                        // So that the player has to scroll through the text again
                        if(currItem > 0){
                            audioDic["select"].currentTime = 0;
                            audioDic["select"].play();
                            
                            // If you can still scroll left, scroll left
                            inventory[currItem].resetText(); // So that the player has to scroll through the text again
                            currItem --;
                            inventory[currItem].descDialogue.appear();
                        }

                        break;
                    case 39: // right
                        if(currItem < inventory.length - 1){
                            audioDic["select"].currentTime = 0;
                            audioDic["select"].play();
                            
                            // If you can stil lscroll right, scroll right
                            inventory[currItem].resetText(); // So that the player has to scroll through the text again
                            currItem ++;
                            inventory[currItem].descDialogue.appear();
                        }

                        break;

                    // Up and down only do things if the player is on a choice menu
                    case 38: // up
                        if(typeof(currDialogue.text) == "object"){
                            currDialogue.changeSelect("up");
                        }
                        break;
                    case 40: // down
                        if(typeof(currDialogue.text) == "object"){
                            currDialogue.changeSelect("down");
                        }
                        break;

                    case 16: // shift
                        
                        if(typeof(currDialogue.text) == "object"){
                            audioDic["choose"].currentTime = 0;
                            audioDic["choose"].play();
                            currDialogue.procede();
                        }
                        break;
                    case 13: // enter
                        // enter closes the inventory
                        audioDic["invclose"].currentTime = 0;
                        audioDic["invclose"].play();
                        currItem = 0; // Reset the item
                        currDialogue.close(); // Close the dialogue
                        currInvFrame = 0;
                        inventoryOpened = false;
                        break;
                    case 32: //space
                        if(currDialogue.currLetter == currDialogue.brokenString.length-1){
                            
                            currDialogue.pushFlag = true;
                        }
                        break;
                }

            }
        }
    }

}

function keyHold(e){
    // If the player is HOLDING DOWN space (not just pressing), then increase the reading rate
    if(e.keyCode == 32 && currDialogue !=  null){
        currDialogue.rate = 5; //change this back to 3 when you're done 
    }
}

function keyRel(e){
    //When the player lifts the key, tell the program,
    keyReleased = true;

    // When the space bar is released, slow down the program again
    // And call procede
    if(e.keyCode == 32 && currDialogue !=  null ){ 
        // you only want to procede on release if your not on a choice box

        // Explanation: if the inventory is opened, then this is the only way the dialogue is going to progress
        // if not, then you only want it to progress if it's a regular diologue.

        if(inventoryOpened == true && typeof(currDialogue.text) != "object"){
            //only procede if you're on a text box
            //if you're on a choice box, then you must press shift to procede
            currDialogue.rate = 1;
            currDialogue.procede();
        } else if (inventoryOpened == false && typeof(currDialogue.text) != "object"){
            currDialogue.rate = 1;
            currDialogue.procede();
        }
    }
}