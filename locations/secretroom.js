noneuclidianeggplantobj = new Object(
    "noneuclidianeggplantobj",
    animationDic["noneuclidianeggplant"],
    function(){},
    function(){
        obtainItem(noneuclidianeggplant);
        this.disappear();
    },
    [[0,20],[20,20]],
    "auto",
    [0,19,20,3]
);


secretroom = new Location(
    "secretroom",
    [0,1000],
    [
        [[0,178],[66,136]],
        [[66,136],[231,136]],
        [[231,136],[295,178]],

        [[0,178],[0,192]],
        [[295,178],[295,192]],
        [[0,192],[295,192]]
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
            increaseScore(30);
            this.firstTime = true;
        }
        //what happens when you enter the screen.
        
        labCoords = this.labCoords;
    },
    [
        [
            new Object(
                "secretroom_forwarddoor",
                "secretroom_forwarddoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    // behanvior when the player interacts with the object
                    enterDoor(labdic[labCoords[0] - 2][labCoords[1]],139,106,null,"stillaway")
                },
                [[0,0],[1,0]], // priority lines of the object
                "select",
                [0,67,37,7], // rectangle of interaction
                [15,-10] //blinker
            ),130,70
        ],
        [
            new Object(
                "secretroom_leftdoor",
                "secretroom_leftdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    // behanvior when the player interacts with the object
                    enterDoor(labdic[labCoords[0]][labCoords[1] - 2],227,87,null,"stillleft");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10], //blinker
            ),15,62
        ],
        [
            new Object(
                "secretroom_rightdoor",
                "secretroom_rightdoor",
                function(){
                    if(this.willBeep == undefined){
                        this.willBeep = false;
                    }
                },
                function(){
                    // behanvior when the player interacts with the object
                    enterDoor(labdic[labCoords[0]][labCoords[1] + 2],50,87,null,"still");
                },
                [[0,0],[1,0]], // priority lines of the object... this object is always behind the player
                "select",
                [0,107 - 22,36,22], // rectangle of interaction
                [15,-10] //blinker
            ),245,62
        ],
        [
            noneuclidianeggplantobj,Math.ceil(canvas.width/2)-10,140
        ]
    ],
    "green"
)
