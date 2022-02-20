classroomtrap = new Location(
    "classroomtrap",
    [0,147,150,178,1000],
    [ // barriers
        [[231,144],[0,143]],
        [[230,144],[295,185]],

        [[0,184],[295,184]],

        [[0,178],[239,178]],

        [[228,175],[13,175]],

        [[228,175],[239,178]],

        [[10,185],[49,147]],

        [[49,147],[0,147]],

        [[44,144],[0,176]],

        [[122,150],[14,150]],
        [[122,150],[118,164]],

        [[118,164],[0,164]]
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
    },
    [
        [
            new Object(
                "classroomtrap_door",
                "classroomtrap_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(grubhigher,115,19,smallastronaut,"still");
                },
                [[0,1],[1,1]],
                "select",
                [0,65,37,7],
                [16,-8]
            ),190,78
        ],
        [
            new Object(
                "sleepingviolet",
                animationDic["sleepingviolet"],
                function(){},
                function(){
                    dialogueDic["DAY 5 DREAM"].appear();
                },
                [[0,30],[59,30]],
                "select",
                [0,0,59,50]
            ),57,123
        ]
    ],
    "night"
)
