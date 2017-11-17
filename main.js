//Create the stage and the renderer
var stage = new PIXI.Container();
var renderer = PIXI.autoDetectRenderer(500, 500, {
  antialias: false,
  transparent: true,
  resolution: 1
});

//Add the canvas to the HTML document
document.body.appendChild(renderer.view);

//Add the ball and load the setup function
PIXI.loader.add("ball.png").load(setup);

var direction = true;
var start_y_position = 400; // canvas(500) - sprite size (100)
var end_y_position = 0;
var time = 0.99; //Time is between 1 and 0
var acceleration = 0.01; //Acceleration is between 1 and 0

//Faster button.
document.getElementById("faster").addEventListener("click", function() {
  //If statement is needed because logic is needed to define wether to add
  //or subtract acceleration depending upon the direction of the ball.
  if (direction === true) {
    acceleration += 0.01;
  } else {
    acceleration -= 0.01;
  }
})
//Slower button
//Make it not possible to move backwards by deaccelerating the ball
document.getElementById("slower").addEventListener("click", function() {
  if (direction === true && acceleration >= 0.001) {
    acceleration -= 0.01;
  } else if (direction === false && acceleration < 0) {
    acceleration += 0.01;
  }
})

//Setup function that runs the loop and the ball
function setup() {
  ball = new PIXI.Sprite(PIXI.loader.resources["ball.png"].texture);
  //Scale the sprite to a smaller size
  ball.scale.x = 0.2;
  ball.scale.y = 0.2;

  //Add the sprite to the stage
  stage.addChild(ball);

  //Run the animation loop
  animate();

}
function animate() {
  //get 60 fames per sec animation
  requestAnimationFrame(animate);

  //get the ball movement for the loop
  loop();

  //render stage
  renderer.render(stage);
}

//Loop function to determine the position of the sprite
function loop() {
  time += acceleration;
  if (time >= 1) {
    acceleration *= -1; //Implementation to swap direction
    direction = !direction; //Change direction of the ball
  } else if (time <= 0) {
    acceleration *= -1;
    direction = !direction;
  }
  ball.y = start_y_position + (end_y_position - start_y_position) * cubicBezier(time, 0, 1, 1, 1); // use cubic bezier to calculate the current y position

}

//This formula was found on SO but is the explicit Cubic Bezier formula found on https://en.wikipedia.org/wiki/B%C3%A9zier_curve - Section Cubic Bézier curves. (CSS Ease effect)
function cubicBezier(t, p0, p1, p2, p3) {
  return (1 - t) ** 3 * p0 + 3 * (1 - t) ** 2 * t * p1 + 3 * (1 - t) * t ** 2 * p2 + t ** 3 * p3;
}
