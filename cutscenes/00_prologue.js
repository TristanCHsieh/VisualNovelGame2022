prologue = new Cutscene(
    "00_prologue",
    [ // list of animations/graphics
        [new Animation("pressspace",[["0blank",70],["0prologue",1]],false,function(){prologue.cutsArr[1][0] = "0prologue"; prologue.cutsArr[2][0] = "2prologue"}), dialogueDic["PROLOGUE space"]],
        ["0blank",dialogueDic["PROLOGUE firsttime"]],
        ["1prologue", dialogueDic["PROLOGUE shift"]],
        ["prologue_space", 10],
        ["0prologue_space", dialogueDic["PROLOGUE intro"]]
    ],
    function(){
        goTo("firstroom");
        player.halt();
        player.changeFace("stillforward");
    }
);