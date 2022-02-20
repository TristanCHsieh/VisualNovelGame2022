awake = new Cutscene(
    "awake",
    [
        ["0blank","Suddenly you wake up."]
    ],
    function(){
        playCalendar();
    }
);



playCalendar = function(){ // plays the correct date card
    storyDateDic = {
        "PROLOGUE explore": "june20",
        "DAY 1 class": "june21",
        "DAY 2 class": "june22",
        "DAY 3 class": "june23",
        "DAY 4 night": "june24",
        "DAY 5 night": "june25",
        "DAY 6 night": "june26",
        "DAY 7 night": "june27",
        "DAY 8 night": "june28",
        "DAY 9 night": "june29",
        "DAY 10 night": "june30",
        "DAY 11 night 2": "july1",
        "ISOLATION DREAM": "calligraphy"
    }


    if([
        "PROLOGUE explore",
        "DAY 1 class",
        "DAY 2 class",
        "DAY 3 class",
        "DAY 4 night",
        "DAY 5 night",
        "DAY 6 night",
        "DAY 7 night",
        "DAY 8 night",
        "DAY 9 night",
        "DAY 10 night",
        "DAY 11 night 2",
        "ISOLATION DREAM"
    ].includes(flagDic["story"])){
        calendar.cutsArr = [[new Animation(storyDateDic[flagDic["story"]],[10,2,2,2,30,2,2,2,10],false,function(){currLoc.update();})]];
    } else {
        calendar.cutsArr = [[new Animation("june20",[10,2,2,2,30,2,2,2,10],false,function(){currLoc.update();})]];
    }

    calendar.play();
}