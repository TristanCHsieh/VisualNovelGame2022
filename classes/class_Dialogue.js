class Dialogue {
    constructor(name, text, profile, next){
        this.name = name;
        this.text = text;
        this.profile = profile;
        this.next = next;

        this.currLetter = 0;
        // Keeps track of which letter the program is on

        this.blinkTimer = 8;
        // How many frames does the blinker stay visible

        this.blinkTimerI = 0;
        // Keeps track of current frame for blinker

        this.pushFlag = false;
        // This becomes true if the player pushes space
        // After the last letter has been printed
        // In order to prevent the player from closing the dialogue box
        // when they were just trying to speed the dialogue up

        this.rate = 1;
        // This is the reading rate... how many characters appear on the screen at a time

        // Now split the string into lines with # symbols

        if(typeof(this.text) == "string"){
            if(this.profile == null){
                // choiceMaxLetters letters per line without a profile pic
                this.maxLetters = choiceMaxLetters;
            } else {
                // There are only maxLetters letters per line with a prof pic
                this.maxLetters = maxLetters; 
            }

            this.brokenString = this.textSplit(this.text);
            // Insert hashtags for all the line breaks if it is a message type
        } else if(typeof(this.text) == "object"){
            this.maxLetters = choiceMaxLetters;
            // choiceMaxLetters letters per line without a profile pic

            this.currentSelect = 0;

            this.brokenString = "";
            for(this.i = 0; this.i < this.text.length; this.i ++){
                this.brokenString = this.brokenString + this.text[this.i][0] + "^";
            }

            this.choiceLineLengthArr = [1];
            // This will contain the number of lines each choice takes up

            this.brokenString = this.textSplit(this.brokenString);
        }
    }
    textSplit(splitText){
        // Given string splitText, this function adds # signs where line breaks
        // Should be

        this.splitText = splitText;
        //Divide the text into an array containing the appropriate spaces

        // First split the text into an array of words.
        this.wordArray = [];
        this.wordArrayIdx = 0;
        this.word = "";
        for(this.i = 0; this.i < this.splitText.length; this.i ++){
            if(this.splitText[this.i] == "ㅏ" ||
              this.splitText[this.i] == "ㅅ" ||
              this.splitText[this.i] == "+"){
                // If you encounter a color code, ignore it... since it's not word length
                // Or if it's a + meaning wait
                continue;
            } else if(this.splitText.charAt(this.i) == " " || this.splitText.charAt(this.i) == "^"){ 
            //treat the carrot like a space for choice text
                this.wordArray.push(this.word);
                this.word = "";
                this.wordArrayIdx ++;
            } else {
                this.word = this.word + this.splitText.charAt(this.i);
            }
        }
        this.wordArray.push(this.word);

        // Now put the text on their respective lines
        this.nextWordIdx = 1;
        this.brokenString = "";
        this.charsUsed = 0;

        for(this.i = 0; this.i < this.splitText.length; this.i ++){
            if(this.splitText[this.i] == "^"){
                // If the program encounters a break between choices
                // Add the carrot to the string
                this.brokenString = this.brokenString + "^";
                // Reset all the variables... 
                this.charsUsed = 0;
                this.nextWordIdx ++;
                this.choiceLineLengthArr.push(1);

            } else if(this.splitText[this.i] == " "){ // If the next character is a space
                if(this.charsUsed + this.wordArray[this.nextWordIdx].length + 1 > this.maxLetters){
                //If adding a space and the next word will push the line over the maximum amount of chars,
                //then line break, and tell the program to reset no of chars used
                    this.brokenString = this.brokenString + "#";
                    this.charsUsed = 0;
                    this.nextWordIdx ++;

                    // If there are choices, update the number of lines in the array
                    if(typeof(this.text) == "object"){
                        this.choiceLineLengthArr[this.choiceLineLengthArr.length-1] ++;

                    }
                } else {
                    // Otherwise add a space
                    this.brokenString = this.brokenString + " ";
                    this.charsUsed ++;
                    this.nextWordIdx ++;
                }
            } else {
                // If the next charcter is not a space, just add it as usual
                this.brokenString = this.brokenString + this.splitText[this.i];

                // Then update the amount of visible characters used
                if(this.splitText[this.i] != "ㅏ" &&
                    this.splitText[this.i] != "ㅅ" &&
                    this.splitText[this.i] != "+"){
                    this.charsUsed ++;
                }
            }
        }

        if(typeof(this.text) == "string"){
            // Add the blinker if it's a choiceless message
            if(this.charsUsed < this.maxLetters){
                this.brokenString = this.brokenString + "|";
            } else if (this.charsUsed == this.maxLetters){
                this.brokenString = this.brokenString + "#|";
            }
        } else {
            // If there are choices, then the program needs to remember to take
            // Off the extra "1" that gets added at the end of the choice length array

            this.choiceLineLengthArr.pop();
        }

        return this.brokenString;
    }
    giveText(){
        // This function returns a string containing all the visible text
        // of the current dialogue
        // It should update every time you call it

        // If the dialogue is choiceless
        if(typeof(this.text) == "string"){
            // Takes the string with hashtags in it and determine which characters are gonna be visible
            // Given a certain frame

            this.hashTagCount = 0; // Keeps track of how many lines are made visible... no more than three
            this.currentString = "ㅏ"; // Is a string containing the visible characters... 
            // start with the assumption that the text will be white

            for(this.i = this.currLetter; this.i >= 0; this.i --){ 
            // Start at the current character and work backwards until you reach the begining of the string
            // Or you hit thrree lines... whichever one comes first
                if(this.brokenString[this.i] == "|"){ // If the program is on the blinker
                    if((this.blinkTimerI/this.blinkTimer) < 1){ 
                        // The first few frames will be the blinker
                        this.currentString = this.brokenString[this.i] + this.currentString;
                    }
                } else if(this.brokenString[this.i] == "#"){
                    this.hashTagCount ++;
                    if(this.hashTagCount == maxLines){ // If you hit three lines, break out of the loop
                        break;
                    } else {
                        this.currentString = this.brokenString[this.i] + this.currentString;
                    }
                } else {
                    this.currentString = this.brokenString[this.i] + this.currentString;
                }
            }

            if(this.currLetter < this.brokenString.length-1){ 
                // If the last letter has not been reached, update current letter
                if((this.currLetter + this.rate > this.brokenString.length-1 && this.rate != 1) || this.rate == 1){
                    // If updating (non-1 rate) letters will push the program past the string
                    // Or the program is still reading text slowly... update the letters
                    // by 1

                    // First play the beep sound
                    if(this.brokenString[this.currLetter] != "ㅏ" &&
                       this.brokenString[this.currLetter] != "ㅅ" &&
                        this.brokenString[this.currLetter] != "+"){
                        audioDic["dialoguebeep"].currentTime = 0;
                        audioDic["dialoguebeep"].play();
                    }
                    this.currLetter ++;
                } else {
                    // Otherwise, it is safe to update letters two at a time.

                    // First play the beep sound
                    if(this.brokenString[this.currLetter] != "ㅏ" &&
                       this.brokenString[this.currLetter] != "ㅅ" &&
                        this.brokenString[this.currLetter] != "+"){
                        audioDic["dialoguebeep"].currentTime = 0;
                        audioDic["dialoguebeep"].play();
                    }
                    this.currLetter += this.rate;
                }

            } else {
                // If the program has already reached the last letter,
                // Start cycling through the blinker animation
                this.blinkTimerI = (this.blinkTimerI + 1) % (this.blinkTimer * 2); 
                // Blink timer i will start over once it has looped through all the
                // Visible and invisible frames
            }



            return this.currentString;
        } else {
            // If there are choices, place a color at the currently selected choice plus
            // The char code for white... because the default color char is white

            this.carrotCount = 0;
            if(this.currentSelect == 0){
                // start out with orange text if the first choice is selected
                this.currentString = "ㅏ"
            } else {
                this.currentString = "ㅅ"; // Otherwise the defalt value is white
            }

            for(this.i = 0; this.i < this.brokenString.length; this.i ++){
                if(this.brokenString[this.i] == "^"){
                    // If you encounter a choice parser (carrot),
                    // And it's the current choice, set the color to orange
                    // If it's the one after the current choice, set the color
                    // Back to white
                    this.carrotCount ++;
                    this.currentString = this.currentString + this.brokenString[this.i];
                    if(this.carrotCount == this.currentSelect){
                        this.currentString = this.currentString + "ㅏ";
                    } else if(this.carrotCount == this.currentSelect + 1){
                        this.currentString = this.currentString + "ㅅ";
                    }
                } else {
                    // Otherwise just add the letters like usual
                    this.currentString = this.currentString + this.brokenString[this.i];
                }
            }
            return this.currentString;

        }
    }
    appear(){
        // Brings up the current dialogue box
        currDialogue = this;
    }
    procede(){
        // If the dialogue is finished, this function will move to the next event, 
        // whether it be a dialogue or a function

        if(this.pushFlag == true){
            //audioDic["select"].currentTime = 0;
            //audioDic["select"].play();
        // If the program has reached the last letter and space has been pushed
            this.reset(); 
            // Reset the variables for this particular box, just in case it gets
            // opened again
            if(typeof(this.next) == "function"){
                // If the next variable is a function, as opposed to a dialogue,
                // play the function.
                this.close();
                this.next();

            } else if(this.next == null){
                this.close();
                
            } else if(this.next.constructor.name == "choiceBank"){
                // If it's a choice bank
                this.close();
                this.next.activate();
                
            } else if(typeof(this.next) == "object"){
                // If it's another dialogue
                
                this.close();
                this.next.appear();
                
            } else {
                // Otherwise proced to the next dialogue
                // Reset the variables, and procede to whichever dialogue event is next
                currDialogue = this.next;
                
            }
        } else if(typeof(this.text) == "object"){ //otherwise, only act if its a choice box - which doesn't use pushflag
            // Reset the variables for this particular box, just in case it gets
            // opened again
            //audioDic["select"].currentTime = 0;
            //audioDic["select"].play();
            if(typeof(this.text[this.currentSelect][1]) == "function"){
                // If the next variable is a function, as opposed to a dialogue,
                // play the function.

                currDialogue = null;
                this.text[this.currentSelect][1]();
            } else if(typeof(this.text[this.currentSelect][1]) == "object"){
                // If it's a choiceBank, then the current choice box is a choiceBank
                // and you just need to play the current choiceBank's ending function, using the appropriate choice.
                
                currDialogue = null;
                this.text[this.currentSelect][1].endFunc(this.currentSelect);
            } else if(typeof(this.text[this.currentSelect][1]) == "string"){
                // The next dialogue is a plain old dialogue
                currDialogue = dialogueDic[this.text[this.currentSelect][1]];
            } else {
                currDialogue = this.text[this.currentSelect][1];
            }
            this.currentSelect = 0;
        }
    }
    skip(){
        if(typeof(this.text) == "string"){
        // If the program has reached the last letter and space has been pushed
            this.reset(); 
            // Reset the variables for this particular box, just in case it gets
            // opened again
            if(typeof(this.next) == "function"){
                // If the next variable is a function, as opposed to a dialogue,
                // play the function.
                this.close();
                this.next();

            } else if(this.next == null){
                this.close();
                
            } else if(this.next.constructor.name == "choiceBank"){
                // If it's a choice bank
                this.close();
                this.next.activate();
                
            } else if(typeof(this.next) == "object"){
                // If it's another dialogue
                
                this.close();
                this.next.appear();
                
            } else {
                // Otherwise proced to the next dialogue
                // Reset the variables, and procede to whichever dialogue event is next
                currDialogue = this.next;
                
            }
        } else if(typeof(this.text) == "object"){ //otherwise, only act if its a choice box - which doesn't use pushflag
            // Reset the variables for this particular box, just in case it gets
            // opened again
            if(typeof(this.text[this.currentSelect][1]) == "function"){
                // If the next variable is a function, as opposed to a dialogue,
                // play the function.

                currDialogue = null;
                this.text[this.currentSelect][1]();
            } else if(typeof(this.text[this.currentSelect][1]) == "object"){
                // If it's a choiceBank, then the current choice box is a choiceBank
                // and you just need to play the current choiceBank's ending function, using the appropriate choice.
                
                currDialogue = null;
                this.text[this.currentSelect][1].endFunc(this.currentSelect);
            } else if(typeof(this.text[this.currentSelect][1]) == "string"){
                // The next dialogue is a plain old dialogue
                
                currDialogue = dialogueDic[this.text[this.currentSelect][1]];
            } else {
                currDialogue = this.text[this.currentSelect][1];
            }
            this.currentSelect = 0;
        }
    }
    changeSelect(direction){
        // Allows the player to navigate selections

        this.direction = direction;
        if(this.direction == "down"){
            if(this.currentSelect < this.text.length - 1){ 
                // If there are choices to move down to
                audioDic["select"].currentTime = 0;
                audioDic["select"].play();
                this.currentSelect ++;
            }
        } else if(this.direction == "up"){
            if(this.currentSelect > 0){
                // If there are choices to move up to
                audioDic["select"].currentTime = 0;
                audioDic["select"].play();
                this.currentSelect --;
            }
        }

    }
    reset(){
        // Resets all the variables for this dialogue box

        this.hashTagCount = 0;
        this.currentString = "";
        this.currLetter = 0;
        this.blinkerTimerI = 0;
        this.pushFlag = false;
    }
    close(){
        // Closes the dialogue

        this.reset();
        currDialogue = null;
    }
}