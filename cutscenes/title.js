/*title = new Cutscene(
    "title",
    [
        [new Animation("title",[10,17,1,2,1,1,140,5,10],false,function(){titleseal = true; currLoc.update();})],
        [new Animation("titlepressspace",[10,10],true,function(){currLoc.update();})],
        //["title",1,1,1,1,1]
    ],
    function(){
    }
);*/


titleText = new Object(
    "endingText",
    {
        "still": new Animation("title",[10,17,1,2,1,1,140,5,10],false,function(){titleseal ++; titleText.changeFace("pressspace");}),
        "pressspace": new Animation("titlepressspace",[10,10],true,function(){currLoc.update();}) 
    }
);

title = new Location(
    "ending",
    [0],
    [],
    [],
    function(){

        audioDic["lextharstheme"].play();
        flagDic["story"] = "INSTRUCTIONS";
    },
    [[titleText,0,0]]
);

