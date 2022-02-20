/*

    Takes an array of arrays in the form of [avatar, text, next dialogue, label]
    and either returns an array of dialogue objects or a dictionary of dialogue objects.
    "dic" for dictionary or "arr" for array

*/


function processWords(words, type){

    
    var tempDialogueDic = {};
    
    for(var wordIdx = words.length - 1; wordIdx >= 0; wordIdx --){

        if(typeof(words[wordIdx][1]) == "object"){

            //Come up with a unique name for the dialogue
            if(words[wordIdx].length >= 4){ // if the name part of the array is populated
                tempDialogueString = words[wordIdx][3];
            } else {
                tempDialogueString = words[wordIdx][1][0][0].substr(0,10);
                while(tempDialogueString in tempDialogueDic){
                    tempDialogueString = tempDialogueString + "*";
                }
            }

            words[wordIdx].push([tempDialogueString]); // I put it in an array, because you don't want this to be confused with the programmer explicitly saying what the next dialogue should be

            words[wordIdx] = new Dialogue(
                tempDialogueString,
                words[wordIdx][1],
                words[wordIdx][0],
                null
            );

        } else {

            //Come up with a unique name for the dialogue
            if(words[wordIdx].length >= 4){ // if the name part of the array is populated
                tempDialogueString = words[wordIdx][3];
            } else {
                tempDialogueString = words[wordIdx][1].substr(0,10);
                while(tempDialogueString in tempDialogueDic){
                    tempDialogueString = tempDialogueString + "*";
                }
            }
            words[wordIdx].push([tempDialogueString]);

            if(words[wordIdx].length >= 3 && 
               (typeof(words[wordIdx][2]) == "function" || 
                (words[wordIdx][2] != null && words[wordIdx][2].constructor.name == "choiceBank"))){ // You can't read constructor of null
                // If there is an alternate function explicitly defined by the user or a choicebank
                words[wordIdx] = new Dialogue(
                    tempDialogueString,
                    words[wordIdx][1],
                    words[wordIdx][0],
                    words[wordIdx][2]
                );
            } else if(words[wordIdx].length >= 3 && typeof(words[wordIdx][2]) == "string"){
                // If the name of the next function is explicitly stated 
                wordsTempNextString = words[wordIdx][2]; // define it first before "words" gets replaced
                
                words[wordIdx] = new Dialogue(
                    tempDialogueString,
                    words[wordIdx][1],
                    words[wordIdx][0],
                    function(){
                        tempDialogueDic[this.nextString].appear();  
                    }
                );
                
                words[wordIdx].nextString = wordsTempNextString;
            } else if(words[wordIdx].length >= 3 && words[wordIdx][2] == null){
                // If you are on the last dialogue
                // If the dialogue has a name, but is not the last dialogue... the value can be
                // any non-null value you want... but for the most part I'll use "false"
                words[wordIdx] = new Dialogue(
                    tempDialogueString,
                    words[wordIdx][1],
                    words[wordIdx][0],
                    function(){ }
                );
            } else {
                // If you just want to proccede to the next dialogue
                words[wordIdx] = new Dialogue(
                    tempDialogueString,
                    words[wordIdx][1],
                    words[wordIdx][0],
                    function(){ 
                        tempDialogueDic[this.nextString].appear();
                    }
                );

                words[wordIdx].nextString = words[wordIdx + 1].name;
                // I placed this outside of the object, so that its value doesn't change when i changes
            }
        }
        
        tempDialogueDic[tempDialogueString] = words[wordIdx];
    }
    
    if(type == "dic"){
        return tempDialogueDic;
    } else {
        return words;
    }
}