classroom_door = new Object(
    "classroom_door",
    {
        "still": "classroom_door",
        "openviolet": new Animation("classroomdoor_openviolet",[10,10],false,function(){ classroom_door.changeFace("close"); violet.phase ++;}),
        "close": new Animation("classroomdoor_close",[10,10],false,function(){ classroom_door.changeFace("still"); })
    },
    function(){
        if(this.willBeep == undefined){
            this.willBeep = false;
        }
    },
    function(){
        enterDoor(hallwayi,132,90,null,"stillforward");
    },
    [[0,1],[1,1]],
    "select",
    [0,65,37,7],
    [16,-8]
);

classroom_emptyseat = new Object(
    "classroom_emptyseat",
    "blinkerinv",
    function(){},
    function(){
        pauseGame();
        this.selectType = "none";

        // Make the player walk until they get to 210,128, starting with y value. 
        new Object(
            "","blinkerinv",
            function(){
                if(this.stage == undefined){
                    this.stage = "y";
                } else if(this.stage == "y"){ // Go to correct y
                    if(player.y < 128){
                        player.changeFace("walkingforward");
                        player.move("y",player.moveInc);
                    } else if(player.y > 128){
                        player.changeFace("walkingaway");
                        player.move("y",-player.moveInc);
                    }
                    if(player.y == 128 || player.y == 127){
                        this.stage = "x";
                    }
                } else if(this.stage == "x"){ // Go to correct x 
                    if(player.x < 210){
                        player.changeFace("walking");
                        player.move("x",player.moveInc);
                    } else if(player.x > 210){
                        player.changeFace("walkingleft");
                        player.move("x",-player.moveInc);
                    }
                    if(player.x == 210 || player.x == 211){ // Sit down animation, play dialogue
                        player.halt();
                        player.changeFace("stillaway");
                        currLoc.activate([
                            [function(){},10],
                            [function(){player.relocate(null,player.y+2);},2],
                            [function(){player.relocate(null,player.y+2);},20],
                            [function(){
                                if(flagDic["story"] == "DAY 1"){
                                    dialogueDic["DAY 1 CLASS lecture"].appear();
                                } else if(flagDic["story"] == "DAY 2"){
                                    dialogueDic["DAY 2 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 3"){
                                    dialogueDic["DAY 3 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 4"){
                                    dialogueDic["DAY 4 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 5"){
                                    dialogueDic["DAY 5 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 8"){
                                    dialogueDic["DAY 8 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 9"){
                                    dialogueDic["DAY 9 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 10"){
                                    if(flagDic["DAY8OFFICE PROMISE kept"] == true){
                                        mrface.phase ++;
                                    } else {
                                        dialogueDic["DAY10CLASS MRFACE outro"].appear();
                                    }
                                } else if(flagDic["story"] == "DAY 11"){
                                    dialogueDic["DAY 11 CLASS"].appear();
                                } else if(flagDic["story"] == "DAY 12"){
                                    if(flagDic["DAY 11 ASHIDA"] == "slave"){
                                        dialogueDic["DAY 12 KATE"].appear();
                                    } else {
                                        dialogueDic["DAY 12 CLASS"].appear();
                                    }
                                    
                                } else { // This should never happen... I just put it here so that you don't get stuck debugging.
                                    returnToHallway("ISOLATION");
                                }
                            },null]
                        ]);
                        this.disappear();
                    }
                }
            }
        ).appear(0,0); 
    },
    [[0,1],[1,1]],
    "select",
    [0,0,40,20],
    [15,-55]
);

classroom = new Location(
    "classroom",
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
    [],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(this.hasEvent == true){
            // appear all the objects
            
            
            if(flagDic["story"] == "DAY 1"){
                mrface.appear(128,82);
                new Object(
                    "mrfacename",
                    "mrfacename"
                ).appear(147,64);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                violetsitting.appear(157,129);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                dialogueDic["DAY 1 CLASS"].appear();
                
            } else if(flagDic["story"] == "DAY 2"){
                mrface.appear(128,82);
                lexi.changeFace("stillforward");
                lexi.appear(158,90);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                violetsitting.appear(157,129);
                
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                
            } else if(flagDic["story"] == "DAY 3"){
                kate.appear(178,94);
                kate.changeFace("stillforward");
                violet.appear(1000,1000);
                mrface.appear(1000,1000);
                mrface.selectType = "none";
                
                classroomfirstrow.appear(107,125);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                lexisitting.appear(233,146);
                
            } else if(flagDic["story"] == "DAY 4"){
                mrface.selectType = "none";
                mrface.appear(1000,1000);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                violetsitting.appear(157,129);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                lexisitting.appear(233,146);
                
            } else if(flagDic["story"] == "DAY 5"){
                mrface.selectType = "none";
                mrface.appear(128,82);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                violetsitting.appear(157,129);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                lexisitting.appear(233,146);
                
            } else if(flagDic["story"] == "DAY 8"){
                mrface.selectType = "none";
                mrface.appear(1000,1000);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                violet.selectType = "none";
                violet.appear(1000,1000);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                lexisitting.appear(233,146);
                
            } else if(flagDic["story"] == "DAY 9"){
                mrface.selectType = "none";
                mrface.appear(1000,1000);
                
                katesitting.appear(147,125);
                classroomfirstrow.appear(107,125);
                
                classroomsecondrow.appear(33,145);
                aqsasitting.appear(165,143);
                lexisitting.appear(233,146);
                
            } else if(flagDic["story"] == "DAY 10"){
                mrface.selectType = "none";
                
                if(flagDic["DAY8OFFICE PROMISE kept"] == true){
                    mrface.appear(200,102);
                } else {
                    mrface.appear(128,82);
                }
                
                kate.appear(1000,1000);
                
                katesitting.appear(57,125);
                classroomfirstrow.appear(107,125);
                
                classroomsecondrow.appear(33,145);
                lexisitting.appear(233,146);
            } else if(flagDic["story"] == "DAY 11"){
                mrface.selectType = "none";
                mrface.appear(1000,1000);
                
                katesitting.appear(147,125);
                classroomfirstrow.appear(107,125);
                
                classroomsecondrow.appear(33,145);
                lexisitting.appear(233,146);
            } else if(flagDic["story"] == "DAY 12"){
                
                if(flagDic["DAY 11 ASHIDA"] == "slave"){
                    katesitting.appear(147,125);   
                }
                mrface.selectType = "none";
                mrface.appear(128,82);
                
                classroomfirstrow.appear(107,125);
                
                classroomsecondrow.appear(33,145);
                if(flagDic["LABYRINTH lexi"] == true){
                    //lexi died in the labyrinth
                } else {
                    lexisitting.appear(233,146);
                }
            } else if(flagDic["story"] == "ISOLATION DREAM"){
                currLoc.activate([
                    [function(){pauseGame();},10],
                    [function(){say([
                        ["celesteav","Hello?"],
                        [null,"To your surprise, there is no one at school. Is it a holiday and you forgot?"],
                        [null,"Then again, you didn't see anyone on your way to school either. It's as if the whole town is abandoned.",null]
                    ]);},10],
                    [function(){classroom_emptyseat.selectType = "none"; console.log(currLoc.appeared); returnToHallway("ABANDON");},null]
                ]);
            }
            
            this.hasEvent = false;
        }
    },
    [
        [
            //door to exit classroom
            classroom_door,190,78
        ],
        [
            //empty seat
            classroom_emptyseat,200,175
        ]
    ],
    "day/nightinside"
);


