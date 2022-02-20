hallwayii = new Location(
    "hallwayii",
    [0,165],
    [ // barriers
        [[295,185],[230,144]],
        [[230,144],[0,144]],
        
        [[0,stageHeight+10],[295,stageHeight+10]],
        //[[0,stageHeight],[0,stageHeight+10]],
        [[295,stageHeight],[295,stageHeight+10]]
    ],
    [ // event lines
        [
            [[-8,0],[-8,stageHeight + 10]], 
                function(){
                    changeLocation(hallwayi,canvas.width-8,null,null);
                }
        ],
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
    },
    [
        [
            new Object(
                "hallwayii_officedoor",
                "hallwayii_officedoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    //if(flagDic["story"] == "DAY 1"){
                    //    say("This is an office. The classroom is the first door near the enterance.");
                    //} else 
                    if(flagDic["story"] == "DAY 8 night"){
                        say("It looks like Mr. Face locked the door on his way out.")
                    } else {
                        enterDoor(office,200,128,null,"stillaway");
                    }
                    
                },
                [[0,1],[1,1]],
                "select",
                [0,66,33,7],
                [12,-8]
            ),79,78
        ]
    ]
)
