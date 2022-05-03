
// Construct initial grid
window.onload = () =>{
    constructGrid(32);
};

function constructGrid(gridNum){

    let gridWidth = document.getElementsByClassName('grid')[0].offsetWidth;
    let gridHeight = document.getElementsByClassName('grid')[0].offsetHeight;

    let squareHeight = (gridHeight/gridNum) +"px";
    let squareWidth = (gridWidth/gridNum) + "px";

    // Create all squares and append to grid
    for (let i = 0; i < Math.pow(gridNum, 2); i++){
        let grid = document.getElementsByClassName("grid")[0];
        let square = document.createElement("div");
        square.setAttribute("class", "square");

        var x = Math.floor(Math.random() * 256);
        var y = Math.floor(Math.random() * 256);
        var z = Math.floor(Math.random() * 256);
        let color = "rgb(" + x + "," + y + "," + z + ")";
        square.style.backgroundColor = color;


        square.style.height = squareHeight;
        square.style.width = squareWidth;

        grid.appendChild(square);
    }

    const squares = document.querySelectorAll(".square");
    squares.forEach(square => {
        square.addEventListener("mouseover", () => {
            square.style.backgroundColor = "black";
        });
    });
}

