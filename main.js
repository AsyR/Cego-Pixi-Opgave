var renderer = PIXI.autoDetectRenderer(500, 500,{antialias: false, transparent: true, resolution: 1});
renderer.view.style.border = "1px dashed black";

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
var speed = 3;

PIXI.loader.add("ball.png").load(setup);

function setup() {
  ball = new PIXI.Sprite(
    PIXI.loader.resources["ball.png"].texture
  );
  ball.scale.x = 0.2;
  ball.scale.y = 0.2;
  stage.addChild(ball);
  animate();
  renderer.render(stage);
}
function animate() {
  requestAnimationFrame(animate);
  loop();
  renderer.render(stage);
}

function loop(){
  if ( ball.y > 400 || ball.y < 0){
    speed = speed * -1;
  }
  ball.y = ball.y += speed;
}
