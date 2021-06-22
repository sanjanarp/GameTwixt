
//game constants and variables
let inputDirection = {x:0, y:0};
let speed =5;
let lastPaintTime=0;
let snakeArr = [{x:13, y:15}];
let food =  {x:6, y:8};
let score = 0;
localStorage.setItem("hiscore", JSON.stringify(score));




//game functions

function resetHighScore() {
   hiscoreval = 0;
   hiscoreBox.innerHTML = "High Score: " + hiscoreval;
} 

function main(currentTime) {
    window.requestAnimationFrame(main); //this is for looping main, instead of this, set interval can also be used
   // console.log(currentTime);
    if((currentTime-lastPaintTime)/1000 < 1/speed) //since the new screen is rendered every few milliseconds (really fast), we're applying a condition to render a new screen after a couple more milliseconds  
    {
        return;
    }
    lastPaintTime=currentTime;
    gameEngine();
   
}


function isCollide(snake)//snake is an array
{ 
  // if the snake bumps into itself
  for(let i = 1; i<snakeArr.length; i++){
    if(snake[i].x === snake[0].x  && snake[i].y === snake[0].y ) 
    {
     return true;
    }   
  }
  //if snake bumps into wall
  if(snake[0].x >=18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0) 
   {
    return true;
  }
  return false;
}


function gameEngine(){
    //Part 1: Updating the snake array & food
    if(isCollide(snakeArr)) //if snake hits the wall
    {
        inputDirection = {x:0, y:0};
        alert("Game Over!! Press OK to play again");
        snakeArr= [{x:13, y:15}];
        score = 0;
        scoreBox.innerHTML = "Score: " + score;
    }



    //if snake has eaten the food , increment the score & regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x) //if coordinates of snake's head and food match, that means snake has eaten the food
    {
       snakeArr.unshift({ x: snakeArr[0].x + inputDirection.x , y: snakeArr[0].y + inputDirection.y});//unshift() inserts an element to start of the array
       score+=1;
       if(score>hiscoreval){
        hiscoreval = score;
        localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
        hiscoreBox.innerHTML = "High Score: " + hiscoreval;
    }
      /* if(score > highscoreval){
         highscoreval = score;
        localStorage.setItem("highscore", JSON.stringify(highscoreval));
        highScoreBox.innerHTML = "High Score: " + highscoreval;
      } */
       scoreBox.innerHTML = "Score: " + score;
       let a= 2 ;
      let b= 16;
       food = {x:Math.round(a + (b-a)*Math.random()), y: Math.round(a + (b-a)*Math.random())}
        //to generate a random number between a and b: Math.round(a + (b-a)*Math.random())
      }
    



  //moving the snake
    for(let i=snakeArr.length -2; i>=0;i--) //starts from 2nd last element
   {
     
     snakeArr[i+1] = {...snakeArr[i]}; // to avoid reference issue we're using {...snakeArr[i]} instead of snakeArr[i]
  
    }

    snakeArr[0].x +=inputDirection.x;
    snakeArr[0].y +=inputDirection.y;



    //Part 2: Display the snake & food
    //Display snake
     board.innerHTML =" "; //this is to clear all the html in the board , so that multiple occurances of snake or food is avoided
    
     snakeArr.forEach((e,index) => {
          snakeElement = document.createElement("div"); //creating a new element called snakeElement
          //adding some css via js for snakeElement
          snakeElement.style.gridRowStart = e.y ; //its not e.x because row is horizontal
          snakeElement.style.gridColumnStart =  e.x ;
          if(index === 0){
            snakeElement.classList.add("head");
          }
          else {
              snakeElement.classList.add("snake");
            }
          board.appendChild(snakeElement);//adding the snake element into the board
        });
    //Display food
          foodElement = document.createElement("div");
          foodElement.style.gridRowStart = food.y ; 
          foodElement.style.gridColumnStart =  food.x ;
          foodElement.classList.add("food");
          board.appendChild(foodElement);
}





//main logic
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "High Score: " + hiscore;
}
/* let highscore = localStorage.getItem("highscore");
if(highscore=== null){
  highscoreval =0;
  localStorage.setItem("highscore", JSON.stringify(highscoreval));
} else {
  highscoreval = JSON.parse(highscore);
  highScoreBox.innerHTML = "High Score: " + highscore;
} */
window.requestAnimationFrame(main); //it is better to use requestAnimationFrame() instead of set interval (because of high quality animation, no flicker,etc); this is done for game looping (like repainting screen)
window.addEventListener("keydown", e=> {
  inputDirection = {x:0, y:1} //start the game
  switch(e.key){
      case "ArrowUp": 
            console.log("ArrowUp");
            inputDirection.x = 0;
            inputDirection.y= -1;
            break;
      case "ArrowDown":
            console.log("ArrowDown"); 
            inputDirection.x = 0;
            inputDirection.y= 1;
            break;
      case "ArrowLeft":
            console.log("ArrowLeft");
            inputDirection.x = -1;
            inputDirection.y=0; 
            break;
      case "ArrowRight":
            console.log("ArrowRight");
            inputDirection.x = 1;
            inputDirection.y=0; 
            break;
      default:
           break;
  }


});