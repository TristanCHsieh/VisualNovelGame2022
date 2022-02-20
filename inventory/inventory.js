basiceggplant = new Inventory(
    "Basic Eggplant",
    "A whole eggplant. Looks like mom took all the good snacks with her.",
    "Eat eggplant",
    "basiceggplant",
    function(){
        say("You eat the eggplant.");
        basiceggplant.drop();
    }
);

shinyeggplant = new Inventory(
    "Sectorese Eggplant",
    "A longer type of shiny eggplant only found in the Magenta Sector.",
    "Eat eggplant",
    "shinyeggplant",
    function(){
        say("You eat the eggplant.");
        shinyeggplant.drop();
    }
);

noneuclidianeggplant = new Inventory(
    "Non-euclidian Eggplant",
    "A mathematically generated eggplant that doubles as a map of the universe.",
    "Look at map",
    "noneuclidianeggplant",
    function(){
        noneuclidianeggplant.drop();
    }
);


eggplantflower = new Inventory(
    "Flower of Eggplant",
    "The flowers of an eggplant bush.",
    "Eat flower",
    "eggplantflower",
    function(){
        say("You eat the flower.");
        eggplantflower.drop();
    }
);

ashidanpumpkin = new Inventory(
    "Ashidan Pumpkin",
    "A small pumpkin recieved in the underworld of Ashida.",
    "Eat pumpkin",
    "ashidanpumpkin",
    function(){
        say("You eat the pumpkin.");
        ashidanpumpkin.drop();
    }
);

goldenbanana = new Inventory(
    "Sectorese Bananas",
    "A specific type of golden Banana only grown in the Magenta Sector.",
    "Eat bananas",
    "goldenbanana",
    function(){
        say("You eat the bananas.");
        goldenbanana.drop();
    }
);

katesheartinv = new Inventory(
    "Kate's Heart",
    "Kate's heart and soul. It's cold and grey... not at all like you imagined it.",
    "Crush heart in your hand",
    "katesheart",
    function(){
        say([
            [null,"You squeeze Kate's heart in your hand. It's soft and fragile and gives in easily to the touch."],
            [null,"You can sense it. Kate has died.",null]
        ]);
        
        increaseScore(45);
        
        if(currLoc == classroom && flagDic["DAY 11 ASHIDA"] == "slave"){
            pauseGame();
            katesitting.changeFace("dead");
        } else {
            flagDic["DAY 11 ASHIDA"] = "scare"; // Kate can no longer be your slave if you crush his heart
        }
        
        katesheartinv.drop();
    }
);

powder = new Inventory(
    "Powder",
    "The powder Mr. Face gave you.",
    "Eat powder",
    "powder",
    function(){
        powder.drop();
    }
);

phone = new Inventory(
    "Smartphone",
    "Your smart phone. You've had this version for quite a while now, but you don't have the heart to buy a new one just yet.",
    "Use phone to text someone",
    "phone",
    function(){
        say("You have no contacts to text!");
    }
)