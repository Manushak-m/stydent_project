document.addEventListener('DOMContentLoaded', () => {
    initGame();
    
    // Վերսկսել խաղը կոճակով
    document.getElementById('restart').addEventListener('click', initGame);
});

function initGame() {
    // Մաքրել խաղադաշտը
    const gameBoard = document.getElementById('game');
    gameBoard.innerHTML = '';
    
    // Ստեղծել խաղի վանդակները
    for (let i = 0; i < 9; i++) {
        const block = document.createElement('div');
        block.className = 'block';
        block.dataset.index = i;
        gameBoard.appendChild(block);
    }
    
    let hod = 0;
    let gameOver = false;
    
    // Սեղմելու դեպքում խաղի տրամաբանությունը
    gameBoard.onclick = function(event) {
        if (gameOver) return;
        
        const target = event.target;
        if (target.className === 'block' && !target.innerHTML) {
            if (hod % 2 === 0) {
                target.innerHTML = 'X';
                target.classList.add('x');
            } else {
                target.innerHTML = 'O';
                target.classList.add('o');
            }
            hod++;
            
            // Ստուգել հաղթողին
            const winner = checkWinner();
            if (winner) {
                gameOver = true;
                setTimeout(() => {
                    if (winner === 'draw') {
                        alert('Խաղն ավարտվեց ոչ-ոքի!');
                    } else {
                        alert(`"${winner}"-երը հաղթեցին!`);
                    }
                }, 100);
            }
        }
    };
}

function checkWinner() {
    const blocks = document.getElementsByClassName('block');
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // հորիզոնական
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // ուղղահայաց
        [0, 4, 8], [2, 4, 6]             // անկյունագծով
    ];
    
    // Ստուգել հաղթող համակցությունները
    for (const pattern of patterns) {
        const [a, b, c] = pattern;
        if (blocks[a].innerHTML && 
            blocks[a].innerHTML === blocks[b].innerHTML && 
            blocks[a].innerHTML === blocks[c].innerHTML) {
            
            // Ընդգծել հաղթող համակցությունը
            blocks[a].style.backgroundColor = '#2ecc71';
            blocks[b].style.backgroundColor = '#2ecc71';
            blocks[c].style.backgroundColor = '#2ecc71';
            
            return blocks[a].innerHTML;
        }
    }
    
    // Ստուգել ոչ-ոքի
    let isDraw = true;
    for (let i = 0; i < blocks.length; i++) {
        if (!blocks[i].innerHTML) {
            isDraw = false;
            break;
        }
    }
    
    if (isDraw) return 'draw';
    return null;
}