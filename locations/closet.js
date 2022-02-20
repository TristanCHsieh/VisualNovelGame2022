closet = new Location(
    "closet",
    [0,139,144,172],
    [
        [[219,171],[78,171]],
        [[125,137],[94,179]],
        [[180,144],[203,180]],
        [[180,144],[231,144]],
        [[124,137],[68,137]],
        [[113,134],[89,154]],
        [[192,134],[206,149]],
        [[112,134],[194,134]]
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
                "closetexit",
                "blinkerinv",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(hallwayi,178,90,smallplayer,"stillforward");
                },
                [[0,1],[1,1]],
                "select",
                [0,0,39,4],
                [15,-78]
            ),133,167
        ]
    ],
    "night"
)
