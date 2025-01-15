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
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.08,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 20,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        if (this.xVelocity == 0) {
            // global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        console.log("Player created");
        // this.loadImages(["../images/player.png"]);
        this.loadImagesFromSpritesheet("images/CharacterSpriteSheet.png", 21, 1);
        this.switchCurrentSprites(0, 3);
    }
}

export {Player}