asleep = new Cutscene(
    "alseep",
    [
        ["blank",10],
        ["0blank","You eventually fall asleep."],
        ["blank",20]
    ],
    function(){
        smallplayer.halt();
        bigplayer.halt();
        if(flagDic["story"] == "DAY 6 night"){
            day6dream.play();
        } else if(flagDic["story"] == "DAY 11 night"){
            changeLocation(ashida,100,100,smallplayer);
        } else {
            
            if(flagDic["story"] == "DAY 9 night"){
                flagDic["story"] = "DAY 9 dream";
            }
            changeLocationSector();
        }
    }
)