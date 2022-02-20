classroomfirstrow = new Object(
    "classroomfirstrow",
    "classroomfirstrow",
    function(){},
    function(){},
    [[0,1000],[117,1000]]
);
katesitting = new Object(
    "katesitting",
    {
        "still": "katesitting",
        "katestandup": new Animation("katestandup",[3,3,10],false,function(){ dialogueDic["DAY 1 CLASS 2"].appear();}),
        "dead": new Animation("katedeath",[10,40],false,function(){ dialogueDic["DAY 12 DEATH"].appear(); })
    },
    function(){},
    function(){},
    [[0,1000],[117,1000]]
);

violetsitting = new Object(
    "violetsitting",
    "violetsitting",
    function(){},
    function(){},
    [[0,1000],[117,1000]]
);
