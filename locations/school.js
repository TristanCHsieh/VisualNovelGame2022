school = new Location(
    "school",
    [
        ["0school",-1000],
        ["1school",144],
        ["2school",[[109,134],[159,144]]],
        ["2school",[[160,143.5],[164,143.5]]], // This breaks the sorting algorithm a little bit, if you are overlapping this line then the railing will be in front no matter what. 
        ["3school",[[221,134],[171,82]]],
        ["3school",[[222,134],[230,134]]]
    ],
    [ // barriers
        [[109,134],[159,144]],
        [[159,144],[163,145]],
        [[221,134],[171,82]],
        [[219,83],[240,84]],
        [[240,84],[294,114]],
        [[219,83],[109,83]],

        [[109,70],[139,139]],
        [[112,134],[0,134]],
        [[10,134],[19,144]],
        [[0,144],[19,144]],
        
        
        // Keeps the player from going off screen
        [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]],
        [[-8,0],[-8,stageHeight + 10]],
        [[0,stageHeight + 10],[canvas.width,stageHeight + 10]]
    ],
    [
        [
            [[-10,150],[305,150]],
            function(){
                if(flagDic["story"] == "DAY 11 lexi"){
                    dialogueDic["DAY 11 LEXI"].appear();
                } else if(flagDic["story"] == "DAY 12 class" && flagDic["LABYRINTH lexi"] != true){
                    dialogueDic["DAY 12 LEXI"].appear();
                }
            }
        ]
    ],
    function(){
        if(this.firstTime == false){ 
            this.firstTime = true;
        }
        
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 11 lexi"){
                lexi.changeFace("stillforward");
                lexi.appear(60,100);
            } else if(flagDic["story"] == "DAY 12 class" && flagDic["LABYRINTH lexi"] != true){
                lexi.changeFace("stillforward");
                lexi.appear(60,100);
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "school_door",
                "school_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    if(
                        flagDic["story"] == "DAY 6" ||
                        flagDic["story"] == "DAY 6 night" ||
                        flagDic["story"] == "DAY 7" ||
                        flagDic["story"] == "DAY 7 kate" ||
                        flagDic["story"] == "DAY 7 night"
                      ){
                        say("The door is locked. School isn't open on the weekends");
                    } else {
                        enterDoor(hallwayi,50,100,null,"still");
                    }
                },
                [[0,-20],[72,-20]],
                "select",
                [0,57,72,10],
                [31,-10]
            ),131,26
        ],
        [
            // car
            celestecar,115,138
        ]
    ],
    "day/night"
)
