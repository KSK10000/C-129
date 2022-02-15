song1="";
song2="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristScore=0;
rightWristScore=0;
song1_status="";
song2_status="";
function preload(){
    song1=loadSound("butter.mp3");
    song2=loadSound("gone gone gone.mp3");
}
function setup(){
    canvas=createCanvas(550, 550);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    PoseNet=ml5.poseNet(video, modelloaded);
    PoseNet.on('pose', gotPoses);
}
function draw(){
    image(video, 0, 0, 550, 550);
    fill("blue");
    stroke("cyan");
    song1_status=song1.isPlaying();
    song2_status=song2.isPlaying();
    if(leftWristScore>0.2){
       circle(leftWristX, leftWristY, 20);
       song1.stop();
       if(song2_status==false){
        song2.play();
        document.getElementById("song").innerHTML="gone gone gone.mp3";
    }
    }
    if(rightWristScore>0.2){
        circle(rightWristX, rightWristY, 20);
        song2.stop();
        if(song1_status==false){
         song1.play();
         document.getElementById("song").innerHTML="butter.mp3";
     }
     }
}
function modelloaded(){
      console.log("Your model is successfully loaded");
}   

function gotPoses(results){
    if(results.length>0){
      leftWristX=results[0].pose.leftWrist.x;
      leftWristY=results[0].pose.leftWrist.y;
      console.log("Left Wrist X = "+leftWristX);
      console.log("Left Wrist Y = "+leftWristY);
      rightWristX=results[0].pose.rightWrist.x;
      rightWristY=results[0].pose.rightWrist.y;
      console.log("Right Wrist X = "+rightWristX);
      console.log("Right Wrist Y = "+rightWristY);
      console.log(results);
      leftWristScore=results[0].pose.keypoints[9].score;
      console.log("Left Wrist Score = "+leftWristScore);
      rightWristScore=results[0].pose.keypoints[10].score;
      console.log("Right Wrist Score = "+rightWristScore);
    }
}
function play(){
    song.play();
    song.setVolume(1);
    song.setRate(1);
}