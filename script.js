let boxes = document.querySelectorAll(".box")
let reset = document.querySelector(".reset")
let win = document.querySelector("h1")
let turn = true
let winPattern = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
]

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn) {
            box.innerText = "X"
            box.setAttribute("aria-label", "X");
            turn = false
        } else {
            box.innerText = "O"
            box.setAttribute("aria-label", "O");
            turn = true
        }
        box.disabled = true
        checkWinner();
    });
});

reset.addEventListener("click", () => {
    boxes.forEach(box => {
        box.innerText = ""
        box.disabled = false
    });
    turn = true
    win.innerText = "Tic Tac Toe"
    reset.innerText = "Reset Game"
    win.classList.remove("winner");
});

const checkWinner = () => {
    let isTie = true
    for (let pattern of winPattern) {
        let pos1 = boxes[pattern[0]].innerText
        let pos2 = boxes[pattern[1]].innerText
        let pos3 = boxes[pattern[2]].innerText

        if (pos1 != "" && pos2 != "" && pos3 != "") {
            if (pos1 === pos2 && pos2 === pos3) {
                disableBoxes();
                showWinner(pos1)
                return
            }
        }
    }

    boxes.forEach(box => {
        if (box.innerText === "") {
            isTie = false;
        }
    });

    if (isTie) {
        showWinner("No one, it's a tie!");
    }
}

const disableBoxes = () => {
    boxes.forEach(box => box.disabled = true);
}

const showWinner = (winner) => {
    win.classList.add("winner")
    win.innerText = `Winner is ${winner}`
    win.classList.remove("hide")
    if (winner === "No one, it's a tie!") {
        reset.innerText = "Reset Game"
    }
    else {
        reset.innerText = "New Game"
    }
}

