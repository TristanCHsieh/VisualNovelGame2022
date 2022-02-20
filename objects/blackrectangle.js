titleArr = [
    "PROLOGUE",
    "FIRST MISSION",
    "DAY 1 CLASS",
    "DAY 1 DREAM",
    "DAY 2 CLASS",
    "DAY 3 CLASS",
    "DAY 3 DREAM",
    "DAY 4 CLASS",
    "DAY 4 VIOLET",
    "DAY 4 BAKERY",
    "DAY 4 DREAM",
    "DAY 5 CLASS",
    "DAY 5 TEXTS",
    "DAY 5 DREAM",
    "DAY 6 DREAM",
    "DAY 7 BENADRYL",
    "DAY 7 DREAM",
    "DAY 8 CLASS",
    "DAY 8 OFFICE",
    "DAY 8 DREAM",
    "DAY 9 CLASS",
    "DAY 9 TEXTS",
    "DAY 9 VIOLET",
    "DAY 9 DREAM",
    "DAY 10 CLASS",
    "DAY 10 LEXI",
    "DAY 10 TEXTS",
    "DAY 10 KATE",
    "DAY 10 VIOLET",
    "DAY 10 DREAM",
    "DAY 11 CLASS",
    "DAY 11 LEXI",
    "DAY 11 VIOLET",
    "DAY 11 DATE NIGHT",
    "DAY 11 CONFLICT",
    "ASHIDA",
    "ASHIDA 2",
    "DAY 11 DREAM",
    "DAY 12 CLASS",
    "DAY 12 KATE",
    "DAY 12 MR. FACE",
    "DAY 12 LEXI",
    "DAY 12 DREAM",
    "ISOLATION DREAM",
    "VIOLET SERIES",
    "LEXI SERIES",
    "KATE SERIES",
    "VIOLET PERSON SERIES",
    "LEXI PERSON SERIES",
    "KATE PERSON SERIES"
];

blackRectDic = {};

for(bR = 0; bR < titleArr.length; bR ++){

    blackRectDic[titleArr[bR]] = 
        new Object(
            titleArr[bR],
            "blackrec",
            function(){},
            function(){
                dialogueDic[this.name].appear();
            },
            [[0,15],[15,15]],
            "select",
            [0,15,15,5],
            [4,-5],
            [
                [[0,15],[15,15]]
            ],
            2
        );
}