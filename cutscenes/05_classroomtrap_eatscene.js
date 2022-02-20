classroomtrap_eatscene = new Cutscene(
    "classroomtrap_eatscene",
    [
        ["violetconsume",50],
        ["0violetconsume",dialogueDic["DAY 5 closeup"]],
        [new Animation("violetconsume",[1,2,2,5,2,5],false,function(){ currLoc.update();})]
    ],
    function(){
        awake.play();
    }
)