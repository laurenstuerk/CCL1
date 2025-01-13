import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;

    physicsData = {
        "fallVelocity": 10,
        "terminalVelocity": 60,
        "jumpForce": 0,
        "prevFallingVelocity": 10,
        "jumpForceDecay": 2,
        "isGrounded": false,
        "remainingJumps": 2, // Allows double jump by default
        "maxJumps": 2        // Maximum number of jumps
    }

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        // if (this.xVelocity == 0) {
        //     global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        // }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        console.log("Player created");
        // this.loadImages(["../images/player.png"]);
        this.loadImagesFromSpritesheet("../images/player.png", 1, 1);
    }
}

export {Player}