
endingText = new Object(
    "endingText",
    {
        "still": "lonelyending",
        "violet": "violetsending",
        "mrface": "mrfacesending",
        "lexi": "lexisending",
        "kate": "katesending",
        "lexthar": "lextharsending",
        "death": "deathending",
    }
);

ending = new Location(
    "ending",
    [0],
    [],
    [],
    function(){
        audioDic["ending"].position = 0;
        audioDic["ending"].play();
    },
    [[endingText,0,0]]
);