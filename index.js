var level=0;
var start=false; //chi bat dau lai tro choi khi start=false
var gamePattern=[]; //mang ghi lai cac button random cua game sau moi level
var userClickedPattern=[]; //mang ghi lai cac button ma nguoi choi bam
var buttonColors=["green","red","yellow","blue"];
//bam 1 nut bat ki de bat dau tro choi
$(document).on("keydown",function(){
   if(!start){
       $("#level-title").text("Level "+level);
       nextSequence();
       start=true;
   }
})
$("#start-button").on("click",function(){
    if(!start){
        $("#level-title").text("Level "+level);
        nextSequence();
        start=true;
    }
})
//qua trinh bam nut cua nguoi choi
$(".btn").on("click",function(){
    var userChosenColor=$(this).attr("id");
    userClickedPattern.push(userChosenColor);
    makeSound(userChosenColor);
    animatePressed(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
})

//cac level, o moi level ban dau se co hieu ung bao hieu 
function nextSequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber=Math.floor(Math.random()*4);
    gamePattern.push(buttonColors[randomNumber]);
    makeSound(buttonColors[randomNumber]);
    $("#"+buttonColors[randomNumber]).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    
}
//check cac hanh dong cua nguoi choi
function checkAnswer(currentLevel){
    if(userClickedPattern[currentLevel]===gamePattern[currentLevel]){
        console.log("success");
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function(){
                nextSequence();
            },1000)
        }
    } else{
        console.log("wrong");
        var auwrong=new Audio("./sounds/wrong.mp3");
        auwrong.play();
        $("#level-title").text("Game Over").fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        setTimeout(function(){
            $("#level-title").text("Press any key to Restart")
        },1500)
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200)
        restart();
    }
    console.log(userClickedPattern);
    console.log(gamePattern);
}
//tao hieu ung khi nguoi dung nhan vao 1 nut
function animatePressed(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}
//tao am thanh
function makeSound(currentColor){
    var audio = new Audio("sounds/" + currentColor + ".mp3");
    audio.play();
}
//restart game
function restart(){
    start=false;
    level=0;
    gamePattern=[];
}

