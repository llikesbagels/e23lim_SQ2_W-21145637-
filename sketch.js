
//Elle Lim
// Side Quest 1
// #21145637
// 5/17/2026
//Jenga: Background, Image, Text, Shapes

let controllerImg;
let jengaboi;

function preload() {
 
  controllerImg = loadImage("assets/kids-playing-around-calm-cosy-spaces.jpg");

  jengaboi = loadImage("assets/jenga2back.png");

}

function setup() {
  createCanvas(1275,600);
  background(jengaboi);

 //image
  image(controllerImg, 50, 85, 300, 300);

  //under bread
  fill(183, 139, 67);
  noStroke();
  rect(width- 350,85,300,300);
  circle(width - 275, 150,200)
   circle(width - 125, 150,200)
 //over bread 
  fill(234, 225, 204);
  rect(width- 340,100,285,240);
  circle(width - 275, 150,185)
  circle(width - 125, 150,185)
 //text
  textAlign(CENTER);
  textSize(40);
  fill(0,0,0);
  text("JENGA LOOKS LIKE BREAD", width / 2, height / 2);

}