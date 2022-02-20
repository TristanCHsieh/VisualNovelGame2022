/* **************************************************
   **************************************************
                    HYPER PARAMETERS
                    
   These are essentially just all of the parameters that
   are configured before hand. Example: how many letters per line
   in the dialogue box
   **************************************************
   ************************************************** */
window.addEventListener("keydown",keyPush,false); //keyboard functionality -- When you push a key once
window.addEventListener("keypress",keyHold,false); //keyboard functionality -- When you hold down a key
window.addEventListener("keyup",keyRel,false); //keyboard functionality -- When you release the key


seal = true;
titleseal = false;
canDebug = true; 
// if this is true, you can access all of the debugging features: skipping dialogue, forcing a dialogue shut, changing location, and changing the story code
start = false; 
// Start is false if the current location's event hasn't already been triggered
// true when it has
selectedObject = null; 
//This variable will contain the object that the player is currently near enough to trigger
currDialogue = null;
// This variable will contain the dialogue object that is currently being displayed
frameRate = 60;
inventoryOpened = false;
// Is true if the inventory is currently opened
keyReleased = true;
// Keeps track if there is a key being pushed...
// If no key is already pushed, then you can go ahead and execute the functions of a single key

// Dialogue box measurements... look at notebook for explanations
bufferH = 6; // Distance between top of the box and avatar/text
bufferW = 6; // Distance between left of the screen and avatar
avSize = 31; // How big are the vatar pictures?
avBorderThickness = 1; // How thick is the white border surrounding them?
letterSize = 9; // How big are the letter images
letterSpace = 1; // Distance between each letter
lineSpace = 3; // Distance between each line
maxLetters = 24; // How many letters per line if there is an avatar
maxLines = 3; // How many lines are visible at a time

invW = 231; // Width of the inventory box
invH = 101; // Height of inventory box
itemSize = 50; // How big is the square in which the item is contained

invBlinkSpeed = 6; // How many frames is the left/right blinker visible
itemBlinkBuffer = 6; // How much space is between left/right blinkers and the item

blinkerW = 4; // How wide is the left/right blinker
blinkerH = 7; // How tall is the left/right blinker

invNameBuffer = 30; // How far is the item name away from the middle of the screen (not including the box)

choiceMaxLetters = 28; // How many letters are included per line when there is no profile picture

// Header size/measurements and score
currScore = 0; // Current score
maxScore = 999; // How many points are there possible to get?
headerLeftBuffer = 5;
headerBufferH = 5;

headerH = headerBufferH*2 + letterSize;

stageHeight = canvas.height // Stage height will not include the header
canvas.height += headerH;    

avBorderSize = avSize + 2*avBorderThickness;

inventory = []; // An array containing all the current inventory items
currItem = 0; // Keeps track of the item the player is currently on... start at 0
currInvFrame = 0; // Keeps track of the inventory left/right blinker animation

gamePause = false; // Can the player move?

fadeOutPhase = 0; 
    // 0 is normal, 
    // 1 is the darkened screen before the function is played
    // 2 is the pitch black screen where the function is played
    // 3 is the darkened screen after the function is played
fadeOutWait = 0; // Keeps track of how much time has passed on each fade out screen
fadeOutTime = 2; // Keeps track of how long each fade out screen lasts in frames
fadeOutFunction = null; // The function that gets played once the screen has been faded out

// These are the color codes that will be used to determine which color will be used in the chat box
// It's darkest to lightest from left to right.
colorCodeArr = ["ㅂ","ㅈ","ㄷ","ㄱ","ㅅ","ㅛ","ㅕ","ㅑ",
                "ㅁ","ㄴ","ㅇ","ㄹ","ㅎ","ㅗ","ㅓ","ㅏ"];

blinker = new Animation(
    "blinker",
    [["blinker",3],["blinkerinv",3]],
    true,
    null
); // The blinker animation

blankInventory = new Dialogue(
    "blankInventory",
    "Your inventory is currently empty.",
    null,
    null
);


// this is literally just a dictionary that contains all 
// the variables that determine where the player is in the game
flagDic = {};
flagDic["story"] = "INSTRUCTIONS";
flagDic["time"] = "night";


//debugDic will allow you to do certain things such as seein where the lines of collision are
debugDic = {};
debugDic["collision"] = false;
debugDic["priority"] = false;