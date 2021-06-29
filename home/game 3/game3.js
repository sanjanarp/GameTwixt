
 score = 0;
cross = true;
document.onkeydown = function(e) {
    console.log("Key is: ", e.key)
    if(e.key=="ArrowUp"){
        bear = document.querySelector('.bear');
        bear.classList.add('animateBear');
        setTimeout(
            ()=> {bear.classList.remove('animateBear')
        }, 700);
    }
    // if(e.key=="ArrowRight"){
    //     bear = document.querySelector('.bear');
    //     bearx= parseInt(window.getComputedStyle(bear,null).getPropertyValue('left'));
    //     bear.style.left = bearx + 110 + "px";
    // }
    // if(e.key=="ArrowLeft"){
    //     bear = document.querySelector('.bear');
    //     bearx= parseInt(window.getComputedStyle(bear,null).getPropertyValue('left'));
    //     bear.style.left = (bearx - 110) + "px";
    // }
}


setInterval(() => {
    bear = document.querySelector('.bear');
    porcupine = document.querySelector('.porcupine');
    
    bx = parseInt(window.getComputedStyle(bear,null).getPropertyValue('left'));
    //we can write the name of element who's style we want to see by using getComputedStyle method
    //getPropertyvalue is to access the current property value (here :left value of bear )
    by = parseInt(window.getComputedStyle(bear,null).getPropertyValue('top'));
    px = parseInt(window.getComputedStyle(porcupine,null).getPropertyValue('left'));
    py = parseInt(window.getComputedStyle(porcupine,null).getPropertyValue('top'));

    offsetX = Math.abs(bx-px);
    offsetY = Math.abs(by-py);
    console.log(offsetX,offsetY)

    if(offsetX<100 && offsetY<60 ){
        score=0;
        updateScore(score);
       alert("Game Over!!");
        porcupine.classList.remove('obstaclePorcupine');
        board.innerHTML=" ";
        
    }
    else if(offsetX <40 && cross) {
        score+=1;
        updateScore(score);
        cross = false;
        setTimeout(
            () => {
                cross = true;
            }, 1000
        );
        
      
     }
   

}, 100);


function updateScore(score){
    scoreBoard.innerHTML ="Score: "+ score;

}