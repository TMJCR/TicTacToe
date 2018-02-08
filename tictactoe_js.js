var squares = document.querySelectorAll(".square");
var onePlayer = document.querySelector("#onePlayer");
var noughtsOrCrosses = document.querySelector("#noughtsOrCrosses");
var noughts = document.querySelector("#noughts");
var crosses = document.querySelector("#crosses");
var playerSelection = "none";
var nougtsCrossesSelection = "none";
var playerArray = [];
var computerArray = [];
var playerMoveNumber = 0;
var computerStrategy = 0;
var movesPlayed = [];
var selection = "";
var win;
var player = "";
var winningCombinations = [
    [1, 2, 3],
    [1, 4, 7],
    [1, 5, 9],
    [2, 5, 8],
    [3, 5, 7],
    [3, 6, 9],
    [4, 5, 6],
    [7, 8, 9],
];

noughtsOrCrosses.style.display = "none";



function onePlayerMode() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            this.classList.remove("square");
            var playerChoice = (this.id.slice(-1));
            playerArray.push(playerChoice);
            playerArray.sort()
            playerMoveNumber += 1;
            movesPlayed.push(this.id.slice(-1));
            if (player === "crosses") {
                this.classList.add("crosses");
            } else {
                this.classList.add("noughts");
            }
            checkWinner(playerArray);
            if (player === "crosses") {
                document.body.style.backgroundImage = "url('background_noughts.png')";
            } else {
                document.body.style.backgroundImage = "url('background_crosses.png')";
            }
            if (win !==true) {                     
            setTimeout(computerTurn, 800);
            }
        })
    }
}


function computerTurn() {
    var playerTurn = (playerArray[playerMoveNumber - 1])
    if (computerStrategy === 0) {
        computerFirstTurn(playerTurn)
    } else {
        computerMove(playerTurn, computerStrategy);
    }
    checkWinner(computerArray);
    if (player === "crosses") {
        document.body.style.backgroundImage = "url('background_crosses.png')";
    } else {
        document.body.style.backgroundImage = "url('background_noughts.png')";
    }
}


function computerFirstTurn(playerTurn) {
    if (playerTurn == 1 || playerTurn == 3 || playerTurn == 7 || playerTurn == 9) {
        computerStrategy = 1;
        var squareSelection = "5";
    } else {
        if (playerTurn == 5) {
            computerStrategy = 2;
            var squareSelection = "9";
        } else {
            computerStrategy = 3;
            var computerSquare = document.querySelector("#square5");
            var squareSelection = "5";
        }
    }
    var FirstMove = "#square" + squareSelection;
    var computerSquare = document.querySelector(FirstMove);
    computerArray.push(squareSelection);
    computerArray.sort()
    movesPlayed.push(squareSelection);
    computerSquare.classList.add(computer);
}


function computerMove(playerTurn, computerStrategy) {
    var checkCompWin = compWin();
    if (typeof(checkCompWin) === "number") {
        var selectedMove = "#square" + checkCompWin;
        var computerSquare = document.querySelector(selectedMove);
        computerArray.push(computerSquare.id.slice(-1));
        computerArray.sort()
        movesPlayed.push(computerSquare.id.slice(-1));
        computerSquare.classList.add(computer);
        return;
    }
    var move = blockWinner();
    if (move !== undefined) {
        var selectedMove = "#square" + move;
    } else {
        var move = chooseSquare();
        var selectedMove = "#square" + move;
    }
    var computerSquare = document.querySelector(selectedMove);
    computerArray.push(computerSquare.id.slice(-1));
    computerArray.sort()
    movesPlayed.push(computerSquare.id.slice(-1));
    computerSquare.classList.add(computer);
}


function blockWinner() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var combination = winningCombinations[i];
        var winningArray = [];
        var decisionArray = [];
        for (var j = 0; j < combination.length; j++) {
            var grid = combination[j];
            for (var u = 0; u < playerArray.length; u++) {
                var user = playerArray[u];
                if (user == grid) {
                    winningArray.push(playerArray[u]);
                    decisionArray.push(j);
                }
                if (winningArray.length > 1) {
                    for (var w = 0; w <= 2; w++) {
                        if ((decisionArray.includes(w)) === false) {
                            var decision = combination[w];
                        }
                    }
                    if ((movesPlayed.includes("" + decision + "")) == false) {
                        return decision;
                    }
                }
            }
        }
    }
    return undefined;
}

function chooseSquare() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var combination = winningCombinations[i];
        var winningArray = [];
        var decisionArray = [];
        for (var j = 0; j < combination.length; j++) {
            var grid = combination[j];
            for (var u = 0; u < computerArray.length; u++) {
                var user = computerArray[u];
                if (user == grid) {
                    winningArray.push(computerArray[u]);
                    decisionArray.push(j);
                }
                if (winningArray.length > 1) {
                    for (var w = 0; w <= 2; w++) {
                        if ((decisionArray.includes(w)) === false) {
                            var decision = combination[w];
                        }
                    }
                    if ((movesPlayed.includes("" + decision + "")) == false) {
                        return decision;
                    } else {
                        var orderOfMoves = [1, 3, 7, 9, 2, 4, 6, 8, 5]
                        for (var o = 0; o < orderOfMoves.length; o++) {
                            if ((movesPlayed.includes("" + orderOfMoves[o] + "")) == false) {
                                return orderOfMoves[o];
                            }
                        }
                    }
                } else {
                    var orderOfMoves = [1, 3, 7, 9, 2, 4, 6, 8, 5]
                    for (var m = 0; m < orderOfMoves.length; m++) {
                        if ((movesPlayed.includes("" + orderOfMoves[m] + "")) == false) {
                            return orderOfMoves[m];
                        }
                    }
                }
            }
        }
    }

}

function compWin() {
    for (var i = 0; i < winningCombinations.length; i++) {
        var combination = winningCombinations[i];
        var winningArray = [];
        var decisionArray = [];
        for (var j = 0; j < combination.length; j++) {
            var grid = combination[j];
            for (var u = 0; u < computerArray.length; u++) {
                var user = computerArray[u];
                if (user == grid) {
                    winningArray.push(computerArray[u]);
                    decisionArray.push(j);
                }
                if (winningArray.length > 1) {
                    for (var w = 0; w <= 2; w++) {
                        if ((decisionArray.includes(w)) === false) {
                            var decision = combination[w];
                        }
                    }
                    if ((movesPlayed.includes("" + decision + "")) == false) {
                        var winningMove = decision;
                    } else {
                        decision = "nothing";
                    }
                    return decision;
                }
            }
        }
    }
}




function checkWinner(array) {
    if (array.length > 2) {
        for (var i = 0; i < winningCombinations.length; i++) {

            var combination = winningCombinations[i];
            var winningArray = [];

            for (var j = 0; j < combination.length; j++) {
                var grid = combination[j];
                for (var u = 0; u < array.length; u++) {
                    var user = array[u];
                    if (user == grid) {
                        winningArray.push(array[u]);
                    } else {}
                    if (winningArray.length > 2) {
                        for (var w = 0; w < squares.length; w++) {
                            squares[w].classList.add("win");
                            win=true;
                        }
                        setTimeout(resetGame, 800);
                        return;
                    }
                }
            }

        }
    }
    if (movesPlayed.length===9){
    win=true;
    setTimeout(resetGame, 800);
    return;
}
}



for (var i = 0; i < squares.length; i++) {
    squares[i].addEventListener("click", function() {
        onePlayer.classList.add("win");
    });
}


function addShakeNoughtsCrosses() {
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            noughts.classList.add("win");
            crosses.classList.add("win");
        });
    };
}


onePlayer.addEventListener("click", function() {
    this.classList.add("selected");
    noughtsOrCrosses.style.display = "block";
    addShakeNoughtsCrosses();
    onePlayerMode()
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            onePlayer.classList.remove("win");
        });
    }
});


noughts.addEventListener("click", function() {
    document.body.style.backgroundImage = "url('background_noughts.png')";
    this.classList.add("selected");
    crosses.classList.remove("selected");
    player = "noughts";
    computer = "crosses";
    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            noughts.classList.remove("win");
            crosses.classList.remove("win");

        });
    }
});

crosses.addEventListener("click", function() {
    document.body.style.backgroundImage = "url('background_crosses.png')";
    this.classList.add("selected");
    noughts.classList.remove("selected");
    player = "crosses";
    computer = "noughts";

    for (var i = 0; i < squares.length; i++) {
        squares[i].addEventListener("click", function() {
            noughts.classList.remove("win");
            crosses.classList.remove("win");
        });
    }
});


function resetGame(){
    for (var i = 0; i < squares.length; i++) {
        squares[i].classList.remove("noughts");
        squares[i].classList.remove("crosses");
        squares[i].classList.add("square");
        squares[i].classList.remove("win");             
}
playerArray = [];
computerArray = [];
playerMoveNumber = 0;
computerStrategy = 0;
movesPlayed = [];
selection = "";
winningArray=[];
win=false;
return;

}