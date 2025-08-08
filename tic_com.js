var title_game = document.getElementsByClassName('title')[0];
var class_game = document.getElementsByClassName('game')[0];
var turn_value = 'X';
var secondcolor = '#ffe100';
var squares = [];
var gameEnded = false;

function updateTitle() {
    title_game.innerHTML = `Turn <span>( ${turn_value} )</span>`;
}
updateTitle();

function end_game(num1, num2, num3, result) {
    gameEnded = true;
    title_game.innerHTML = `<span style="color:#ffe100">${result}</span>`;

    document.getElementById("item" + num1).style.background = "#000";
    document.getElementById("item" + num2).style.background = "#000";
    document.getElementById("item" + num3).style.background = "#000";

    let random = Math.floor(Math.random() * 3) + 1;

    if (random == 1) {
        document.body.innerHTML += `<img src="13881044701.gif" style="width: 100vw;height: 100vh;position: absolute;">`;
    } else if (random == 2) {
        class_game.innerHTML += `<img src="winner-2-16473.gif" style="border-radius: 50%;width: 100%; margin-top: 180px;position: absolute;top: 0;left: 0px;">`;
    } else {
        class_game.innerHTML += `<img src="winner-gif-1.gif" style="border-radius: 50%;width: 100%;position: absolute;top: 0;left: 0px;">`;
    }

    setInterval(() => { title_game.innerHTML += '.'; }, 1000);
    setTimeout(() => { location.reload(); }, 4000);
}

function checkWinner() {
    for (let i = 1; i < 10; i++) {
        squares[i] = document.getElementById('item' + i).innerHTML;
    }

    const winCases = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    for (let [a, b, c] of winCases) {
        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
            end_game(a, b, c, `${squares[a]} is Winner`);
            return true;
        }
    }

    if ([...Array(9).keys()].every(i => squares[i + 1] !== '')) {
        gameEnded = true;
        title_game.innerHTML = `<span style="color:${secondcolor}">X</span> & <span style="color:${secondcolor}">O</span> are balence`;
        for (let i = 1; i <= 9; i++) {
            document.getElementById('item' + i).style.background = "#999";
        }
    
        let random_end = Math.floor(Math.random() * 3) + 1;
        if (random_end == 1) {
            class_game.innerHTML += `<img src="2eedfb4c-a4b7-4a2d-8338-3742055fe1d1.gif" style="width: 100%;position: absolute;top: 50px;left: 0px;">`;
        } else if (random_end == 2) {
            class_game.innerHTML += `<img src="balance-3-14686.gif" style="border-radius: 50%;width: 100%;position: absolute;top: 180px;left: 0px;">`;
        } else {
            class_game.innerHTML += `<img src="bala.gif" style="border-radius: 50%;width: 100%;position: absolute;top: 50px;left: 0px;">`;
        }

        setTimeout(() => { location.reload(); }, 4000);
        return true;
    }

    return false;
}

function game(id) {
    var element = document.getElementById(id);

    if (!gameEnded && element.innerHTML === '') {
        element.innerHTML = turn_value;
        element.style.color = '#fff';
        if (!checkWinner()) {
            turn_value = 'O';
            updateTitle();
            setTimeout(computerPlay, 500);
        }
    }
}

function computerPlay() {
    if (gameEnded) return;

    let bestMove = getBestMove();
    if (bestMove !== null) {
        let item = document.getElementById('item' + bestMove);
        item.innerHTML = 'O';
        item.style.color = '#fff';
        if (!checkWinner()) {
            turn_value = 'X';
            updateTitle();
        }
    }
}

function getAvailableMoves(board) {
    return board.map((val, idx) => val === '' ? idx : null).filter(val => val !== null);
}

function minimax(board, depth, isMaximizing) {
    const winPatterns = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    for (let [a, b, c] of winPatterns) {
        if (board[a] && board[a] === board[b] && board[b] === board[c]) {
            if (board[a] === 'O') return 10 - depth;
            if (board[a] === 'X') return depth - 10;
        }
    }

    if (!board.includes('')) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i of getAvailableMoves(board)) {
            board[i] = 'O';
            let score = minimax(board, depth + 1, false);
            board[i] = '';
            bestScore = Math.max(score, bestScore);
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i of getAvailableMoves(board)) {
            board[i] = 'X';
            let score = minimax(board, depth + 1, true);
            board[i] = '';
            bestScore = Math.min(score, bestScore);
        }
        return bestScore;
    }
}

function getBestMove() {
    let board = [];
    for (let i = 1; i <= 9; i++) {
        let val = document.getElementById('item' + i).innerHTML;
        board.push(val === 'X' || val === 'O' ? val : '');
    }

    let bestScore = -Infinity;
    let move = null;

    for (let i of getAvailableMoves(board)) {
        board[i] = 'O';
        let score = minimax(board, 0, false);
        board[i] = '';
        if (score > bestScore) {
            bestScore = score;
            move = i + 1; // index + 1 = id of item
        }
    }

    return move;
}

window.onload = function () {
    if (turn_value === 'O') {
        computerPlay();
    }
};
