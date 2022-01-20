var img = "";
var status = "";
var objects = [];
var images =
    [
        "calculator.jpg",
        "television.jpg",
        "laptop.jpg",
        "waterbottle.jpg",
        "fruit.jpg"
    ];

function preload() {
    for (var i = 0; i < 5; i++) {
        if (document.getElementById(i+1) != null || document.getElementById(i+1) != undefined) {
            img = loadImage(images[i]);
            document.getElementsByTagName("h3")[0].innerHTML = `Model will be loading... The expected output from the model is: ${images[i].replace(".jpg", "")}`
        }
    }
}

function setup() {
    canvas = createCanvas(640, 420);
    canvas.center();
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    // document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded");
    status = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(e, results) {
    if (e) {
        console.error(e);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 640, 420);

    // fill("#FF0000");
    // text("Dog", 45, 75);
    // noFill();
    // stroke("#FF0000");
    // rect(30, 60, 450, 350);
    // fill("#FF0000");
    // text("Cat", 320, 120);
    // noFill();
    // stroke("#FF0000");
    // rect(300, 90, 270, 320);

    if (status != "") {
        for (i = 0; i < objects.length; i++) {
            // document.getElementById("status").innerHTML = "Status: Objects detected";
            fill("#FF0000");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", (objects[i].x ) + 15, (objects[i].y ) + 15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x , objects[i].y , objects[i].width, objects[i].height);
        }
    }
}
