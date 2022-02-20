office = new Location(
    "office",
    [0,145,150,165,171,1000],
    [ // barriers
        
        //room
        [[255,172],[201,129]],
        [[36,171],[98,127]],
        [[81,138],[214,138]],
        
        [[36,171],[36,185]],
        [[254,172],[254,185]],
        
        [[36,185],[254,185]],
        
        //cabinet
        [[239,156],[219,157]],
        [[219,157],[199,138]],
        
        //table
        [[77,165],[212,165]],
        [[212,165],[201,155]],
        [[201,155],[88,155]],
        [[88,155],[77,165]],
        
        //student chair
        [[117,171],[139,171]],
        [[139,171],[142,168]],
        [[142,168],[121,168]],
        [[121,168],[117,171]],
        
        //teacher chair
        [[137,150],[161,150]],
        
        //desk with plant
        [[101,145],[119,129]],
        [[101,145],[121,145]],
        [[121,145],[133,131]]
        
        
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
            
            if(flagDic["story"] == "DAY 8 office"){
                new Object(
                    "emptyseat",
                    {
                        "still":"blinkerinv",
                        "sitting": new Animation("celestesitting",[10,10],false,function(){ dialogueDic["DAY 8 OFFICE"].appear(); })
                    },
                    function(){},
                    function(){
                        this.changeFace("sitting");
                        player.relocate(1000,1000);
                        this.relocate(null,166);
                        mrface.phase = undefined;
                        this.selectType = "none";
                    },
                    [[0,1],[1,1]],
                    "select",
                    [0,0,20,40],
                    [13,-55]
                ).appear(120,160);
            } else if(flagDic["story"] == "DAY 12 class"){
                new Object(
                    "emptyseat",
                    {
                        "still": "blinkerinv",
                        "sitting": new Animation("celestesitting",[10,10],false,function(){ dialogueDic["DAY 12 MR. FACE"].appear(); })
                    },
                    function(){},
                    function(){
                        this.changeFace("sitting");
                        player.relocate(1000,1000);
                        this.relocate(null,166);
                        mrface.phase = undefined;
                        this.selectType = "none";
                    },
                    [[0,1],[1,1]],
                    "select",
                    [0,0,20,40],
                    [13,-55]
                ).appear(120,160);
                mrface.appear(139,98);
                mrface.selectType = "none";
            }
            
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "officeexit",
                "blinkerinv",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(hallwayii,90,90,null,"stillforward");
                },
                [[0,1],[1,1]],
                "select",
                [0,0,37,66],
                [15,-55]
            ),188,177
        ]
    ]
)
