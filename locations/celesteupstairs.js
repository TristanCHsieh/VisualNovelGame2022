celesteupstairs = new Location(
    "celesteupstairs",
    [0,153],
    [
        [[52,152],[66,143]],
        [[65,144],[231,144]],
        [[231,144],[295,185]],
        [[51,153],[201,153]],
        [[201,153],[175,185]],
        
        [[227,185],[295,185]],
        
        
        [[175,185],[175,stageHeight + 35]],
        [[227,185],[227,stageHeight + 35]]
        
    ],
    [
        [
            [[0,stageHeight + 35],[canvas.width,stageHeight + 35]], 
            function(){
                changeLocation(celestedownstairs,239,-22,null);
                //player.halt();
            }
        ],
        [
            [[212,0],[212,stageHeight + 35]], 
            function(){
                if(flagDic["DAY 1 phone"] == true){
                    say([
                        [null,"Your phone buzzes."],
                        [null,"Line 14697665855 has been set up successfully! Press enter to access your inventory, texting and more.",null]
                    ]);
                    flagDic["DAY 1 phone"] = false;
                } else if(flagDic["story"] == "DAY 7"){
                    say("You hear a knock at the door");
                    flagDic["story"] = "DAY 7 kate";
                }
            }
        ]
    ],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
    },
    [
        [
            // right door
            new Object(
                "celesteupstairs_rightdoor",
                "celesteupstairs_rightdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(celestebedroom,50,null,null,"still");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),245,70
        ],
        [
            new Object(
            "",
            "blinkerinv",
            function(){},
            function(){
                say("The door to the bathroom is locked. You don't really use this bathroom anyways.");
            },
            [[0,1],[1,1]],
            "select",
            [0,0,37,5],
            [14,-80]
            ),79,143
        ]
    ]
);