// 1. var to store status of Coco-ssd model
status = "";

//var to hold name of object
object_name = "";

function setup(){
    //2.1 create canvas
    canvas = createCanvas(350,350);
    canvas.center();
    //2.2 access webcam
    video = createCapture(VIDEO);
    video.size(350,350);
    video.hide();
}

function start(){
    //3.1 load coco-ssd model
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    //3.2 update the HTML element with the status
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    //3.3 store the value from the input box in a var
    object_name = document.getElementById("input").value;
}

function modelLoaded(){
    //4.1 print on console
    console.log("Model Loaded!");
    //4.2 set the status as true
    status = true;
}

function draw(){
    //5. place the webcam live view
    image(video,0,0,350,350);
}