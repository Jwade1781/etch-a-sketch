let randomHoverColor = false;
const RANDOM_COLOR_TEXT_MAP = {
    false: "Black & White",
    true: "Random Color"
};

// Construct initial grid
window.onload = () => {
    const STARTING_GRID_NUM = 8;
    constructGrid(STARTING_GRID_NUM, randomHoverColor);
    addEvents();
    addDynamicStartingUI();
};

function constructGrid(gridNum, randomColor) {
    // Reconstruct the grid, one was already created
    if (document.querySelector(".square") !== null){
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.parentNode.removeChild(square);
        });
    }

    let gridWidth = document.querySelector('.grid').offsetWidth;
    let gridHeight = document.querySelector('.grid').offsetHeight;

    let squareHeight = (gridHeight / gridNum) + "px";
    let squareWidth = (gridWidth / gridNum) + "px";

    // Create all squares and append to grid
    for (let i = 0; i < Math.pow(gridNum, 2); i++) {
        let grid = document.querySelector(".grid");
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        randomColor? color = getRandomColor() : color = "white";
        square.style.backgroundColor = color;
        square.style.height = squareHeight;
        square.style.width = squareWidth;

        square.addEventListener("mouseover", () => {
            randomHoverColor ? square.style.backgroundColor = getRandomColor() : square.style.backgroundColor = "black";
        });

        grid.appendChild(square);
    }
}

function addEvents(){
    // RESET Button
    let btn = document.querySelector(".resetBtn");
    btn.addEventListener("click", () => {

        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            randomHoverColor ? square.style.backgroundColor = getRandomColor() : square.style.backgroundColor = "white";
        });

        const ETCH_SKETCH  = document.querySelector(".etchSketch");
        const ANIMATION_NAME = "shakeAnimation";

        ETCH_SKETCH.classList.add(ANIMATION_NAME);
        ETCH_SKETCH.addEventListener("webkitAnimationEnd", () => {
            console.log("Transition End");
            ETCH_SKETCH.classList.remove(ANIMATION_NAME);
        });
    });

    // RANDOM COLOR Button
    btn = document.querySelector(".randomColorBtn");
    btn.addEventListener("click", () => {
        (randomHoverColor) ? randomHoverColor = false : randomHoverColor = true;
        btn.textContent = RANDOM_COLOR_TEXT_MAP[randomHoverColor];

    });

    // GRID Slider
    let slider = document.querySelector(".rangeSlider");
    let sliderOutput = document.querySelector(".sliderOutput");
    slider.oninput = function() {
        sliderOutput.textContent = this.value;
    }

    slider.addEventListener("mouseup", () => {
        constructGrid(slider.value, randomHoverColor);
    });
}

function addDynamicStartingUI(){
    const SLIDER = document.querySelector(".rangeSlider");
    const SLIDER_OUTPUT = document.querySelector(".sliderOutput");

    SLIDER.value = Math.sqrt(document.querySelectorAll(".square").length);
    SLIDER_OUTPUT.textContent = SLIDER.value;


    // Random Color Button text
    const BTN = document.querySelector(".randomColorBtn");
    BTN.textContent = RANDOM_COLOR_TEXT_MAP[randomHoverColor];

}

function getRandomColor() {
    return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}



