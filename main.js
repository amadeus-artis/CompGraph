function init() {
    console.info("initialized"); //console.log,info,error,warn,debug

    var canvas = document.getElementById("game");
    var stage = new createjs.Stage(canvas);
    var screenWidth = 1000;
    var screenHeight = 500;



    var bg = new createjs.Shape();
    bg.graphics
        .beginFill("#cdcdcd")
        .rect(0,0, screenWidth, screenHeight);
    stage.addChild(bg);

    /*----- MAIN HERO -----*/

    var mainHero = new createjs.Shape();

    var r = 5;
    mainHero.graphics
        .beginFill("#000000")
        .drawCircle(0, 0, r);
    mainHero.x = 50;
    mainHero.y = 475;
    stage.addChild(mainHero);

    /*----- EXIT -----*/

    var exit = new createjs.Shape();
    exit.graphics
        .beginFill("#6d3600")
        .rect(5, 5, 25, 45)
        .beginFill("#cfb902")
        .drawCircle(25, 30, 3);

    stage.addChild(exit);

    function exitCollision() {
        var finish = mainHero.localToLocal(0, 0, exit);
        if (exit.hitTest(finish.x, finish.y - r) || exit.hitTest(finish.x, finish.y + r)
            || exit.hitTest(finish.x - r, finish.y) || exit.hitTest(finish.x + r, finish.y)) {
            win();
        }
    }

    /*----- GUARDIANS -----*/

    guardians = [{
        x0: 900,
        y0: 475,
        rotated: 0,
        path: [
            ["to", {x: 100}, 6000],
            ["wait", 1200],
            ["to", {rotation: -180}, 600],
            ["to", {x: 900}, 6000],
            ["to", {rotation: 0}, 600],
            ["wait", 1200]
        ]
    }, {
        x0: 900,
        y0: 425,
        rotated: 0,
        path: [
            ["to", {x: 650}, 800],
            ["to", {rotation: 180}, 200],
            ["to", {x: 900}, 800],
            ["to", {rotation: 0}, 200]
        ]
    },
        {
            x0: 375,
            y0: 425,
            rotated: 180,
            path: [
                ["wait", 450],
                ["to", {rotation: 90}, 300],
                ["wait", 450],
                ["to", {rotation: 180}, 300]
            ]
        },
        {
            x0: 25,
            y0: 410,
            rotated: 135,
            path: [
                ["wait", 450],
                ["to", {x: 275, rotation: 45}, 900],
                ["wait", 450],
                ["to", {x: 25, rotation: 135}, 900]
            ]
        },
        {
            x0: 150,
            y0: 200,
            rotated: -90,
            path: [
                ["to", {x: 175, y: 175, rotation: -180}, 600],
                ["to", {x: 150, y: 150, rotation: -270}, 600],
                ["to", {x: 125, y: 175, rotation: -360}, 600],
                ["to", {x: 150, y: 200, rotation: -450}, 600]
            ]
        },
        {
            x0: 150,
            y0: 150,
            rotated: 90,
            path: [
                ["to", {x: 125, y: 175, rotation: 0}, 600],
                ["to", {x: 150, y: 200, rotation: -90}, 600],
                ["to", {x: 175, y: 175, rotation: -180}, 600],
                ["to", {x: 150, y: 150, rotation: -270}, 600]
            ]
        },
        {
            x0: 125,
            y0: 175,
            rotated: 0,
            path: [
                ["to", {x: 150, y: 200, rotation: -90}, 600],
                ["to", {x: 175, y: 175, rotation: -180}, 600],
                ["to", {x: 150, y: 150, rotation: -270}, 600],
                ["to", {x: 125, y: 175, rotation: -360}, 600]
            ]
        },
        {
            x0: 175,
            y0: 175,
            rotated: 180,
            path: [
                ["to", {x: 150, y: 150, rotation: 90}, 600],
                ["to", {x: 125, y: 175, rotation: 0}, 600],
                ["to", {x: 150, y: 200, rotation: -90}, 600],
                ["to", {x: 175, y: 175, rotation: -180}, 600]
            ]
        },
        {
            x0: 300,
            y0: 150,
            rotated: 90,
            path: [
                ["to", {rotation: 270}, 1200],
                ["to", {rotation: 90}, 1200]
            ]
        },
        {
            x0: 500,
            y0: 187,
            rotated: 180,
            path: [
                ["to", {x: 550, rotation: 135}, 600],
                ["to", {x: 600, rotation: 225}, 600],
                ["to", {x: 650, rotation: 135}, 600],
                ["to", {x: 700, rotation: 225}, 600],
                ["to", {x: 750, rotation: 135}, 600],
                ["to", {x: 800, rotation: 225}, 600],
                ["to", {x: 850, rotation: 180}, 600],
                ["wait", 600],
                ["to", {rotation: 0}, 300],
                ["to", {x: 800, rotation: 45}, 600],
                ["to", {x: 750, rotation: -45}, 600],
                ["to", {x: 700, rotation: 45}, 600],
                ["to", {x: 650, rotation: -45}, 600],
                ["to", {x: 600, rotation: 45}, 600],
                ["to", {x: 550, rotation: -45}, 600],
                ["to", {x: 500, rotation: 0}, 600],
                ["wait", 600],
                ["to", {rotation: 180}, 300]
            ]
        },
        {
            x0: 500,
            y0: 250,
            rotated: 180,
            path: [
                ["to", {x: 850}, 4200],
                ["wait", 600],
                ["to", {rotation: 0}, 300],
                ["to", {x: 500}, 4200],
                ["wait", 600],
                ["to", {rotation: 180}, 300]
            ]
        },
        {
            x0: 500,
            y0: 125,
            rotated: 180,
            path: [
                    ["to", {x: 850}, 4200],
                    ["wait", 600],
                    ["to", {rotation: 360}, 300],
                    ["to", {x: 500}, 4200],
                    ["wait", 600],
                    ["to", {rotation: 180}, 300]
            ]
        },
        {
            x0: 925,
            y0: 125,
            rotated: 270,
            path: [
                ["to", {y: 175}, 600],
                ["wait", 600],
                ["to", {y: 125}, 600],
                ["wait", 600]
            ]
        },
        {
            x0: 950,
            y0: 25,
            rotated: 0,
            path: []
        }];

    for (var guardian of guardians) {
        creatingGuard(guardian);
        console.log("guardian created");
    }

    function creatingGuard(guardian) {

        var guard = new createjs.Shape();
        guard.graphics
            .beginFill("#ffe702")
            .lineTo(-100, -25)
            .lineTo(-100, 25)
            .lineTo(0, 0)
            .beginFill("#cf1400")
            .drawCircle(0, 0, 7);
        guard.rotation = guardian.rotated;
        guard.x = guardian.x0;
        guard.y = guardian.y0;
        stage.addChild(guard);

        var trace = createjs.Tween.get(guard, {loop: true});
        for (var i = 0; i < guardian.path.length; i++) {
            if (guardian.path[i][0] === "to") {
                trace.to(guardian.path[i][1], guardian.path[i][2]);
            } else if (guardian.path[i][0] === "wait") {
                trace.wait(guardian.path[i][1]);
            }
        }

        guardian.pt = mainHero.localToLocal(0, 0, guard);
        guardian.link = guard;
    }

    function guardCollision() {
        for (guardian of guardians) {
            var pt = mainHero.localToLocal(0, 0, guardian.link);
            if (guardian.link.hitTest(pt.x + r, pt.y + r) || guardian.link.hitTest(pt.x - r, pt.y - r)) {
                Death();
            }
        }
    }

    /*----- WALLS -----*/

    walls = [{
        x0: 0,  //start
        y0: 450,
        wid: 300,
        hei: 2
    },
        {
            x0: 300, //pocket left
            y0: 450,
            wid: 2,
            hei: -50
        },
        {
            x0: 300, //pocket top
            y0: 400,
            wid: 50,
            hei: 2
        },
        {
            x0: 350, //pocket right
            y0: 400,
            wid: 2,
            hei: 50
        },
        {
            x0: 350, //first enter
            y0: 450,
            wid: 400,
            hei: 2
        },
        {
            x0: 800, //first enter
            y0: 450,
            wid: 200,
            hei: 2
        },
        {
            x0: 275, //second floor
            y0: 325,
            wid: 850,
            hei: 2
        },
        {
            x0: 175,
            y0: 300,
            wid: 100,
            hei: 2
        },
        {
            x0: 0, //second enter
            y0: 300,
            wid: 125,
            hei: 2
        },
        {
            x0: 275, //room
            y0: 325,
            wid: 2,
            hei: -225
        },
        {
            x0: 0, //end
            y0: 50,
            wid: 800,
            hei: 2
        },
        {
            x0: 850, //end enter
            y0: 50,
            wid: 150,
            hei: 2
        },
        {
            x0: 400, // third hall
            y0: 50,
            wid: 2,
            hei: 225
        },
        {
            x0: 400, //fourth hall
            y0: 275,
            wid: 500,
            hei: 2
        },
        {
            x0: 950, //fourth hall enter
            y0: 275,
            wid: 50,
            hei: 2
        },
        {
            x0: 400,
            y0: 100,
            wid: 50,
            hei: 2
        },
        {
            x0: 500,
            y0: 100,
            wid: 500,
            hei: 2
        }];

    var brick = new createjs.Shape();
        brick.graphics
            .beginFill("#000000");

        for (var wall of walls) {
            var shadow = new createjs.Shape();
            shadow.graphics
                .beginFill("#929292")
                .rect(wall.x0, wall.y0+2, wall.wid+4, wall.hei+4);
            shadow.alpha = 0.6;
            stage.addChild(shadow);
            brick.graphics.rect(wall.x0, wall.y0, wall.wid, wall.hei)
        }
    stage.addChild(brick);

    function wallCollision() {
        for (wall in walls) {
            var wallpt = mainHero.localToLocal(0, 0, brick);
            if (brick.hitTest(wallpt.x, wallpt.y - r)) {
                mainHero.y = mainHero.y + r;
            } else if (brick.hitTest(wallpt.x, wallpt.y + r)) {
                mainHero.y = mainHero.y - r;
            } else if (brick.hitTest(wallpt.x - r, wallpt.y)) {
                mainHero.x = mainHero.x + r;
            } else if (brick.hitTest(wallpt.x + r, wallpt.y)) {
                mainHero.x = mainHero.x - r;
            }
        }

        if (mainHero.x - r <= 0)
            mainHero.x = r;
        if (mainHero.x + r >= screenWidth)
            mainHero.x = screenWidth - r;
        if (mainHero.y - r <= 0)
            mainHero.y = r;
        if (mainHero.y + r >= screenHeight)
            mainHero.y = screenHeight - r;
    }

    /*----- -----*/

    function win() {
        console.log("You Won!");
        createjs.Ticker.removeEventListener("tick", tick);
        var finishTime = Math.round(createjs.Ticker.getTime()/10)/100;
        var blackScreen = new createjs.Shape();
        blackScreen.graphics.beginFill("#2e2e2e").rect(0,0, screenWidth, screenHeight);
        stage.addChild(blackScreen);
        var text = "YOU WON!\n\n" + "You did it in " + finishTime.toString() + " seconds!"
            +"\n\n" + "Press f5 to play again";
        var victoryText = new createjs.Text(text, "40px Arial", "#eaeaea");
        victoryText.x = screenWidth/2;
        victoryText.y = screenHeight/4;
        victoryText.textAlign = "center";
        stage.addChild(victoryText);
    }

    function Death() {
        console.log("Game Over");
        createjs.Ticker.removeEventListener("tick", tick);
        var blackScreen = new createjs.Shape();
        blackScreen.graphics.beginFill("#2e2e2e").rect(0,0, screenWidth, screenHeight);
        stage.addChild(blackScreen);
        var lostText = new createjs.Text("You lost!\n\nPress f5 to retry", "40px Arial", "#eaeaea");
        lostText.x = screenWidth/2;
        lostText.y = screenHeight/4;
        lostText.textAlign = "center";
        stage.addChild(lostText);
    }

    createjs.Ticker.addEventListener("tick", tick);
    createjs.Ticker.setFPS(60);

    var keys = {};
    function keysWork() {
        this.document.onkeydown = keydown;
        this.document.onkeyup = keyup;

        function keydown(event) {
            keys[event.keyCode] = true;
        }

        function keyup(event) {
            delete keys[event.keyCode];
        }
    }
    keysWork();

    function tick() {

            guardCollision();
            wallCollision();
            exitCollision();

            var speed = 5;
            if (keys[37]) mainHero.x -= speed;
            if (keys[38]) mainHero.y -= speed;
            if (keys[39]) mainHero.x += speed;
            if (keys[40]) mainHero.y += speed;

            stage.update();
    }


}
