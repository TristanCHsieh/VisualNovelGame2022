celestehouse = new Location(
    "celestehouse",
    [0,129,135],
    [
        [[0,110],[12,119]],
        [[12,119],[109,119]],
        [[109,119],[109,130]],
        [[109,130],[225,130]],
        [[225,130],[225,114]],
        [[225,114],[267,127]],
        [[267,127],[294,126]],

        [[103,134],[111,134]],
        [[111,134],[111,133]],
        [[103,134],[111,133]],
        
        [[3,128],[13,128]],
        [[13,128],[13,127]],
        [[3,128],[13,127]],
        
        [[226,134],[235,134]],
        [[235,134],[235,133]],
        [[226,134],[235,133]],

        // Keeps the player from going off screen
        [[canvas.width + 8,0],[canvas.width + 8,stageHeight + 10]],
        [[-8,0],[-8,stageHeight + 10]],
        [[0,stageHeight + 10],[canvas.width,stageHeight + 10]]
    ],
    [],
    function(){
        if(this.firstTime == false){
            this.firstTime = true;
        }
        if(this.hasEvent == true){
            
        
            if(flagDic["story"] == "DAY 10 kate"){
                kate.changeFace("stillforward");
                kate.appear(150,100);
            }
            this.hasEvent = false;
            
        }
    },
    [
        [
            new Object(
                "celestehouse_door",
                "celestehouse_door",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    enterDoor(celestedownstairs,242,100,bigplayer,"stillleft");
                },
                [[9,58],[40,58]],
                "select",
                [9,58,31,10],
                [21,-10]
            ),132,71
        ],
        [
            celestecar,115,138
        ]
    ],
    "day/night"
);