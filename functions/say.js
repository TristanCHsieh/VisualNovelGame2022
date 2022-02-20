/*

    Feed this an array of words and it will say it. You can also a feed it a single string and it will say that one string with no avatar

*/

function say(dialogueList){
    
    if(typeof(dialogueList) == "string"){
        new Dialogue(
            "",
            dialogueList,
            null,
            null
        ).appear();
        
    } else {

        dialogueList = processWords(dialogueList,"arr");
        dialogueList[0].appear();
    
    }

}