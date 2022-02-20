

reddot = new Player(
    "reddot",
    "reddot",
    null,
    null,
    [[0,16],[14,16]],
    [0,0,1,1],
    [],
    3
);

smallplayer = new Player(
    "smallceleste",
    null,null,
    null,
    [[0,55],[15,55]],
    [0,0,1,1],
    [],
    2
);

astronautsmall = new Player(
    "astronautsmall",null,null,
    null,
    [[0,55],[15,55]],
    [0,0,1,1],
    [],
    2
);

celesteclone = new Object(
    "smallceleste",
    {
        "still": "smallcelesteright",
        "walking": animationDic["smallceleste/right"],
        "stillleft": "smallcelesteleft",
        "walkingleft": animationDic["smallceleste/left"],
        "stillaway": "smallcelesteaway",
        "walkingaway": animationDic["smallceleste/away"],
        "stillforward": "smallcelesteforward",
        "walkingforward": animationDic["smallceleste/forward"],
        "dead": new Animation("celesteclonedie",[1,5,5],false,function(){})
    },
    function(){
        this.act(
            [
                function(){
                    celesteclone.changeFace("walkingleft");
                    celesteclone.phase ++;
                },
                function(){
                    celesteclone.walkTo("x",140,function(){
                        celesteclone.changeFace("stillforward"); 
                        celesteclone.phase ++; 
                    });
                },
                function(){
                    celesteclone.waitUntil(20,function(){celesteclone.phase ++; dialogueDic["DAY8DREAM WORD correct"].appear(); });
                }
            ]
        )
    },
    function(){},
    [[0,55],[15,55]],
    "none",
    [0,0,1,1],
    [],
    [],
    2
);

bigplayer = new Player(
    "bigceleste",
    null,
    null,
    null,
    [[2,71],[17,71]],
    [0,0,1,1],
    [],
    3
);

bigplayer.faces["die"] = new Animation(
    "celestedie",
    [5,5],
    false
);

firstroomplayer = new Player(
    "firstroomplayer",null,null,
    null,
    [[2,71],[17,71]],
    [0,0,1,1],
    [],
    3
);

miniplayer = new Player(
    "miniceleste",null,null,
    null,
    [[0,39],[11,39]],
    [0,0,1,1],
    [],
    2
);


