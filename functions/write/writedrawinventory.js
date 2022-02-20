writeDrawInventory = function(){
    if(inventoryOpened == true && inventory.length > 0){

        // DRAW THE INVENTORY HERE VVVV

        // Some measurements
        ctx.fillStyle = "#000000";

        boxHeight = (bufferH * 2) + (letterSize * maxLines) + (letterSpace * (maxLines-1));

        // Draw the inventory box in the middle of the screen... and by screen I mean
        // The part of the screen not taken up by the box
        /*ctx.fillRect(
            Math.floor((canvas.width/2) - (invW/2)),
            Math.floor(((canvas.height-headerH-boxHeight)/2) - (invH/2)) + headerH,
            invW,
            invH
        );*/

        ctx.drawImage(
            graphicDic["invbackground"]["image"],
            Math.floor((canvas.width/2) - (invW/2)),
            Math.floor(((canvas.height-headerH-boxHeight)/2) - (invH/2)) + headerH
        )

        // Draw the item's picture
        ctx.drawImage(
            graphicDic[inventory[currItem].picture]["image"],
            Math.floor((canvas.width/2) - (itemSize/2)),
            Math.floor(((canvas.height-headerH-boxHeight)/2) - (itemSize/2)) + headerH
        );
        invNameLength = (inventory[currItem].name.length * letterSize) + ((inventory[currItem].name.length - 1) * letterSpace);
        // How long is the item name's length in pixels

        invNameXVal = Math.floor((canvas.width/2) - (invNameLength/2));
        invNameYVal = Math.floor(((canvas.height-headerH-boxHeight)/2) + invNameBuffer) + headerH;

        // Draw the item's name
        for(i = 0; i < inventory[currItem].name.length; i ++){
            if(inventory[currItem].name[i] != " "){ // you don't have to do it if it's a space -- you can just skip it
                ctx.drawImage(
                    graphicDic[inventory[currItem].name[i] + "ㅏ"]["image"],
                    invNameXVal,
                    invNameYVal
                );
            }

            invNameXVal += letterSize + letterSpace;
        }

        if((currInvFrame/invBlinkSpeed) < 1){
            // If the blink is on an "on frame," display it
            // If the player can scroll in that direction
            if(currItem > 0){
                ctx.drawImage(
                    graphicDic["leftblink"]["image"],
                    Math.floor((canvas.width/2) - (itemSize/2) - (blinkerW)) - itemBlinkBuffer,
                    Math.floor(((canvas.height-headerH-boxHeight)/2) - (blinkerH)) + headerH
                );
            }
            if(currItem < inventory.length - 1){
                ctx.drawImage(
                    graphicDic["rightblink"]["image"],
                    Math.floor((canvas.width/2) + (itemSize/2)) + itemBlinkBuffer,
                    Math.floor(((canvas.height-headerH-boxHeight)/2) - (blinkerH))  + headerH
                );
            }
        }

        // Update the left/right blinkers
        currInvFrame = (currInvFrame + 1) % (invBlinkSpeed*2);

    }

}