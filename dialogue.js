
//  ******** DIALOUGUE ********

//  ******** GUIDE ************
/*
    dialogueArr is more or less an array populated with more arrays. Each
    inner array is one unit of dialogue.

    [avatar, text, next dialogue, label]

    avatar: Just put a string with the name of the image that you want to be the avatar

    text: What will be said. If it's a choice put an array with arrays in it formatted like so:
        ["choice",next]

    next dialogue: Whatever will happen next. If it's a function, the program will play the function,
        if it's null, the program will close the dialogue. Anything else, the program will assume you want
        to play whatever dialogue comes next in dialogueArr

    label: The program will automatically come up with a unique name for the dialogue, unless you decide to artificially
        give it a name.
*/



// all the choice banks will be stored at the beginning to leave room in the actual dialogue itself.

choiceBankDic = {

    "day4Class": new choiceBank(
        [
            ["Talk to Violet","DAY4CLASS TALK violet"],
            ["Talk to Lexi",function(){
                if("DAY2CLASS LEXINAME" in flagDic){
                    dialogueDic["DAY4CLASS TALK lexi notasked"].appear();
                } else {
                    dialogueDic["DAY4CLASS TALK lexi asked"].appear();
                }
            }],
            ["Talk to Kate","DAY4CLASS TALK kate"]
        ],
        function(){mrface.phase ++;},
        2
    ),

    "day4Bakery": new choiceBank(
        [
            ["(Talk about school)","DAY4BAKERY QUESTION class"],
            ["Where did you and Kate meet?","DAY4BAKERY QUESTION date"],
            ["Are you and Lexi friends or something?","DAY4BAKERY QUESTION friends"],
            ["Do you usually buy yourself a cake?","DAY4BAKERY QUESTION cake"]
        ],
        "DAY4BAKERY QUESTION outro",
        2
    ),

    "day4Dream": new choiceBank(
        [
            ["Can you please tell me where I am?","DAY4DREAM FIRST where"],
            ["Did you say you were a goddess?","DAY4DREAM FIRST goddess"],
            ["Are you angry at me?","DAY4DREAM FIRST angry"],
            ["Are you all knowing?","DAY4DREAM FIRST know"]
        ],
        null,
        null
    ),

    "day4Advice": new choiceBank(
        [
            ["Ask about Violet","DAY4DREAM ADVICE violet"],
            ["Ask about Lexi","DAY4DREAM ADVICE lexi"],
            ["Ask about school","DAY4DREAM ADVICE mr. face"]
        ],
        "DAY4DREAM outro",
        2
    ),

    "day7Kate": new choiceBank(
        [
            ["Why Benadryl?","DAY7BENADRYL TREE benadryl"],
            ["How did you know my address?","DAY7BENADRYL TREE address"],
            ["Are you dating Violet?","DAY7BENADRYL TREE dating"],
            ["Why do you always argue with Mr. Face?","DAY7BENADRYL TREE teacher"],
            ["(End the conversation)","DAY7BENADRYL TREE outro"]
        ],
        null,
        null
    ),

    "day9Violet": new choiceBank(
        [
            ["Why don't you ask your parents?","DAY9VIOLET PET parents"],
            ["Why don't you resell it?","DAY9VIOLET PET resell"],
            ["Why don't you give it back to Kate?","DAY9VIOLET PET kate"],
            ["How are you even taking care of it?","DAY9VIOLET PET how"],
            ["...I don't have any ideas, sorry.","DAY9VIOLET PET idk"]
        ],
        null,
        null
    ),

    "day11Date": new choiceBank(
        [
            ["Do you make bets like this a lot?","DAY11DATENIGHT bets"],
            ["Why did you and Violet break up?","DAY11DATENIGHT violet"],
            ["How long have you known Lexi?","DAY11DATENIGHT lexi"],
            ["(Wait in silence)","DAY11DATENIGHT silence"],
            ["(End the date)","DAY11DATENIGHT end"]
        ],
        null,
        null
    )

}

carchoices_arr = [];
carchoices_dialogue = function(){
    carchoices_arr = [
        ["Home",function(){ 
            currLoc.update(); 
            changeLocation(celestehouse,168,114,smallplayer); 
            player.changeFace("stillaway"); 
            if(flagDic["time"] == "afternoon"){ 
                flagDic["time"] = "night";
            }
            player.halt();
        }],
        ["North Stanton High School",function(){ 
            currLoc.update(); 
            changeLocation(school,168,114,smallplayer); 
            player.changeFace("stillaway"); 
            player.halt();
        }]
    ];

    if(flagDic["JAMIES"] == true){
        carchoices_arr.push(["86 Degrees Bakery",function(){ 
            currLoc.update(); 
            changeLocation(jamies,168,114,bigplayer); 
            player.changeFace("stillaway"); 
            if(flagDic["time"] == "afternoon"){ 
                flagDic["time"] = "night";
            }
            player.halt();
        }]);
    }

    if(flagDic["LEXISHOUSE"] == true){
        carchoices_arr.push(["Lexi's house",function(){ 
            currLoc.update(); 
            changeLocation(lexishouse,168,114,smallplayer); 
            player.changeFace("stillaway"); 
            if(flagDic["time"] == "afternoon"){ 
                flagDic["time"] = "night";
            }
            player.halt();
        }]);
    }
    
    new Dialogue(
        "",
        carchoices_arr,
        null
    ).appear();
}

rightDescision = function(points,next){
    increaseScore(points);
    dialogueDic[next].appear();
}

returnToHallway = function(storyLabel){
    fadeOut(function(){
            changeLocation(hallwayi,132,90,null);
            classroom.appeared = [];
            classroom.firstTime = false;
            classroom.hasEvent = false;
            player.halt();
            player.changeFace("stillforward");
            gamePause = false;
            flagDic["story"] = storyLabel;
            flagDic["time"] = "afternoon";
    });
}

wakeup = function(){
    audioDic["sector"].pause();
    clearInterval(sectorLoopTimeout);
    awake.play();
}

end = function(name){
    fadeOut(function(){
        pauseGame();
        audioDic["sector"].pause();
        try {  
            clearInterval(sectorLoopTimeout);
        } catch(e) {
            console.log("ERROR sectorLoopTimeout not defined"); 
            // Since sector loop timeout should always be defined by the time you reach any ending, this error should not happen.
        }
        endingText.changeFace(name);
        changeLocation(ending,1000,1000);
    });
}

dialogueArr = [
    // ### PROLOGUE
    [null,"Thank you for playing Space Deity Dating Sim.",function(){currLoc.update();},"PROLOGUE space"],
    [null,"Is this your first time playing?",function(){currLoc.update();},"PROLOGUE firsttime"],
    [null,
        [
            ["Yes, play the intro",function(){ currLoc.update(); }],
            ["No, skip the intro",function(){ flagDic["story"] = "PROLOGUE"; currLoc.update("end"); }]
        ],false,"PROLOGUE shift"
    ],
    [null,"June 19th, 2048",false,"PROLOGUE intro"],
    [null,"The United States, China, Russia, and India are engaged in a frantic space race. Following a successful Russian colony on Mars in 2040, the United States government has shifted their resources into HOPE6, humanity's first manned mission to Neptune. The goal of this mission is not only to collect data and make scientific observations, but to further political soft power in the world.",function(){ currLoc.update(); dialogueDic["PROLOGUE mcintro"].appear(); }],
    
    [null,"Your name is Celeste. You work on HOPE6. Your main job has been to serve as an engineer beside the pilot and commander. So far your work days have been demanding, unstructured, and more than anything else... boring. You've mainly been executing random tasks assigned by mission control.",false,"PROLOGUE mcintro"], 
    [null,"Use arrow keys to move, space to interact with objects.",function(){ flagDic["story"] = "PROLOGUE"; }],


    // ### FIRST MISSION
    [null,"You check the monitor and see you have a notification. It is from the mission specialist.",false,"FIRST MISSION"],
    ["mrfaceav","Hello Celeste. There's been some damage caused by debris near your station. Can you go check to see how bad it is?", null],


    // ### DAY 1 CLASS
    // There is "MR. FACE" written on the board. That's how the player knows 
    [null,"You walk into class late. The teacher is already talking.",false,"DAY 1 CLASS"],
    ["mrfaceav","Come in. There's an empty seat for you in the front row.",null],
    ["mrfaceav","Since you came in late, I'll go over the tardy policy again.",false,"DAY 1 CLASS lecture"],
    ["mrfaceav","Actually does anyone remember what it is? Violet, what is our tardy policy?"],
    ["violetav","You fail the class if you get two absences..."],
    ["mrfaceav","Perfect. Also, two points of your final grade for every time you speak out of turn."],
    ["mrfaceav","We were in the middle of introducing ourselves. Again, please say your name, your grade level, and an interesting fact about you."], 
    ["mrfaceav","Next is... Kate Lail?",function(){ katesitting.changeFace("katestandup"); }],
    // Kate stands up
    ["kateav","Hey, my name's Kate. I'm a boy but my parents gave me a girl's name. And an interesting fact is... my IQ is well above average.",false,"DAY 1 CLASS 2"],
    ["kateav","My friends and I have this joke, where they say my mind is an unsolvable maze... cause I tend to say a lot of really insightful stuff."],
    ["mrfaceav","Everyone, please remember to say your grade level."],
    ["kateav","Oh. I'm going to be a senior next year.",function(){ katesitting.changeFace("still"); dialogueDic["DAY 1 CLASS 3"].appear(); }],
    ["mrfaceav","Perfect. Next is... Aqsa Malik?",false,"DAY 1 CLASS 3"],
    ["aqsaav","Hello I'm Aqsa... I'm going into eleventh grade. And... interesting fact... I like rap music."],
    ["mrfaceav","Next is Violet Mae?"],
    ["violetav","Hi my name is Violet, I'm going to be a senior."],
    ["mrfaceav","...interesting fact?"],
    ["violetav","Uh... I raised fifteen hundred dollars this summer for a charity fundraiser."],
    ["mrfaceav","Ok, Celeste. You're last."],
    [null,
        [
            ["(Reveal alot about yourself.)",function(){ rightDescision(10,"DAY1CLASS REVEAL alot") }],
            ["(Don't reveal anything about yourself.)","DAY1CLASS REVEAL secret"]
        ]
    ],


    ["celesteav","Hello, my name is Celeste! I'm not originally from Stanton, I'm actually from Wichita. And I'm going into twelfth grade.","DAY1CLASS REVEAL outro","DAY1CLASS REVEAL alot"],

    ["celesteav","I'm Celeste. I'm not originally from here. I'm going into twelfth grade.",false,"DAY1CLASS REVEAL secret"],
    ["mrfaceav","Interesting fact?"],
    ["celesteav","Oh... uh... my favorite color is black.","DAY1CLASS REVEAL outro"],

    ["mrfaceav","Ok, that's everyone.",false,"DAY1CLASS REVEAL outro"],   
    ["mrfaceav","Before we move on, I want to make one thing absolutely clear. Our class is run on four core values: respect, honesty, grit, and self-discipline. From the moment you enter the door to the moment you walk out, I want you to tailor every action to these values. They will build the proper foundation for an understanding of..."],
    [null,"The girl named Violet leans over to you."],

    ["violetav","Hey. I like your shirt."],
    ["celesteav","Thank you!"],
    ["celesteav","..."],
    [null,
        [
            ["(Introduce yourself)","DAY1CLASS TREE intro"],
            ["(Tell her where you got your shirt)",function(){ rightDescision(10,"DAY 1 CLASS TREE origin") }],
            ["(Compliment her back)","DAY1CLASS TREE compliment"]
        ]
    ],

    ["celesteav","My name is Celeste, by the way!",false,"DAY1CLASS TREE intro"],
    ["violetav","I know. You literally just told everyone."],
    ["celesteav","Oh..."],
    [null,
        [
            ["(Tell her where you got your shirt)","DAY1CLASS TREE origin2"],
            ["(Compliment her back)","DAY1CLASS TREE compliment"],
        ]

    ],

    ["celesteav","I got my shirt from a friend.","DAY1CLASS TREE really","DAY1CLASS TREE origin2"],

    ["celesteav","I like your shirt too!",false,"DAY1CLASS TREE compliment"],
    ["violetav","Uh... okay..."],
    ["violetav","..."],
    ["violetav","You said your not from here right?"],
    ["celesteav","Yeah... I've been in Stanton for two weeks maybe...","DAY1CLASS TREE wait"],

    ["celesteav","My friend gave it to me!",false,"DAY1CLASS TREE origin"],
    ["violetav","Really? Like from where you used to live?",false,"DAY1CLASS TREE really"],
    ["celesteav","Yeah..."],
    ["violetav","Ok..."],
    ["violetav","Wait... so you just moved here? Like you don't know anyone yet?",false,"DAY1CLASS TREE wait"],
    [null,
        [
            ["(Keep your answer short)","DAY1CLASS TREE shortanswer"],
            ["(Tell Violet your entire backstory)",function(){ rightDescision(10,"DAY1CLASS TREE backstory") }]
        ]
    ],


    ["celesteav","Nope! I don't know anyone...",false,"DAY1CLASS TREE shortanswer"],
    ["violetav","Wow. What do you think so far?"],
    [null,
        [
            ["(Say you miss home)",function(){ rightDescision(10,"DAY1CLASS TREE truth") }],
            ["(Pretend you like it in Stanton)","DAY1CLASS TREE lie"]
        ]
    ],

    ["celesteav","I kind of miss home to be honest.",false,"DAY1CLASS TREE truth"],
    ["violetav","Oh. I'm sure you'll like it here.","DAY1CLASS TREE outro"],

    ["celesteav","It's uh... not bad.",false,"DAY1CLASS TREE lie"],
    ["violetav","I see.","DAY1CLASS TREE outro"],


    ["celesteav","I don't really know anyone...",false,"DAY1CLASS TREE backstory"],
    ["violetav","..."],
    ["celesteav","The move was kind of abrupt. My mom literally told me a month ago that we're moving. She's generally unpredictable like that..."],
    ["violetav","I'm sure you'll get used to it here.","DAY1CLASS TREE outro"],

    [null,"Eventually the bell rings.",function(){returnToHallway("DAY 1 class");},"DAY1CLASS TREE outro"],

    
    
    
    // ### DAY 1 DREAM
    ["lextharav","Hello.",false,"DAY 1 DREAM"],
    ["astronautav","Ugh..."],
    ["lextharav","What is your name?"],
    ["astronautav","Celeste."],
    ["lextharav","What do you perceive this place to be?"],
    ["astronautav","What?"],
    ["lextharav","Where do you think you are?"],
    ["astronautav","I'm... I don't know."],
    ["lextharav","There is no issue with that. Try to breathe."],
    ["astronautav","Okay."],
    [null,
        [
            ["What are you?",function(){ rightDescision(30,"DAY1DREAM QUESTION what"); }],
            ["What am I doing here?","DAY1DREAM QUESTION where"],
        ]
    ],

    ["astronautav","What are you?",false,"DAY1DREAM QUESTION what"],
    ["lextharav","I am Lexthar the Destroyer, goddess of space.",function(){wakeup();}],

    ["astronautav","What am I doing here?",false,"DAY1DREAM QUESTION where"],
    ["lextharav","I found you and not the other way around."],
    ["lextharav","I have just realized that we haven't made introductions yet. My name is Lexthar the Destroyer, goddess of space.",function(){wakeup();}],

    // ### DAY 2 CLASS
    // Lexi is standing in front of the class before it begins.
    ["mrfaceav","Alright.... we have a new student who couldn't make it yesterday. Lexthar, please introduce yourself. Give us your name, your grade level, and an interesting fact about you.",false,"DAY 2 CLASS"],
    ["lexiav","My name is Lexthar, but I'm called Lexi for short.",function(){
        lexi.day2phase = 0;
        lexi.phase ++;
    }],
    // Lexi goes back to her seat
    ["mrfaceav","Stop! Come back.",function(){lexi.phase ++;},"DAY 2 CLASS 2"],
    // Lexi heads back
    ["mrfaceav","Start over.",false,"DAY 2 CLASS 3"],
    ["lexiav","I'm Lexi. I'm going to be a junior next year. And... I like reading."],
    ["mrfaceav","Lexthar... is that your real name?"],
    ["lexiav","Yes."],
    ["mrfaceav","Hmm... I've never met someone with a name like that."],
    ["lexiav","..."],
    ["mrfaceav","Okay you may sit down now.",function(){lexi.phase ++;}],
    // Lexi heads back 
    ["mrfaceav","Everyone, let's look at the first page of the first chapter in the book. Can someone read the first word under key ideas? ...Go ahead Violet.",false,"DAY 2 CLASS 4"],
    ["violetav","Bias."],
    ["mrfaceav","Bias. The very first thing anyone should understand when studying world history is bias. For example, if I asked you the question “Where am I?” what would be your response... Aqsa?"],
    ["aqsaav","...you're in class?"],
    ["mrfaceav","That answer is technically true. Yet, it does not provide the complete picture. You could say I'm in a classroom, but you could also say I'm in Stanton. I'm in America. I'm on planet Earth. Even the most neutral statements carry bias. This idea can be applied to anything in human history..."],
    [null,"You notice yourself start to zone out."],
    [null,
        [
            ["(Talk to Violet)","DAY2CLASS TALK violet"],
            ["(Talk to the new student)",function(){
                flagDic["DAY2CLASS LEXINAME"] = true; //Violet asks the name
                rightDescision(15,"DAY2CLASS TALK lexi");
            }
            ],
        ]
    ],

    [null,"You lean over to Violet",false,"DAY2CLASS TALK violet"],
    ["celesteav","Five more weeks of this?"],
    ["celesteav","..."],
    ["celesteav","I need this class to graduate... I want to have more time in my last year."],
    ["violetav","I'm trying to get college credit."],
    ["celesteav","You think that far ahead?!"],
    ["violetav","You don't?"],
    ["mrfaceav","...and with that, we're splitting up into groups again. Lexi, you'll be in a group with Celeste and Violet. I want everyone to come up with a thesis statement about human societies."],
    [null,
        [
            ["(Try to get to know Lexi better)",function(){
                flagDic["DAY2CLASS LEXINAME"] = true; //Violet asks the name
                rightDescision(15,"DAY2CLASS GROUP lexi");
            } 
            ],
            ["(Try to work on the assignment)","DAY2CLASS GROUP work"]
        ]
    ],

    ["celesteav","So what are we doing?",false,"DAY2CLASS GROUP work"],
    ["lexiav","I don't know"],
    ["violetav","We're coming up with a thesis I think."],
    ["violetav","..."],
    ["violetav","So... where did you get your name?"],
    ["lexiav","My parents","DAY2CLASS GROUP outro"],


    ["celesteav","So your name is Lexthar?",false,"DAY2CLASS GROUP lexi"],
    ["lexiav","Yes."],
    ["celesteav","Hmm... I've heard that name before."],
    ["lexiav","Ok."],
    ["celesteav","Where did you get it?"],
    ["lexiav","My parents."],
    ["celesteav","...",false,"DAY2CLASS GROUP outro"],
    ["celesteav","I didn't know sophomores could take this class."],
    ["violetav","I thought she was a freshman."],
    ["celesteav","Oh uh... how old are you?"],
    ["lexiav","Does it matter?"],
    ["celesteav","Not necessarily..."],
    ["celesteav","...",function(){returnToHallway("DAY 2 class")}],

    [null,"You lean over to Lexi.",false,"DAY2CLASS TALK lexi"],
    ["celesteav","So your name is Lexthar?"],
    ["lexiav","Yes."],
    ["celesteav","Hmm... I've heard that name before."],
    ["lexiav","Ok."],
    ["celesteav","Where did you get it?"],
    ["lexiav","My parents."],
    ["celesteav","..."],
    ["celesteav","I didn't know freshmen could take this class."],
    ["lexiav","I'm not a freshman."],
    ["celesteav","Really...? How old are you?"],
    ["lexiav","That's a private question."],
    ["mrfaceav","...and with that, we're splitting up into groups again. Lexi, you'll be in a group with Celeste and Violet. I want everyone to come up with a thesis statement about human societies."],
    ["violetav","Five more weeks of this?"],
    [null,
        [
            ["(Explain why you need this class)",function(){ rightDescision(15,"DAY2CLASS COMPLAIN explain"); }],
            ["Five weeks isn't that much!","DAY2CLASS COMPLAIN dismiss"]
        ]
    ],

    ["celesteav","Five weeks isn't that much!",false,"DAY2CLASS COMPLAIN dismiss"],
    ["violetav","Hmm... I wouldn't even be here if it weren't for the fact that I need college credit.","DAY2CLASS COMPLAIN outro"],        

    ["celesteav","I need this class to graduate... I want to have more time in my last year.",false,"DAY2CLASS COMPLAIN explain"],
    ["violetav","I'm trying to get college credit."],
    ["celesteav","You think that far ahead?!",false,"DAY2CLASS COMPLAIN outro"],
    ["violetav","You don't?"],
    ["celesteav","..."],
    ["celesteav","What are we supposed to do again?"],
    ["violetav","...I don't know. I zoned out.",function(){returnToHallway("DAY 2 class")}],


    // ### DAY 2 DREAM

    // ### DAY 3 CLASS
    ["kateav","So... do you read Nietzsche?",false,"DAY 3 CLASS"],
    ["celesteav","Me?"],
    ["kateav","Yeah."],
    [null,
        [
            ["(Pretend you like Nietzsche.)","DAY3CLASS NIETZCHE yes"],
            ["Not really.",function(){ rightDescision(15,"DAY3CLASS NIETZCHE no"); }]
        ]
    ],

    ["celesteav","Yeah... I love him!",false,"DAY3CLASS NIETZCHE yes"],
    ["kateav","Makes sense. You look like a really smart person.","DAY3CLASS NIETZCHE outro"],

    ["celesteav","Not really.",false,"DAY3CLASS NIETZCHE no"],
    ["kateav","Really? You look like a really smart person.","DAY3CLASS NIETZCHE outro"],

    ["celesteav","Oh... thank you!",false,"DAY3CLASS NIETZCHE outro"],
    ["celesteav","Kate, right?"],
    ["kateav","Yeah."],
    ["kateav","..."],
    ["kateav","You know, Nietzsche said you can tell someone's emotional intelligence by their voice."],
    ["celesteav","What do you mean? Like personality?"],
    ["kateav","Sort of. It's a part of human evolution. Like your voice made me know you were smart."],
    [null,
        [
            ["Thanks!","DAY3CLASS COMPLIMENT positive"],
            ["Oh... thanks. I guess...","DAY3CLASS COMPLIMENT neutral"],
            ["Wait, what?",function(){ rightDescision(15,"DAY3CLASS COMPLIMENT negative"); }],
        ]
    ],

    ["celesteav","Thanks!","DAY3CLASS COMPLIMENT outro","DAY3CLASS COMPLIMENT positive"],

    ["celesteav","Oh... thanks. I guess...","DAY3CLASS COMPLIMENT outro","DAY3CLASS COMPLIMENT neutral"],

    ["celesteav","Wait, what?","DAY3CLASS COMPLIMENT outro","DAY3CLASS COMPLIMENT negative"],


    ["kateav","So... are you free this Friday?",function(){classroom_door.changeFace("openviolet");},"DAY3CLASS COMPLIMENT outro"],
    ["kateav","Hey...",false,"DAY3CLASS COMPLIMENT outro 2"],
    
    
    
    ["violetav","Hey."],
    [null,"You notice Violet seems a little irritated."],
    ["kateav","..."],
    ["violetav","You're in my way."],
    
    
    ["kateav","Sorry. You don't have to get so mad about it.",function(){violet.phase ++; kate.phase ++;}],
    ["celesteav","Are you alright?",false,"DAY3CLASS VIOLET"],
    ["violetav","What did he say to you?"],
    ["celesteav","Like just now? ...He asked me if I was free."],
    ["violetav","..."],
    ["celesteav","Why? Are y'all friends or something?"],
    ["violetav","..."],
    ["violetav","He's my boyfriend... technically. For almost a year now."],
    ["violetav","I don't know for how much longer."],
    ["celesteav","Wait, what?"],
    ["celesteav","Don't take this the wrong way, but I would have never thought..."],
    ["violetav","I know, I know."],
    ["violetav","It's a long story."],
    ["celesteav","Oh...",function(){mrface.phase ++;}],


    ["mrfaceav","Alright everyone, class is starting...",false,"DAY 3 MRFACE"],
    ["mrfaceav","What is the first term under chapter two? ...Kate?"],
    ["kateav","Wait, I have a question. Why are we skipping the chapter on the space race?"],
    ["mrfaceav","Right. That's complicated. There are some things in human history that are still controversial even to this day. In this case, it's NASA."],
    ["kateav","Wait what? I thought NASA was recognized by everyone in the scientific community..."],
    ["mrfaceav","Well... actually it isn't."],
    ["mrfaceav","I don't know how much any of you know about NASA's history. But I think it's time we have a serious conversation about it."],
    ["mrfaceav","Where should I start? ...We all grow up learning things that aren't necessarily true. We thought santa clause was real until early on in our childhoods. But there are still some incorrect beliefs that we still hold on to. There are plenty of examples, especially when it comes to things like spirituality..."],
    [null,"You start to zone out. Eventually the bell rings",function(){returnToHallway("DAY 3 class")}],

    // ### DAY 3 DREAM
    ["lextharav","Hello.",false,"DAY 3 DREAM"],
    ["lextharav","Are you familiar with this location?"],
    ["astronautav","No."],
    ["lextharav","I discovered you floating around, and I am interested in understanding you as an individual."],
    ["astronautav","..."],
    [null,
        [
            ["Where am I?","DAY3DREAM QUESTION where"],
            ["Am I alive?","DAY3DREAM QUESTION alive"],
            ["What are you exactly?",function(){ rightDescision(10,"DAY3DREAM QUESTION what"); }]
        ]

    ],

    ["astronautav","Where am I?",false,"DAY3DREAM QUESTION where"],
    ["lextharav","Where are you from, Celeste?"],
    [null,
        [
            ["...not from around here","DAY3DREAM WHERE not"],
            ["Stanton","DAY3DREAM WHERE stanton"],
            ["(Persist in asking)",function(){ rightDescision(10,"DAY3DREAM WHERE persist"); }]
        ]
    ],

    ["astronautav","Am I alive?",false,"DAY3DREAM QUESTION alive"],
    ["lextharav","Where are you from, Celeste?"],
    [null,
        [
            ["...not from around here","DAY3DREAM WHERE not"],
            ["Stanton","DAY3DREAM WHERE stanton"],
            ["(Persist in asking if you're alive)",function(){ rightDescision(10,"DAY3DREAM WHERE persist"); }]
        ]
    ],

    ["astronautav","What are you exactly? I still don't really know...",false,"DAY3DREAM QUESTION what"],
    ["lextharav","Where are you from, Celeste?"],
    [null,
        [
            ["...not from around here","DAY3DREAM WHERE not"],
            ["Stanton","DAY3DREAM WHERE stanton"],
            ["(Persist in asking who Lexthar is)",function(){ rightDescision(10,"DAY3DREAM WHERE persist"); }]
        ]
    ],


    ["astronautav","...not from around here.","DAY3DREAM WHERE outro","DAY3DREAM WHERE not"],

    ["astronautav","Stanton","DAY3DREAM WHERE outro","DAY3DREAM WHERE stanton"],


    ["astronautav","You didn't answer...",false,"DAY3DREAM WHERE persist"],
    ["lextharav","What?"],
    ["astronautav","You never answered me."],
    ["lextharav","...","DAY3DREAM WHERE outro2"],

    ["lextharav","How long have you been alive?",false,"DAY3DREAM WHERE outro"],
    ["astronautav","I don't understand."],
    ["lextharav","Let me pose a different question. How many more years do you think you have?",false,"DAY3DREAM WHERE outro2"],
    [null,
        [
            ["Take a guess.","DAY3DREAM DEATH guess"],
            ["Admit that you don't know",function(){ rightDescision(10,"DAY3DREAM DEATH admit") }]
        ]
    ],

    ["astronautav","Until I die? ...probably... sixty?","DAY3DREAM DEATH outro","DAY3DREAM DEATH guess"],

    ["astronautav","Until I die? ...I don't know.","DAY3DREAM DEATH outro","DAY3DREAM DEATH admit"],

    ["lextharav","I have an offer to make, Celeste.",false,"DAY3DREAM DEATH outro"],
    ["astronautav","What do you mean?"],
    ["lextharav","Are you aware that I live forever?"],
    ["astronautav","I kind of assumed."],
    ["lextharav","And most of that time I spend alone."],
    ["astronautav","Oh."],
    ["lextharav","And I have the power to make a person live forever with the consent of that person. They would live a life alike to mine, but we could keep each other company. This could be you, granted you have the interest."],
    [null,
        [
            ["Accept Lexthar's offer to make you immortal","ACCEPT LEXTHAR"],
            ["Reject Lexthar's offer","DAY3DREAM LEXTHAR no"]
        ]
    ],

    ["astronautav","Listen...",false,"DAY3DREAM LEXTHAR no"],
    ["astronautav","I want to die sometime. I don't want to live forever."],
    ["lextharav","..."],
    ["lextharav","Ok. I understand."],
    ["astronautav","...thanks.",function(){wakeup();}],

    // ### DAY 4 CLASS
    [null,"You have arrived early to class.",choiceBankDic["day4Class"],"DAY 4 CLASS"],

    ["celesteav","Hey.",false,"DAY4CLASS TALK kate"],
    ["kateav","What's up?"],
    ["celesteav","...just waiting for class to start."],
    ["kateav","Sick."],
    ["celesteav","...",choiceBankDic["day4Class"]],

    //This one is different depending on whether or not you've actually talked to her before.
    ["celesteav","So... I know I've asked this before but... where did you get your name from?","DAY4CLASS TALK lexi outro","DAY4CLASS TALK lexi asked"], 

    ["celesteav","So... where did you get your name from?","DAY4CLASS TALK lexi outro","DAY4CLASS TALK lexi notasked"], 

    ["lexiav","My parents.",false,"DAY4CLASS TALK lexi outro"],
    ["celesteav","Right! But I mean why did they choose that name."],
    ["lexiav","I'm not in the mood to talk right now... sorry."],
    ["violetav","Wow, rude much?"],
    ["celesteav","..."],
    ["celesteav","Who's Nietzsche?"],
    ["lexiav","Are you asking cause of Kate?"],
    ["celesteav","Yeah! How did you know?"],
    ["lexiav","He talks about that stuff a lot."],
    ["celesteav","He seems fun to be around."],
    ["lexiav","Yeah I guess."],
    ["lexiav","He's hard to talk to sometimes though..."],
    ["violetav","No offence, but you're not really one to talk."],
    ["lexiav","...",choiceBankDic["day4Class"]],

    ["celesteav","Are you free after school today?",false,"DAY4CLASS TALK violet"],
    ["violetav","Sorry. I'm busy."],
    ["celesteav","With what?"],
    ["violetav","I'm getting a cake. It's my birthday today."],
    [null,
        [
            ["Maybe I could come with you.",function(){ 
                flagDic["DAY4CLASS BIRTHDAY come"] = true; 
                flagDic["JAMIES"] = true;
                rightDescision(30,"DAY4CLASS BIRTHDAY come");
            }], 
            ["Oh... happy birthday!",function(){
                flagDic["DAY4CLASS BIRTHDAY come"] = false;
                dialogueDic["DAY4CLASS BIRTHDAY wish"].appear();
            }]
        ]
    ],

    ["celesteav","Oh, happy birthday!",choiceBankDic["day4Class"],"DAY4CLASS BIRTHDAY wish"],

    ["celesteav","Maybe I could come with you.",false,"DAY4CLASS BIRTHDAY come"],
    ["violetav","Sure... if you want. It's this place called 86 degrees bakery... not to far from here.",choiceBankDic["day4Class"]],

    ["mrfaceav","Alright... let's take a look at chapter three today. Can someone read me the first word underneath key terms? ...Aqsa, go ahead.",false,"DAY4CLASS outro"],
    ["aqsaav","Religion."],
    ["mrfaceav","That's right..."],
    ["mrfaceav","..."],
    ["mrfaceav","Religion is important... and it's impossible to understand religion without understanding God. So how do we begin to understand Him?"],
    // Kate raises his hand.
    ["kateav","Sir, I have a question."],
    ["mrfaceav","Ok. You raised your hand."],
    ["kateav","There is technically no scientific evidence that God exists."],
    ["mrfaceav","That's not a question."],
    ["kateav","Sorry sir."],
    ["mrfaceav","And you're wrong. According to a lot of experts in spirituality, and according to me, Gods and Goddesses do exist. They're entities with specific powers, not the all powerful deities you would see in scripture. Think of their abilities like specialties. Like controlling a certain element, or creating energy."],
    ["kateav","Oh, I just remembered my question."],
    ["mrfaceav","What is it."],
    ["kateav","Are you allowed to be teaching religion?"],
    ["mrfaceav","That isn't for you to decide."],
    ["kateav","It was just a question."],
    ["mrfaceav","I am not teaching religion. I am teaching about religion. As I was saying..."],
    [null,"Eventually the bell rings.",function(){
        if(flagDic["DAY4CLASS BIRTHDAY come"] != true){
           hallwayi.hasEvent = true; 
        }
        returnToHallway("DAY 4 violet");
    }],


    // ### DAY 4 VIOLET
    // This plays if you don't talk to Violet. Violet will then appear out in the hallway and randomly approach you.

    ["violetav","Hey.",false,"DAY 4 VIOLET"],
    ["violetav","What do we have to do for homework today?"],
    ["celesteav","Read chapter three I think..."],
    ["violetav","...I think I'm gonna fail this class."],
    ["celesteav","Do you wanna meet up and work on it together?"],
    ["violetav","Sorry. I'm busy."],
    ["celesteav","With what?"],
    ["violetav","I'm getting a cake. It's my birthday today."],
    [null,
        [
            ["Maybe I could come with you.",function(){ 
                flagDic["DAY4CLASS BIRTHDAY come"] = true; 
                flagDic["JAMIES"] = true;
                dialogueDic["DAY4VIOLET BIRTHDAY come"].appear();
            }], 
            ["Oh... happy birthday!",function(){
                dialogueDic["DAY4VIOLET BIRTHDAY wish"].appear();
            }]
        ]
    ],

    ["celesteav","Oh, happy birthday!",false,"DAY4VIOLET BIRTHDAY wish"],
    ["violetav","Thanks.",function(){ 
        gamePause = false;
        flagDic["DAY4CLASS BIRTHDAY come"] = false;
        violet.changeFace("stillforward");
    }],

    ["celesteav","Maybe I could come with you.",false,"DAY4VIOLET BIRTHDAY come"],
    ["violetav","Sure... if you want. It's this place called 86 degrees bakery... not too far from here.",function(){ 
        flagDic["DAY4CLASS BIRTHDAY come"] = true; 
        flagDic["JAMIES"] = true; // you can now go to jamies
        gamePause = false;
        violet.changeFace("stillforward");
        violet.selectType = "select";
    }],

    // ### DAY 4 BAKERY
    [null,"Violet is looking at the cakes in the display as you approach her.",false,"DAY 4 BAKERY"],
    ["violetav","Which one should I get."],
    [null,
        [
            ["Reccomend one of the cupcakes.",function(){ rightDescision(10,"DAY4BAKERY CAKE cake"); }],
            ["Reccomend a large cake.","DAY4BAKERY CAKE cake"],
            ["Pick one at random","DAY4BAKERY CAKE random"]
        ]
    ],


    ["celesteav","That one?",false,"DAY4BAKERY CAKE cake"],
    ["violetav","Really? Okay..."],
    [null,"Violet disreguards your suggestion and searches for soemthing else."],
    ["celesteav","Uh...","DAY4BAKERY TOPIC"],


    ["celesteav","That one?",false,"DAY4BAKERY CAKE random"],
    ["violetav","Did you even look at them?"],
    ["celesteav","Uh...","DAY4BAKERY TOPIC"],
    [null,
        [
            ["(Change the topic).","DAY4BAKERY TOPIC change"],
            ["Ask if you'll be able to eat the cake.","DAY4BAKERY TOPIC cake"],
            ["Say the first thing that comes to your mind to break the awkward silence.","DAY4BAKERY TOPIC awkward"]
        ],
     false,
     "DAY4BAKERY TOPIC"
    ],

    ["celesteav","...",choiceBankDic["day4Bakery"],"DAY4BAKERY TOPIC change"],

    ["celesteav","Am I gonna get to eat some of the cake?",false,"DAY4BAKERY TOPIC cake"],
    ["violetav","Sure."],
    ["celesteav","...",choiceBankDic["day4Bakery"]],

    ["celesteav","You seem tired. Are you tired?",false,"DAY4BAKERY TOPIC awkward"],
    ["violetav","..."],
    ["violetav","No?",choiceBankDic["day4Bakery"]],

    ["celesteav","I haven't learned a single thing about World History so far.",false,"DAY4BAKERY QUESTION class"],
    ["violetav","That's true."],
    ["celesteav","...Is everyone here like Mr. Face?"],
    ["violetav","God, no."],
    ["celesteav","...",choiceBankDic["day4Bakery"]],

    ["celesteav","Where did you and Kate meet?",false,"DAY4BAKERY QUESTION date"],
    ["violetav","Oh... that's a funny story. There was something I wanted to buy... it was really cute, but I didn't know where to get it. Kate found out about this somehow and we made a deal that if I paid for it, he could find where to buy it for me. I thought it was kind of sweet of him, considering we didn't know eachother that well."],
    ["celesteav","Oh... nice!",choiceBankDic["day4Bakery"]],

    ["celesteav","Are you and Lexi friends or something?",false,"DAY4BAKERY QUESTION friends"],
    ["violetav","No."],
    ["violetav","We literally just met yesterday."],
    ["celesteav","Oh...",choiceBankDic["day4Bakery"]],

    ["celesteav","Do you usually buy yourself a cake? On your birthday?",false,"DAY4BAKERY QUESTION cake"],
    ["violetav","..."],
    ["violetav","Yeah? I don't see why not.",choiceBankDic["day4Bakery"]],

    ["violetav","I'm going back to my house now. We can keep talking on the way back.",function(){violet.phase ++;},"DAY4BAKERY QUESTION outro"],


    // --- in the game it might work to where you can literally go nowhere else until you follow Violet into her house and have that whole scene...

    ["celesteav","Woah, this is where you live?!",false,"DAY4BAKERY SHOCK"],
    ["violetav","It is."],
    // Enter the house.
    ["violetav","Hey, wanna see something cool? Here look at this.",function(){violetmini.phase ++}],
    ["celesteav","So what did you want to show me?",false,"DAY4BAKERY CONVERSATION"],
    ["violetav","Ok so. I found this app online that can make your email look like whoever you want."],
    ["violetav","Watch... I'll send you an email."],
    ["violetav","Look at it!"],
    ["celesteav","Woah."],
    ["violetav","Who's it from?"],
    ["celesteav","It looks like the school sent it to me. It's from Stanton ISD!"],
    ["violetav","...Pretty cool right?"],
    ["celesteav","Wow... this is so crazy."],
    ["violetav","Right. So who should I email first?"],
    ["celesteav","..."],
    ["violetav","How about Mr. Face... I have his wife's email!"],
    [null,
        [
            ["(Encourage Violet)",function(){ rightDescision(10,"DAY4BAKERY MRFACE encourage"); }],
            ["(Try to get Violet to stop.)","DAY4BAKERY MRFACE stop"]
        ]
    ],

    ["celesteav","Oh my god",false,"DAY4BAKERY MRFACE encourage"],
    ["celesteav","..."],
    ["celesteav","Do it!"],
    ["violetav","“I've been meaning to say this for a long time...”","DAY4BAKERY MRFACE outro"],

    ["celesteav","No! That's so bad.",false,"DAY4BAKERY MRFACE stop"],
    ["violetav","“I've been meaning to say this for a long time...”"],
    ["celesteav","Stop..."],
    ["violetav","“...but I want a divorce...”",false,"DAY4BAKERY MRFACE outro"],
    ["celesteav","You're not gonna send that are you?"],
    ["violetav","Too late!"],
    ["celesteav","Oh my god."],
    ["violetav","Ok Lexi's next."],
    [null,
        [
            ["(Encourage Violet)",function(){ rightDescision(10,"DAY4BAKERY LEXI encourage"); }],
            ["(Try to get Violet to stop.)","DAY4BAKERY LEXI stop"],
        ]
    ],

    ["celesteav","Hahaha","DAY4BAKERY LEXI outro","DAY4BAKERY LEXI encourage"],

    ["celesteav","No you can't do that. I'm serious.",false,"DAY4BAKERY LEXI stop"],
    ["violetav","Hmm... She's getting a notice because she's failing her classes.",false,"DAY4BAKERY LEXI outro"],
    ["celesteav","..."],
    ["violetav","Haha she's going to be so scared when she sees this!"],
    ["celesteav","...did you really send it?"],
    ["violetav","What kind of parent would name their kid “Lexthar” anyways. It sounds like an alien's name or something."],
    ["celesteav","Yeah"],
    ["celesteav","..."],
    ["celesteav","Hey, I think I should be heading home now."],
    ["violetav","Okay! ...we should hang out again sometime."],
    ["celesteav","Yeah!",function(){violetbig.phase ++; flagDic["story"] = "DAY 4 night"}],
    // cut to outside of Violet's house.

    // ### DAY 4 DREAM


    ["lextharav","Hello.",choiceBankDic["day4Dream"],"DAY 4 DREAM"],

    ["astronautav","Can you please tell me where I am...",false,"DAY4DREAM FIRST where"],
    ["lextharav","This area is known in English as The Magenta Sector."],
    ["astronautav","That's creepy."],
    ["astronautav","..."],
    ["astronautav","There is not a lot of magenta here."],
    ["lextharav","There is. You are unable to see it."],
    ["astronautav","Oh ok.",choiceBankDic["day4Dream"]],


    ["astronautav","Are you angry at me?",false,"DAY4DREAM FIRST angry"],
    ["lextharav","I am not."],
    [null,
        [
            ["If you're angry at me, we should talk about it!",function(){ rightDescision(10,"DAY4DREAM ANGRY talk"); }],
            ["I'm sorry for not taking your offer...","DAY4DREAM ANGRY apologize"]
        ]
    ],

    ["astronautav","If you're angry at me, we should talk about it! ...Do goddesses even get angry?","DAY4DREAM ANGRY outro","DAY4DREAM ANGRY talk"],

    ["astronautav","I'm sorry for not taking your offer...","DAY4DREAM ANGRY outro","DAY4DREAM ANGRY apologize"],

    ["lextharav","It is alright. We have no issues.",false,"DAY4DREAM ANGRY outro"],
    ["astronautav","...",choiceBankDic["day4Dream"]],

    ["astronautav","Did you say you were a goddess?",false,"DAY4DREAM FIRST goddess"],        
    ["lextharav","..."],
    ["lextharav","That is correct."],
    ["astronautav","..."],
    ["astronautav","What kind of powers do you have?"],
    ["lextharav","I can create and destroy matter. I have vision that is far superior to most sentient beings."],
    ["astronautav","Can you see into the minds of my classmates?"],
    ["lextharav","..."],
    ["astronautav","Hypothetically speaking, how much could you tell me about them? Just out of curiosity...","DAY4DREAM FIRST outro"],

    ["astronautav","Are you all knowing?",false,"DAY4DREAM FIRST know"],
    ["lextharav","I know a lot more than you do."],
    ["astronautav","So you know about my classmates? Hypothetically speaking, how much could you tell me about them?","DAY4DREAM FIRST outro"],

    ["lextharav","I understand what you are trying to do.",false,"DAY4DREAM FIRST outro"],
    ["astronautav","Will you do it?"],
    ["lextharav","There are some things you should not know about."],
    ["astronautav","How about this, if I ask a question you don't want an answer, just say “pass”."],
    ["lextharav","Okay.",choiceBankDic["day4Advice"]],


    ["astronautav","Does Violet think I'm her friend?",false,"DAY4DREAM ADVICE violet"],
    ["lextharav","She regards you as a peer."],
    ["astronautav","How do I get her to open up more?"],
    ["lextharav","If she opens up because you use my words, is it really you she's opening up to?"],
    ["astronautav","True...",choiceBankDic["day4Advice"]],


    ["astronautav","Who is Lexi?",false,"DAY4DREAM ADVICE lexi"],
    ["lextharav","She is a girl in your class."],
    ["astronautav","Yeah I know! I mean why do you two have the same name?"],
    ["lextharav","Pass."],
    ["astronautav","Hm... Ok. Why doesn't she want to talk to me?"],
    ["lextharav","Lexi feels like her friends are characters in a movie, and she observes like an audience member. Remember this. She relies on no one else except for herself."],
    ["astronautav","That's sad..."],
    ["lextharav","Correct. It reveals her immaturity... she will come to regret it for the rest of her life. If you want to be friends with her, you need to make all the first moves.",choiceBankDic["day4Advice"]],


    ["astronautav","What is going on in World History?",false,"DAY4DREAM ADVICE mr. face"],
    ["lextharav","You are responsible for figuring that out yourself."],
    ["astronautav","Ugh... you're not really helping me out.",choiceBankDic["day4Advice"]],


    ["lextharav","I just remembered something.",false,"DAY4DREAM outro"],
    ["lextharav","Please be careful when interacting with your friends. Their outside appearance doesn't always match their reality.",function(){wakeup();}],



    // ### DAY 5 CLASS
    ["mrfaceav","Alright... everyone turn to chapter four. Let's read the key concepts...",false,"DAY 5 CLASS"],
    ["mrfaceav","Actually. Everyone close the book. I want to take the time and add something to our list of core values."],
    ["mrfaceav","I want to add free thought. This is the most important thing you can learn in life, other than spirituality."],
    ["mrfaceav","We seem to think science is everything. But science is why young people believe in evolution or the spherical universe."],
    ["kateav","I'm pretty sure astrophysicists have already determined the universe is spherical."],
    ["mrfaceav","..."],
    ["mrfaceav","You're getting two points off for speaking out of turn. Can someone tell me the interruption policy?"],
    ["mrfaceav","And can you even explain how you know that?"],
    ["kateav","It's basic rationality and common sense. It's mathematically impossible for the universe to be flat."],
    ["mrfaceav","See, this is exactly what I mean. “Common sense.” Our society's eagerness to believe whatever they're told. How do you explain your blind faith in science?"],
    ["kateav","It's basic Chompsky. “Science is a rigorous, established methodology.” That's different from just randomly making up stuff."],
    ["mrfaceav","Do you want to fail this class?"],
    ["kateav","I just want to be learning about something useful, sir."],
    ["mrfaceav","Ok everyone split into groups again. Kate come see me.",function(){ returnToHallway("DAY 5 violet");}],

    // ### DAY 5 TEXTS
    [null,"Your phone buzzes. It's Violet.",false,"DAY 5 TEXTS"],
    ["violetav","I'm gonna kill her"],
    ["celesteav","Who?"],
    ["violetav","Lexi... it's a long story..."],
    ["celesteav","What did she do??"],
    ["violetav","She posted everything online! My credit card information, passwords... everything"],
    ["celesteav","That's really dangerous!!"],
    ["violetav","Unfortunately... yes"],
    ["violetav","But it doesn't stop there... I didn't notice until this morning. Someone has access to my accounts and they're making purchases and leaking personal stuff online... like, really personal stuff"],
    ["celesteav","...oh."],
    ["celesteav","Why would she do something like that?"],
    ["violetav","I think. She found out what I did yesterday. With the fake emails... I don't know how though."],
    ["violetav","I can't get back into any of my accounts. I don't know what to do. I'm so angry..."],
    [null,
        [
            ["We should talk to her about this.",function(){ rightDescision(15,"DAY5TEXTS LEXI talk"); }],
            ["You could always report her...","DAY5TEXTS LEXI report"]
        ]
    ],

    ["celesteav","We should talk to her about this.",false,"DAY5TEXTS LEXI talk"],
    ["violetav","No. I don't know how she got the info... but she won't just walk away from this.","DAY5TEXTS LEXI outro"],

    ["celesteav","You could always report her...",false,"DAY5TEXTS LEXI report"],
    ["violetav","No. I'm going to take care of this myself.","DAY5TEXTS LEXI outro"],
    
    ["celesteav","How do you think she might have gotten it???",false,"DAY5TEXTS LEXI outro"],
    ["violetav","I dont know! The only other person who has that information is Kate."],
    ["celesteav","What?! Are you crazy???"],
    ["violetav","I know... it was stupid"],
    ["celesteav","Don't you know how much trouble you can get into?"],
    ["violetav","He's my boyfriend!"],
    ["violetav","...It was a long time ago, trust me."],
    ["celesteav","..."],
    ["violetav","Ok, I get it, it was stupid!"],
    [null,
        [
            ["You should really just talk to Lexi about it",function(){ rightDescision(15,"DAY5TEXTS LEXI2 talk"); }],
            ["You should really just report her","DAY5TEXTS LEXI2 report"]
        ]
    ],

    ["celesteav","You should really just talk to Lexi about it",false,"DAY5TEXTS LEXI2 talk"],
    ["violetav","Easy for you to say",null],

    ["celesteav","You should really just report her",false,"DAY5TEXTS LEXI2 report"],
    ["violetav","Easy for you to say",null],


    // ### DAY 5 DREAM
    ["astronautav","Hey!",function(){fadeOut(function(){classroomtrap_eatscene.play();})},"DAY 5 DREAM"],
    ["violetav","Celeste...?",false,"DAY 5 closeup"],
    ["violetav","...? Why are we here?"],
    ["astronautav","Your guess is just as-"],
    ["violetav","Wait-!"],
    ["astronautav",".+++++++.++++++.++++++",function(){currLoc.update(); audioDic["violeteat"].play(); setTimeout(function(){audioDic["disgusting"].play();},frameRate * 12);}],

    // --- in the dream the player may screw up and not enter the grub... either way doesn't effect the game... you just don't get to see Violet devour you.

    // ### DAY 6 DREAM
    [null,"June 10th, 2048",false,"DAY 6 DREAM"],
    [null,"Written by Celeste"],
    [null,"There's something about this whole mission that throws me off guard. Actually it's something to do with Neptune in particular. It feels like I'm looking at something that I wasn't ever meant to see. Neptune's blue isn't just blue, it's the purest blue you'll ever look at. It burns your eyes and reverberates too loudly in your soul. And when I look at it thousands of tiny hands squeeze my brain like they're telling me to look away. I know this probably sounds crazy. I know I probably wouldn't feel this way if I slept more often, but I just can't shake the feeling."],
    [null,"Last night I had a dream that I was in my bed and I couldn't move. I heard thousands of voices laughing at me. It was so loud, like I could hear each individual voice clearly in uncontrollable laughter. And just when it started to die down another “joke” would land and the voices would just explode in laughter again. I was half convinced the TV was on, and I needed to find out. Like if I didn't find out I would never know. All the while the piercing blue photo of Neptune was stuck in my mind."],
    [null,"End of log.",function(){currLoc.update();}],

    // ### DAY 7 BENADRYL
    ["kateav","Oh hey, it's you.",false,"DAY 7 BENADRYL"],
    ["celesteav","Yeah! It's my house."],
    ["kateav","I ran out of Benadryl and I was going to ask if I could borrow some of yours."],
    ["celesteav","I don't have any Benadryl haha..."],
    ["kateav","Why are you laughing?"],
    ["celesteav","It's nothing."],
    ["kateav","Come on. Tell me."],
    ["celesteav","I mean, you just show up to my house asking for Benadryl."],
    ["kateav","What's wrong with that?"],
    ["celesteav","It's not something you tend to go around asking people..."],
    ["kateav","Can I come in?"],
    [null,
        [
            ["Sure!",function(){ rightDescision(15,"DAY7BENADRYL KATE yes"); }],
            ["(Make up an excuse)","DAY7BENADRYL KATE no"],
        ]
    ],

    ["celesteav","I actually have to go work on homework right now, sorry.",false,"DAY7BENADRYL KATE no"],
    ["kateav","Fine.",function(){flagDic["story"] = "DAY 7 night"; playEvening(100);}],

    ["celesteav","Sure!",function(){pauseGame(); celestedownstairs_door.changeFace("open"); katebig.phase ++;},"DAY7BENADRYL KATE yes"],
    // Kate goes inside with you
    ["celesteav","...",choiceBankDic["day7Kate"],"DAY7BENADRYL TREE choices"],

    ["celesteav","Why Benadryl?",false,"DAY7BENADRYL TREE benadryl"],
    ["kateav","I'm trying to get in touch with my past memories. I tried Mescaline but it didn't have the effects I wanted... you know how it is."],
    ["celesteav","Oh! I thought you had allergies."],
    ["kateav","What does that have to do with anything?"],
    ["celesteav","I hope your joking...","DAY7BENADRYL TREE choices"],

    ["celesteav","How did you know my address?",false,"DAY7BENADRYL TREE address"],
    ["kateav","I didn't know it was you."],
    ["celesteav","Oh...","DAY7BENADRYL TREE choices"],

    ["celesteav","Are you dating Violet?",false,"DAY7BENADRYL TREE dating"],
    ["kateav","Yeah she's my girlfriend."],
    [null,
        [
            ["I think she's mad at you.",function(){ rightDescision(5,"DAY7BENADRYL TREE mad"); }],
            ["Where did y'all meet?","DAY7BENADRYL TREE meet"]
        ]
    ],

    ["celesteav","I think she's mad at you.",false,"DAY7BENADRYL TREE mad"],
    ["kateav","I don't see why. There's a mutual respect in our relationship. I never force her to do anything she doesn't want to."],
    ["kateav","You've heard of Kant right? He was always talking about... like relationships and consenting parties. He's really smart."],
    [null,
        [
            ["(Sympathize with Kate)","DAY7BENADRYL TREE sympathize"],
            ["You might wanna talk to her about it...",function(){ rightDescision(5,"DAY7BENADRYL TREE explain"); }]
        ]
    ],

    ["celesteav","You might wanna talk to her about it...",false,"DAY7BENADRYL TREE explain"],
    ["kateav","I don't see the point."],
    ["celesteav","Are you serious?"],
    ["kateav","A relationship forms when there are two consenting parties. You don't really need anything else. As long as there's consent, there's nothing wrong with it.",false,"DAY7BENADRYL TREE morals"],
    ["celesteav","..."],
    ["kateav","It would be wrong if I forced her to do something. I'm not about that.","DAY7BENADRYL TREE choices"],

    ["celesteav","Well... I have homework to be doing now.",false,"DAY7BENADRYL TREE outro"],
    ["kateav","Sick. See you tomorrow.",function(){flagDic["story"] = "DAY 7 night"; playEvening(100); katebig.phase ++;}],

    ["celesteav","Yeah I guess she can overreact sometimes.",false,"DAY7BENADRYL TREE sympathize"],
    ["kateav","Totally... she's super controlling.","DAY7BENADRYL TREE choices"],

    ["celesteav","Why do you always argue with Mr. Face?",false,"DAY7BENADRYL TREE teacher"],
    ["kateav","Because everything he says is bullshit and it actually pisses me off."],
    [null,
        [
            ["(Agree with Kate)","DAY7BENADRYL TREE agree"],
            ["That doesn't mean you have to interrupt all the time...",function(){ rightDescision(5,"DAY7BENADRYL TREE argue"); }]
        ]
    ],

    ["celesteav","That doesn't mean you have to interrupt all the time!",false,"DAY7BENADRYL TREE argue"],
    ["kateav","It actually does. Criticizing the establishment is a basic capacity of being alive. If you don't use it it goes away."],
    ["celesteav","But you can still criticizing the establishment without bothering everyone else!"],
    ["kateav","We all have to perpetuate the truth in the face of a blatant lie. That's a basic responsibility."],
    [null,
        [
            ["(Agree with Kate)","DAY7BENADRYL TREE agree"],
            ["(Change the topic)","DAY7BENADRYL TREE choices"]
        ]
    ],

    ["celesteav","Ok that's true.",false,"DAY7BENADRYL TREE agree"],
    ["kateav","How does he still work there? I don't understand it.","DAY7BENADRYL TREE choices"],

    ["celesteav","Where did y'all meet?",false,"DAY7BENADRYL TREE meet"],
    ["kateav","I was dating another girl. But I wasn't really feeling it, because she never let me do anything. She restricted my agency and it was so messed up. Then I met Violet. It was almost her birthday and so I bought her a present and asked her out."],
    [null,
        [
            ["That's sweet!","DAY7BENADRYL TREE cute"],
            ["Wait, while you were dating someone else?!",function(){ rightDescision(5,"DAY7BENADRYL TREE morals"); }],
        ]
    ],

    ["celesteav","That's sweet!",false,"DAY7BENADRYL TREE cute"],
    ["kateav","Totally...","DAY7BENADRYL TREE choices"],

    // ### DAY 7 DREAM
    ["lextharav","What is the human experience like?",false,"DAY 7 DREAM"],
    ["astronautav","...I don't know... what is it like to be a goddess?"],
    ["lextharav","I offered you a chance to know."],
    ["astronautav","..."],
    ["lextharav","I hope you understand that living forever isn't as bad as it sounds."],
    [null,
        [
            ["(Give up and accept Lexthar's offer.)","ACCEPT LEXTHAR"],
            ["I already said no.","DAY7DREAM IMMORTAL no"],
        ]
    ],

    ["astronautav","I already said no.",false,"DAY7DREAM IMMORTAL no"],
    ["lextharav","Are you concerned about the loneliness? Because I will be here the whole time for you."],
    ["astronautav","It's not that... I just don't want to live forever, ok?"],
    ["lextharav","Try to empathize with me. I spend millennia without ever talking to a single sentient creature."],
    ["astronautav","I'm sorry about that."],
    ["lextharav","You are unwilling to understand my experience."],
    [null,
        [
            ["To put it simply... it's my choice, not yours.",
            function(){
                flagDic["DAY7DREAM REJECT explain"] = true;
                rightDescision(15,"DAY7DREAM REJECT explain");
            }],
            ["Can you please stop asking me?","DAY7DREAM REJECT stop"],
        ]
    ],

    ["astronautav","Can you please stop asking me? It's not what I want.","DAY7DREAM REJECT outro","DAY7DREAM REJECT stop"],

    ["astronautav","To put it simply... it's my choice, not yours. It's not what I want.","DAY7DREAM REJECT outro","DAY7DREAM REJECT explain"],
    ["lextharav","What is it that you want?",false,"DAY7DREAM REJECT outro"],
    [null,
        [
            ["I want to go home.","DAY7DREAM WANT home"],
            ["I want you to leave me alone.",function(){ rightDescision(5,"DAY7DREAM WANT alone"); }],
            ["I want to be less lonely.","DAY7DREAM WANT lonely"]
        ]
    ],

    ["astronautav","I want to go home... to be honest.","DAY7DREAM WANT trick","DAY7DREAM WANT home"],

    ["astronautav","I want to be less lonely...",function(){
        if("DAY7DREAM REJECT explain" in flagDic){
            dialogueDic["DAY7DREAM WANT outro explain"].appear();
        } else {
            dialogueDic["DAY7DREAM WANT outro notexplain"].appear();
        }
    },"DAY7DREAM WANT lonely"],

    ["astronautav","I want you to leave me alone...","DAY7DREAM WANT trick","DAY7DREAM WANT alone"],


    // different one depending on which one you chose in the DAY7DREAM REJECT choice
    ["lextharav","...",false,"DAY7DREAM WANT trick"],
    ["lextharav","Sometimes... we think we want things that we do not actually want.",function(){
        if("DAY7DREAM REJECT explain" in flagDic){
            dialogueDic["DAY7DREAM WANT outro explain"].appear();
        } else {
            dialogueDic["DAY7DREAM WANT outro notexplain"].appear();
        }
    }],

    ["lextharav","You are correct as in you decide, but you must understand that I know more than you could ever hope to imagine. Listening to me would only benefit you.. I can deter you from making choices you will come to regret.",function(){wakeup();},"DAY7DREAM WANT outro explain"],

    ["lextharav","You must understand that I know more than you could ever hope to imagine. Listening to me would only benefit you.. I can deter you from making choices you will come to regret.",function(){wakeup();},"DAY7DREAM WANT outro notexplain"],

    // ### DAY 8 CLASS
    [null,"You arrive a little early again. Violet has not arrived yet.",false,"DAY 8 CLASS"],
    [null,
        [
            ["Talk to Lexi",function(){ rightDescision(20,"DAY8CLASS TALK lexi"); }],
            ["Talk to Kate","DAY8CLASS TALK kate"]
        ]
    ],

    ["celesteav","...Hey.",false,"DAY8CLASS TALK kate"],
    ["celesteav","So... do you know about what happened the other day? With Violet?"],
    ["kateav","I don't think so..."],
    ["kateav","Oh, wait! You mean with her passwords and stuff?"],
    ["kateav","Yeah. That was me. Me and Lexi did that..."],
    ["celesteav","Wait, what?! Why?"],
    ["kateav","Look, Violet is so controlling sometimes. She needs to realize there are consequences..."],
    ["celesteav","You could have done that without violating her privacy."],
    ["kateav","I know it looks bad, but I swear if you knew how controlling she was you would have done the same thing."],
    ["celesteav","No... I'm pretty sure I wouldn't.",function(){classroom_door.changeFace("openviolet");}],

    ["celesteav","I saw what you did the other day.",false,"DAY8CLASS TALK lexi"],
    ["lexiav","...you mean with Violet?"],
    ["celesteav","Why did you do that."],
    ["lexiav","Kate told me to do it."],
    ["celesteav","So it's all his fault."],
    ["lexiav","...I mean, Violet's a jerk too."],
    ["celesteav","Really?"],
    ["lexiav","She tried to trick me into thinking I was failing. I found out it was her though."],
    ["celesteav","...what do you mean?"],
    ["lexiav","She sent me an email pretending to be the school."], 
    ["celesteav","..."],
    ["celesteav","I think she's really upset."],
    ["lexiav","Good.",function(){classroom_door.changeFace("openviolet");}],

    // Mr. Face's story: He is a world history teacher with a wierd belief systems. He slowly starts to realize that he can use his position to preach and slowly starts to abuse it.
    ["mrfaceav","Alright everyone, class is starting...",false,"DAY8CLASS TALK outro"],
    ["mrfaceav","I know we originally planned to go over chapters five and six today, but that's been postponed."],
    ["mrfaceav","..."],
    ["mrfaceav","I've been thinking a lot lately."],
    ["mrfaceav","Let me ask a question. Imagine there is a door. By opening it, you can see an unbiased, complete picture of how our world works. But you can never “unsee” it, no matter how disturbing this truth is. How many of you would open this door?"],
    // Only Kate raises his hand
    ["mrfaceav","Really? No one?"],
    ["mrfaceav","..."],
    ["mrfaceav","When I decided to be a World History teacher, I did it for one reason. To show people the truth. And I will stick with that goal-"],
    ["kateav","I'm confused."],
    // Start Violet Kicking sounds... a description and a sound effect should be fine.
    [null,"(kick)"],
    [null,"You hear Violet kick Lexi's chair behind you."],
    ["mrfaceav","Excuse me?"],
    ["kateav","I mean... how can you be so anti science and pro free thought at the same time?"],
    ["mrfaceav","This is your last warning."],
    ["kateav","I just wanna know!"],
    [null,"(kick)"],
    ["mrfaceav","Free thought is quintessential to our lives!"],
    ["kateav","I know, but science is literally founded on free thought."],
    ["mrfaceav","Science was invented to control ideas. Free thought is how we rise above that control."],
    ["kateav","So what are we supposed to believe instead of science?"],
    ["mrfaceav","We have to learn to understand the universe for ourselves!"],
    ["kateav","The flat universe?"],
    ["mrfaceav","No- Yes! Nothing is flatter than our universe!"],
    // Mr. Face walks back
    ["kateav","What about your wife?"], // hopefully this strikes a chord with Mr. Face because the whole deal with his wife.
    ["kateav","..."],
    ["kateav","Get it?"],
    ["mrfaceav","You know what? From this point on, no speaking at all. You've lost your privileges. If you speak again, you're getting in-school suspension."],
    [null,"(kick)"],
    ["mrfaceav","... Many of us grow up hearing the lies that are disciminated by the media and the government. And many of us are bullied into believing their dogma. But- Oh my god. Unbelievable."],
    // Animation of Kate vaping
    [null,"You see Kate vaping out of the corner of your eye"],
    ["kateav","What?",function(){mrface.phase ++; }],
    ["kateav","Hey!",false,"DAY 8 CLASS 2"],
    ["mrfaceav","Anyone else wanna cross me today?"],
    [null,"(kick)"],
    ["lexiav","Stop."],
    ["mrfaceav","You know what, this is bullshit. Obviously none of you came here to learn."],
    ["mrfaceav","Go! I'm done.",function(){hallwayi.hasEvent = true; returnToHallway("DAY 8 mrface");}],

    // ### DAY 8 OFFICE 
    ["mrfaceav","Hey Celeste. Come with me. I need to talk to you.",function(){mrface.phase ++;},"DAY 8 MR FACE"],
    // You follow Mr. Face into the office, because if you don't you get the isolation ending
    
    ["mrfaceav","Celeste. I've noticed you haven't been paying attention the past few days.",false,"DAY 8 OFFICE"],
    ["celesteav","...why?"],
    ["mrfaceav","You don't seem to be paying attention when I talk. Is there something that's distracting you?"],
    ["celesteav","..."],

    [null,
        [
            ["You're constant arguments with Kate are kind of distracting...",function(){ rightDescision(10,"DAY8OFFICE DISTRACT kate"); }],
            ["(Tell him about Violet and Lexi)","DAY8OFFICE DISTRACT violet"],
            ["No...","DAY8OFFICE DISTRACT no"]
        ]
    ],

    ["celesteav","You're constant arguments with Kate are kind of distracting...",false,"DAY8OFFICE DISTRACT kate"],
    ["mrfaceav","Kate..."],
    [null,"Mr. Face sighs"],
    ["mrfaceav","How well do you know him?"],
    ["mrfaceav","Do you two talk a lot?"],
    ["celesteav","Yeah sometimes..."],
    ["mrfaceav","As you've realized... he's been a bit of a distraction to everyone in the class. So I don't blame you."],
    ["mrfaceav","He was supposed to be in ISS a few days ago but he brought it up with my superintendent, and they sided with him. "],
    ["mrfaceav","I've been super stressed lately and..."],
    ["mrfaceav","..."],
    ["mrfaceav","and I'm going through a divorce right now."],
    ["celesteav","Oh."],
    ["mrfaceav","I'm going to ask you a favor. Could you talk to him about his behavior? Maybe he will listen more to someone he knows better."],
    ["celesteav","I can try..."],
    ["mrfaceav","Thank you Celeste.",function(){
        fadeOut(function(){
                changeLocation(hallwayii,90,90,null);
                player.halt();
                flagDic["DAY8OFFICE PROMISE kept"] = true;
                player.changeFace("stillforward");
                gamePause = false;
                flagDic["story"] = "DAY 8 night";
        });
    }],

    ["celesteav","Yeah actually... my friends Violet and Lexi are really angry at each other and I don't know what to do.",false,"DAY8OFFICE DISTRACT violet"],
    ["mrfaceav","How are they angry?"],
    ["celesteav","It's a long story."],
    ["mrfaceav","Well then. You need to remember that the classroom is an environment for work. All personal politics need to be left at the door.",false,"DAY8OFFICE politics"],
    ["celesteav","..."],
    ["mrfaceav","Am I clear?"],
    ["celesteav","Yes."],
    ["mrfaceav","Perfect. See you tomorrow in class.",function(){
        fadeOut(function(){
                changeLocation(hallwayii,90,90,null);
                player.halt();
                player.changeFace("stillforward");
                gamePause = false;
                flagDic["story"] = "DAY 8 night";
        });
    }],

    ["celesteav","No...","DAY8OFFICE politics","DAY8OFFICE DISTRACT no"],


    // ### DAY 8 DREAM
    ["lextharav","I have been meaning to say this for a while. I do not appreciate your cruelty towards me.",false,"DAY 8 DREAM"],
    ["astronautav","Wait what? What cruelity."],
    ["lextharav","I offered you something most beings never dream of, and you humiliate me in your rejection."],
    [null,
        [
            ["You're really sensitive for a goddess, you know?",function(){ rightDescision(15,"DAY8DREAM GODDESS sensitive"); }],
            ["Why don't you just force me to do it? Don't you have goddess powers?","DAY8DREAM GODDESS force"]
        ]
    ],

    ["astronautav","You're really sensitive for a goddess, you know?","DAY8DREAM GODDESS outro","DAY8DREAM GODDESS sensitive"],

    ["astronautav","Why don't you just force me to do it? Don't you have goddess powers?","DAY8DREAM GODDESS outro","DAY8DREAM GODDESS force"],

    ["lextharav","Perhaps goddess is not the correct word. It is the closest English equivalent. I do not know how to tell you what I am.",false,"DAY8DREAM GODDESS outro"],
    ["astronautav","Just describe it."],
    ["lextharav","Is there a word for a being that can perceive incredible amounts of information or create false environments? Who can create and destroy people, but not change them?"],
    [null,
        [
            ["Queen","DAY8DREAM WORD queen"],
            ["Emperor","DAY8DREAM WORD emperor"],
            ["Deity","DAY8DREAM WORD deity"],
            ["(Admit that you don't know)",function(){ rightDescision(15,"DAY8DREAM WORD idk"); }]
        ]
    ],

    ["astronautav","Queen?","DAY8DREAM WORD outro","DAY8DREAM WORD queen"],

    ["astronautav","Emperor?","DAY8DREAM WORD outro","DAY8DREAM WORD emperor"],

    ["astronautav","Deity?","DAY8DREAM WORD outro","DAY8DREAM WORD deity"],

    ["astronautav","...I don't think so. What's a false environment?",false,"DAY8DREAM WORD idk"],
    ["lextharav","It is a non-real space that can be experienced."],
    ["astronautav","Like a dream?","DAY8DREAM WORD show"],

    ["lextharav","I don't know if that's right either.",false,"DAY8DREAM WORD outro"],
    ["lextharav","I will show you.",function(){ 
        changeLocation(field,100,100,astronautsmall);
        //demonspider.phase ++;
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
        
        setTimeout(function(){dialogueDic["DAY8DREAM WORD house"].appear();},20 * frameRate);
        
    },"DAY8DREAM WORD show"],
    // Celeste gets put in front of her house... There is a clone of herself. Wait a little.
    
    ["lextharav","What do you see?",false,"DAY8DREAM WORD house"],
    ["astronautav","I'm in front of my house... I think... but it's different."],
    ["lextharav","I designed it myself."],
    ["astronautav","Designed? Did you make this?!",function(){
        celesteclone.appear(300,108);
        celesteclone.phase ++;
    }],
    ["lextharav","Correct. Now what do you see?",false,"DAY8DREAM WORD correct"],
    ["astronautav","Oh my god... it's me!!"],
    ["lextharav","That is not you. That is the physical manifestation of your identity. But like everything it is only a temporary manifestation.",function(){demonspider.phase ++;}],
    // Clone gets obliterated
    ["lextharav","I know way more than you ever will, Celeste.",false,"DAY8DREAM WORD sector"],
    ["astronautav","So you probably know what I'm thinking right now."],
    ["lextharav","...It is not to that extent."],
    ["lextharav","But I can do things to you that would horrify you to even think about."],
    ["astronautav","Wait! How many false environments have you put me in?"],
    ["astronautav","How do I even know if I've been in one?"],
    ["lextharav","I hope that this knowlege has put the prospect of becoming immortal in a clearer light. I will give you more time, just in case you change your mind. It is all up to you.",function(){wakeup();}],

    // ### DAY 9 CLASS
    [null,"You arrive early to class. Violet is not there.",false,"DAY 9 CLASS"],
    [null,
        [
            ["Talk to Lexi",function(){ 
                //here's my idea... the whole name explanation comes later if not now (particularly on Day 11)
                flagDic["DAY9CLASS LEXINAME"] = true;
                
                rightDescision(15,"DAY9CLASS TALK lexi");
            }],
            ["Talk to Kate","DAY9CLASS TALK kate"]
        ]
    ],

    ["celesteav","You know I only ask about your name cause I'm curious, right? I'm not trying to make fun of you or anything.",false,"DAY9CLASS TALK lexi"],
    ["lexiav","I told you already."],
    ["lexiav","Why are you so curious anyway."],
    ["celesteav","Ugh... this is gonna sound so weird! I've been having these dreams. Except they're more vivid than that."],
    ["lexiav","You dream about me?"],
    ["celesteav","No! I'm talking to a goddess of some sort. And she has the same name as you."],
    ["lexiav","So you see me as a goddess?"],
    ["celesteav","That's the thing though! I've been having this dream since before I met you."],
    ["lexiav","What else happens?"],
    ["celesteav","...not much actually. She says she knows this place."],
    ["lexiav","That's interesting..."],
    ["celesteav","So you don't think it's weird?"],
    ["celesteav","Will you tell me where your name comes from?"],
    ["lexiav","It's from Cosmonauts."],
    ["celesteav","Oh... what's that?"],
    ["lexiav","A nerdy TV show... my parents liked that stuff.","DAY9CLASS kateconvoshort"],

    ["celesteav","Hey Kate...","DAY9CLASS kateconvo","DAY9CLASS TALK kate"],

    ["kateav","Hey...","DAY9CLASS kateconvo outro","DAY9CLASS kateconvoshort"],
    
    ["kateav","Hey look who it is.",false,"DAY9CLASS kateconvo"],
    
    ["kateav","Guess who just called it off with their girlfriend?",false,"DAY9CLASS kateconvo outro"],
    ["celesteav","I don't know."],
    ["kateav","I did."],
    ["celesteav","Sorry to hear that."],
    ["kateav","So I'm single again."],
    ["celesteav","Right..."],
    ["kateav","We should go out."],
    [null,
        [
            ["Go out with Kate.",function(){
                flagDic["DAY9CLASS KATE yes"] = true;
                
                rightDescision(15,"DAY9CLASS KATE yes");
            }],
            ["Brutally reject Kate.","DAY9CLASS KATE no"]
        ]
    ],

    ["celesteav","Okay. Why not.",false,"DAY9CLASS KATE yes"],
    ["kateav","Wait, really?"],
    ["celesteav","Yeah!"],
    ["kateav","...so... I guess we're a thing now?"],
    ["celesteav","You asked me, didn't you?"],
    ["kateav","Yeah but... usually it doesn't happen this fast. Not complaining though."],
    ["kateav","So are you free this Thursday? I found this place called 86 degrees we could meet up at."], // temporary bakery name.
    ["celesteav","Sure.",function(){mrface.phase ++;}],

    ["celesteav","...no... what?",false,"DAY9CLASS KATE no"],
    ["kateav","Come on."],
    ["celesteav","No!"],
    ["kateav","To quote Hobbes... “we should totally go out.”"],
    ["celesteav","I'm not going out with you!"],
    ["kateav","Fine."],
    ["kateav","But don't think I'm letting you get away this easy.",function(){mrface.phase ++;}],

    //Mr. Face walks in.
    ["mrfaceav","I have some work to catch up on. So I thought today we'd watch a video on spirituality today. Nothing too hard.",function(){returnToHallway("DAY 9 violet")},"DAY9CLASS mrface"],


    // ### DAY 9 TEXTS
    [null,"You feel your phone buzz in your pocket. It's Violet.",false,"DAY 9 TEXTS"],
    ["violetav","Hey Celeste -"],
    ["celesteav","hey kate said y'all broke it off"],
    ["violetav","...are you free right now?"],
    [null,
        [
            ["Yeah!",function(){ rightDescision(30,"DAY9TEXTS FREE yes"); }],
            ["Sorry I have something to do...","DAY9TEXTS FREE no"]
        ]
    ],

    ["celesteav","Yeah!",false,"DAY9TEXTS FREE yes"],
    ["violetav","Come over... I need to talk to you",null],

    ["celesteav","Sorry I have something to do...",false,"DAY9TEXTS FREE no"],
    ["violetav","...okay.",null], //isolation ending

    // ### DAY 9 VIOLET
    ["celesteav","Hey!",false,"DAY 9 VIOLET"],
    ["violetav","Hey..."],
    ["celesteav","What did you want to talk about?"],
    ["violetav","Come on... I'll show you.",function(){violetmini.phase ++;}],

    // Go into Violet's house and then to her room
    [null,"You notice a poster on the wall with a blue planet on it.",false,"DAY9VIOLET poster"],
    ["celesteav","Is that Neptune?!"],
    ["violetav","Yep... my grandmother gave that to me."],
    ["celesteav","That's intense..."],
    ["violetav","I've been looking at that one a lot actually. It makes me feel better when I'm unsure about something. I don't know why..."],
    ["celesteav","I'm surprised you feel unsure about anything."],
    ["violetav","Everyone does. I just know how to handle it."],
    ["violetav","Except when someone humiliates me in front of my friends. I do not take that lightly."],
    ["celesteav","Are you talking about Lexi? I think that's Kate's fault more than anything. I found out the other day... Kate sent her your info."], // Ex this out if you didn't know it was Kate
    ["celesteav","..."],
    ["celesteav","Is that what you wanted to show me?"],
    ["violetav","No."],
    ["violetav","..."],
    ["violetav","It's in this room.",function(){violetbig.phase ++;}],

    // Violet goes into the bathroom
    ["celesteav","What is that?!",false,"DAY9VIOLET bathroom"],
    ["violetav","...isn't she cute?"],
    ["celesteav","Wait, what?"],
    ["violetav","Ok so. A little while back, right around when me and Kate started dating, we made this deal that he would find me an exotic pet if I paid for it."],
    ["celesteav","Ugh... I can't believe you!"],
    ["violetav","Well... there's no taking it back now."],
    ["celesteav","What kind of animal is that even?!"],
    ["violetav","I don't know to be honest. Kate said it's from the Pacific somewhere."],
    ["violetav","..."],
    ["violetav","But my issue is, it's been growing so much in the last few days. I don't have anywhere else to put it. And I'm worried it's going to grow even more. I don't know what to do!",choiceBankDic["day9Violet"]],

    ["celesteav","Why don't you ask your parents?",false,"DAY9VIOLET PET parents"],
    ["violetav","Are you joking?! My parents will be so mad if they find out! Either way... if it gets any bigger I won't be able to hide it from them anymore.",choiceBankDic["day9Violet"]],

    ["celesteav","Why don't you resell it?",false,"DAY9VIOLET PET resell"],
    ["violetav","I guess? But I don't know if this is even legal or not! I could get in so much trouble..."],
    ["celesteav","Oh...",choiceBankDic["day9Violet"]],

    ["celesteav","Why don't you give it back to Kate?",false,"DAY9VIOLET PET kate"],
    ["violetav","Kate promised he would take it back from me if I needed him to. But that was before we broke up. Now he's not answering my texts.",choiceBankDic["day9Violet"]],

    ["celesteav","How are you even taking care of it?",false,"DAY9VIOLET PET how"],
    ["violetav","The lady who helps clean the house knows a little about taking care of animals. She keeps the pH of the water right... she's the only other person that knows. Honestly without her this thing would be so dead right now.",choiceBankDic["day9Violet"]],

    ["celesteav","I'm all out of ideas.",false,"DAY9VIOLET PET idk"],
    ["violetav","..."],
    ["violetav","I'm still mad at Lexi you know. For what she did."],
    ["celesteav","To be fair, Kate pressured her into it."],
    ["violetav","Did she do it or did she not do it?"],
    ["celesteav","..."],
    ["celesteav","I think it's getting late."],
    ["violetav","Yeah... I was thinking the same thing."],

    // Violet leaves
    ["celesteav","See you at school..."],
    ["violetav","I'm not going to school. I don't want to see another person there as long as I live.",function(){flagDic["story"] = "DAY 9 night"; violet.phase ++; violet.selectType = "select";}],

    // ### DAY 9 DREAM
    ["lextharav","Have you given it any more thought?",false,"DAY 9 DREAM"],
    [null,
        [
            ["Tell Lexthar that you've finally come around and will accept her offer.","ACCEPT LEXTHAR"],
            ["Try to get Lexthar to reveal more about herself.","DAY9DREAM LEXTHAR lexthar"],
            ["Try to get Lexthar to make Violet and Lexi get a long more.",function(){ rightDescision(20,"DAY9DREAM LEXTHAR violetlexi"); }],
            ["Try to get Lexthar to get Kate to shut up in class.","DAY9DREAM LEXTHAR kate"]
        ]
    ],

    ["astronautav","Actually... I have a request for you first.",false,"DAY9DREAM LEXTHAR lexthar"],
    ["lextharav","...Tell me."],
    ["astronautav","Can you tell me why you and Lexi have the same name?"],
    ["lextharav","I can not."],
    ["astronautav","You can't or you won't?"],
    ["lextharav","It is not important why we have the same name.","DAY9DREAM LEXTHAR outro"],

    ["astronautav","Actually... I have a request for you first.",false,"DAY9DREAM LEXTHAR violetlexi"],
    ["lextharav","...Tell me."],
    ["astronautav","Can you make Violet and Lexi get a long more? That's within your powers right?"],
    ["lextharav","I can not force anyone to do anything."],
    ["astronautav","What?!","DAY9DREAM LEXTHAR outro"],

    ["astronautav","Actually... I have a request for you first.",false,"DAY9DREAM LEXTHAR kate"],
    ["lextharav","...Tell me."],
    ["astronautav","Get Kate to shut up in class. Can you do that?"],
    ["lextharav","I can not force anyone to do anything."],
    ["astronautav","You're a goddess of space, and you can't get some kid to stop talking?"],
    ["lextharav","I have mentioned before that my name is not an entirely accurate description.","DAY9DREAM LEXTHAR outro"],

    ["astronautav","You can't do anything, can you.",false,"DAY9DREAM LEXTHAR outro"],
    ["lextharav","I want you to see something.",function(){
        changeLocation(lexibedroom,100,100,bigplayer);
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
        lexistudy.appear(104,145);
        lexistudy.phase ++;
    }],

    // Cut to Lexi studying. Astronaut Celeste is watching her.
    ["celesteav","Is that...",false,"DAY9DREAM LEXTHAR bedroom"],
    ["lextharav","It is."],
    ["lextharav","Do not worry. She can not see us."],
    ["celesteav","Can we go back now?"],
    ["lextharav","No. We are staying."],

    [null,
        [
            ["Do you see stuff like this all the time?",function(){ rightDescision(10,"DAY9DREAM LEXI time"); }],
            ["(Try to get Lexthar to take you back)","DAY9DREAM LEXI return"]
        ]
    ],

    ["celesteav","I don't want to see this anymore.",false,"DAY9DREAM LEXI return"],
    ["lextharav","You think I do not feel the same way?",function(){lexistudy.phase ++;}],

    ["celesteav","Do you see stuff like this all the time?",false,"DAY9DREAM LEXI time"],
    ["lextharav","More than this.",function(){lexistudy.phase ++;}],


    ["lextharav","She is someone I could destroy. She is like a vulnerable child. What would you do if a car ran her over tomorrow?",false,"DAY9DREAM LEXI outro"],
    ["celesteav","You wouldn't."],
    ["lextharav","Why would I not?"],
    ["celesteav","It's wrong."],
    ["lextharav","You are assuming that we are operating on the same standards of morality."],
    ["celesteav","Are you really gonna do it?"],
    ["lextharav","No. Not for now.",function(){changeLocationSector(); dialogueDic["DAY9DREAM LEXTHAR sector"].appear();}],

    // Back in the magenta sector
    ["astronautav","...",false,"DAY9DREAM LEXTHAR sector"],
    ["astronautav","So you can just see what everyone is doing constantly?"], 
    ["lextharav","Yes."],
    ["astronautav","And you still feel lonely?"], 
    ["lextharav","What I see is an illusion. It is not real sustinance for existing."],
    ["lextharav","..."],
    ["lextharav","I have one more thing I want you to see.",function(){
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
        changeLocation(ashida,100,100,smallplayer);
        smallplayer.changeFace("stillforward");
    }],

    //Transport to Kate's World.
    ["celesteav","Lexthar?! What is this place?",false,"DAY9DREAM cry"],
    ["celesteav","Lexthar??",null],
    // Walk around, and then you see Kate.
    [null,"You see Kate and Aqsa in the middle of a conversation. Whatever it is, it sounds heated",false,"DAY9DREAM kate"],
    ["aqsaav","This is unfair..."],
    ["kateav","A deal's a deal"],
    ["aqsaav","I need more time..."],
    ["kateav","Shh... just let it happen."],
    [null,"You notice Kate concentrating really hard, like he's thinking about something",function(){demonspider.phase ++;}],
    // Aqsa gets obliterated

    // ### DAY 10 CLASS
    ["mrfaceav","So, have you talked to him yet?",false,"DAY 10 CLASS"], // Take this out if Celeste refused to help Mr. Face
    [null,
        [
            ["I've been trying.",function(){ rightDescision(10, "DAY10CLASS MRFACE lie"); }],
            ["No. I haven't.","DAY10CLASS MRFACE truth"]
        ]
    ],

    ["celesteav","I've been trying.",function(){mrface.phase ++;},"DAY10CLASS MRFACE lie"],

    ["celesteav","No. I haven't.",function(){mrface.phase ++;},"DAY10CLASS MRFACE truth"],

    // Mr. Face is pissed and goes to the front of the room

    ["mrfaceav","Good morning everyone. Last night I decided, you guys are probably tired of hearing me talk all the time. And I want to be understanding of that. I want to make this class a little more “hands on”... that's why I've decided to schedule a surprise test this Friday. I have thrown in bonus questions about spirituality and metaphysics. This will be a good opportunity to expand your knowledge and maybe even boost your grade.",false,"DAY10CLASS MRFACE outro"],
    ["lexiav","What?!"],
    ["mrfaceav","The rest of this class period is a study session. Good luck."],
    ["lexiav","Metaphysics?"], 
    ["celesteav","What even is that.",function(){kate.phase ++;}],
    // Kate approaches you and Lexi
    ["kateav","Hey guys, mind if I join? Of course you don't.",false,"DAY10CLASS 2"],
    ["kateav","So what are we talking about?"],
    [null,
        [
            ["(Try to get Kate to leave you alone)",function(){ rightDescision(10, "DAY10CLASS KATE hostile"); }],
            ["(Focus on studying for the test)","DAY10CLASS KATE study"],
        ]
    ],

    ["celesteav","None of your business.",false,"DAY10CLASS KATE hostile"], 
    ["kateav","Chill. You're acting like I killed your dog or something."],
    ["lexiav","This class makes me feel like someone killed my dog."],
    ["kateav","Haha, imagine how I feel."],
    ["lexiav","Aren't we supposed to be studying?","DAY10CLASS KATE outro"],


    ["celesteav","We're studying right now.","DAY10CLASS KATE outro","DAY10CLASS KATE study"],

    ["kateav","About what? Mr. Face has literally taught us nothing.",false,"DAY10CLASS KATE outro"],
    ["lexiav","Celeste, do you wanna meet up at my house and study for this with me?"],
    [null,
        [
            ["Ok!",function(){ rightDescision(10, "DAY10CLASS CONVERGENCE yes"); }],
            ["Sorry, I can't.","DAY10CLASS CONVERGENCE no"]
        ]
    ],

    ["celesteav","Ok! After class?",false,"DAY10CLASS CONVERGENCE yes"],
    ["lexiav","Yeah.",function(){
        flagDic["LEXISHOUSE"] = true;
        returnToHallway("DAY 10 lexi");
    }],

    ["celesteav","Sorry, I can't.",false,"DAY10CLASS CONVERGENCE no"],
    ["lexiav","...it's okay.",function(){
        flagDic["LEXISHOUSE"] = true;
        returnToHallway("DAY 10 lexi");
    }], // isolation ending

    // ### DAY 10 LEXI

    /*
    In previous versions Kate is also vaping, and tries to get Lexi to vape with him. I thought this version is "neater" so to speak, but if you want the vaping part back, you can export it from previous versions.
    */

    ["lexiav","Kate's coming too.",false,"DAY 10 LEXI"],
    ["celesteav","Really."],
    [null,"...suddenly you hear a knock at the door"],
    ["celesteav","Ugh...",function(){pauseGame(); katebig.changeFace("walkingleft"); katebig.appear(252,99); katebig.phase ++;}],
    // Kate arrives 
    [null,"You notice Kate has brought his vape.",false,"DAY 10 LEXI 2"],
    ["kateav","Hey guys.",function(){fadeOut(function(){
        katebig.disappear(); 
        lexibig.disappear(); 
        player.relocate(1000,1000); 
        lexisceneobject.appear(0,0);
        currLoc.activate([
            [
                function(){},30
            ],
            [
                function(){
                    dialogueDic["DAY 10 LEXI 3"].appear();
                }
            ]
        ]);
        
    })}],
    // Everyone gets settled
    [null,"Everyone settles in. The three of you attempt to study at first, but eventually Kate gets distracted and pulls up Netflix on his laptop.",false,"DAY 10 LEXI 3"],
    ["kateav","Hey Celeste, wanna watch Aquaman?"],
    ["celesteav","We're kind of busy right now."],
    ["kateav","Lexi watch this with me, it's hilarious."],
    ["lexiav","I'm busy."],
    ["kateav","Come on."],
    ["lexiav","Fine, maybe a few seconds."],
    ["kateav","Hey Celeste have you ever vaped before"], //Hey Celeste have you ever vaped before? No. Wanna try? No. Come on... etc.
    ["celesteav","No."],
    ["kateav","You should try it."],
    ["celesteav","No."],
    ["kateav","Lexi, try this."],
    ["lexiav","I don't vape."],
    ["kateav","Come on. It's not even that bad. Just take one hit."],
    ["lexiav","...I don't know what my parents will say if they smell that on me."],
    ["kateav","They won't think anything. It doesn't even smell. Here, try it-"],
    [null,"Kate holds the vape up to Lexi's face."],
    // Kate shoves the it in her face
    ["lexiav","Stop..."],
    ["kateav","Really?"],
    ["celesteav","Hey, leave her alone."],
    ["kateav","Make me."],
    ["kateav","Hey, where's the bathroom?"],
    ["lexiav","It's down the hallway, to the right."],
    ["kateav","Where?"],
    ["lexiav","...I'll show you.",function(){
        fadeOut(function(){
            lexisceneobject.changeFace("empty");
            currLoc.activate([
                [
                    function(){},30
                ],
                [
                    function(){
                        dialogueDic["DAY 10 LEXI 4"].appear();
                    }
                ]
            ]);
        });
    }],
    [null,"As the two leave, you realize you've barely gotten any work done. This is going to be a long day.",function(){
            fadeOut(function(){
                        lexisceneobject.changeFace("still");
                        currLoc.activate([
                            [
                                function(){},30
                            ],
                            [
                                function(){
                                    flagDic["DAY 10 KATE"] = true;
                                    dialogueDic["DAY10LEXI POWDER kate"].appear();
                                }
                            ]
                        ]);
            });
     },"DAY 10 LEXI 4"], 
    ["celesteav","Lexi, what did Mr. Face say about religion again?",false,"DAY10LEXI POWDER kate"],
    ["lexiav","I don't remember."],
    ["kateav","..."],
    ["kateav","This is a waste of time. The test is going to be impossible anyways..."],
    ["celesteav","Can you stop?"],
    ["kateav","Wow, what's with the hostility?"],
    ["celesteav","Are you serious? You come over to “study”, then start vaping and watching movies. Then you keep pressuring Lexi despite her saying no over and over again. In class, you're always arguing with Mr. Face while the rest of us are trying to pay attention, you can't take no for an answer, and I'm not even mentioning how you've treated Violet!",function(){
        lexisceneobject.changeFace("katestanding");
        dialogueDic["DAY10LEXI katestanding"].appear();
    }],
    ["kateav","I'm leaving. Obviously, someone doesn't want me here.",function(){
        fadeOut(function(){
            lexisceneobject.changeFace("celestelexi");
            dialogueDic["DAY10LEXI celestelexi"].appear();
        });
    },"DAY10LEXI katestanding"],
    ["celesteav","...",false,"DAY10LEXI celestelexi"],
    ["lexiav","That was rude of you..."],
    ["celesteav","You're joking right?!"],
    ["celesteav","..."],
    ["celesteav","I think I'm gonna leave too. Good luck on the test tomorrow.",function(){
        flagDic["story"] = "DAY 10 texts"; 
        fadeOut(function(){
            lexibig.appear(177,93); 
            player.relocate(180,100); 
            lexisceneobject.disappear();
            gamePause = false;
        });
    }],

    // ### DAY 10 TEXTS
    [null,"Your phone buzzes. It's Kate.",false,"DAY 10 TEXTS"],
    ["kateav","Celeste... can I ask you something?"],
    ["celesteav","What do you want"],
    ["kateav","Meet me in front of your house. This is a conversation best held in person"],
    ["kateav","I'm here.",function(){celestehouse.hasEvent = true;}],

    // ### DAY 10 KATE
    ["kateav","I wanna make a deal with you.",false,"DAY 10 KATE"],
    ["kateav","I'll do whatever you want. Anything."],
    ["celesteav","...anything, huh."],
    ["kateav","I'll do it. Anything you want.",function(){

        day10TempArray = [null,[
            ["What if I wanted you to help Violet get back on her feet?","DAY10KATE WHATEVER violet"],
            ["What if I wanted you to shut up in class?",function(){ rightDescision(15,"DAY10KATE WHATEVER shutup"); }],
        ]];

        if(!("DAY9CLASS KATE yes" in flagDic)){
            day10TempArray[1].push(["What if I wanted you to leave me alone in class?","DAY10KATE WHATEVER alone"])
        }

        new Dialogue(
            "day10TempArray",
            day10TempArray[1],
            day10TempArray[0],
            null
        ).appear();
    }],

    // these two are interchangeable depending on weather you're dating Kate or not.
    ["celesteav","What if I wanted you to shut up in class?","DAY10KATE DATE outro","DAY10KATE WHATEVER shutup"],

    ["celesteav","What if I wanted you to leave me alone in class?","DAY10KATE DATE outro","DAY10KATE WHATEVER alone"],

    ["celesteav","What if I wanted you to help Violet get back on her feet?","DAY10KATE DATE outro","DAY10KATE WHATEVER violet"],

    ["kateav","Totally. I can make that happen.",false,"DAY10KATE DATE outro"],
    ["celesteav","If I win."],
    ["kateav","Yes."],
    ["celesteav","What if I lose? Hypothetically speaking..."],
    ["kateav","This is gonna sound bad but I promise, it's not as bad as it sounds."],
    ["celesteav","Yeah...?",function(){
        if("DAY9CLASS KATE yes" in flagDic){
            dialogueDic["DAY10KATE DATE2 yes"].appear();
        } else {
            dialogueDic["DAY10KATE DATE2 no"].appear();
        }
    }],

    // these two are interchangeable depending on weather you're dating Kate or not.
    /*
    Celeste wants - for Kate to stop harassing her and her friends, Kate to shut up in class, Kate to make up to Violet
    Kate wants - to go out with Celeste. Or if he's already there, he wants to control her. He's interested in dating not because he wants a relationship, but because he wants to feel like he owns someone.
    
    
    Here's how I want to write it: Celeste doesn't take the bet seriously. But she sees it as a way to maybe bond with Lexi or Violet, or get the two to make up. She presents it as ... well it would be kind of funny to watch him become humiliated after losing. And plus we can make him do whatever we want
    */
    ["kateav","If you lose. You gotta go out with me.",false,"DAY10KATE DATE2 no"], 
    ["celesteav","You're joking right?","DAY10KATE DATE2 outro"],

    ["kateav","If you lose. You have to agree to stay in a relationship with me... for at least a year.",false,"DAY10KATE DATE2 yes"], 
    ["celesteav","You're joking right?"],
    ["kateav","And you'll have to do anything I ask of you."],
    ["celesteav","...you literally asked me out yesterday.","DAY10KATE DATE2 outro"],

    ["kateav","Will you take the bet?",false,"DAY10KATE DATE2 outro"],
    ["celesteav","What do I have to do to win?"],
    ["kateav","I wanna know if you're gonna take it first!"],
    [null,
        [
            ["(Take the bet)",function(){ rightDescision(15,"DAY10KATE BET yes"); }],
            ["(Don't take the bet)","DAY10KATE BET no"]
        ]
    ],

    ["celesteav","Ok, whatever. I'll do it.",false,"DAY10KATE BET yes"],
    ["celesteav","So what is it?"],
    ["kateav","...ever played Faith Quest?"],
    ["celesteav","Like the card game?"],
    ["celesteav","Wait. Don't you need a team for that?"],
    ["kateav","That's right. Three people minimum."],
    ["kateav","I, Kate Lail, challenge you to a Faith Quest duel this Saturday. You have until then to find your team memebers. I've already assembled mine."],
    ["celesteav","You're really serious about this..."],
    ["kateav","A deal's a deal.",function(){flagDic["DAY 10 BET"] = true; kate.phase ++;}],

    ["celesteav","No... I'm not going to do that...",false,"DAY10KATE BET no"],
    ["kateav","Okay. It's your choice."],
    ["celesteav","..."],
    ["kateav","Good night. I hope you're happy with your descision.",function(){flagDic["DAY 10 BET"] = false; kate.phase ++;}], // isolation ending

    // ### DAY 10 VIOLET
    [null,"Your phone buzzes. It's Violet",false,"DAY 10 VIOLET"],
    ["violetav","Hey Celeste are you free tomorrow?"],
    [null,
        [
            ["Yes","DAY10VIOLET FREE yes"],
            ["No","DAY10VIOLET FREE no"],
            ["Tell Violet that Lexi's dead","DAY10VIOLET FREE dead"],
        ]
    ],


    ["celesteav","Yeah! What did you want to talk about?",false,"DAY10VIOLET FREE yes"],
    ["violetav","It's the thing Kate gave me - It's grown so much. You have to see it!"],
    ["celesteav","Ok I'll come by after school!",null], // isolation ending

    ["celesteav","Sorry I can't",false,"DAY10VIOLET FREE no"],
    ["violetav","It's okay",null], // isolation ending

    ["celesteav","Lexi's dead",false,"DAY10VIOLET FREE dead"],
    ["violetav","REALLY????"],
    ["celesteav","Yeah..."],
    ["violetav","Oh god..."],
    ["violetav","This is my fault... I shouldn't have said anything..."],
    [null,
        [
            ["You wanted her dead didn't you?","DAY10VIOLET FAULT want"],
            ["Aren't you a little relieved?","DAY10VIOLET FAULT relieved"],
            ["How is it your fault?","DAY10VIOLET FAULT how"]
        ]
    ],

    ["celesteav","You wanted her dead didn't you?",false,"DAY10VIOLET FAULT want"],
    ["violetav","Yep... I did. With every fiber of my being..."],
    ["celesteav","Then just be happy!"],
    ["violetav","How could I be happy about someones death?!"],
    ["celesteav","Be happy that she will never ruin another person's life again, like she did yours."],
    ["violetav","...how did she die?",false,"DAY10VIOLET how"],
    [null,
        [
            ["I poisoned her","DAY10VIOLET HOW poison"],
            ["I can't remember","DAY10VIOLET HOW remember"]
        ]
    ],

    ["celesteav","I poisoned her.",false,"DAY10VIOLET HOW poison"],
    ["violetav","ARE YOU CRAZY??"],
    ["violetav","Please tell me your joking..."],
    ["celesteav","I'm not. I really did it."],
    ["violetav","DON'T TALK TO ME",null,"DAY10VIOLET dont"],

    ["celesteav","I can't remember.",false,"DAY10VIOLET HOW remember"],
    ["violetav","???",null,"DAY10VIOLET dont"],
    ["violetav","How can you not remember?! Our classmate is literally dead!!","DAY10VIOLET RELIEVED calm"],

    ["celesteav","This may sound weird but... are you relieved a little?",false,"DAY10VIOLET FAULT relieved"],
    ["violetav","WHAT?!"],
    [null,
        [
            ["Send her pictures of Lexi's body","DAY10VIOLET RELIEVED pics"],
            ["Try to get her to calm down","DAY10VIOLET RELIEVED calm"],
            ["Try to convince her why Lexi's death will help her","DAY10VIOLET RELIEVED justify"]
        ]
    ],


    [null,"You send her photos of Lexi.",false,"DAY10VIOLET RELIEVED pics"],
    ["celesteav","Look at her"],
    ["violetav","OH MY GOD. THAT'S HER"],
    ["celesteav","What did I say"],
    ["violetav","SHE'S WITH YOU?!"],
    ["celesteav","Yeah"],
    ["violetav","...","DAY10VIOLET dont"],

    ["celesteav","I'm not saying her death was good. Obviously it was a bad thing... but don't you feel at like Lexi was stressing you out all the time?",false,"DAY10VIOLET RELIEVED justify"],
    ["violetav","She was... but I wasn't ACTUALLY going to kill her!!"],
    ["celesteav","right, of course"],
    ["celesteav","..."],
    ["celesteav","and it's awful that she died","DAY10VIOLET how"],

    ["celesteav","Hey, I understand this is hard... I'm really sorry this happened.",false,"DAY10VIOLET RELIEVED calm"],
    ["violetav","it's okay."],
    ["celesteav","..."],
    ["violetav","Now that I think about it, I guess I'm not really sad she's gone"],
    ["celesteav","I get that"],
    ["violetav","I'm more shocked than anything"],
    ["celesteav","same"],
    ["violetav","I think I need some time alone"],
    ["celesteav","Okay... good night"],
    ["violetav","...wait"],
    ["violetav","You're a really good friend. Just thought you should know that",function(){console.log("VIOLET ENDING"); end("violet");}],

    ["celesteav","How is it you're fault?",false,"DAY10VIOLET FAULT how"],
    ["violetav","I kept on telling you I wanted to kill her... I feel like I might have caused this in some way..."],
    [null,
        [
            ["It's impossible to tell","DAY10VIOLET CONSOLE impossible"],
            ["You had nothing to do with this!","DAY10VIOLET CONSOLE nothing"]
        ]
    ],

    ["celesteav","It's impossible to tell...",false,"DAY10VIOLET CONSOLE impossible"],
    ["violetav","Oh god... what am I going to do??"],
    ["violetav","Sorry... I need some time alone",null],

    ["celesteav","You had nothing to do with this! This was all out of your control","DAY10VIOLET RELIEVED calm"],


    // ### DAY 10 DREAM

    ["lextharav","I think I may have been too forceful recently.",false,"DAY 10 DREAM"],
    ["astronautav","..."],
    ["lextharav","Sometimes I forget that there is a lot you do not know about me. Please try to be patient."],
    ["astronautav","What do I not know about you?"],
    ["lextharav","I will show you. Please try not to be alarmed.",function(){
        setTimeout(function(){
            audioDic["disgusting"].play();
            sectorloop();
        },frameRate * 16);
        lexthar.changeFace("transform");
    }],
    // Lexthar transforms 
    ["lextharbigav","This is what I really look like.",false,"DAY10DREAM TRANSFORM"],
    ["astronautav","Lexthar?"],
    ["lextharbigav","Would you consider me a friend?"],
    [null,
        [
            ["Sure","DAY10DREAM FRIEND sure"],
            ["I can't say I would... sorry","DAY10DREAM FRIEND no"],
            ["(Don't respond)",function(){ rightDescision(15,"DAY10DREAM FRIEND ..."); }]
        ]
    ],


    ["astronautav","Sure.","DAY10DREAM FRIEND outro","DAY10DREAM FRIEND sure"],

    ["astronautav","I can't say I would... sorry.",false,"DAY10DREAM FRIEND no"],
    ["lextharbigav","...","DAY10DREAM FRIEND outro"],

    ["astronautav","...","DAY10DREAM FRIEND outro","DAY10DREAM FRIEND ..."],

    ["lextharbigav","You need to get used to my appearance at some point.",false,"DAY10DREAM FRIEND outro"],
    ["astronautav","I..."],
    ["lextharbigav","This is the hardest part for most people."],
    ["astronautav","Who was before me?"],
    ["lextharbigav","I do not meet sentient creatures very often. Around once every two millennia."],
    ["astronautav","Did you ask them to live forever too?"],
    ["lextharbigav","They both responded as you did."],
    ["lextharbigav","It's a cycle I have no control over. Millennia spent in isolation. Then I meet someone like you and it presents a brief glimmer of hope. But now I'm smart enough to realize these moments of hope are only an illusion. As I reveal my true self, people lose interest, starting another two millennia of isolation."],
    ["lextharbigav","..."],
    ["lextharbigav","I might destroy myself if I am forced to endure another millenium alone. Do you want that?"],
    [null,
        [
            ["Agree to become imortal to calm her down.","ACCEPT LEXTHAR"],
            ["Persist in saying you don't want to be immortal.",function(){ rightDescision(15,"DAY10DREAM LEXTHAR no"); }]
        ]
    ],

    ["astronautav","...my answer still hasn't changed.",false,"DAY10DREAM LEXTHAR no"],
    ["lextharbigav","My suspicions about you were correct."],
    ["lextharbigav","You are an awful person.",function(){wakeup();}],

    // ### DAY 11 CLASS
    ["kateav","So... how close are you to being ready?",false,"DAY 11 CLASS"],
    ["celesteav","Ready for what?"],
    ["kateav","You don't have much longer to assemble your team."],
    ["celesteav","Oh right... uh, I'm working on it."],
    ["lexiav","What does he mean."],
    ["celesteav","He means... I'll tell you later."],
    ["kateav","I made a bet with her."],
    ["lexiav","What for?"],
    ["kateav","For her soul.",function(){mrface.phase ++;}],
    ["mrfaceav","Alright class, today is a review session. I hope everyone came with questions...",function(){returnToHallway("DAY 11 lexi"); school.hasEvent = true;},"DAY 11 CLASS 2"],

    // ### DAY 11 LEXI
    ["lexiav","Hey.",function(){pauseGame(); lexi.phase ++;},"DAY 11 LEXI"],
    ["lexiav","So... a bet with Kate?",false,"DAY 11 LEXI 2"],
    ["celesteav","Yeah... he wants to play some card game with me."],
    ["lexiav","Really?"],
    ["celesteav","Yeah..."],
    ["lexiav","What happens if you win?"],
    ["celesteav","I can make him do anything I want... apparently.",false,"DAY11LEXI WIN truth"],
    ["lexiav","Oh nice."],
    ["celesteav","Yeah..."],
    ["lexiav","..."],
    ["lexiav","...what happens if you lose?"],
    ["celesteav","...",function(){
        if("DAY9CLASS KATE yes" in flagDic){
            dialogueDic["DAY11LEXI DATE yes"].appear();
        } else {
            dialogueDic["DAY11LEXI DATE no"].appear();
        }
    }],

    // these are interchangeable, depending on if you're going out with Kate or not.
    ["celesteav","If I lose, I said I would go out with him.",false,"DAY11LEXI DATE no"],
    ["lexiav","That's rediculous."],
    ["celesteav","It's not a big deal. I wasn't planning on actually doing it."],
    ["lexiav","Oh...","DAY11LEXI WIN outro"],

    ["celesteav","I have to stay relationship with him for a year... something like that.","DAY11LEXI WIN outro"],
    ["lexiav","That's rediculous."],
    ["celesteav","It's not a big deal. I wasn't planning on actually doing it.",false,"DAY11LEXI DATE yes"],
    
    // if you didn't talk to Lexi in the previous day, Lexi reveals where she got her name.
    ["lexiav","...",false,"DAY11LEXI WIN outro"],
    ["lexiav","Celeste...?",function(){
        if("DAY9CLASS LEXINAME" in flagDic){
            dialogueDic["DAY11LEXI DREAM yes"].appear();
        } else {
            dialogueDic["DAY11LEXI DREAM no"].appear();
        }
    }],

    ["lexiav","You know those dreams about that goddess? With my name?",false,"DAY11LEXI DREAM yes"],
    ["celesteav","Yeah...?"],
    ["lexiav","What is her voice like?"],
    ["celesteav","It sounds like a goddess, I guess. Like multiple people trying to speak to you at once."],
    ["lexiav","Hmm..."],
    ["celesteav","Sorry if that wasn't a good answer...","DAY11LEXI DREAM outro"],

    ["lexiav","You know when you said you heard my name somewhere before?",false,"DAY11LEXI DREAM no"],
    ["celesteav","Yeah?"],
    ["lexiav","Where did you hear it?"],
    ["celesteav","Ugh... this is gonna sound so weird! I've been having these dreams. Except they're more vivid than that."],
    ["lexiav","You dream about me?"],
    ["celesteav","No! I'm talking to a goddess of some sort. And she has the same name as you."],
    ["lexiav","So you see me as a goddess?"],
    ["celesteav","That's the thing though! I've been having this dream since before I met you."],
    ["lexiav","What else happens?"],
    ["celesteav","...not much actually. She says she knows this place."],
    ["lexiav","That's interesting..."],
    ["celesteav","So you don't think it's weird?"],
    ["celesteav","Will you tell me where your name comes from?"],
    ["lexiav","It's from Cosmonauts."],
    ["celesteav","Oh... what's that?"],
    ["lexiav","A nerdy TV show... my parents liked that stuff.","DAY11LEXI DREAM outro"],

    ["celesteav","...",false,"DAY11LEXI DREAM outro"],
    ["lexiav","Well... I think I'm going home now."],
    ["celesteav","Wait!"],
    [null,
        [
            ["(Try to convince Lexi to help you team up against Kate.)","DAY11LEXI VIOLET lexi"],
            ["(Go to Violet's house alone to see if she can help you.)","DAY11LEXI VIOLET violet"],
            ["(Try to convince Lexi to go to Violet's house with you, and see if they'll get along with a common goal.)",function(){
                flagDic["DAY11LEXI VIOLET both"] = true;
                rightDescision(30,"DAY11LEXI VIOLET lexi");
            }],
            ["(Go home alone and face Kate on your own.)","DAY11LEXI VIOLET neither"],
        ]
    ],


    ["celesteav","...the game involves three players per team.",false,"DAY11LEXI VIOLET lexi"],
    ["lexiav","...yeah?",],
    ["celesteav","And I was thinking... maybe you could come with me."],
    ["lexiav","And play with you?"],
    ["celesteav","Yeah... is that okay?"],
    ["lexiav","Sure. What game is it?"],
    ["celesteav","Faith Quest I think."], // Different game name
    ["lexiav","Oh. I love that game."],
    ["celesteav","I've never played it. But I'm sure it can't be that hard."],
    ["celesteav","..."],
    ["celesteav","Actually it probably is that hard."],
    ["lexiav","You've really never played it?"],
    ["celesteav","..."],
    ["lexiav","Wow. Good luck with that."],
    ["celesteav","It's whatever. He'd probably freak out if he saw I didn't have a team, and I just want to avoid that...",function(){
        if("DAY11LEXI VIOLET both" in flagDic){
            dialogueDic["DAY11LEXI VIOLET both yes"].appear();
        } else {
            dialogueDic["DAY11LEXI VIOLET both no"].appear();
        }
    }],
    ["lexiav","...",false,"DAY11LEXI VIOLET both no"],
    ["lexiav","Alright, I'm going home now."],
    ["celesteav","Thank you so much for helping me.",function(){flagDic["DAY 11 HELPERS"] = "lexi"; gamePause = false; flagDic["story"] = "DAY 11 night";}],

    // it either ends right here, or if your going to Violet's house it continues.

    ["celesteav","Oh yeah... I'm going to Violet's house. I want both of you to help.",false,"DAY11LEXI VIOLET both yes"], // Celeste sees this as an opportunity to make ammends between Violet and Lexi 
    ["lexiav","No."],
    ["celesteav","You want this just as much as I do right?"],
    ["celesteav","Be honest. After he pushes you around so much..."],
    ["celesteav","I mean... wouldn't it be fun to see him lose at something? And then have him do whatever we want?"],
    ["lexiav","Fine.",function(){
        flagDic["DAY 11 HELPERS"] = "both"; 
        gamePause = false;
        startFollowingPlayer("lexi");
        lexi.phase = 0;
        flagDic["story"] = "DAY 11 night";
        fountain.hasEvent = true;
    }],

    ["celesteav","Nevermind... I have to be somewhere too anyways. Good night!",false,"DAY11LEXI VIOLET violet"],
    ["lexiav","Ok.",function(){flagDic["DAY 11 HELPERS"] = "violet"; gamePause = false; flagDic["story"] = "DAY 11 night";}],

    ["celesteav","Nevermind... Good night!",false,"DAY11LEXI VIOLET neither"],
    ["lexiav","Ok.",function(){flagDic["DAY 11 HELPERS"] = "none"; gamePause = false; flagDic["story"] = "DAY 11 night";}],

    // ### DAY 11 VIOLET
    ["celesteav","Hey Violet...",false,"DAY 11 VIOLET"],
    ["celesteav","So, uh... I kind of have favor to ask of you."],
    ["violetav","Okay... what is it?"],
    ["celesteav","I took a bet with Kate."],
    ["violetav","Oh? What kind of bet?"],
    ["celesteav","We made a deal that, if I can beat him at a card game, he'll do whatever I want."],
    ["violetav","Oh really. Sounds fun."],
    ["celesteav","But it takes multiple people per team."],
    ["violetav","Oh."],
    ["celesteav","Yeah."],
    ["celesteav","And I was thinking maybe you could come with me."],
    ["celesteav","It's not that big of a deal. It's just he's probably going to freak out if he sees I don't have a team, and I just want to avoid that."],
    ["violetav","Okay? I don't see why not. Although I don't play card games that much."],
    ["celesteav","I'm sure it's not that hard..."],
    ["celesteav","..."],
    ["celesteav","Ok, actually it probably is that hard."],
    ["violetav","Well, it's your bet."],
    ["celesteav","Thank you so much! I promise I will make this worth it."],
    ["violetav","No problem."],
    ["violetav","...I gotta go now. When is it again?"],
    ["celesteav","Saturday."],
    ["violetav","Okay! See you then.",function(){flagDic["DAY 11 HELPERS"] = "violet confirm"}],

    
    // ### DAY 11 CONFLICT
    ["violetav","You...!",false,"DAY 11 CONFLICT"],
    ["celesteav","Violet..."],
    ["violetav","You ruined my life!"],
    ["lexiav","That's your fault."],
    ["violetav","Excuse me?!"],
    ["celesteav","Guys! Stop."],
    ["violetav","..."],
    ["violetav","What do you want?!"],
    ["celesteav","I was just coming to ask if you could help me with something..."],
    ["violetav","For what?"],
    ["lexiav","For a bet she took."],
    ["violetav","Did I ask you?"],
    ["celesteav","Oh my god. Yes, I took a bet with Kate."],
    ["celesteav","..."],
    ["celesteav","So he told me that if I can win some card game with him, then he will do whatever I want him to."], //this sounds dumb lmao
    ["violetav","Oh?"],
    ["celesteav","...but there are three people per team usually. And so far it's just me and Lexi."],
    ["celesteav","So... I was thinking... maybe you could come with us?"],
    ["violetav","You honestly expect me to do anything with Lexi after what she did?"],
    ["lexiav","I did it for a good reason."],
    ["celesteav","Ugh... I knew this was a bad idea."],
    ["violetav","What possible reason could you have?!"],
    ["lexiav","Sending me fake emails from the school."],
    ["violetav","...so?! You'll live."],
    ["lexiav","You know, you think you own the world, but you don't. Why can't you see how sick everyone is of you?!"],
    ["violetav","Excuse me?"],
    ["lexiav","You heard me."],
    ["celesteav","Guys! Stop!"],
    ["celesteav","Look, Violet, I get that you're angry. I'd be angry too. But it's only going to get worse if you take it out on her."],
    ["celesteav","Plus, why aren't you angrier at Kate? I mean he's the one who gave you the pet and helped leak your information online..."],
    ["violetav","..."],
    ["celesteav","That's kind of why I thought you'd be interested anyways... wouldn't it be satisfying to see him lose at something?"],
    ["celesteav","And, if we win. He will do anything. Literally anything. Think about it."],
    ["violetav","What if we lose?"],
    ["celesteav","If we lose"],
    ["celesteav","...",function(){
        if("DAY9CLASS KATE yes" in flagDic){
            dialogueDic["DAY11CONFLICT DATE yes"].appear();
        } else {
            dialogueDic["DAY11CONFLICT DATE no"].appear();
        }
    }],

    ["celesteav","Then I have to go out with him.","DAY11CONFLICT DATE outro","DAY11CONFLICT DATE no"],

    ["celesteav","Then I have to stay in a relationship with him for a year... and I have to do whatever he asks me to.","DAY11CONFLICT DATE outro","DAY11CONFLICT DATE yes"],

    ["violetav","What?! And you agreed to do that?!",false,"DAY11CONFLICT DATE outro"],
    ["celesteav","It's not a big deal. I wasn't planning on actually doing it."],
    ["violetav","..."],
    ["celesteav","Come on, what do you have to lose?"],
    ["violetav","..."],
    ["violetav","Fine, I'll help you. But I still think this whole thing is stupid."],
    ["celesteav","Thank you... I promise it will be worth it!"],
    ["violetav","So... when is it?"],
    ["celesteav","This Saturday. I can text you more details."],
    ["violetav","Okay. I will see you then."],
    ["violetav","..."],
    ["violetav","You two should probably leave now.",function(){
        gamePause = false; 
        flagDic["DAY 11 HELPERS"] = "both confirm"; 
        startFollowingPlayer("lexi");
        flagDic["DAY 11 jerk"] = true;
    }],

    // Leave Violet's house
    ["lexiav","What a jerk.",false,"DAY 11 jerk"],
    ["celesteav","...Oh yeah, do you need a ride back?"],
    ["lexiav","I can walk from here. Thanks.",function(){stopFollowingPlayer("lexi"); lexibig.phase ++;}],

    // ### DAY 11 DATE NIGHT
    ["kateav","Hey.",false,"DAY 11 DATE NIGHT"],
    ["celesteav","Let's get this over with. This is not going to be long."], // she's a little frustrated because of the bet. She feels like it was a little unfair
    ["kateav","Woah, chill."],
    ["celesteav","...",choiceBankDic["day11Date"]],

    ["celesteav","Do you make bets like this a lot?",false,"DAY11DATENIGHT bets"],
    ["kateav","Hell yeah. That's why I'm so good at this game."],
    [null,
        [
            ["(Admit that you don't play very often)",function(){rightDescision(10,"DAY11DATENIGHT admit")}],
            ["(Change the topic)",choiceBankDic["day11Date"]]
        ]
    ],

    ["celesteav","I don't play very often. I'll be honest.",false,"DAY11DATENIGHT admit"],
    ["kateav","That's kinda what I thought."],
    ["kateav","If it makes you feel better, most people pick it up quickly."],
    ["celesteav","..."],
    ["kateav","Just remember, if you have a strong team, that makes it more likely you'll win.",choiceBankDic["day11Date"]],

    ["celesteav","...",false,"DAY11DATENIGHT silence"],
    ["kateav","I really want to be close with you. Like closer than boyfriend and girlfriend."],
    ["celesteav","I can tell."],
    ["kateav","I know you don't want the same."],
    ["kateav","..."],
    ["kateav","That's why I made the bet."],
    ["kateav","Relationships revolve around consent. There's this guy... Kant... he said that. All a relationship needs is two consenting parties. I'm making you consent the only way I know how."],
    [null,
        [
            ["What? That doesn't count!","DAY11DATENIGHT deny"],
            ["That's completely rediculous...",function(){ rightDescision(10,"DAY11DATENIGHT sick"); }],
        ]
    ],

    ["celesteav","That's completely rediculous...",false,"DAY11DATENIGHT sick"],
    ["kateav","I get that a lot.","DAY11DATENIGHT consentchoice"],

    ["celesteav","What? That doesn't count!",false,"DAY11DATENIGHT deny"],
    ["kateav","Why not? You agreed to the bet didn't you? You willingly gave your consent..."],
    ["celesteav","Ugh..."],
    [null,
        [
            ["It's not fair because I didn't know the bet before I took it.","DAY11DATENIGHT unfair"],
            ["Either way it doesn't matter, because I'm winning.","DAY11DATENIGHT winning"],
        ]
    ],

    ["celesteav","It's not fair because I didn't know the bet before I took it.",false,"DAY11DATENIGHT unfair"],
    ["kateav","Sure it is. You took the bet, knowing that you didn't know what it was. If not knowing made you uncomfortable, you could have just refused the bet."],
    [null,
        [
            ["Is consent really the only thing you care about?!","DAY11DATENIGHT consent"],
            ["...do you even care about me?","DAY11DATENIGHT care"],
        ],false,
     "DAY11DATENIGHT consentchoice"
    ],

    ["celesteav","Do you even care about me??",false,"DAY11DATENIGHT care"],
    ["kateav","Of course. Why would I go out with you if I didn't date you?"],
    ["celesteav","...",choiceBankDic["day11Date"]],

    ["celesteav","Either way it doesn't matter, because I'm winning.",false,"DAY11DATENIGHT winning"],
    ["kateav","Oh really? Have you gotten your team ready?"],
    [null,
        [
            ["I'm working on it.","DAY11DATENIGHT humble"],
            ["(Pretend that your team is bigger than it actually is)","DAY11DATENIGHT flex"],
            ["(Change the topic)",choiceBankDic["day11Date"]],
        ]
    ],

    ["celesteav","Yeah. In fact, my team is so ready. The real question is... how ready are you?",false,"DAY11DATENIGHT flex"],
    ["kateav","Trust me. If I were you I would start preparing tonight. You have no idea what you're getting yourself into.",choiceBankDic["day11Date"]],

    ["celesteav","I'm working on it.",false,"DAY11DATENIGHT humble"],
    ["kateav","If I were you I would start preparing tonight. You have no idea what you're getting yourself into.",choiceBankDic["day11Date"]],

    ["celesteav","Why did you and Violet break up?",false,"DAY11DATENIGHT violet"],
    ["kateav","She was getting too controlling."],
    ["celesteav","I know but like, what specifically did she do?"],
    ["kateav","...she'd always get upset whenever I even looked at another girl. She never listened to me, and she never took me seriously. A successful relationship needs both partners on the same level. And she was't willing to do that."],
    [null,
        [
            ["Do you ever think maybe she didn't like how you treated her?","DAY11DATENIGHT explain"],
            ["Do you think I'm too controlling?","DAY11DATENIGHT controlling"],
        ]
    ],

    ["celesteav","Do you ever think maybe she didn't like how you treated her?",false,"DAY11DATENIGHT explain"],
    ["kateav","I don't think about her at all now. I have you."],
    [null,
        [
            ["We literally met a few days ago.","DAY11DATENIGHT meet"],
            ["I see.","DAY11DATENIGHT i see"]
        ],false,
     "DAY11DATENIGHT too recent"
    ],

    ["celesteav","I see.",choiceBankDic["day11Date"],"DAY11DATENIGHT i see"],

    ["celesteav","We literally met a few days ago.",false,"DAY11DATENIGHT meet"],
    ["kateav","What can I say. I know what I want.",choiceBankDic["day11Date"]],

    ["celesteav","Do you think I'm too controlling?",false,"DAY11DATENIGHT controlling"],
    ["kateav","No. You are nothing like Violet. I'm so glad I have you.","DAY11DATENIGHT too recent"],

    ["celesteav","How long have you known Lexi?",false,"DAY11DATENIGHT lexi"],
    ["kateav","Few years."],
    ["celesteav","So you've known her for a while now."],
    ["kateav","Yes."],
    ["celesteav","...",choiceBankDic["day11Date"]],

    ["celesteav","Is consent really the only thing you care about?! What use is a relationship if there's no feeling in it.",false,"DAY11DATENIGHT consent"],
    ["kateav","Seriously? Our evolutionary function is to survive and reproduce."],
    ["celesteav","So reproduction is all you care about?"],
    ["kateav","And survival. Hey, you care about survival too."],
    [null,
        [
            ["No I don't!","DAY11DATENIGHT no"],
            ["Yeah, but I also care about other things!","DAY11DATENIGHT yes"],
            ["(Change the topic)",choiceBankDic["day11Date"]],
        ]
    ],

    ["celesteav","Yeah, but I also care about other things!",false,"DAY11DATENIGHT yes"],
    ["kateav","Oh really. Like what?"],
    [null,
        [
            ["Like trust","DAY11DATENIGHT trust"],
            ["Like not being lonely","DAY11DATENIGHT lonely"],
            ["Like my friends","DAY11DATENIGHT friends"],
        ]
    ],

    ["celesteav","Like trust!",false,"DAY11DATENIGHT trust"],
    ["kateav","And you only want trust in a relationship because it helped your ancestors survive."],
    ["kateav","Trust me. When you boil it down, it all comes down to reproduction and survival.",choiceBankDic["day11Date"],"DAY11DATENIGHT trustme"],

    ["celesteav","Like not being lonely.",false,"DAY11DATENIGHT lonely"],
    ["kateav","And you only fear loneliness because that fear helped your ancestors survive.","DAY11DATENIGHT trustme"],

    ["celesteav","Like my friends.",false,"DAY11DATENIGHT friends"],
    ["kateav","Oh I see. What do your friends think of me then?"],
    [null,
        [
            ["My friends don't know about you.","DAY11DATENIGHT they dk"],
            ["Ugh... I don't know to be honest.","DAY11DATENIGHT idk"],
        ]
    ],

    ["celesteav","My friends don't know about you.",false,"DAY11DATENIGHT they dk"],
    ["kateav","Either way, you only care because social status made it easier for your ancestors to reproduce.","DAY11DATENIGHT trustme","DAY11DATENIGHT evolution"],

    ["celesteav","Ugh... I don't know to be honest.","DAY11DATENIGHT evolution","DAY11DATENIGHT idk"],

    ["celesteav","No I don't!",false,"DAY11DATENIGHT no"],
    ["kateav","You seem to care a lot about surviving this Saturday."],
    ["celesteav","Ugh...",choiceBankDic["day11Date"]],

    ["celesteav","I'm going home.",false,"DAY11DATENIGHT end"],
    ["kateav","Good luck. You'll need it.",function(){
        jamiesinterior_playerchair.changeFace("still"); 
        jamiesinterior_playerchair.selectType = "none";
        player.relocate(110,111);
        gamePause = false;
        
    }],

    // ### ASHIDA 
    ["celesteav","Hey.",false,"ASHIDA"],
    ["kateav","Are you ready to do this?"],
    ["celesteav","I thought we were playing a card game."],
    ["kateav","The deal's changed."],
    ["kateav","I was thinking... perhaps the challenge should be a little more personal."],
    ["celesteav","Ok. What do I have to do?",function(){ kate.phase ++; }],
    ["kateav","Behind this door is my labyrinthine mind. My heart and soul lies in its center.",false,"ASHIDA door"],
    ["celesteav","And I have to find it."],
    ["kateav","Yeah."],
    ["celesteav","Hmm...",function(){
        if(
            flagDic["DAY 11 HELPERS"] == "both confirm" ||
            flagDic["DAY 11 HELPERS"] == "violet confirm" ||
            flagDic["DAY 11 HELPERS"] == "lexi" 
          ){
            dialogueDic["ASHIDA team"].appear();
        } else {
            kate.phase ++;
        }
    }],
    ["celesteav","...luckily I brought my team with me!",function(){ kate.phase ++; },"ASHIDA team"],
    // Celeste assembles her team

    ["kateav","You did better than I expected.",false,"ASHIDA 3"],
    ["celesteav","What can I say."],
    ["kateav","Don't get too proud of yourself. You have a long way to go.",function(){ 
        kate.phase ++;
        if(
            flagDic["DAY 11 HELPERS"] == "both confirm" ||
            flagDic["DAY 11 HELPERS"] == "violet confirm"
        ){
            startFollowingPlayer("violet");
        }
        if(
            flagDic["DAY 11 HELPERS"] == "both confirm" ||
            flagDic["DAY 11 HELPERS"] == "lexi"
        ){
            startFollowingPlayer("lexi");
        }
        
    }],
    
    ["kateav","Where's your team?",false,"ASHIDA lonely"],
    ["celesteav","Uh... "],
    ["celesteav","... "],
    ["celesteav","Where's your team?"],
    ["kateav","Don't get too proud of yourself. You have a long way to go.",function(){ kate.phase ++; }],

    // ### ASHIDA 2
    [null,"...",false,"ASHIDA 2 prologue"],
    ["celesteav","Hello?"],
    [null,"The room around you is pitch dark.",function(){audioDic["disgusting"].play(); sectorloop(); currLoc.update();}],
    ["kateav","Wait! Stop!",false,"ASHIDA 2"],
    ["celesteav","This is your heart and soul, huh?"],
    ["kateav","Yes... please don't hurt me."],
    ["celesteav","That's a pretty bold request, considering how you've hurt everyone else..."],
    ["kateav","That's not even my fault!"],
    ["celesteav","Really. How is that not your fault?"],
    ["kateav","How is anything anyone's fault? We can't control our brain chemistry or our environment any more than you can control your breathing. It's not my fault I want what I want!"],
    ["celesteav","Then it's not my fault if I kill you."],
    ["kateav","If you kill me, you will never know the truth about Lexthar."],
    //pause
    ["celesteav","Lexi?"],
    ["kateav","No. Not her."],
    ["celesteav","You know about Lexthar?"],
    ["kateav","I'll tell you if you promise not to kill me."],
    ["celesteav","How do you know about her?"],
    ["kateav","Everyone knows about her."],
    ["celesteav","Not Lexi..."],
    ["kateav","Everyone. You are in such a bad spot right now. Your only option at this point is to just give her what she wants. At least then maybe you'll come out on top... if you're lucky."],
    ["celesteav","How do you know about my dreams?"],
    ["kateav","You think they're dreams..."],
    ["kateav","In the beginning,  Lexthar noticed you, nearly dead, and wanted to make you feel at home so she could talk to you. So she created us. All of us. And as a result we all carry a piece of her with us. We're like if her psychology and your adolescent memories had an unholy love child."],
    ["celesteav","That's... really gross."],
    ["kateav","This is a false environment. I'm a piece of Lexthar's psychology. Understand?"],
    ["celesteav","So you are Lexthar? I'm talking to Lexthar right now?"],
    ["kateav","No... I'm her creation. So is Lexi. And Violet and Mr. Face."],
    ["kateav","Are you going to hurt me?"],
    [null,
        [
            ["Kill him.","ASHIDA3 KATE yes"],
            ["Say you will unless he leaves Stanton forever.",function(){
                flagDic["DAY 11 ASHIDA"] = "scare"; 
                rightDescision(30,"ASHIDA3 KATE scare");
            }],
            ["Say you will unless he agrees to be your personal slave.",function(){flagDic["DAY 11 ASHIDA"] = "slave"; dialogueDic["ASHIDA3 KATE slave"].appear();}],
        ]
    ],


    ["celesteav","Yes.",function(){
        currLoc.update();
        increaseScore(45);
        audioDic["sector"].pause();
        clearTimeout(sectorLoopTimeout);
    },"ASHIDA3 KATE yes"],
    [null,"You hit Kate's heart with your bear hands. It's soft and fragile and gives in easily to the touch. As it collapses you hear Kate's faint screams in you mind's eye.",function(){
        changeLocation(labdic[4][10],139,75,null,"stillforward"); 
        flagDic["story"] = "ISOLATION DREAM";
        playWaitFunction(
            function(){
                if(violetbig.playerFollow == true){
                    dialogueDic["ASHIDA3 violet"].appear();
                } else {
                    stopFollowingPlayer("lexi");
                    stopFollowingPlayer("violet");
                    awake.play();
                }
            },200
        );
    },"ASHIDA3 KATE beat"],
    // and then you have to make it out back through the labyrinth or something?? 

    ["celesteav","No.",false,"ASHIDA3 KATE scare"],
    ["kateav","Thank you-"],
    ["celesteav","But. If I ever see you in Stanton again, even once, I won't think twice. And don't even think about trying to text me or email me or anything like that. Understood?"],
    ["kateav","...ok. It's not like it matters at this point anyways."],
    ["kateav","I guess you want me to take you home too.",false,"ASHIDA3 home"],
    ["celesteav","Yeah. That would be good.",function(){obtainItem(katesheartinv); currLoc.update("end");}],

    ["celesteav","No.",false,"ASHIDA3 KATE slave"],
    ["kateav","Thank you-"],
    ["celesteav","Under one condition."],
    ["kateav","What?"],
    ["celesteav","You do everything I say. Everything. Don't talk to anyone else without my permission. Don't leave your house without telling me. From now on I own you."],
    ["kateav","That's messed up..."],
    ["celesteav","Or I could kill you."],
    ["kateav","No! Fine. It's not like it matters anyways...","ASHIDA3 home"],
    // When you wake up the next morning Kate texts you saying he's under your command.
    
    
    ["violetav", "Celeste?", false, "ASHIDA3 violet"],
    ["celesteav","Yeah?"],
    ["violetav","It's really just us now."],
    ["celesteav","Yeah, I know."],
    ["violetav","...",function(){ end("violet"); }],

    // ### DAY 11 DREAM

    //long wait
    ["lextharav","What will it take to make you like me?",false,"DAY 11 DREAM"],
    ["astronautav","That's not something you can force..."],
    ["lextharav","How so? Could you explain why you dislike me?"],
    ["astronautav","It's not that I dislike you, it's just... I don't want to be immortal. It seems like that would be a good way to suffer forever. And I still don't know who you are or what this place is..."],
    ["lextharav","..."],
    ["astronautav","I'm sorry that you have to experience loneliness. I hate loneliness too, but I just can't bring myself take such a big risk. The only way I will say yes is if you force me. Otherwise, I would appreciate it if you could just leave me alone."],
    ["lextharav","..."],
    ["astronautav","Lexthar?"],
    ["lextharav","Okay. I understand how you feel."],
    ["astronautav","Really?"],
    ["lextharav","Yes."],
    ["astronautav","..."],
    ["astronautav","Thank you...",function(){wakeup();}],

    // ### DAY 12 CLASS
    ["mrfaceav","Remember to write your name and the date.",false,"DAY 12 CLASS"],
    [null,"Mr. Face hands everyone a single sheet of paper. On it is a ten question multiple choice quiz."], 
    [null,"1. What is our historical understanding of the word “evil”?"],
    [null,
        [
            ["A. Evil is an invention of society, so nothing is inherently “evil”.","DAY12CLASS question 2"],
            ["B. Evil describes the polar opposite of justice.","DAY12CLASS question 2"],
            ["C. Evil and immorality is one side of a dichotomy, the other side being justice and moral security.",function(){ rightDescision(3,"DAY12CLASS question 2"); }],
            ["D. Evil and morally just actions exist on the same side of a dichotomy.","DAY12CLASS question 2"]
        ]
    ],

    [null,"2. Where is the afterlife?",false,"DAY12CLASS question 2"],
    [null,
        [
            ["A. It exists in spacetime just like Earth does.",function(){ rightDescision(3,"DAY12CLASS question 3"); }],
            ["B. It is an abstract concept, while Earth is a tangible reality.","DAY12CLASS question 3"],
            ["C. It is a false environment.","DAY12CLASS question 3"],
            ["D. It exists, but the space it occupies is denser than earth's.","DAY12CLASS question 3"]
        ]
    ],

    [null,"3. What is the best explanation of “natural dichotomy”.",false,"DAY12CLASS question 3"],
    [null,
        [
            ["A. Natural dichotomy refers to the idea that a binary is the purest form of classification.","DAY12CLASS question 4"],
            ["B. Natural dichotomy refers to how everything in nature can be split into two parts.",function(){ rightDescision(3,"DAY12CLASS question 4"); }],
            ["C. Natural dichotomy describes a binary split that was formed by processes not controlled by humans.","DAY12CLASS question 4"],
            ["D. All of the above are good explanations.","DAY12CLASS question 4"]
        ]
    ],

    [null,"4. Who profits from complicating our perception of nature?",false,"DAY12CLASS question 4"],
    [null,
        [
            ["A. The US government","DAY12CLASS question 5"],
            ["B. NASA","DAY12CLASS question 5"],
            ["C. Both A & B",function(){ rightDescision(3,"DAY12CLASS question 5"); }],
            ["D. None of the above","DAY12CLASS question 5"]
        ]
    ],

    [null,"5. How do classical paradigms of morality compare to modern ones?",false,"DAY12CLASS question 5"],
    [null,
        [
            ["A. Both modern and classical paradigms are morally black and white.","DAY12CLASS question 6"],
            ["B. Modern paradigms are morally black and white where classical paradigms would see morally grey.","DAY12CLASS question 6"],
            ["C. Both modern and classical paradigms are morally grey.","DAY12CLASS question 6"],
            ["D. Modern paradigms see morally grey areas where classical paradigms would see black and white.",function(){ rightDescision(3,"DAY12CLASS question 6"); }]
        ]
    ],

    [null,"6. What are the limits of “privacy”?",false,"DAY12CLASS question 6"],
    [null,
        [
            ["A. Privacy is a societally constructed concept.","DAY12CLASS question 7"],
            ["B. The existence of our culture relies on our ability to protect individual privacy.","DAY12CLASS question 7"],
            ["C. Privacy is only as strong as the will to protect it.",function(){ rightDescision(3,"DAY12CLASS question 7"); }],
            ["D. Privacy enables the individual to evade societal checks on morality, and should be actively discouraged.","DAY12CLASS question 7"]
        ]
    ],

    [null,"7. Imagine you miss your past so much that it makes your present miserable. What is the best way to cope?",false,"DAY12CLASS question 7"],
    [null,
        [
            ["A. Stop thinking about it.",function(){ rightDescision(3,"DAY12CLASS question 8"); }],
            ["B. Recreate the elements of the past that you miss.","DAY12CLASS question 8"],
            ["C. Deal with the pain head-on instead of trying to avoid it.","DAY12CLASS question 8"],
            ["D. Surround yourself with people from your past life to help ease the discomfort that comes with change.","DAY12CLASS question 8"]
        ]
    ],


    [null,"8. What kinds of powers to gods and goddesses have?",false,"DAY12CLASS question 8"],
    [null,
        [
            ["A. They can control certain elements.","DAY12CLASS question 9"],
            ["B. They can create energy.","DAY12CLASS question 9"],
            ["C. They can create or destroy energy, but they can't change it.","DAY12CLASS question 9"],
            ["D. It depends on the deity.",function(){ rightDescision(3,"DAY12CLASS question 9"); }]
        ]
    ],

    [null,"9. What shape is the universe?",false,"DAY12CLASS question 9"],
    [null,
        [
            ["A. A Three dimensional sphere.","DAY12CLASS question 10"],
            ["B. Two dimensional circle.","DAY12CLASS question 10"],
            ["C. Three dimensional dodecahedron.",function(){ rightDescision(3,"DAY12CLASS question 10"); }],
            ["D. The universe is shapeless.","DAY12CLASS question 10"]
        ]
    ],

    [null,"10. How do you make someone like you?",false,"DAY12CLASS question 10"],
    [null,
        [
            ["A. Follow the advice of someone who knows them well.","DAY12CLASS outro"],
            ["B. Convince them you are someone else.","DAY12CLASS outro"],
            ["C. Intimidate them into suppressing their negative feelings about you.","DAY12CLASS outro"],
            ["D. You can't.",function(){ rightDescision(3,"DAY12CLASS outro"); }]
        ]
    ],
    ["mrfaceav","I will have them graded by Monday.",function(){returnToHallway("DAY 12 class"); school.hasEvent = true;},"DAY12CLASS outro"],

    // ### DAY 12 KATE
    ["mrfaceav","Remember to write your name and the date.",false,"DAY 12 KATE"],
    ["celesteav","Um sir, I think Kate has something to say."],
    ["kateav","..."],
    ["kateav","Yes, I would like to say something."],
    ["kateav","First of all... I would like to apologize for being a pretentious douchebag."],
    ["celesteav","Hahahahaha"],
    ["kateav","And I want to... apologize to Mr. Face. and for distracting the whole class."],
    ["mrfaceav","Flattery will get you everywhere, now sit down."],
    ["celesteav","That's not all! Say the rest!"],
    ["kateav","And... I think. Mr. Face is the best teacher I've ever had. I appreciate how he opened my third eye or whatever."],
    ["mrfaceav","Ah yes, I knew you would come around eventually!"],
    ["kateav","..."],
    ["celesteav","Hahahahaha",function(){console.log("KATE ENDING"); end("kate");}], // Kate ending
    
    // ### DAY 12 DEATH
    ["mrfaceav","Kate, wake up.",false,"DAY 12 DEATH"],
    ["kateav","..."],
    ["mrfaceav","Kate."],
    ["mrfaceav","..."],
    [null,"Suddenly Mr. Face's expression changes."],
    ["mrfaceav","Someone call the nurse."],
    ["celesteav","Is class canceled?"],
    ["mrfaceav","..."],
    ["mrfaceav","Yes. Class is canceled... don't worry about the test."],
    ["celesteav","(Yes...!)",function(){end("mrface");}],

    // ### DAY 12 MR. FACE
    ["mrfaceav","Come in.",false,"DAY 12 MR. FACE"],
    ["mrfaceav","What did you want to talk about?",function(){
        if("DAY8OFFICE PROMISE kept" in flagDic){
            dialogueDic["DAY8OFFICE PROMISE kept yes"].appear();
        } else {
            dialogueDic["DAY8OFFICE PROMISE kept no"].appear();
        }
    }],

    // which one you get depends on whether or not you took the bet
    ["celesteav","Do you remember when you asked me to get Kate to be quiet in class?",false,"DAY8OFFICE PROMISE kept no"],
    ["mrfaceav","Did you do it?!",],
    ["celesteav","I did it. You don't have to worry about Kate ever again.",false,"DAY8OFFICE PROMISE kept yes"], 
    ["mrfaceav","Perfect. I knew I could count on you.",],
    ["celesteav","So...?"],
    ["mrfaceav","So what?"],
    ["celesteav","So what are you going to do for me now?"],
    ["mrfaceav","Oh right. You don't have to show up to class anymore."],
    ["celesteav","That's what I wanted to hear. See you later!",function(){console.log("MR. FACE ENDING"); end("mrface");}], // Mr. Face ending

    // ### DAY 12 LEXI
    ["lexiav","Hey.",function(){lexi.phase ++; pauseGame();},"DAY 12 LEXI"],
    ["lexiav","How was the test",false,"DAY 12 LEXI 2"],
    [null,
        [
            ["I feel good about it.","DAY12LEXI TEST good"],
            ["It was okay.","DAY12LEXI TEST okay"],
            ["I probably failed it.",function(){ rightDescision(15,"DAY12LEXI TEST fail"); }]
        ]
    ],

    ["celesteav","I feel good about it.",false,"DAY12LEXI TEST good"],
    ["lexiav","Wow... you're better than me.","DAY12LEXI TEST outro"],

    ["celesteav","It was okay.","DAY12LEXI TEST outro","DAY12LEXI TEST okay"],

    ["celesteav","I probably failed it.",false,"DAY12LEXI TEST fail"],
    ["lexiav","Yeah. Me too...","DAY12LEXI TEST outro"],

    ["lexiav","...",false,"DAY12LEXI TEST outro"],
    ["lexiav","Hey Celeste."],
    ["celesteav","Yeah?"],
    ["lexiav","Are we friends?"],
    ["celesteav","What do you mean?"],
    ["lexiav","Do you think I'm your friend?"],
    [null,
        [
            ["Say yes.",function(){ rightDescision(15,"DAY12 LEXI yes"); }],
            ["Say no.","DAY12 LEXI no"],
            ["Try to be nice about it.","DAY12 LEXI sure"]
        ]
    ],

    ["celesteav","I mean... we haven't really known eachother that long... sorry.","DAY12 fine","DAY12 LEXI no"],

    ["celesteav","Yeah!",false,"DAY12 LEXI yes"],
    ["lexiav","Okay."],
    ["lexiav","Just making sure.",function(){console.log("LEXI ENDING"); end("lexi");}], //dialogueDic["DAY12 home"].appear();}], // Lexi ending

    ["celesteav","Sure, I guess.",false,"DAY12 LEXI sure"],
    ["lexiav","You guess?"],
    ["celesteav","I mean... we haven't known each other for that long but..."],
    ["lexiav","Ok. Fine. I understand.",false,"DAY12 fine"],
    ["celesteav","That's not how I meant it."], 
    ["lexiav","No I get it."],
    ["lexiav","I have to go home now.",false,"DAY12 home"],
    ["celesteav","See you Monday...",function(){lexi.phase ++; flagDic["story"] = "ABANDON";}], 

    // ### DAY 12 DREAM
    ["astronautav","...hello?",false,"DAY 12 DREAM"],
    ["astronautav","Lexthar?",null],
    
    [null,"Hours pass. Eventually your suit runs out of oxygen.",function(){end("still");},"DAY 12 DREAM oxygen"], // Abandoned ending

    // ### ISOLATION DREAM
    ["astronautav","Hello.",false,"ISOLATION DREAM"],
    ["lextharav","I have a hypothetical situation for you."],
    ["astronautav","Go for it.",function(){
        flagDic["ISOLATIONDREAM POINTS"] = 0;
        dialogueDic["ISOLATIONDREAM POINTS outro"].appear();
    }],
    ["lextharav","Let us say you approached someone who you had an interest in knowing. But every you tried to find out more about them, they gave you cold half hearted responses. No matter how hard you try, you fail to make any meaningful connection. What would you do in that scenario?",false,"ISOLATIONDREAM POINTS outro"],
    [null,
        [
            ["I would probably move on.",function(){
                flagDic["ISOLATIONDREAM POINTS"] ++;
                dialogueDic["ISOLATIONDREAM FIRST"].appear();
            }],
            ["I would keep trying to get to know them.","ISOLATIONDREAM FIRST"],
            ["I'd ignore them. Maybe that would make them notice me more.","ISOLATIONDREAM FIRST"],
        ]
    ],
    ["lextharav","Interesting.",false,"ISOLATIONDREAM FIRST"],
    ["astronautav","Why?"],
    ["lextharav","I just want some insight into how you respond to certain situations."],
    ["lextharav","...I have more."],
    ["lextharav","Let us say you are ugly, and people generally show no romantic interest in you. Then one day, someone asks you out on a date. This makes you very excited, since it is rare that someone shows any romantic affection towards you. However, you know deep inside that they are not right for you. What would you do in that scenario?"],
    [null,
        [
            ["I would go out with them, it's not often that someone asks you out.","ISOLATIONDREAM SECOND"],
            ["I wouldn't go out with them... better be single than to be unhappy with someone.",function(){
                flagDic["ISOLATIONDREAM POINTS"] ++;
                dialogueDic["ISOLATIONDREAM SECOND"].appear();
            }],
            ["I would give it a shot... after all, I might warn up to them.","ISOLATIONDREAM SECOND"]
        ]
    ],
    ["lextharav","I see.",false,"ISOLATIONDREAM SECOND"],
    ["lextharav","Let us say you have discovered a solution to all the worlds problems. However doing so would involve breaking the law, and you would be punished by being isolated from society for the rest of your life. What would you do in this scenario?"],
    [null,
        [
            ["I would do it. Being lonely isn't that bad.",function(){
                flagDic["ISOLATIONDREAM POINTS"] ++;
                if(flagDic["ISOLATIONDREAM POINTS"] >= 2){
                    dialogueDic["ISOLATIONDREAM alike"].appear();
                } else {
                    dialogueDic["ISOLATIONDREAM unalike"].appear();
                }
            }],
            ["I wouldn't do it. Nothing is worth the isolation.",function(){
                if(flagDic["ISOLATIONDREAM POINTS"] >= 2){
                    dialogueDic["ISOLATIONDREAM alike"].appear();
                } else {
                    dialogueDic["ISOLATIONDREAM unalike"].appear();
                }
            }]
        ]
    ],
    ["lextharav","I see we do not think alike.","ISOLATIONDREAM outro","ISOLATIONDREAM unalike"],

    ["lextharav","I see we think alike.","ISOLATIONDREAM outro","ISOLATIONDREAM alike"],

    ["lextharav","Thank you for answering my questions. You may return now.",function(){wakeup();},"ISOLATIONDREAM outro"],

    // ### ACCEPT
    ["astronautav","Ok. I'll do it.",false,"ACCEPT LEXTHAR"],
    ["lextharav","I am glad you have chosen to do so.",function(){console.log("LEXTHAR ENDING"); end("lexthar");}], // Lexthar the destroyer ending


    // ### VIOLET SERIES
    [null,
        [
            ["DAY 1","VIOLETSERIES 1"],
            ["DAY 2","VIOLETSERIES 2"],
            ["DAY 3","VIOLETSERIES 3"],
            ["WEEKEND","VIOLETSERIES WEEKEND"],
            ["DAY 8","VIOLETSERIES 8"],
            ["DAY 9","VIOLETSERIES 9"],
            ["DAY 10","VIOLETSERIES 10"],
            ["DAY 12 LEXI","VIOLETSERIES 12 LEXI"],
            ["DAY 12 THANKS","VIOLETSERIES 12 THANKS"],
            ["DAY 12 TEST","VIOLETSERIES 12 TEST"]
        ],false,
     "VIOLET SERIES"
    ],

    ["celesteav","hey",false,"VIOLETSERIES 1"],
    ["violetav","Hello!"],
    ["celesteav","...did we have homework today or is it just me?"],
    ["violetav","It's just you! No homework today..."],
    ["celesteav","That's good haha",null],

    ["celesteav","hey Violet",false,"VIOLETSERIES 2"],
    ["violetav","Hey, how are you?"],
    ["celesteav","I'm okay... hey do you know Lexi?"],
    ["violetav","Not really... we just met in class."],
    ["celesteav","Oh okay... just asking.",null],

    ["celesteav","did you say you and Kate were dating?",false,"VIOLETSERIES 3"],
    ["violetav","Yep..."],
    ["celesteav","Oh okay"],
    ["violetav","Why?"],
    ["celesteav","Just curious... "],
    ["violetav","Okay... now you know!",null],

    ["celesteav","Hey Violet... is everything alright?",false,"VIOLETSERIES WEEKEND"],
    ["violetav","...not really"],
    ["celesteav","oh..."],
    ["violetav","Am I wrong for hating Lexi?"],
    [null,
        [
            ["No you're not","VIOLETSERIES WEEKEND no"],
            ["It's Kate's fault more than anyone else's","VIOLETSERIES WEEKEND yes"]
        ]
    ],
    ["celesteav","No you're not",false,"VIOLETSERIES WEEKEND no"],
    ["violetav","thank you! I knew I wasn't the only one who thought that!"],
    ["celesteav","yeah it's not your fault."],
    ["violetav","...","VIOLETSERIES WEEKEND outro"],
    ["celesteav","It's Kate's fault more than anyone else's",false,"VIOLETSERIES WEEKEND yes"],
    ["violetav","...","VIOLETSERIES WEEKEND outro"],
    ["violetav","I'm not feeling the best today. Maybe talk later?",false,"VIOLETSERIES WEEKEND outro"],
    ["celesteav","okay",null],

    ["celesteav","hey...",false,"VIOLETSERIES 8"],
    ["violetav","hey"],
    ["celesteav","Are you alright?"],
    ["violetav","I'm fine... not really in the mood to talk right now."],
    ["celesteav","ah okay...",null],

    ["celesteav","hey I just thought you should know that Mr. Face scheduled a test for today.",false,"VIOLETSERIES 9"],
    ["violetav","Really? For World History?"],
    ["celesteav","no... it's over meta physics or something like that"],
    ["celesteav","what he won't shut up about in class"],
    ["violetav","Oh... well I take a lot of notes, so I should be fine..."],
    ["violetav","thanks for telling me though",null],

    ["celesteav","does Kate do drugs?",false,"VIOLETSERIES 10"],
    ["violetav","???"],
    ["violetav","Why do you ask?"],
    ["celesteav","...just curious... he seems like he does a lot of drugs."],
    ["violetav","That's an understatement."],
    ["celesteav","Oh..."],
    ["violetav","Yeah he's always high on something... I don't know what his deal is"],
    ["celesteav","hmm... okay",null],

    ["celesteav","hey how are you feeling?",false,"VIOLETSERIES 12 LEXI"],
    ["violetav","...strangely calm"],
    ["celesteav","okay... that's good. Just thought I'd check",null],

    ["celesteav","hey just wanted to say thanks for helping me!",false,"VIOLETSERIES 12 THANKS"],
    ["violetav","I'm glad you found it helpful!",null],

    ["celesteav","hey... just wanted to let you know that you missed the test today.",false,"VIOLETSERIES 12 TEST"],
    ["violetav","I'm gonna be honest... the test is the last thing on my mind right now",null],

    // ### LEXI SERIES
    [null,
        [
            ["DAY 3","LEXISERIES 3"],
            ["DAY 4","LEXISERIES 4"],
            ["DAY 5","LEXISERIES 5"],
            ["WEEKEND","LEXISERIES WEEKEND"],
            ["DAY 8","LEXISERIES 8"],
            ["DAY 9 GOOD","LEXISERIES 9 GOOD"],
            ["DAY 9 BAD","LEXISERIES 9 BAD"],
            ["DAY 10","LEXISERIES 10"],
            ["DAY 12","LEXISERIES 12"]
        ],false,
        "LEXI SERIES"
    ],

    //Scene where you ask her name 

    ["celesteav","hey",false,"LEXISERIES 3"],
    ["lexiav","hi"],
    ["celesteav","what's up"],
    ["lexiav","nothing"],
    ["celesteav","...",null],

    ["celesteav","hey Lexi",false,"LEXISERIES 4"],
    ["lexiav","what is it"],
    ["celesteav","I don't know... just hi"],
    ["lexiav","okay"],
    ["lexiav","hi"],
    ["celesteav","...",null],

    //Scene where you ask her name a second time

    ["celesteav","hey",false,"LEXISERIES 5"],
    ["celesteav","do you have any plans this weekend"],
    ["lexiav","yes"],
    ["celesteav","what are you doing"],
    ["lexiav","homework"],
    ["celesteav","oh okay"],
    ["lexiav","...",null],

    ["celesteav","hey Lexi, do you know Violet?",false,"LEXISERIES WEEKEND"],
    ["lexiav","no"],
    ["celesteav","really? Are you sure"],
    ["lexiav","yes I'm sure"],
    ["celesteav","...some part of me says you're lying."],
    [null,"..."],
    [null,"No response.",null],

    ["celesteav","you were in class today right?",false,"LEXISERIES 8"],
    ["lexiav","yeah..."],
    ["celesteav","so you saw what happened? With Kate and Mr. Face??"],
    ["lexiav","yeah... but I'm not surprised it happened"],
    ["lexiav","knowing Kate"],
    ["celesteav","does he do this all the time?!"],
    ["lexiav","more or less",null],

    ["celesteav","hey",false,"LEXISERIES 9 GOOD"],
    ["lexiav","so I heard your going out with Kate now"],
    ["celesteav","yeah"],
    ["lexiav","good luck with that"],
    ["celesteav","what do you mean?"],
    ["lexiav","...you'll find out",null],

    ["celesteav","hey",false,"LEXISERIES 9 BAD"],
    ["lexiav","i heard Kate asked you out"],
    ["celesteav","yeah"],
    ["lexiav","good luck with that"],
    ["celesteav","what do you mean?"],
    ["lexiav","...you'll find out",null],

    ["celesteav","hey",false,"LEXISERIES 10"],
    ["lexiav","hey thanks for coming over."],
    ["celesteav","yeah... did it help at all?"],
    ["lexiav","it did"],
    ["celesteav","lol"],
    ["celesteav","I'm glad I could help",null],

    ["celesteav","how do you think the test went??",false,"LEXISERIES 12"],
    ["lexiav","idek... i don't feel good about it"],
    [null,
        [
            ["Yeah me neither","LEXISERIES 12 hard"],
            ["It wasn't that hard!","LEXISERIES 12 easy"],
        ]
    ],
    ["celesteav","Yeah me neither",false,"LEXISERIES 12 hard"],
    ["lexiav","we find out on monday"],
    ["celesteav","Yeah...",null],
    ["celesteav","It wasn't that hard!",false,"LEXISERIES 12 easy"],
    [null,"..."],
    [null,"No response.",null],

    // ### KATE SERIES
    [null,
        [
            ["DAY 3","KATESERIES 3"],
            ["DAY 4","KATESERIES 4"],
            ["DAY 5","KATESERIES 5"],
            ["WEEKEND","KATESERIES WEEKEND"],
            ["DAY 8","KATESERIES 8"],
            ["DAY 9 GOOD","KATESERIES 9 GOOD"],
            ["DAY 9 BAD","KATESERIES 9 BAD"],
            ["DAY 10","KATESERIES 10"],
            ["DAY 10 LEXI","KATESERIES 10 LEXI"],
            ["DAY 11","KATESERIES 11"],
        ],false,
     "KATE SERIES"
    ],

    ["celesteav","hey",false,"KATESERIES 3"],
    ["kateav","Hey. What's up"],
    ["celesteav","are you and Violet going out?"],
    ["kateav","Yeah"],
    ["celesteav","ah okay"],
    ["kateav","Why do you ask?"],
    ["celesteav","just curious...",null],

    ["celesteav","hey",false,"KATESERIES 4"],
    ["kateav","What's up"],
    ["celesteav","nothing much..."],
    ["kateav","Sick"],
    ["kateav","Hey Celeste, do you believe in God?"],
    [null,
        [
            ["Yes","KATESERIES 4 yes"],
            ["No","KATESERIES 4 no"]
        ]
    ],
    ["celesteav","Yes","KATESERIES 4 outro","KATESERIES 4 yes"],
    ["celesteav","No","KATESERIES 4 outro","KATESERIES 4 no"],
    ["kateav","Interesting...",false,"KATESERIES 4 outro"],
    ["celesteav","why?"],
    ["kateav","I don't know... I was just thinking about it"],
    ["celesteav","ah... I see",null],

    ["celesteav","hey",false,"KATESERIES 5"],
    ["kateav","What's up"],
    ["celesteav","Nothing much..."],
    ["kateav","I'm still a little irritated with Mr. Face"],
    ["celesteav","how come?"],
    ["kateav","He can't teach"],
    ["celesteav","oh...",null],

    ["celesteav","hey Kate have you talked to Violet recently?",false,"KATESERIES WEEKEND"],
    ["kateav","Nah... sorry"],
    ["celesteav","...it's alright",null],

    ["celesteav","hey... I think Mr. Face is angry with you",false,"KATESERIES 8"],
    ["kateav","That's his own fault"],
    ["celesteav","I mean really angry"],
    ["kateav","Why are you telling me this? What do you want me to do?"],
    ["celesteav","Idk...",null],

    ["celesteav","hey... what are you up to rn?",false,"KATESERIES 9 GOOD"],
    ["kateav","I'm reading... what about you?"],
    ["celesteav","Nothing much..."],
    ["kateav","We're still meeting this Thursday right?"],
    ["celesteav","yep!",null],

    ["celesteav","hey...",false,"KATESERIES 9 BAD"],
    ["celesteav","...can you leave me alone in class?"],
    ["kateav","What? What do you mean?"],
    ["celesteav","just... stop being so distracting when the rest of us are trying to listen"],
    ["kateav","Whatever",null],

    ["celesteav","hey",false,"KATESERIES 10"],
    ["kateav","hey, I'm on my way to Lexi's house right now! We're gonna study for the test tomorrow."],
    ["kateav","I think she wants you to come."],
    ["celesteav","oh... okay",null],

    ["celesteav","hey...",false,"KATESERIES 10 LEXI"],
    ["kateav","Should I call the police?"],
    ["celesteav","No! I'll get back to you later..."],
    ["kateav","Okay..."],
    // In the actual game which one you get depends on which choice you chose when you poisoned Lexi
    ["kateav","I'm still waiting on the police to come!"],
    ["celesteav","Okay..."],

    ["celesteav","Hey...",false,"KATESERIES 11"],
    ["kateav","given up already?"],
    ["celesteav","What? No... the deal is still on. "],
    ["kateav","Well... you have two days left to go."],
    ["celesteav","Okay...",null],


    // ### VIOLET PERSON SERIES
    [null,
        [
            ["DAY 1","VIOLETPERSONSERIES 1"],
            ["DAY 2","VIOLETPERSONSERIES 2"],
            ["DAY 3","VIOLETPERSONSERIES 3"],
            ["DAY 8","VIOLETPERSONSERIES 8"]
        ],false,
     "VIOLET PERSON SERIES"
    ],

    ["celesteav","Hey!",false,"VIOLETPERSONSERIES 1"],
    ["violetav","Hey."],
    ["celesteav","...did we have homework today, or is it just me?"],
    ["violetav","We're good. No home work today."],
    ["celesteav","That's good.",null],

    ["celesteav","Hey Violet.",false,"VIOLETPERSONSERIES 2"],
    ["violetav","Hey, how are you?"],
    ["celesteav","I'm okay... hey do you know Lexi?"],
    ["violetav","Not really... we just met in class."],
    ["celesteav","Oh okay... just asking.",null],

    ["celesteav","Hey...",false,"VIOLETPERSONSERIES 3"],
    ["celesteav","Did you say you and Kate were dating?"],
    ["violetav","Yeah..."],
    ["celesteav","Oh okay."],
    ["violetav","Why?"],
    ["celesteav","Just curious... "],
    ["violetav","Okay... now you know.",null],

    ["celesteav","Hey...",false,"VIOLETPERSONSERIES 8"],
    ["violetav","Hey."],
    ["celesteav","Are you alright?"],
    ["violetav","I'm fine... not really in the mood to talk right now."],
    ["celesteav","Ah okay...",null],

    // ### LEXI PERSON SERIES
    [null,
        [
            ["DAY 3","LEXIPERSONSERIES 3"],
            ["DAY 4","LEXIPERSONSERIES 4"],
            ["DAY 5","LEXIPERSONSERIES 5"],
            ["DAY 8","LEXIPERSONSERIES 8"],
            ["DAY 9 GOOD","LEXIPERSONSERIES 9 GOOD"],
            ["DAY 9 BAD","LEXIPERSONSERIES 9 BAD"],
            ["DAY 12","LEXIPERSONSERIES 12"]
        ],false,
        "LEXI PERSON SERIES"
    ],

    ["celesteav","Hey.",false,"LEXIPERSONSERIES 3"],
    ["lexiav","Hi."],
    ["celesteav","What's up?"],
    ["lexiav","Nothing."],
    ["celesteav","...",null],

    ["celesteav","Hey Lexi!",false,"LEXIPERSONSERIES 4"],
    ["lexiav","What is it?"],
    ["celesteav","I don't know... just hi."],
    ["lexiav","Okay."],
    ["lexiav","Hi."],
    ["celesteav","...",null],

    ["celesteav","Hey.",false,"LEXIPERSONSERIES 5"],
    ["celesteav","Do you have any plans this weekend?"],
    ["lexiav","Yes."],
    ["celesteav","What are you doing?"],
    ["lexiav","Homework."],
    ["celesteav","Oh okay."],
    ["lexiav","...",null],

    ["celesteav","Did you just see what happened? With Kate and Mr. Face??",false,"LEXIPERSONSERIES 8"],
    ["lexiav","Yeah... but I'm not surprised it happened."],
    ["lexiav","Knowing Kate."],
    ["celesteav","Does he do this all the time?!"],
    ["lexiav","More or less.",null],

    ["celesteav","Hey.",false,"LEXIPERSONSERIES 9 GOOD"],
    ["lexiav","So I heard you're going out with Kate now."],
    ["celesteav","Yeah."],
    ["lexiav","Good luck with that."],
    ["celesteav","What do you mean?"],
    ["lexiav","...you'll find out.",null],

    ["celesteav","Hey.",false,"LEXIPERSONSERIES 9 BAD"],
    ["lexiav","I heard Kate asked you out."],
    ["celesteav","Yeah."],
    ["lexiav","Good luck with that."],
    ["celesteav","What do you mean?"],
    ["lexiav","..you'll find out.",null],

    ["celesteav","How do you think the test went??",false,"LEXIPERSONSERIES 12"],
    ["lexiav","I don't know... I don't feel good about it."],
    [null,
        [
            ["Yeah me neither","LEXIPERSONSERIES 12 hard"],
            ["It wasn't that hard!","LEXIPERSONSERIES 12 easy"],
        ]
    ],
    ["celesteav","Yeah me neither.",false,"LEXIPERSONSERIES 12 hard"],
    ["lexiav","We find out on monday."],
    ["celesteav","Yeah...",null],
    ["celesteav","It wasn't that hard!",false,"LEXIPERSONSERIES 12 easy"],
    ["lexiav","..."],
    ["lexiav","Whatever you say.",null],

    // ### KATE PERSON SERIES
    [null,
        [
            ["DAY 3","KATEPERSONSERIES 3"],
            ["DAY 4","KATEPERSONSERIES 4"],
            ["DAY 5","KATEPERSONSERIES 5"],
            ["DAY 8","KATEPERSONSERIES 8"],
            ["DAY 9 GOOD","KATEPERSONSERIES 9 GOOD"],
            ["DAY 9 BAD","KATEPERSONSERIES 9 BAD"],
            ["DAY 10","KATEPERSONSERIES 10"],
            ["DAY 10 LEXI",function(){
                if("DAY10LEXI 911 run" in flagDic){
                    dialogueDic["KATEPERSONSERIES 10 LEXI yes"].appear();
                } else {
                    dialogueDic["KATEPERSONSERIES 10 LEXI no"].appear();
                }
            }],
            ["DAY 11","KATEPERSONSERIES 11"]
        ],false,
     "KATE PERSON SERIES"
    ],

    ["celesteav","Hey.",false,"KATEPERSONSERIES 3"],
    ["kateav","Hey. What's up?"],
    ["celesteav","Are you and Violet going out?"],
    ["kateav","Yeah."],
    ["celesteav","Ah okay..."],
    ["kateav","Why do you ask?"],
    ["celesteav","Just curious...",null],

    ["celesteav","Hey.",false,"KATEPERSONSERIES 4"],
    ["kateav","What's up?"],
    ["celesteav","Nothing much..."],
    ["kateav","Sick..."],
    ["kateav","Hey Celeste, do you believe in God?"],
    [null,
        [
            ["Yes","KATEPERSONSERIES 4 yes"],
            ["No","KATEPERSONSERIES 4 no"]
        ]
    ],
    ["celesteav","Yes.","KATEPERSONSERIES 4 outro","KATEPERSONSERIES 4 yes"],
    ["celesteav","No.","KATEPERSONSERIES 4 outro","KATEPERSONSERIES 4 no"],
    ["kateav","Interesting...",false,"KATEPERSONSERIES 4 outro"],
    ["celesteav","Why?"],
    ["kateav","I don't know... I was just thinking about it."],
    ["celesteav","Ah... I see.",null],

    ["celesteav","Hey.",false,"KATEPERSONSERIES 5"],
    ["kateav","What's up?"],
    ["celesteav","Nothing much..."],
    ["kateav","I'm still a little irritated with Mr. Face."],
    ["celesteav","How come?"],
    ["kateav","He can't teach."],
    ["celesteav","Oh...",null],

    ["celesteav","Hey... I think Mr. Face is angry with you.",false,"KATEPERSONSERIES 8"],
    ["kateav","That's his own fault."],
    ["celesteav","I mean really angry."],
    ["kateav","Why are you telling me this? What do you want me to do?"],
    ["celesteav","I don't know...",null],

    ["celesteav","Hey... what are you up to right now?",false,"KATEPERSONSERIES 9 GOOD"],
    ["kateav","I'm reading... what about you?"],
    ["celesteav","Nothing much..."],
    ["kateav","We're still meeting this Thursday right?"],
    ["celesteav","Yeah!",null],

    ["celesteav","Hey...",false,"KATEPERSONSERIES 9 BAD"],
    ["celesteav","...can you leave me alone in class?"],
    ["kateav","What? What do you mean?"],
    ["celesteav","Just... stop being so distracting when the rest of us are trying to listen."],
    ["kateav","Whatever...",null],

    ["celesteav","Hey.",false,"KATEPERSONSERIES 10"],
    ["kateav","Hey, I'm on my way to Lexi's house right now! We're gonna study for the test tomorrow."],
    ["kateav","I think she wants you to come."],
    ["celesteav","Oh... okay.",null],

    ["celesteav","Hey...",false,"KATEPERSONSERIES 10 LEXI no"],
    ["kateav","Should I call the police?"],
    ["celesteav","No! I'll get back to you later..."],
    ["kateav","Okay...",null],

    ["kateav","I'm still waiting on the police to come!",false,"KATEPERSONSERIES 10 LEXI yes"],
    ["celesteav","Okay...",null],

    ["celesteav","Hey...",false,"KATEPERSONSERIES 11"],
    ["kateav","Given up already?"],
    ["celesteav","What? No... the deal is still on."],
    ["kateav","Well... you have two days left to go."],
    ["celesteav","Okay...",null],
    
    [null,"Where do you want to go?",carchoices_dialogue,"CARCHOICES"],
    
    // DEBUGGING - CHANGE THE STORY
    [null,
        [
            ["PROLOGUE",function(){changeStory("PROLOGUE");}],
            ["PROLOGUE exit",function(){changeStory("PROLOGUE exit");}],
            ["PROLOGUE explore",function(){changeStory("PROLOGUE explore");}],
            ["DAY 1",function(){changeStory("DAY 1");}],
            ["DAY 1 class",function(){changeStory("DAY 1 class");}],
            ["DAY 2",function(){changeStory("DAY 2");}],
            ["DAY 2 class",function(){changeStory("DAY 2 class");}],
            ["DAY 3",function(){changeStory("DAY 3");}],
            ["DAY 3 class",function(){changeStory("DAY 3 class");}],
            ["DAY 4",function(){changeStory("DAY 4");}],
            ["... more ...","PAGE 2"]
        ],false,"PAGE 1"
    ],
    [null,
        [
            ["DAY 4 violet",function(){changeStory("DAY 4 violet");}],
            ["DAY 4 night",function(){changeStory("DAY 4 night");}],
            ["DAY 5",function(){changeStory("DAY 5");}],
            ["DAY 5 violet",function(){changeStory("DAY 5 violet");}],
            ["DAY 5 night",function(){changeStory("DAY 5 night");}],
            ["DAY 6",function(){changeStory("DAY 6");}],
            ["DAY 6 night",function(){changeStory("DAY 6 night");}],
            ["DAY 7",function(){changeStory("DAY 7");}],
            ["DAY 7 kate",function(){changeStory("DAY 7 kate");}],
            ["DAY 7 night",function(){changeStory("DAY 7 night");}],
            ["... more ...","PAGE 3"]
        ],false,"PAGE 2"
    ],
    [null,
        [
            ["DAY 8",function(){changeStory("DAY 8");}],
            ["DAY 8 mrface",function(){changeStory("DAY 8 mrface");}],
            ["DAY 8 office",function(){changeStory("DAY 8 office");}],
            ["DAY 8 night",function(){changeStory("DAY 8 night");}],
            ["DAY 9",function(){changeStory("DAY 9");}],
            ["DAY 9 violet",function(){changeStory("DAY 9 violet");}],
            ["DAY 9 hangout",function(){changeStory("DAY 9 hangout");}],
            ["DAY 9 night",function(){changeStory("DAY 9 night");}],
            ["DAY 10",function(){changeStory("DAY 10");}],
            ["... more ...","PAGE 4"]
        ],false,"PAGE 3"
    ],
    [null,
        [
            ["DAY 10 lexi",function(){changeStory("DAY 10 lexi");}],
            ["DAY 10 texts",function(){changeStory("DAY 10 texts");}],
            ["DAY 10 kate",function(){changeStory("DAY 10 kate");}],
            ["DAY 10 night",function(){changeStory("DAY 10 night");}],
            ["DAY 11",function(){changeStory("DAY 11");}],
            ["DAY 11 lexi",function(){changeStory("DAY 11 lexi");}],
            ["DAY 11 night",function(){changeStory("DAY 11 night");}],
            ["LABYRINTH",function(){changeStory("LABYRINTH");}],
            ["DAY 11 night 2",function(){changeStory("DAY 11 night 2");}],
            ["... more ...","PAGE 5"]
        ],false,"PAGE 4"
    ],
    [null,
        [
            ["DAY 12",function(){changeStory("DAY 12");}],
            ["DAY 12 class",function(){changeStory("DAY 12 class");}],
            ["ABANDON",function(){changeStory("ABANDON");}],
            ["ISOLATION DREAM",function(){changeStory("ISOLATION DREAM");}]
        ],false,"PAGE 5"
    ]

]


dialogueDic = {}

dialogueDic = processWords(dialogueArr,"dic"); // process the dialogue