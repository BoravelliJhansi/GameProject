let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newBtn = document.querySelector("#new-btn"); // Corrected selector for new button

let turnO = true; // true for x, false for o
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            box.innerText = turnO ? "O" : "X";
            box.disabled = true;
            if (checkWinner()) {
                setTimeout(() => alert(`${turnO ? "O" : "X"} wins!`), 100);
            } else if ([...boxes].every(box => box.innerText !== "")) {
                setTimeout(() => alert("It's a draw!"), 100);
            }
            turnO = !turnO; // Switch turns
        }
    });
});

resetBtn.addEventListener("click", () => {
    resetGame();
});

newBtn.addEventListener("click", () => {
    resetGame();
});

const resetGame = () => {
    boxes.forEach(box => {
        box.innerText = "";
        box.disabled = false;
    });
    turnO = true; // Reset turn
};

const checkWinner = () => {
    const winner = winPatterns.find(pattern => {
        const [a, b, c] = pattern;
        return boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText;
    });

    if (winner) {
        const winningPlayer = boxes[winner[0]].innerText; // Get the winning player's symbol (X or O)
        alert("Congratulations, " + winningPlayer + " ! You win!"); // Display the winning message
        document.winner = winningPlayer; // Store the winner if needed
        return true; // Indicate that there is a winner
    }
    return false; // No winner found
};

// Example of how to call checkWinner after a move
const makeMove = (index) => {
    if (!boxes[index].innerText) {
        boxes[index].innerText = turnO ? "O" : "X"; // Set the current player's symbol
        if (checkWinner()) {
            // Game over, winner found
            // Additional logic can be added here if needed
        } else {
            turnO = !turnO; // Switch turns
        }
    }
};