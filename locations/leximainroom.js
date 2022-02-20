lexisceneobject = new Object(
    "lexisceneobject",
    {
        "still": "lexistudyscene/full",
        "empty": "lexistudyscene/celeste",
        "nolexi": "lexistudyscene/nolexi",
        "katestanding": "lexistudyscene/katestanding",
        "celestelexi": "lexistudyscene/celestelexi",
    },
    function(){},
    function(){},
    [[0,187],[1,187]]
)


leximainroom = new Location(
    "leximainroom",
    [0,161,186,171,185,1000],
    [ // barriers
        [[295,185],[207,129]],
        [[179,154],[170,154]],
        [[170,154],[174,161]],
        [[174,161],[77,161]],
        [[77,161],[84,153]],
        [[84,153],[46,153]],
        [[46,153],[0,185]],
        
        
        // space between table and south couch
        [[73,185],[172,185]],
        [[46,200],[185,200]],
        
        //top and right side of table
        [[173,185],[169,171]],
        [[169,171],[51,171]],
        
        //front of left couch
        [[86,171],[71,200]],
        
        //back of left couch
        [[18,185],[52,171]],
        
        //trap
        [[0,205],[295,205]],
        [[0,205],[0,185]],
        [[185,205],[185,200]],

        [[18,185],[18,195]],
        
        [[295,205],[295,185]],
    ],
    [ // event lines
        [
            [[179,150],[247,150]],
            function(){
                
                player.delta = player.moveInc;
                player.direction = "x";
                player.changeFace("walking");
                changeLocation(lexihallway,20,100,null);
            }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 10 lexi"){
                lexibig.changeFace("stillforward");
                lexibig.appear(177,93);
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "leximainroom_door",
                "leximainroom_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    if(flagDic["story"] == "DAY 9 dream"){
                        say("The door is locked. Everyone else in the house is asleep except for Lexi.")
                    } else {
                        enterDoor(lexishouse,102,72,smallplayer,"stillforward");
                    }
                    
                },
                [[0,1],[1,1]],
                "select",
                [0,90,32,19],
                [12,-7]
            ),256,71
        ]
    ],
    "day/nightinside"
)
