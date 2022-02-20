
/* **************************************************
   **************************************************
                  SETTING UP CANVAS
   **************************************************
   ************************************************** */

// Sets a variable equal to your canvas element
var canvas = document.getElementById("myCanvas");

// Makes the height and width of your canvas 268/168 pixels
canvas.width = 295;
canvas.height = 185;

// Makes the actual height and width 804 x 504 CS pixels, which are twice the size of 
// regular pixels. If you want your pixels to be size 1, the width and height would be 134/84
// However, in this example I set them to three times the regular pixels, so the pixels are now each 6 by 6

pixelSize = 6; // How big are the pixels

canvas.style.width = canvas.width * (pixelSize/2);
canvas.style.height = canvas.height * (pixelSize/2);
//console.log(canvas.style.width);
//console.log(canvas.style.height);

// Creates a Canvas Rendering Object
ctx = canvas.getContext("2d");

