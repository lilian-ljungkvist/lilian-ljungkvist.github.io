
var flowers;
var numFlowers;
var mutationProb;
var selected;

function setup()
{
	var canvas = createCanvas(windowWidth/2, windowHeight/2);
    canvas.parent('sketch-div');
    numFlowers = 10;
    flowers = [];

    for(var i = 0; i < numFlowers; i++)
    {
        //add ten randomly placed flowers to the patch
        flowers.push(new Flower(random(50,width),random(50,height)));
    }

    mutationProb = 0.1;

}


function draw()
{
    background(133, 194, 230);
    push();
    noStroke();
    fill(0);
    textSize(width / 40);
    text('Click two flowers to cross-pollinate', 10,30);
    text('then click anywhere to plant new flower!',10,50)
     pop();

    for(var i = 0; i < flowers.length; i++)
    {
       flowers[i].draw();
    }
}
function mousePressed()
{
    var select = flowers.filter(isSelected);
    if(numSelected() >= 2)
        {
            //push new planted flower into array
            flowers.push(plant(mouseX,mouseY));
            //de-select  previous flowers
            for(var i = 0; i < flowers.length; i++)
                {
                    flowers[i].isSelected = false;
                }
          
            return;
        }
  checkSelected();
}
function checkSelected()
{
    
      //detect if user has selected a flower 
    for(var i = 0; i < flowers.length; i++)
        {
            var d = dist(mouseX,mouseY,flowers[i].x,flowers[i].y)
            if(d < flowers[i].petalLength/2)
                {
                    noFill();
                    stroke(0);
                    strokeWeight(2);
                    flowers[i].selected();
                
                    console.log("selected");
                }
                 
        }  
  
    
    
}
//a function that returns the selected flowers (used in .filter array method)// 
function isSelected(flower) {
    return flower.isSelected;
}
function numSelected()
{
    //counts how many flowers are selected
    return flowers.filter(isSelected).length;
    
}
function plant(plantX,plantY)
{
//plants new flower made of crossover genes from selected flowers
  var select = flowers.filter(isSelected);
  var flower1 = select[0].dna;
  var flower2 = select[1].dna;
//new flower made with crossover dna and 0.1 chance of mutation
  var newFlower = new Flower(plantX,plantY);
  var crossedDNA = crossoverDNA(flower1,flower2);
  crossedDNA.mutate();
  newFlower.dna = crossedDNA;
  newFlower.calcPhenotype();
  
    return newFlower;
}

function crossoverDNA(parentA, parentB)
{
    /*
        This function uses the crossover method of DNA to generate a new piece of DNA and returns the object
    */
  return parentA.crossover(parentB);

}

function Flower(x,y)
{
 this.x = x;
 this.y = y;
 this.isSelected = false;
 this.dna = new DNA(5);
 this.age = 0;
  //     //genetic properties - these will be updated by calcPhenoType
       this.calcPhenotype = function()
    {
        //express each gene
        this.centerSize = map(this.dna.genes[0],0,1,5,10)
        this.petalLength = map(this.dna.genes[1],0,1,25,40);
        this.color = map(this.dna.genes[2],0,1,0,100);
        this.centerColor =map(this.dna.genes[3],0,1,3,10);
        this.numPetals = map(this.dna.genes[4],0,1,3,10);
    }
    
    this.draw = function()
    {
        push();    
        //call the other draw methods
        this.drawPetals();
        this.drawCenter();
        this.drawSelected();
        this.aging();//"grow" the flower
        pop();
    }
    
    this.drawSelected = function()
    {
        //draw circle around selected flower
        if(this.isSelected) {
            push();
            noFill();
             ellipse(this.x,this.y,this.petalLength + 10);
            pop();
        }
    }
    
    this.drawCenter = function()
    {
        push();
        colorMode(HSB);
        fill(this.centerColor,50,100);
        stroke(0);
        strokeWeight(1);
        //start center size at zero and grow to full size
        var currCenterSize = lerp(0,this.centerSize,this.age);
        ellipse(x,y, currCenterSize, currCenterSize);
        pop();
    }
    
    this.drawPetals = function()
    { 
        push();
        colorMode(HSB,100);
        stroke(0);
        strokeWeight(1);
        fill(this.color,50,100);
          angleMode(DEGREES);
          strokeWeight(1);
//          push();
          translate(x,y);
          for(var i = 0; i < this.numPetals; i++)
          {
          rotate(180/this.numPetals);
        //start flower size at zero and grow to full size
         var currPetalSize = 
        lerp(0,this.petalLength,this.age);
          ellipse(0,0,currPetalSize,currPetalSize/5);
          }
          pop()
            }
   this.selected = function()
   {
    this.isSelected = true;
    //sets state of flower to selected
              
   }
// sets the rate for lerping in the grow animation
   this.aging = function()
   {
    if(this.age < 1)
        {
            this.age += 0.1;  
        }
   }
    
    this.calcPhenotype(); // express the gene when creating the object the first time.
 
}


function DNA(numGenes)
{

  this.genes = [];

  for(var i = 0; i < numGenes; i++)
  {
    this.genes.push(random(0,1)); //each Gene is a random number between 0 and 1
  }

	this.crossover = function(partner)
  {
    /*
    This method creates a new DNA  object with the same number of genes as this.genes
    For each gene of the current DNA it chooses randomly between this.genes and partner.genes
    The new DNA is returned at the end of the method
    */
       var d = new DNA(this.genes.length);
      for(var i = 0; i < this.genes.length; i++)
      {
        if(random() > 0.5)
        {
          d.genes[i] = this.genes[i];
        }
        else
        {
          d.genes[i] = partner.genes[i];
        }
      }
      return d;
  }


  this.mutate = function()
  {

      for(var i = 0; i < this.genes.length; i++)
      {
        if(random() < mutationProb)
        {
            this.genes[i] = random(0,1);
        }
      }

  }

}
//INSTRUCTIONS///
//Click two flowers that you would like to cross pollinate and then click a spot on the canvas to plant the new flower (which is made of the parent flowers' genes)//

////COMMENTARY//////////
//I chose to make my project using genetic mutation. I used some of the functions from the template we used in class for the calcPhenotype, mutation, and DNA crossover functions, but I changed the project quite a bit because I wanted to make a simple flower cross-pollination simulator. The user can select flowers with the traits they like and continue to fill the screen with flowers of those traits. I wanted to only cross pollinate with two flowers at a time, so I had to develop a way of selecting two flowers and "planting" the new flower by adding it to the end of the flowers array.There is also a possibility of mutation in the flowers.  

//By using interactive selection, the visuals of the canvas can be more interesting, because over time, the user can get the patch of flowers they want. For example, choosing only pink flowers to cross-pollinate will mean that the flower patch has mostly pink flowers. 

//(what I would do differently next time)//
//I could only think of a few parameters that flowers would have that could be manipulated with the genes, but it would have been cool if I had the capability of creating more detailed graphics to show even more variation. Overall though, I liked the simple aesthetics of the daisy flowers and I think it still has a nice effect.
