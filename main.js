// 1. var to store status of Coco-ssd model
status = "";

//var to hold name of object
object_name = "";

// 2. array to hold the results
objects = [];

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

    // 4.1 check if the status of model is not empty
    if(status != ""){
        //execute the model
        objectDetector.detect(video, gotResult);

        for(i = 0; i < objects.length; i++){
            //4.2 convert the confidence to percentage
            percent = floor(objects[i].confidence * 100);

            //4.3 display the label
            text(objects[i].label + "  " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            textSize(18);

            //4.4 unset the color and set the border color
            noFill();
            stroke("#00008b");

            //4.5 draw a rectangle around the object
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

            //5. check if the object has been found
            if(objects[i].label == object_name){
                //5.1 stop the webcam live view
                video.stop();
                //5.2 stop execution of coco-ssd model
                objectDetector.detect(gotResult);
                //5.3 update the HTML element
                document.getElementById("object_detected").innerHTML = object_name + "  found";

                //5.4 speak out the name of the object
                var synth = window.speechSynthesis; //storing speechSynthesisAPI in a var
                var speak_data = object_name + "  found"; //storing the speech in a var
                var utterThis = new SpeechSynthesisUtterance(speak_data); //pass the speech inside SpeechSynthesisUtterance and store it in a var
                synth.speak(utterThis); //speak out the speech
            }
            else{   //6. if the object is not found
                document.getElementById("object_detected").innerHTML = object_name + "  not found";
            }
        }
    }
}

// 1. fetch results from model
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        // 3. assign the results to the object variable
        objects = results;
    }
}