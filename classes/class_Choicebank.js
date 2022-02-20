class choiceBank {
/*
    Sometimes the player will have multiple choices that they can keep returning to. For example, they can choose the first choice, go down that path
    and return to the same choices except minus the first choice. Etc. until you deviate from the choicebank or you run out of "tokens"
*/
    constructor(choiceArr, outro, count){
        this.choiceArr = choiceArr;
        
        // You can use the following for setting a count limit. For example, if the player has two options, the player
        // will get to select twice from the choice bank
        this.count = count;
        this.outro = outro;
        this.flags = {};
    }
    
    activate(){ // Brings the choice box up
        if(this.count != null){ // only do it if there is a limited number of choices you can choose from
            if(this.count == 0){ //you've exauhsted all your advice tokens
                
                if(typeof(this.outro) == "string"){ //if the last choice is a string, that's what it is
                    dialogueDic[this.outro].appear();
                } else { // function, play the function
                    console.log("outro should play.")
                    this.outro();
                }
                
                return;
                
            }
        }
        
        this.tempArray = [null,[]];

        for(this.i = 0; this.i < this.choiceArr.length; this.i ++){
            this.tempArray[1].push([this.choiceArr[this.i][0],this]);
        }

        new Dialogue(
            "choiceBank",
            this.tempArray[1],
            this.tempArray[0],
            null
        ).appear();
    }
    
    endFunc(currChoice){ // Proccedes with the choice that the user has imputed
        if(this.count != null){
           this.count --;
        }
        
        // Take the next action... either play the next dialogue or execute the next function    
        if(typeof(this.choiceArr[currChoice][1]) == "string"){
            // it's another dialogue
            dialogueDic[this.choiceArr[currChoice][1]].appear();
            this.choiceArr.splice(currChoice,1);
        } else {
            // it's a user-defined function
            this.choiceArr[currChoice][1]();
            this.choiceArr.splice(currChoice,1);
        }
        
    }
    
}