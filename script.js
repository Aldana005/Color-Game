const squares = document.querySelectorAll(".square");
const colorDisplay = document.getElementById("colorDisplay");
const messageDisplay = document.getElementById("message");
const h1 = document.querySelector("h1");
const resetButton = document.getElementById("reset");
const modeButtons = document.querySelectorAll(".mode");

let numSquares = 6;
let colors = [];
let pickedColor;

init();

function init() {
    setupModeButtons();
    setupSquares();
    reset();
}

function setupModeButtons() {
    modeButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            modeButtons.forEach(b => b.classList.remove("selected"));
            this.classList.add("selected");
            numSquares = this.textContent === "Fácil" ? 3 : 6;
            reset();
        });
    });
}

function setupSquares() {
    squares.forEach(square => {
        square.addEventListener("click", function () {
            const clickedColor = this.style.backgroundColor;

            if (clickedColor === pickedColor) {
                messageDisplay.textContent = "¡Correcto!";
                changeColors(clickedColor);
                h1.style.backgroundColor = clickedColor;
                resetButton.textContent = "Jugar de nuevo";
            } else {
                this.style.opacity = "0";
                messageDisplay.textContent = "Intenta otra vez";
            }
        });
    });
}

function reset() {
    colors = generateRandomColors(numSquares);
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    messageDisplay.textContent = "";
    resetButton.textContent = "Nuevos Colores";
    
    
    h1.style.backgroundColor = "#E56B6F"; 
    

    squares.forEach((sq, i) => {
        if (colors[i]) {
            sq.style.display = "block";
            sq.style.backgroundColor = colors[i];
            sq.style.opacity = "1"; 
        } else {
            sq.style.display = "none";
        }
    });
}

resetButton.addEventListener("click", reset);

function changeColors(color) {
    squares.forEach(sq => {
        sq.style.backgroundColor = color;
        sq.style.opacity = "1";
    });
}

function pickColor() {
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    let arr = [];
    for (let i = 0; i < num; i++) {
        arr.push(randomColor());
    }
    return arr;
}

function randomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}