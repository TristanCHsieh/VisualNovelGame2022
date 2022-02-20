knockout = new Cutscene(
    "00_knockout",
    [ // list of animations/graphics
        ["blank",50],
        ["0blank","You have been hit by a piece of debris."],
        ["blank",50],
        ["0blank","The force of the debris sent your head backwards violently, causing you to loose conciousness."],
        ["blank",20],
        ["0blank","..."],
        ["blank",20]
    ],
    function(){
        playCalendar();
    }
);