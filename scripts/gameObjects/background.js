import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Background extends BaseGameObject {
    constructor() {
        super();
        // Create three background layers
        this.layer1 = new Image();
        this.layer2 = new Image();
        this.layer3 = new Image();

        // Set image sources
        this.layer1.src = './images/parallax-mountain-trees.png'; // Back layer (slowest)
        this.layer2.src = './images/parallax-mountain-mountains.png'; // Middle layer
        this.layer3.src = './images/tree.png'; // Front layer (fastest)

        // Layer positions
        this.x1 = 0;
        this.x2 = 0;
        this.x3 = 0;

        // Parallax scroll factors (smaller = slower)
        this.scrollFactor1 = 0.2;
        this.scrollFactor2 = 0.4;
        this.scrollFactor3 = 0.8;

        // Previous player position for delta calculation
        this.lastPlayerX = 0;
    }

    update() {
        // Calculate position change
        const deltaX = global.playerObject.x - this.lastPlayerX;
        this.lastPlayerX = global.playerObject.x;

        // Update layer positions based on player movement
        this.x1 -= deltaX * this.scrollFactor1;
        this.x2 -= deltaX * this.scrollFactor2;
        this.x3 -= deltaX * this.scrollFactor3;

        // Reset positions for infinite scrolling
        const resetPosition = (x, width) => {
            if (x <= -width) return x + width;
            if (x >= width) return x - width;
            return x;
        };

        this.x1 = resetPosition(this.x1, global.canvas.width);
        this.x2 = resetPosition(this.x2, global.canvas.width);
        this.x3 = resetPosition(this.x3, global.canvas.width);
    }

    draw = function () {
        let sprite = this.getNextSprite();
        global.ctx.drawImage(sprite, this.x, this.y, this.width, this.height);
    };


    draw = function () {
        global.ctx.drawImage(this.layer1, this.x1, 100, global.canvas.width, global.canvas.width);
        global.ctx.drawImage(this.layer2, this.x2 + global.canvas.width, 1200, 720, 720);
        global.ctx.drawImage(this.layer3, this.x3, 100, global.canvas.width, global.canvas.width);
    };


}

export { Background };