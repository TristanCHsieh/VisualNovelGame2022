violetbedroom_bottomdoor = new Object(
    "violetbedroom_bottomdoor",
    "blinkerinv",
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
        if(this.unLocked == undefined){
            this.unLocked = true;
        }
    },
    function(){
        if(this.unLocked == false){
            say("The door is locked...");
        } else if(this.unLocked == true){
            enterDoor(violetbathroom,140,68,smallplayer,"stillforward");;
        }
    },
    [[0,1],[1,1]],
    "select",
    [0,5,80,10],
    [37,-65]
);

violetbedroom = new Location(
    "violetbedroom",
    [0,152,164,159,1000,1000],
    [ // barriers
        [[0,175],[58,139]],
        [[58,139],[123,139]],
        [[123,139],[113,163]],
        [[113,163],[208,163]],
        [[208,163],[191,150]],
        [[191,150],[216,152]],
        [[216,152],[204,138]],
        [[204,138],[234,138]],
        [[233,138],[295,175]],

        [[225,157],[243,189]],
        [[225,157],[283,157]],

        [[213,179],[238,179]],
        
        [[0,stageHeight + 10],[213,stageHeight + 10]],
        [[0,stageHeight - 10],[0,stageHeight + 10]],
        [[213,179],[213,stageHeight + 10]]
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
        
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 9 hangout"){
                violetbedroom_bottomdoor.unLocked = false;
            }
            this.hasEvent = false;
        }
        //what happens when you enter the screen.
    },
    [
        [
            new Object(
                "violetsbedroom_leftdoor",
                "violetsbedroom_leftdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(violetdownstairs,250,59,miniplayer,"stillleft");   
                },
                [[0,1],[1,1]],
                "select",
                [0,83,49,30],
                [22,-5]
            ),8,58
        ],
        [
            violetbedroom_bottomdoor,43,180
        ]
    ]
)
