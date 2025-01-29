import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Background extends BaseGameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.x = 0;
        this.y = 600;
        this.name = "Background";
        this.setGameOverImage();
    }


    draw = function () {
    };

    // Array of gameOver background images
    gameOverImages = [
        './images/gameOver/bathtub.png',
        './images/gameOver/clawMachine.png',
        './images/gameOver/lake.png',
        './images/gameOver/underTheWater.png',
        './images/gameOver/forest.png',
        './images/gameOver/forest1.png',
        './images/gameOver/beer.png'
        // './images/gameOver/',
    ];
    setGameOverImage() {
        document.getElementById("gameOverImage").src = this.gameOverImages[Math.floor(Math.random() * this.gameOverImages.length)];
    }
}

export { Background };