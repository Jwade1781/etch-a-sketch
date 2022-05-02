
// Construct initial grid
window.onload = () =>{
    constructGrid(500);
};

function constructGrid(gridNum){
    for (let i = 0; i < gridNum; i++){
        let grid = document.getElementsByClassName("grid")[0];
        let square = document.createElement("div");
        square.setAttribute("class", "square");
        square.setAttribute("textContent", "square");
        grid.appendChild(square);
    }
}