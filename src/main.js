let randomHoverColor = false;
let mute = true;

const RANDOM_COLOR_TEXT_MAP = {
    false: "Black & White",
    true: "Random Color"
};

const MUTE_TEXT_MAP = {
    false: "Sound On",
    true: "Sound Off"
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
    if (document.querySelector(".square") !== null) {
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
        randomColor ? color = getRandomColor() : color = "white";
        square.style.backgroundColor = color;
        square.style.height = squareHeight;
        square.style.width = squareWidth;

        square.addEventListener("mouseover", () => {
            randomHoverColor ? square.style.backgroundColor = getRandomColor() : square.style.backgroundColor = "black";
        });

        grid.appendChild(square);
    }
}

function addEvents() {
    const resetBtnEvent = () => {
        let resetBtn = document.querySelector(".resetBtn");
        resetBtn.addEventListener("click", () => {

            let squares = document.querySelectorAll(".square");
            squares.forEach((square) => {
                randomHoverColor ? square.style.backgroundColor = getRandomColor() : square.style.backgroundColor = "white";
            });

            const ETCH_SKETCH = document.querySelector(".etchSketch");
            const ANIMATION_NAME = "shakeAnimation";

            ETCH_SKETCH.classList.add(ANIMATION_NAME);
            ETCH_SKETCH.addEventListener("webkitAnimationEnd", () => {
                ETCH_SKETCH.classList.remove(ANIMATION_NAME);
            });
        });
    }

    const randomColorBtnEvent = () => {
        let colorBtn = document.querySelector(".randomColorBtn");
        colorBtn.addEventListener("click", () => {
            (randomHoverColor) ? randomHoverColor = false : randomHoverColor = true;
            colorBtn.textContent = RANDOM_COLOR_TEXT_MAP[randomHoverColor];
        });
    };

    const muteBtnEvent = () => {
        muteBtn = document.querySelector(".muteBtn");
        muteBtn.addEventListener("click", () => {
            music = document.querySelector(".music");
            if (mute){   
                mute = false;
                music.play();
            }
            else {
                mute = true;
                music.pause();
            }

            muteBtn.textContent = MUTE_TEXT_MAP[mute];
        })
    };

    const gridSliderEvent = () => {
        let slider = document.querySelector(".rangeSlider");
        let sliderOutput = document.querySelector(".sliderOutput");
        slider.oninput = function () {
            sliderOutput.textContent = this.value;
        }

        slider.addEventListener("mouseup", () => {
            constructGrid(slider.value, randomHoverColor);
        });
    }

    resetBtnEvent();
    randomColorBtnEvent();
    gridSliderEvent();
    muteBtnEvent();
}

function addDynamicStartingUI() {
    const createSlider = () => {
        // Grid Slider Selection
        const SLIDER = document.querySelector(".rangeSlider");
        const SLIDER_OUTPUT = document.querySelector(".sliderOutput");

        SLIDER.value = Math.sqrt(document.querySelectorAll(".square").length);
        SLIDER_OUTPUT.textContent = SLIDER.value;
    };

    const createColorBtnText = () => {
        // Random Color Button text
        const BTN = document.querySelector(".randomColorBtn");
        BTN.textContent = RANDOM_COLOR_TEXT_MAP[randomHoverColor];
    };



    const createMuteBtnText = () => {
        const BTN = document.querySelector(".muteBtn");
        mute ? BTN.textContent = MUTE_TEXT_MAP[true] : BTN.textContent = MUTE_TEXT_MAP[false];
    };

    const createBubbleBackground = () => {
        // background bubbles
        const CIRCLE_TOTAL = 50;
        const CIRCLE_MIN_MAX_VALUES = {
            "left": [0, 100],
            "width": [50, 75],
            "height": [50, 75],
            "animationDelay": [0, 5],
            "animationDuration": [3, 20]
        }

        const circleCreate = () => {
            let circle = document.createElement("li");
            let CIRCLES_CONTAINER = document.querySelector(".circles");

            let leftValue = ((Math.random() * CIRCLE_MIN_MAX_VALUES["left"][1]) + CIRCLE_MIN_MAX_VALUES["left"][0]) + "%;";
            let width = ((Math.random() * CIRCLE_MIN_MAX_VALUES["width"][1]) + CIRCLE_MIN_MAX_VALUES["width"][0]) + "px;";
            let height = ((Math.random() * CIRCLE_MIN_MAX_VALUES["height"][1]) + CIRCLE_MIN_MAX_VALUES["height"][0]) + "px;";
            let animationDelay = ((Math.random() * CIRCLE_MIN_MAX_VALUES["animationDelay"][1]) + CIRCLE_MIN_MAX_VALUES["animationDelay"][0]) + "s;";
            let animationDuration = ((Math.random() * CIRCLE_MIN_MAX_VALUES["animationDuration"][1]) + CIRCLE_MIN_MAX_VALUES["animationDuration"][0]) + "s;";

            circle.classList.add("circle");
            circle.style.cssText =
                "left: " + leftValue +
                "width:" + width +
                "height:" + height +
                "animation-delay:" + animationDelay +
                "animation-duration:" + animationDuration;

            CIRCLES_CONTAINER.appendChild(circle);
            circle.addEventListener("mouseover", function popCircle() {
                console.log("pop")
                let audio = document.createElement("audio");
                audio.classList.add("popAudio");
                audio.src = "../data/sound/popEffect.wav";
                document.body.appendChild(audio);
                CIRCLES_CONTAINER.removeChild(circle);
                audio.muted = true;
                audio.play();
                audio.onended = () => {
                    document.body.removeChild(audio);
                    circleCreate(); // Replace the circle that was just popped
                }
            });
        }

        for (let i = 0; i < CIRCLE_TOTAL; i++) {
            circleCreate();
        }
    }

    createSlider();
    createColorBtnText();
    createMuteBtnText();
    createBubbleBackground();

}

function getRandomColor() {
    return "rgb(" + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + "," + Math.floor(Math.random() * 256) + ")";
}



