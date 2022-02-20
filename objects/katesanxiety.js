katesanxiety = new Object(
    "katesanxiety",
    {
        "still": "katesanxietyforward",
        "walking": animationDic["katesanxiety/forward"],
        "stillleft": "katesanxietyforward",
        "walkingleft": animationDic["katesanxiety/forward"],
        "stillaway": "katesanxietyforward",
        "walkingaway": animationDic["katesanxiety/forward"],
        "stillforward": "katesanxietyforward",
        "walkingforward": animationDic["katesanxiety/forward"]
    },
    function(){
        
        this.act([
            function(){
                huntTarget(katesanxiety,katesanxiety.target,-10);
            },
            function(){
                //katesanxiety.target.disappear();
                labyrinthLivesIdx ++;
                katesanxiety.phase ++;
            },
            function(){
                katesanxiety.walkTo("y", 84, function(){ katesanxiety.phase ++; });
            },
            function(){
                katesanxiety.walkTo("x", 35, function(){ 
                    katesanxiety.changeFace("stillforward"); 
                    katesanxiety.phase ++;
                });
            },
            function(){
                katesanxiety.waitUntil(10,function(){ 
                    katesanxiety.phase ++; 
                    
                    audioDic["sector"].pause();
                    clearTimeout(sectorLoopTimeout);
                });
            },
            function(){
                anxietydoor.changeFace("still");
                anxietydoor.locked = true;
                anxietydoor.willBeep = true;
                anxietydoor.selectType = "select";
                
                anxietydoorlocked.locked = false;
                anxietydoorlocked.willBeep = false;
                
                katesanxiety.phase = 0;
                
                katesanxiety.disappear();
            }
        ])
        
    },
    function(){
        /*audioDic["disgusting"].pause();
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
        
        say([
            [null,"You have been killed by Kate's anxiety...",function(){
                end("death");
            }]
        ])*/
    },
    [[0,82],[31,82]],
    "none",
    [-4,82 - 5,31 + 4,10],
    [0,0],
    [],
    3
);