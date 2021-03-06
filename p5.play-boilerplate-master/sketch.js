var balloon, balloonImg2, balloonImg3, balloonImg4;
var bg, bgImg;
var database;
var position;
var readPosition;
var height

function preload() {
    bgImg = loadImage("Hot Air Ballon-01.png");

    balloonImage1 = loadAnimation("Hot Air Ballon-02.png");
    balloonImage2 = loadAnimation("Hot Air Ballon-02.png", "Hot Air Ballon-03.png",
        "Hot Air Ballon-04.png", "Hot Air Ballon-03.png", "Hot Air Ballon-02.png",
        "Hot Air Ballon-02.png", "Hot Air Ballon-03.png", "Hot Air Ballon-03.png", "Hot Air Ballon-03.png");

}

function setup() {

    database = firebase.database()

    createCanvas(1500, 700);

    balloon = createSprite(250, 650, 150, 150);
    balloon.addAnimation("hotAirBalloon", balloonImage1);
    balloon.scale = 0.5;

    var balloonPosition = database.ref("balloon/position");
    balloonPosition.on("value", readPosition, showError);
}

function draw() {
    background(bgImg);



    if (keyDown(UP_ARROW)) {
        updatePosition(0, -10);
        balloon.addAnimation("hotAirBalloon", balloonImage2)
        balloon.scale = balloon.scale - 0.01;
    }

    if (keyDown(DOWN_ARROW)) {
        updatePosition(0, +10);
        balloon.addAnimation("hotAirBalloon", balloonImage2)
        balloon.scale = balloon.scale + 0.01;
    }

    if (keyDown(LEFT_ARROW)) {
        updatePosition(-10, 0);
        balloon.addAnimation("hotAirBalloon", balloonImage2)
        balloon.scale = balloon.scale - 0.01;
    }

    if (keyDown(RIGHT_ARROW)) {
        updatePosition(+10, 0);
        balloon.addAnimation("hotAirBalloon", balloonImage2)
        balloon.scale = balloon.scale + 0.01;
    }

    drawSprites();
    textSize(20);
    fill("red");
    stroke("black");
    text("Use The Arrow Keys To Move The Hot Air Balloon", 10, 30);
}

function updatePosition(x, y) {
    database.ref("balloon/position").set({
        "x": position.x + x,
        "y": position.y + y
    })
}

function readPosition(data) {
    position = data.val();
    balloon.x = position.x;
    balloon.y = position.y;
}

function showError() {
    console.log("Error in writing to the database");
}