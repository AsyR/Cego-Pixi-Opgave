var renderer = PIXI.autoDetectRenderer(500, 500,{antialias: false, transparent: true, resolution: 1});
renderer.view.style.border = "1px dashed black";

document.body.appendChild(renderer.view);
var stage = new PIXI.Container();

PIXI.loader.add("ball.png").load(setup);

function setup() {
  ball = new PIXI.Sprite(
    PIXI.loader.resources["ball.png"].texture
  );
  stage.addChild(ball);
  renderer.render(stage);
}
