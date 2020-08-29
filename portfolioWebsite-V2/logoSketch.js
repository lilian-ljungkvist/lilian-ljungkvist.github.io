 //rose curve r=2cos4θ
//            r= acos(nθ) even
let r;
let x;
let y;
let a;
let n;
let theta;
let input;
let numpoints ;

function setup() {
  createCanvas(500, 500);
  r = height * 0.45;
  theta = 0;
  input = 0;
  a = 0;
  n = 6;
  numpoints = 3;
}

function draw() 
{
 background(255, 4);
strokeWeight(0.5 * sin(2.4));
fill(3,20);
 input += sin(0.3%12);
numpoints = 4.2 * sin(numpoints%0.96);
translate(width / 2, height / 2);
n += (input+ numpoints);
beginShape();
  for (var i = 0; i < numpoints; i ++)
      {
          stroke(0+input,0,0);
          theta = i* (sin(input%3.56));
          a = cos(input);
          x = r * cos(n * theta);
          y = r * sin(n * theta);
          strokeWeight(1);
          stroke(0);
          vertex(x ,y);    
      }
endShape(CLOSE);

}