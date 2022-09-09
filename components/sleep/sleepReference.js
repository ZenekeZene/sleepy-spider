(function () {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

var canvas = document.getElementById("canvas"),
    ctx = canvas.getContext("2d");

canvas.height = document.body.offsetHeight;
canvas.width = 300;

var parts = [],
    minSpawnTime = 240,
    lastTime = new Date().getTime(),
    maxLifeTime = Math.min(3000, (canvas.height/(1.5*60)*1000)),
    emitterX = canvas.width / 2,
    emitterY = canvas.height - 10,
    smokeImage = new Image();

function spawn() {
    if (new Date().getTime() > lastTime + minSpawnTime) {
        lastTime = new Date().getTime();
        parts.push(new smoke(emitterX, emitterY));
    }
}

function render() {
    var len = parts.length;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    while (len--) {
        if (parts[len].y < 0 || parts[len].lifeTime > maxLifeTime) {
            parts.splice(len, 1);
        } else {
            parts[len].update();

            ctx.save();
            var offsetX = -parts[len].size/2,
                offsetY = -parts[len].size/2;

            ctx.translate(parts[len].x-offsetX, parts[len].y-offsetY);
            // ctx.rotate(parts[len].angle / 180 * Math.PI);
            ctx.globalAlpha  = parts[len].alpha;
            ctx.font = "30px Arial";
            ctx.fillStyle = "white";
            ctx.fillText('Z', 0, 0)
            // ctx.drawImage(smokeImage, offsetX,offsetY, parts[len].size,
            // parts[len].size);

            ctx.restore();
        }
    }
    spawn();
    requestAnimationFrame(render);
}

function smoke(x, y, index) {
    this.x = x;
    this.y = y;

    this.size = 1;
    this.startSize = 32;
    this.endSize = 40;

    this.angle = Math.random() * 359;

    this.startLife = new Date().getTime();
    this.lifeTime = 0;

    this.velY = -1 - (Math.random()*0.5);
    this.velX = Math.floor(Math.random() * (-6) + 3) / 10;
}

smoke.prototype.update = function () {
    this.lifeTime = new Date().getTime() - this.startLife;
    this.angle += 0.2;

    var lifePerc = ((this.lifeTime / maxLifeTime) * 100);

    this.size = this.startSize + ((this.endSize - this.startSize) * lifePerc * .1);

    this.alpha = 1 - (lifePerc * .01);
    this.alpha = Math.max(this.alpha,0);

    this.x += this.velX;
    this.y += this.velY;
}

smokeImage.src = "http://somethinghitme.com/projects/particle%20test/images/smoke.png";
smokeImage.onload = function () {
    render();
}


window.onresize = resizeMe;
window.onload = resizeMe;
function resizeMe() {
   canvas.height = document.body.offsetHeight;
}
