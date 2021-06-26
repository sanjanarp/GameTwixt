
let player = "X";
let score = {X:0, O:0};
const winCombo = [[0,1,2], [3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
const cells = document.querySelectorAll(".cell");

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

startGame();

function startGame(){
    const scoreX = document.getElementById('scoreX');
    const scoreO = document.getElementById('scoreO');
    scoreX.innerHTML = `Player X score: ${score.X}`;
    scoreO.innerHTML = `Player O score: ${score.O}`;
    cells.forEach(cell => cell.innerText="");
}


function handleClick(e) {
    if(e.target.innerText=== ""){
   e.target.innerText = player;  
   checkWinner();
   switchPlayer();
    }
}

function checkWinner() {
   const matched = winCombo.some(combo => 
        combo.every((comboIndex) => 
         cells[comboIndex].innerText === player
           )     
    );
    if(matched){
        alert(`Player ${player} Won!!`);
        player === "X"? score.X++:score.O++;
      
        startGame();
    } else{
        const cellsArray = Array.from(cells)
        if(cellsArray.every(cell => cell.innerText != "")){
              alert("Match Draw!");
              startGame();
        }
       
    }
   
}


function switchPlayer() {
    player = player === 'X'?  'O': 'X';
}



