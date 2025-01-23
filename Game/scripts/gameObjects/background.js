import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Background extends BaseGameObject {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.x = 0;
        this.y = 600;
        this.name = "Background";
        // // Create three background layers
        // this.layer1 = new Image();
        // this.layer2 = new Image();
        // this.layer3 = new Image();

        // // Set image sources
        // this.layer1.src = './images/parallax-mountain-trees.png'; // Back layer (slowest)
        // this.layer2.src = './images/parallax-mountain-mountains.png'; // Middle layer
        // this.layer3.src = './images/tree.png'; // Front layer (fastest)

        // // Layer positions
        // this.x1 = 0;
        // this.x2 = 0;
        // this.x3 = 0;

        // // Parallax scroll factors (smaller = slower)
        // this.scrollFactor1 = 0.01;
        // this.scrollFactor2 = 0.05;
        // this.scrollFactor3 = 0.1;

        // // Previous player position for delta calculation
        // this.lastPlayerX = 0;
        // Set game over image
        this.setGameOverImage();
    }

    // update = function () {

    //     // Calculate the change in the player's position (deltaX)
    //     const deltaX = global.playerObject.x - this.lastPlayerX;

    //     // Log deltaX for debugging
    //     // console.log("Delta X:", deltaX);

    //     // Update last player position
    //     this.lastPlayerX = global.playerObject.x;

    //     // Update layer positions based on the delta and scroll factors
    //     this.x1 -= deltaX * this.scrollFactor1;
    //     this.x2 -= deltaX * this.scrollFactor2;
    //     this.x3 -= deltaX * this.scrollFactor3;

    //     // Wrap positions for seamless scrolling
    //     const layerWidth1 = this.layer1.width || global.canvas.width;
    //     const layerWidth2 = this.layer2.width || global.canvas.width;
    //     const layerWidth3 = this.layer3.width || global.canvas.width;

    //     const resetPosition = (x, layerWidth) => {
    //         if (x <= -layerWidth) return x + layerWidth;
    //         if (x >= layerWidth) return x - layerWidth;
    //         return x;
    //     };

    //     this.x1 = resetPosition(this.x1, layerWidth1);
    //     this.x2 = resetPosition(this.x2, layerWidth2);
    //     this.x3 = resetPosition(this.x3, layerWidth3);
    // }

    draw = function () {
        // const canvasWidth = global.canvas.width;
        // const canvasHeight = global.canvas.height;

        // // Draw each layer with tiling for seamless scrolling
        // global.ctx.drawImage(this.layer1, this.x1, 600, canvasWidth, canvasHeight);
        // global.ctx.drawImage(this.layer1, this.x1 + canvasWidth, 600, canvasWidth, canvasHeight);

        // global.ctx.drawImage(this.layer2, this.x2, 600, canvasWidth, canvasHeight);
        // global.ctx.drawImage(this.layer2, this.x2 + canvasWidth, 600, canvasWidth, canvasHeight);

        // global.ctx.drawImage(this.layer3, this.x3, 600, canvasWidth, canvasHeight);
        // global.ctx.drawImage(this.layer3, this.x3 + canvasWidth, 600, canvasWidth, canvasHeight);
    };

    // Array of gameOver background images
    gameOverImages = [
        './images/gameOver/bathtub.png',
        './images/gameOver/clawMachine.png',
        './images/gameOver/lake.png',
        './images/gameOver/underTheWater.png',
        // './images/gameOver/beach.png',
        // './images/gameOver/anime.png',
        // './images/gameOver
    ];
    setGameOverImage() {
        document.getElementById("gameOverImage").src = this.gameOverImages[Math.floor(Math.random() * this.gameOverImages.length)];
    }
}

export { Background };