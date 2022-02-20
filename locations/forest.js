eggplantflowerobj = new Object(
    "eggplantflowerobj",
    {
        "still": "eggplantbush/0",
        "noflower": "eggplantbush/1"
    },
    function(){},
    function(){
        this.changeFace("noflower");
        this.selectType = "none";
        say([
            [null,"There is a flower on the bush. You decide to pick it off and keep it.",
             function(){ 
                 obtainItem(eggplantflower); 
             }]
        ]);
    },
    [[0,37],[55,37]],
    "select",
    [0,37,55,5],
    null,
    [
        [[0,37],[55,37]]
    ]
);

forest = new Location(
    "forest",
    [
        ["0forest",0],
        ["1forest",0],
        ["2forest",[[120,120],[canvas.width,120]]],
        ["3forest",[[120,143],[canvas.width,143]]],
        ["4forest",[[131,154],[10,110]]],
        ["5forest",1000]
    ],
    [ // barriers
        
        //bush and foliage
        [[295,103],[124,103]],
        [[124,103],[120,109]],
        [[120,109],[50,109]],
        [[50,109],[50,98]],
        [[50,98],[0,103]],
        
        //left tree
        [[0,121],[30,118]],
        [[30,118],[69,140]],
        [[69,140],[135,155]],
        [[135,155],[73,122]],
        [[73,123],[23,110]],
        [[23,110],[0,110]],
        
        //center tree
        [[138,120],[174,112]],
        [[174,112],[208,112]],
        [[208,112],[219,126]],
        [[219,126],[185,126]],
        [[185,126],[138,120]],
        
        //right tree
        [[225,143],[254,136]],
        [[254,136],[295,136]],
        [[225,143],[295,147]],
        
        [[-10,stageHeight+10],[295 + 10,stageHeight+10]]
    ],
    [ // event lines
        [
            [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]], 
                function(){
                    if(player.y < 54){
                        if(flagDic["DAY 11 HELPERS"] == "both" && flagDic["story"] == "DAY 11 night"){
                            changeLocation(fountain,-7,78,null);
                        } else {
                            changeLocation(fountain,-7,54,null);
                        }
                        
                    } else {
                        changeLocation(fountain,-7,null,null);
                    }
                }
        ],
        [
            [[-8,0],[-8,stageHeight + 10]], 
                function(){
                    changeLocation(jamies,canvas.width-8,null,null);
                }
        ],
        [
            [[227,0],[227,stageHeight + 10]],
                function(){
                    if(flagDic["DAY 11 jerk"] == true){
                        dialogueDic["DAY 11 jerk"].appear();
                        flagDic["DAY 11 jerk"] = false;
                    }
                }
        ]
        
    ],
    function(){
        //what happens when you enter the screen.
        if(this.firstTime == false){
            this.firstTime = true;
        }
        /*if(player.x <= 0){ // coming in from the left side of the screen... the rules are a little different
            if(player.y >= 51){
                currLoc.graphArr[4][1] = 1;
            } else {
                currLoc.graphArr[4][1] = 155;
            }
        }*/
    },
    [
        /*[
            new Object(
                "priority",
                "blinkerinv",
                function(){
                    if(player.y >= 85){
                        if(player.x > 134){
                            currLoc.graphArr[4][1] = 155;
                        } else {
                            currLoc.graphArr[4][1] = 1;
                        }
                    }
                }
            ),0,0
        ],*/
        [
            eggplantflowerobj,180,100
        ]
        
    ],
    "day/night"
)
