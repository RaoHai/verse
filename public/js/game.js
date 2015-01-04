 var renderer = new PIXI.WebGLRenderer(800, 600);

document.body.appendChild(renderer.view);

var stage = new PIXI.Stage;

var bunnyTexture = PIXI.Texture.fromImage("images/earth.jpg");
var bunny = new PIXI.Sprite(bunnyTexture);

bunny.position.x = 0;
bunny.position.y = 0;


stage.addChild(bunny);

requestAnimationFrame(animate);

function animate() {
    // bunny.rotation += 0.01;

    renderer.render(stage);

    requestAnimationFrame(animate);
}