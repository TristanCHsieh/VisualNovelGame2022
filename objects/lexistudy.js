lexistudy = new Object(
    "lexistudying",
    "lexistudying",
    function(){
        this.act(
            [
                function(){
                    lexistudy.waitUntil(50,function(){dialogueDic["DAY9DREAM LEXTHAR bedroom"].appear(); });
                },
                function(){
                    lexistudy.waitUntil(50,function(){dialogueDic["DAY9DREAM LEXI outro"].appear(); lexistudy.phase = -1;});
                }
            ]
        )
    },
    function(){},
    [[0,1000],[1,1000]],
    [0,0,1,1],
)