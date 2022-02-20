calendar = new Cutscene(
    "calendar",
    [ // list of animations/graphics
        [new Animation("june20",[10,1],false,function(){currLoc.update();})]
    ],
    function(){
        if(flagDic["story"] == "PROLOGUE explore"){
            flagDic["story"] = "DAY 1";
        } else if(flagDic["story"] == "DAY 1 class"){
            flagDic["story"] = "DAY 2";
        } else if(flagDic["story"] == "DAY 2 class"){
            flagDic["story"] = "DAY 3";
        } else if(flagDic["story"] == "DAY 3 class"){
            flagDic["story"] = "DAY 4";
        } else if(flagDic["story"] == "DAY 4 night"){
            flagDic["story"] = "DAY 5";
        } else if(flagDic["story"] == "DAY 5 night"){
            flagDic["story"] = "DAY 6";   
        } else if(flagDic["story"] == "DAY 6 night"){
            flagDic["story"] = "DAY 7";
        } else if(flagDic["story"] == "DAY 7 night"){
            flagDic["story"] = "DAY 8";
        } else if(flagDic["story"] == "DAY 8 night"){
            flagDic["story"] = "DAY 9"
        } else if(flagDic["story"] == "DAY 9 dream"){
            flagDic["story"] = "DAY 10";
        } else if(flagDic["story"] == "DAY 10 night"){
            flagDic["story"] = "DAY 11";
        } else if(flagDic["story"] == "DAY 11 night 2"){
            flagDic["story"] = "DAY 12";
        } else if(flagDic["story"] == "ISOLATION DREAM"){
            flagDic["story"] = "ISOLATION DREAM";
        } else { //this should never happen
            flagDic["story"] = "DAY 1";
        }
        
        // Reset whatever needs to be reset for the new day.
        purge();
        classroom_emptyseat.selectType = "select"; //you can witness the next day's events
        
        flagDic["time"] = "day";
        changeLocation(celestebedroom,1000,1000,bigplayer);
    }
);