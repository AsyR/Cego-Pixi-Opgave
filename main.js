var renderer = PIXI.autoDetectRenderer(500, 500,{antialias: false, transparent: true, resolution: 1});
renderer.view.style.border = "1px dashed black";

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var ball;
var start_y_position = 400 // canvas(500) - sprite size (100)
var end_y_position = 0;
var time = 0.99; //Time is between 1 and 0
var acceleration = 0.01; //Acceleration is between 1 and 0

PIXI.loader.add("ball.png").load(setup);

function setup() {
  ball = new PIXI.Sprite(
    PIXI.loader.resources["ball.png"].texture
  );
  ball.scale.x = 0.2;
  ball.scale.y = 0.2;
  stage.addChild(ball);
  animate();
}
function animate() {
  requestAnimationFrame(animate);
  loop();
  renderer.render(stage);
}

//Loop function to determine the position of the sprite
function loop(){
  time += acceleration;
  if (time >= 1){
    acceleration *= -1; //Implementation to swap direction for hitting the boundries
  }
else if(time <= 0)
{
   acceleration *= -1;
}
  console.log(time);
  ball.y = start_y_position + (end_y_position - start_y_position) * cubicBezier(time, 0, 1, 1, 1); // use cubic bezier to calculate the current y position

}

//This formula was found on SO but is the explicit Cubic Bezier formula found on https://en.wikipedia.org/wiki/B%C3%A9zier_curve - Section Cubic Bézier curves. (Ease effect)
function cubicBezier(t, p0, p1, p2, p3) {
    return (1-t)**3*p0+3*(1-t)**2*t*p1+3*(1-t)*t**2*p2+t**3*p3;
}
