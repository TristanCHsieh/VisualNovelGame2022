jamiesinterior_chair = new Object(
    "jamiesinterior_chair",
    {
        "still": "jamiesinterior_chair/empty",
        "full": "jamiesinterior_chair/full"
    },
    function(){},
    function(){},
    [[0,43],[1,43]],
    "none"
);

jamiesinterior_playerchair = new Object(
    "jamiesinterior_playerchair",
    {
        "still": "jamiesinterior_playerchair/empty",
        "full": "jamiesinterior_playerchair/full"
    },
    function(){},
    function(){
        if(flagDic["story"] == "DAY 11 night" && flagDic["DAY9CLASS KATE yes"] == true){
            player.relocate(1000,1000);
            pauseGame();
            this.changeFace("full");
            dialogueDic["DAY 11 DATE NIGHT"].appear();
        }
    },
    [[0,43],[26,43]],
    "none",
    [0 - 2,43 - 5,26 + 2,10],
    null,
    [
       [[0,43],[26,43]] 
    ]
);

jamiesinterior = new Location(
    "jamiesinterior",
    [0,0,136,162,154,169,1000],
    [ // barriers
        
        //back walls
        [[295,167],[221,128]],
        [[223,130],[69,130]],
        [[69,130],[0,167]],
        
        //casheir
        [[22,155],[110,155]],
        [[110,155],[128,125]],
        
        //first cabinet
        [[191,154],[196,160]],
        [[196,160],[258,160]],
        [[258,160],[252,154]],
        [[252,154],[191,154]],
        
        //second cabinet
        [[177,136],[183,142]],
        [[183,142],[230,142]],
        [[230,142],[219,136]],
        [[219,136],[177,136]],
        
        //table
        [[72,158],[43,162]],
        [[43,162],[83,162]],
        [[83,162],[71,158]],
        
        
        //front
        [[0,162],[0,stageHeight]],
        [[295,162],[295,stageHeight]],
        [[0,stageHeight],[295,stageHeight]],
        
        //front table
        [[15,177],[64,177]],
        [[64,177],[73,169]],
        [[73,169],[15,169]],
        [[15,169],[15,177]]
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
        //what happens when you enter the screen.
        if(this.firstTime == false){
            this.firstTime = true;
        }
        
        if(this.hasEvent == true){
            if(flagDic["story"] == "DAY 4 violet"){
                violet.phase = 0;
                violet.changeFace("stillleft");
                violet.appear(120,100);
            } else if(flagDic["story"] == "DAY 11 night" && flagDic["DAY9CLASS KATE yes"] == true){
                jamiesinterior_chair.changeFace("full");
                jamiesinterior_playerchair.selectType = "select";
            }
            this.hasEvent = false;
        }
    },
    [
        [
            new Object(
                "jamiesinterior_exit",
                "blinkerinv",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(jamies,76,65,bigplayer,"stillforward");
                },
                [[0,1],[1,1]],
                "select",
                [0,6,61,100],
                [27,-30]
            ),118,167
        ],
        [
            jamiesinterior_chair,25,121
        ],
        [
            jamiesinterior_playerchair,82,122
        ]
    ]
)
