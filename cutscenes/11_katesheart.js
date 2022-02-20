katesheart = new Cutscene(
    "katesheart",
    [
        [new Animation("blank",[10],true),dialogueDic["ASHIDA 2 prologue"]],
        [new Animation("katesheart",[1,1,1,60,1,1,1,10],true),dialogueDic["ASHIDA 2"]],
        ["0blank", dialogueDic["ASHIDA3 KATE beat"]]
    ],
    function(){
        flagDic["story"] = "DAY 11 night 2";
        pauseGame();
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
        
        stopFollowingPlayer("lexi");
        stopFollowingPlayer("violet");
        
        changeLocation(celestehouse,1000,1000,smallplayer);
        demonspider.appear(300,100);
        demonspider.phase ++;
    }
)