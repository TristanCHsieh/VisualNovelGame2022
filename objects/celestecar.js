celestecar = new Object(
    "celestecar",
    "celestecar",
    function(){},
    function(){
        fadeOut(function(){
            carchoices.cutsArr[0][0].graphArr[0][0] = "carinside/" + flagDic["time"];
            carchoices.cutsArr[1][0] = "carinside/" + flagDic["time"];
            carchoices.play();
        });
        
    },
    [[0,44],[125,44]],
    "select",
    [30,37,60,20],
    null,
    [
        [[0,44],[125,44]],
        [[0,40],[0,44]],
        [[0,40],[125,40]],
        [[125,40],[125,44]],
    ]
);