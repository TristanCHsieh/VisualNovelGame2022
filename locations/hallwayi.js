hallwayi = new Location(
    "hallwayi",
    [0],
    [ // barriers
        [[0,185],[65,144]],
        [[65,144],[295,144]],
        
        [[0,stageHeight+10],[295,stageHeight+10]],
        [[0,stageHeight],[0,stageHeight+10]],
        //[[295,stageHeight],[295,stageHeight+10]]
    ],
    [ // event lines
        [
            [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]], 
                function(){
                    changeLocation(hallwayii,-7,null,null);
                }
        ],
        [
            [[90,0],[90,stageHeight + 10]],
                function(){
                    if(flagDic["story"] == "DAY 4 violet" && flagDic["DAY4CLASS BIRTHDAY come"] == undefined){
                        violet.phase ++;
                    } else if(flagDic["story"] == "DAY 5 violet"){
                        dialogueDic["DAY 5 TEXTS"].appear();
                        flagDic["story"] = "DAY 5 night";
                    } else if(flagDic["story"] == "DAY 8 mrface"){
                        mrface.phase ++;
                    } else if(flagDic["story"] == "DAY 9 violet"){
                        dialogueDic["DAY 9 TEXTS"].appear();
                        flagDic["story"] = "DAY 9 hangout";
                    }
                }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(this.hasEvent == true){
            
            if(flagDic["story"] == "DAY 4 violet" && flagDic["DAY4CLASS BIRTHDAY come"] != true){
                violet.selectType = "none";
                violet.appear(76,94);
            }
            if(flagDic["story"] == "DAY 8 mrface"){
                mrface.selectType = "select";
                mrface.appear(150,100);
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "hallwayi_classroomdoor",
                "hallwayi_classroomdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(classroom,202,90,null,"stillforward");
                },
                [[0,1],[1,1]],
                "select",
                [0,65,37,7],
                [16,-8]
            ),120,78
        ],
        [
            new Object(
                "hallwayi_closetdoor",
                "hallwayi_closetdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(closet,144,97,bigplayer,"stillaway");
                },
                [[0,1],[1,1]],
                "select",
                [0,66,33,7],
                [12,-8]
            ),170,78
        ],
        [
            new Object(
                "hallwayi_door",
                "hallwayi_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(school,140,30,null,"stillforward");
                },
                [[0,1],[1,1]],
                "select",
                [0,81,46,25],
                [18,-10]
            ),9,69
        ]
    ],
    "day/nightinside"
)
