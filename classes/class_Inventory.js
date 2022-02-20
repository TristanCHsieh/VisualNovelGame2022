class Inventory {
    constructor(name,description,choice,picture,action){
        this.name = name;
        this.description = description; // Description of the item
        this.choice = choice; // What will the player be give the option to do (ex. eat eggplant)
        this.picture = picture; // String - how will the item show up in the inventory box
        //this.action = action; // "this" doesn't work inside functions contained in arrays?
        // action is what happens when the item is used

        this.obtained = false; // Becomes true when the item is in the players inventory

        this.choiceDialogue = new Dialogue(
            "choiceDialogue",
            [
                [this.choice,function(){ currItem = 0; currInvFrame = 0; inventoryOpened = false; action(); }],
                ["Return to invetory",function(){ currDialogue = inventory[currItem].descDialogue; }]
            ],
            null,
            null
        ); // Choice the user is given to use the item or not

        this.descDialogue = new Dialogue(
            "descDialogue",
            this.description,
            null,
            this.choiceDialogue
        ); // The Dialogue object that represents the items description
    }
    resetText(){
    // Resets the description and the choices for when the player opens the dialogue again
        this.descDialogue.reset();
        this.choiceDialogue.reset();
    }
    drop(){
    // Removes the item from the inventory
        this.obtained = false;
        this.disIdx = inventory.indexOf(this);
        inventory.splice(this.disIdx, 1); 
    }
}