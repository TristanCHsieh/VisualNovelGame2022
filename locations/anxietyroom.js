anxietydoor = new Object(
    "anxietydoor/door",
    {
        "still": "anxietydoor/door",
        "open": new Animation("anxietydooropen",[30,1],false,function(){
            katesanxiety.appear(35,84);
            katesanxiety.phase = 1;
            katesanxiety.target = labyrinthLives[labyrinthLivesIdx];
        })
    },
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
    },
    function(){
        // behanvior when the player interacts with the object
        
        if(this.locked == undefined){
            this.locked = false;
        }
        
        if(this.locked == true){
            say("It looks like Kate's anxiety has had its fill of murder for today");
        } else if(this.locked == false){
            this.changeFace("open");
            audioDic["disgusting"].play();
            sectorloop();
            currLoc.filterTag = "day";
            this.selectType = "none";
        }
        
        
    },
    [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
    "select",
    [0,107 - 22,36,22], // rectangle of interaction
    [15,-10] //blinker
);

anxietydoorlocked = new Object(
    "anxietydoorlocked/door",
    "anxietydoorlocked/door",
    function(){
    },
    function(){
        if(this.locked == undefined){
            this.locked = true;
        }
        
        if(this.locked == true){
            say("The door has locked behind you!");
        } else if(this.locked == false){
            enterDoor(labdic[labCoords[0]][labCoords[1] + 2],50,87,null,"still");
        }
    },
    [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
    "select",
    [0,107 - 22,36,22], // rectangle of interaction
    [15,-10] //blinker
);


anxietyroom = new Location(
    "anxietyroom",
    [0,1000],
    [
        [[0,178],[66,136]],
        [[66,136],[231,136]],
        [[231,136],[295,178]],

        [[0,178],[0,192]],
        [[295,178],[295,192]],
        [[0,192],[295,192]]
    ],
    [ // event lines
        /*[
            [[x1,y2],[x2,y2]],
            function(){
                //what happens when you cross the line
            }
        ]*/
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        //what happens when you enter the screen.
        
        
        
        labCoords = this.labCoords;
    },
    [
        [
            anxietydoorlocked,245,62
        ],
        [
            anxietydoor,15,62
        ]
    ],
    "night"
)
