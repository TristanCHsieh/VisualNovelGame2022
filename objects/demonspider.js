celestegrowup = new Object(
    "celestegrowup",
    {
        "still": new Animation("celestegrowup",[8,1,2,3,2,8],false,function(){
            player.changeFace("stillforward");
            player.relocate(79,92);
            celestegrowup.changeFace("inv");
        }),
        "inv": "blinkerinv"
    },
    function(){},
    function(){},
    [[0,50],[1,50]]
)

demonspider = new Object(
    "demonspider",
    {
        "still": "demonspiderright",
        "walking": animationDic["demonspider/right"],
        "stillleft": "demonspiderleft",
        "walkingleft": animationDic["demonspider/left"],
        "stillaway": "demonspiderright",
        "walkingaway": animationDic["demonspider/right"],
        "stillforward": "demonspiderleft",
        "walkingforward": animationDic["demonspider/left"],
        "demonspiderkillaqsa": new Animation("demonspiderkillaqsa",[10,1,4,1,4,1,4,1,10],false,function(){ demonspider.phase ++; }),
        "demonspiderthrowup": new Animation("demonspiderthrowup",[20,2,5,1,1,1,1,5],false,function(){ 
            celestegrowup.appear(demonspider.x,demonspider.y);
            demonspider.phase ++; 
        }),
        "demonspiderkillceleste": new Animation("demonspiderkillceleste",[20,1,4,1,4,1,4,1,10],false,function(){ celesteclone.changeFace("dead"); demonspider.phase ++; })
    },    
    function(){
        if(flagDic["story"] == "DAY 8 night"){
            this.act([
                /*function(){
                    if(demonspider.frame == undefined){
                        demonspider.frame = 0
                    } else if(demonspider.frame != 4){

                        demonspider.frame ++;
                    } else {
                        if(demonspider.tempMoveDirection > 10){ // pause if already moving
                            demonspider.tempMoveDirection = 0;            
                        } else { //otherwise roll the dice and move the character again
                            demonspider.tempMoveDirection = Math.floor(Math.random() * 15);
                            
                        }

                        demonspider.frame = 0;

                    }

                    
                    if(demonspider.tempMoveDirection <= 10){
                        demonspider.halt();
                    } else if(demonspider.tempMoveDirection == 11){
                        console.log(demonspider.tempMoveDirection);
                        demonspider.walk("x",demonspider.moveInc);
                    } else if(demonspider.tempMoveDirection == 12){
                        console.log(demonspider.tempMoveDirection);
                        demonspider.walk("x",-demonspider.moveInc);
                    } else if(demonspider.tempMoveDirection == 13){
                        console.log(demonspider.tempMoveDirection);
                        demonspider.walk("y",demonspider.moveInc);
                    } else if(demonspider.tempMoveDirection == 14){
                        console.log(demonspider.tempMoveDirection);
                        demonspider.walk("y",-demonspider.moveInc);
                    }  
                    
                    
                },*/
                function(){
                    demonspider.walkTo("y", 116, function(){ demonspider.phase ++; });
                },
                function(){
                    demonspider.walkTo("x", 70, function(){ demonspider.changeFace("demonspiderkillceleste"); });
                },
                function(){
                    demonspider.walkTo("x", 320, function(){ dialogueDic["DAY8DREAM WORD sector"].appear(); demonspider.phase = 0;});
                },
            ]);
        } else if(flagDic["story"] == "DAY 9 dream"){
            this.act([
                function(){
                    demonspider.walkTo("y", 124,function(){demonspider.phase ++;});
                },
                function(){
                    demonspider.walkTo("x", 63, function(){demonspider.phase ++;});
                },
                function(){
                    demonspider.changeFace("demonspiderkillaqsa");
                    setTimeout(function(){ aqsa.changeFace("die");  },frameRate * 10)
                    setTimeout(function(){ audioDic["violeteat"].play(); },frameRate*20)
                    demonspider.phase ++;
                },
                function(){},
                function(){
                    demonspider.waitUntil(30,function(){gamePause = false; demonspider.changeFace("still"); demonspider.phase = 0; awake.play();})
                }
            ]);
        } else if(flagDic["story"] == "DAY 11 night 2"){
            this.act([
                function(){
                    demonspider.walkTo("x",120,function(){demonspider.changeFace("stillleft"); demonspider.phase ++;});
                },
                function(){
                    demonspider.changeFace("demonspiderthrowup");
                    demonspider.phase ++;
                },
                function(){
                    demonspider.waitUntil(30,function(){audioDic["violeteat"].play();});
                },
                function(){
                    demonspider.changeFace("still");
                    demonspider.phase ++;
                },
                function(){
                    demonspider.walkTo("x",320,function(){demonspider.phase ++;});
                },
                function(){
                    say([
                        [null,"You feel an excruciating pain followed by a familliar sense of exestential dread."],
                        [null,"Isn't there a better way to transition between worlds?",null]
                    ])
                    gamePause = false;
                    demonspider.phase = 0;
                }
            ])
        }
    },
    function(){},
    [[0,48],[61,48]],
    "none",
    [0,0,1,1],
    null,
    [
        [[0,48],[61,48]]
    ],
    4
)