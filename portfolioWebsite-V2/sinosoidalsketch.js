 
let r;
let x;
let y;
let a;
let n;
let theta;
let input;
let numpoints;
let numcols;
let c;
let strokeColor;

function setup() {
  var canvas = createCanvas(500, 400);
  canvas.parent('sinusoidal-sketch-holder');
// r places shape in middle of screen at a relative size by adjusting the radius
  r = height * 0.45;
  theta = 0;
  input = 0;
  a = 0;
//numpoints and n variables are initialized at arbitrary numbers, or whichever numbers seemes to make the most appealing designs
  n = 5;
  numpoints = 780;
//  background(0,5);
  c=0;
  strokeColor = 0;
  colorMode(HSB,255);
}

function draw() 
{
  background(0,5);
//hue controls are inspired by th in-lab excersize and are controlled by the input sine wave
 var hueSignal = 6*sin(input);
 var hue = map(hueSignal,-1,1,90,170);
noFill();
stroke(hue,220,200);
translate(width / 2, height / 2);
//input sine wave is at a low frequency to slow the animation
input+= sin(0.07);
numpoints = 18 * sin(numpoints);
//I used vertices and the begin/end shape functions to create a continuous line 
beginShape();
  
          for(var i = 0; i <numpoints; i++)
              {
                  theta = i / sin(input);
             
                  a = cos(input);
//                  my equations derive from the basic polar rose curve graph...
//                 rose curve: r=2cos4θ
//                  r= acos(nθ) 
//                  I found the conversion to cartesian coordinates as x = r*cos(theta) and y = r * sin(theta)
                  x = r *a *cos(n * theta);
                  y = r *a *sin(n * theta);
                  strokeWeight(1);
                  vertex(x, y);   
              }

endShape(CLOSE);
}

//for my project I wanted to explore the sinusoidal equations in a polar graph format. I also wanted to modulate the color hue using a sin wave to make the sketch more interesting. I went through around 10 different iterations of the same idea, tweaking the equations and values each time. I've found this design do be the most interesting visually, though there were others that I liked as well. I found it interesting that recognizable shapes such as triangles and stars and squares begin to emerge as the draw loop continues. I wonder if these shapes are a product of changing frequency in my equations;changing the amount of vertices for each frame? If I were to change my sketch to make it better I would find a way to have the color of the stroke fade out over time so you could see the new shapes more clearly and it wouldn't just turn into a red blob over time. I think the red color comes from the slope of the sine wave and since the values increase more quickly towards the top of the wave the colors also change more dramatically towards the ends of the circle.