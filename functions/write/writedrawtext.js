writeDrawText = function(){
    // If there is a dialogue box draw the box

    textToPrint = currDialogue.giveText(); //Get the properly encoded text to be printed
    currColor = "ㅏ"; // Set the current color to white

    if(typeof(currDialogue.text) == "string"){ 
        // If the dialogue box is a message with a profile picture
        // Draw the dialogue box.
        // If there is a dialogue window up...


        //Fit the boarder to whichever image goes farther down... either the text or the avatar
        if(maxLines*letterSize + ((maxLines-1)*lineSpace) > avBorderSize){
            boxHeight = 2*bufferH + maxLines*letterSize + ((maxLines-1)*lineSpace);
        } else {
            boxHeight = 2*bufferH + avBorderSize;
        }


        currLine  = 0; // Keeps track of what line the program is on

        // Draw the dialogue box

        ctx.fillStyle = "#000000";
        ctx.fillRect(0,canvas.height-boxHeight,canvas.width,boxHeight);

        if(currDialogue.profile != null){
            // Draw the avatar if there is one

            // First draw the border
            ctx.fillStyle = "#fef5e9";
            ctx.fillRect(
                bufferW, 
                canvas.height - (boxHeight - bufferH), 
                avBorderSize, 
                avBorderSize
            );

            // Next the pic itself
            ctx.drawImage(graphicDic[currDialogue.profile]["image"],
                bufferW + avBorderThickness, 
                canvas.height - (boxHeight - (bufferH + avBorderThickness))
            );

            leftBuffer = avBorderSize + 2*bufferW;;

        } else {
            // Otherwise make the left buffer just the boarder width
            leftBuffer = bufferW;
        }

        // Now draw the text

        textXVal = leftBuffer;
        for(i = 0; i < textToPrint.length; i ++){ // Go through every character in the string to print
            if(textToPrint[i] == "ㅏ" ||
              textToPrint[i] == "ㅎ"){
                // If the program encounters a color code
                // Change the current color
                currColor = textToPrint[i];
            } else if(textToPrint[i] == "#"){ // The hashtag represents a line break
                textXVal = leftBuffer;
                currLine ++;
            } else if(textToPrint[i] == " "){ // The space is basically just skipping a letter
                textXVal += letterSize + letterSpace;
            } else if(textToPrint[i] == "|"){
                ctx.drawImage(graphicDic["blinker"]["image"],
                              leftBuffer+((currDialogue.maxLetters-1)*(letterSize+letterSpace)),
                              canvas.height-(boxHeight-(bufferH+(letterSize+lineSpace)*(maxLines-1))));
                              // Because there are three lines (0 is one).
            } else if(textToPrint[i] != "+"){ // Every other character can be printed normally
                ctx.drawImage(graphicDic[textToPrint[i] + currColor]["image"],
                    textXVal,
                    canvas.height-(boxHeight-(bufferH+(letterSize+lineSpace)*currLine)));
                textXVal += letterSize + letterSpace; // Calculate the next x value
            }
        }
    } else if(typeof(currDialogue.text) == "object"){
        // If there are choices, draw the box differently

        //Here are some new measurements
        choiceLeftBuffer = 3;
        choiceUpBuffer = 2;
        choiceDownBuffer = 3;
        choiceSpacing = 2;

        choiceH = choiceUpBuffer + letterSize + choiceDownBuffer;

        // Find the total number of lines using the reduce feauture
        choiceTotalLines = currDialogue.choiceLineLengthArr.reduce(function(a,b){ return a + b });
        // Find the total number of spaces you need to add n-1 spaces for a choice with n lines, minus the one
        // space that I couldn't account for in the begining
        choiceTotalLineSpaces = currDialogue.choiceLineLengthArr.reduce(function(a,b){ return a + (b-1) }) - 1;

        choiceBoxHeight = 
            bufferH*2 + //The outer buffers
            currDialogue.text.length*(choiceUpBuffer+choiceDownBuffer) + // Plus the message box size buffers
            letterSize * choiceTotalLines + // Plus all the letters
            choiceSpacing * (currDialogue.text.length-1) + // Plus the spaces between each choice
            choiceTotalLineSpaces * lineSpace; // Plus all the spaces between the regularly spaced lines

        choiceBoxYval = canvas.height - (choiceBoxHeight-bufferH);

        // First draw the dialogue box
        ctx.fillStyle = "#000000";
        ctx.fillRect(0,canvas.height-choiceBoxHeight,canvas.width,choiceBoxHeight); 

        // Now draw the choice boxes
        /*for(i = 0; i < currDialogue.text.length; i ++){
            if(i == currDialogue.currentSelect){
                // If the button you're currently on is selected, make it light up
                ctx.fillStyle = "#ac4b67";
            } else {
                // Other wise, make it grey
                ctx.fillStyle = "#424651";
            }

            choiceButtonHeight = 
                choiceDownBuffer + // The bottom of the button
                currDialogue.choiceLineLengthArr[i]*letterSize  + // Plus all the actual letter heights
                (currDialogue.choiceLineLengthArr[i]-1)*lineSpace + // Plus all the individual spaces
                choiceUpBuffer; // Plus the top of the button

            ctx.fillRect(bufferW, 
                         choiceBoxYval,
                         canvas.width - (2*bufferW),
                         choiceButtonHeight);
            choiceBoxYval += choiceButtonHeight + choiceSpacing; // skip the current button and leave a space
        }*/


        //Uncomment for asterisks!
        /*for(i = 0; i < currDialogue.text.length; i ++){
            if(i == currDialogue.currentSelect){
                // If the button you're currently on is selected, make it light up
                currColor = "ㅏ";
            } else {
                // Other wise, make it grey
                currColor = "ㅅ";
            }

            choiceButtonHeight = 
                choiceDownBuffer + // The bottom of the button
                currDialogue.choiceLineLengthArr[i]*letterSize  + // Plus all the actual letter heights
                (currDialogue.choiceLineLengthArr[i]-1)*lineSpace + // Plus all the individual spaces
                choiceUpBuffer; // Plus the top of the button

            ctx.drawImage(graphicDic["*" + currColor]["image"],
                bufferW - 7,
                choiceBoxYval);

            choiceBoxYval += choiceButtonHeight + choiceSpacing; // skip the current button and leave a space
        }*/

        // Now the text itself
        textXVal = bufferW + choiceLeftBuffer;
        textYVal = canvas.height - (choiceBoxHeight - bufferH - choiceUpBuffer);

        for(i = 0; i < textToPrint.length; i ++){ // Go through every character in the string to print
            if(textToPrint[i] == "ㅏ" ||
              textToPrint[i] == "ㅅ"){
                // If the program encounters a color code
                // Change the current color
                currColor = textToPrint[i];
            } else if(textToPrint[i] == "^"){ // The carrots represnt the end of a choice
                // Reset the x value
                textXVal = bufferW + choiceLeftBuffer;
                // Move the y value to the next space
                textYVal += letterSize + choiceDownBuffer + choiceSpacing + choiceUpBuffer;

            } else if(textToPrint[i] == "#"){ // The hashtag represents a line break
                textXVal = bufferW + choiceLeftBuffer;
                textYVal += letterSize + lineSpace;
            } else if(textToPrint[i] == " "){ // The space is basically just skipping a letter
                textXVal += letterSize + letterSpace;
            } else { // Every other character can be printed normally
                // Unless it's a wait sign (+)

                if(currColor == "ㅏ"){
                    ctx.drawImage(graphicDic[textToPrint[i] + "ㅅ"]["image"],
                        textXVal,
                        textYVal+1);
                    // You want the grey shadow if you are a on a selected choice
                }
                ctx.drawImage(graphicDic[textToPrint[i] + currColor]["image"],
                    textXVal,
                    textYVal);
                textXVal += letterSize + letterSpace; // Calculate the next x value
            }
        }

    }

}