let randomHoverColor = false;

// Construct initial grid
window.onload = () => {
    constructGrid(8, randomHoverColor);
    addEvents();
};

function constructGrid(gridNum, randomColor) {
    // Reconstruct the grid, one was already created
    if (document.querySelector(".square") !== null){
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            square.parentNode.removeChild(square);
        });
    }

    let gridWidth = document.getElementsByClassName('grid')[0].offsetWidth;
    let gridHeight = document.getElementsByClassName('grid')[0].offsetHeight;

    let squareHeight = (gridHeight / gridNum) + "px";
    let squareWidth = (gridWidth / gridNum) + "px";

    // Create all squares and append to grid
    for (let i = 0; i < Math.pow(gridNum, 2); i++) {
        let grid = document.getElementsByClassName("grid")[0];
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
    let btn = document.querySelectorAll(".resetBtn")[0];
    btn.addEventListener("click", () => {
        let squares = document.querySelectorAll(".square");
        squares.forEach((square) => {
            randomHoverColor ? square.style.backgroundColor = getRandomColor() : square.style.backgroundColor = "white";
        });
    });

    // RANDOM COLOR Button
    btn = document.querySelectorAll(".randomColorBtn")[0];
    btn.addEventListener("click", () => {
        randomHoverColor ? randomHoverColor = false : randomHoverColor = true;
    });

    // GRID Slider
    let slider = document.querySelectorAll(".rangeSlider")[0];
    let sliderOutput = document.querySelectorAll(".sliderOutput")[0];
    slider.oninput = function() {
        sliderOutput.textContent = this.value;
    }

    slider.addEventListener("mouseup", () => {
        constructGrid(slider.value, randomHoverColor);
    });


}

function getRandomColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    return "rgb(" + x + "," + y + "," + z + ")";
}



