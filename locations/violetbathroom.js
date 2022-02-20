violetstub = new Object(
    "violetbathroom_tub",
    {
        "still": "violettub/empty",
        "full": "violettub/full"
    },
    function(){},
    function(){
        enterDoor(violetbedroom,74,123,bigplayer,"stillaway");
    },
    [[0,50],[1,50]]
);

violetbathroom = new Location(
    "violetbathroom",
    [0],
    [ // barriers
        //walls
        [[0,156],[50,121]],
        [[50,121],[245,121]],
        [[245,121],[295,154]],
        
        
        //front of bath
        [[91,165],[103,176]],
        [[103,176],[124,184]],
        [[124,184],[170,184]],
        [[170,184],[190,177]],
        [[190,177],[204,165]],
        
        //back of bath
        [[91,165],[109,146]],
        [[109,146],[131,136]],
        [[131,136],[161,136]],
        [[161,136],[184,144]],
        [[184,144],[203,164]],
        
        //trap
        [[0,stageHeight + 10],[295,stageHeight + 10]],
        [[0,156],[0,stageHeight + 10]],
        [[295,154],[295,stageHeight + 10]]
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
                audioDic["disgusting"].play();
                violetstub.changeFace("full")
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "violetbathroom_door",
                "violetbathroom_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(violetbedroom,74,123,bigplayer,"stillaway");
                },
                [[0,1],[1,1]],
                "select",
                [0,64,61,5],
                [27,-7]
            ),113,55
        ],
        [
            violetstub,91,115
        ]
    ]
)
