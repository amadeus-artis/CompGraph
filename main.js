function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var stage = new createjs.Stage(canvas);
    var screenWidth = 1000;
    var screenHeight = 500;

    var keys = {};
    // var shape = new createjs.Shape();
    // shape.graphics
    //     .beginFill("#000000")
    //     .rect(25, -100, 10, 30)
    //     .beginFill("#854200")
    //     .rect(-50, -50, 100, 100)
    //     .beginFill("#ca5f00")
    //     .lineTo(60, -50).lineTo(0, -100).lineTo(-60, -50);
    // shape.x = 350;
    // shape.y = 150;
    // stage.addChild(shape);

    var mainHero = new createjs.Shape();
    var r = 10;
    mainHero.graphics
        .beginFill("#000000")
        .drawCircle(0, 0, r);
    mainHero.x = 50;
    mainHero.y = 450;
    stage.addChild(mainHero);

    var guardian = new createjs.Shape();
    guardian.graphics
        .beginFill("#ffff00")
        .lineTo(-60, 0)
        .lineTo(-30, 90)
        .lineTo(0, 0)
        .beginFill("#ff0000")
        .drawCircle(0, 0, 15);
    guardian.x = 850;
    guardian.y = 450;
    stage.addChild(guardian);


    var wall = new createjs.Shape();
    wall.graphics
        .beginFill("#000000")
        .rect(-50, -50, 1000, 5);
    wall.x = 50;
    wall.y = 450;

    stage.addChild(wall);

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    this.document.onkeydown = keydown;
    this.document.onkeyup = keyup;

    function keydown(event) {
        keys[event.keyCode] = true;
    }

    function keyup(event) {
        delete keys[event.keyCode];
    }

    createjs.Tween.get(guardian, {loop: true})
    //какие установить значения параметрам,
    //и сколько на это отведено времени
        .to({x : 200}, 6000)
        .wait(1200)
        .to({rotation: 180}, 600)
        // .call(function () {
        //     guardian.rotation = 180;
        // })
        //что изменить после этого
        .to({x: 850}, 6000)
        .to({rotation: 0}, 600)//измени y до 200
        .wait(1200);
    //Ease - набор стандартных
    //функций изинга

    function tick() {
        var speed = 5;
        if (keys[37]) mainHero.x -= speed;
        if (keys[38]) mainHero.y -= speed;
        if (keys[39]) mainHero.x += speed;
        if (keys[40]) mainHero.y += speed;

        if (mainHero.x - r <= 0)
            mainHero.x = r;
        if (mainHero.x + r >= screenWidth)
            mainHero.x = screenWidth-r;
        if (mainHero.y - r <= 0)
            mainHero.y = r;
        if (mainHero.y + r >= screenHeight)
            mainHero.y = screenHeight-r;

        if (mainHero.y - r <= 405)
            mainHero.y = 405 + r;
        stage.update();
    }

    /*guardian.addEventListener('tick', guardAction);
    function guardAction() {
        console.log('guard tick');
    }*/
}

  /*  var spritesheets = new createjs.SpriteSheet({
        images: ["run.png", "walk.png"],
        frames: {
            width: 32,
            height: 32,
            count: 192,
            regX: 16,
            regY: 16
        },
        animations: {
            run: [0, 5],
            walk: [6, 11]
        }
    });

    var hero = new createjs.Sprite(spritesheets);
    hero.x = 200;
    hero.y = 200;
    hero.gotoAndPlay("walk");
    stage.addChild(hero);

    // var sprite = new createjs.Sprite(ss);
    // sprite.x = 200;
    // sprite.y = 200;
    // sprite.gotoAndPlay("small");
    // stage.addChild(sprite);

    stage.update();

    createjs.Ticker.framerate = 15;
    createjs.Ticker.timingMode = createjs.Ticker.RAF_SYNCHED;
    // createjs.Ticker.timingMode = createjs.Ticker.RAF;
    // createjs.Ticker.timingMode = createjs.Ticker.TIMEOUT;

    // createjs.Ticker.on("tick", stage);
    createjs.Ticker.on("tick", tick);

    var speed = 20;

    var tickTime = createjs.Ticker.getTime();

    function tick() {
        var curTime = createjs.Ticker.getEventTime();
        var elapsedTime = (curTime - tickTime) / 1000;
        tickTime = curTime;
        var dist = elapsedTime * speed;

        var d = Math.sqrt((hero.x - shape.x) * (hero.x - shape.x) + (hero.y - shape.y) * (hero.y - shape.y));

        if (dist <= d) {
            hero.x += (shape.x - hero.x) / d * dist;
            hero.y += (shape.y - hero.y) / d * dist;
        }

        stage.update();
    }

    shape.on("pressmove", function (evt) {
        evt.target.x = evt.stageX;
        evt.target.y = evt.stageY;
    });
    shape.on("pressup", function (evt) {
        console.log(shape.x, shape.y);
    })


    // sprite.on("click", boomClick);
    //
    // function boomClick() {
    //     sprite.gotoAndPlay("boom");
    //     console.log("boom");
    //     sprite.on("animationend", function () {
    //         console.log("boom finished");
    //         stage.removeChild(sprite);
    //     });
    // }
} */

// function Guard(name, size) {
//     this.name = name;
//     this.size = size;
//
//     this.sayHello = function() {
//         console.log("hello", this.name);
//     };
//     this.graphics
//         .beginFill("#ff0000")
//         .drawCircle(0, 0, 15)
//         .beginFill("#000000")
//         .rect(0,0, -20,2);
//     this.x = 850;
//     this.y = 50;
//     stage.addChild(this);
//
// }
//
// var g = new Guard("Ilya", 15);
