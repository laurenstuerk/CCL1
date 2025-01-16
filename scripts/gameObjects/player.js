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
        "remainingJumps": 1, // Allows double jump by default
        "maxJumps": 1        // Maximum number of jumps
    }
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 36,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };

    update = function() {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime
        if (this.yVelocityVelocity == 0) {
            // global.playerObject.switchCurrentSprites(this.animationData.firstSpriteIndex, this.animationData.firstSpriteIndex);
        }
        document.getElementById("PositionDisplay").innerHTML = "X:" + Math.floor(global.playerObject.x) + " Y:" + Math.floor(global.playerObject.y);

        const rect = global.canvas.getBoundingClientRect()
        document.getElementById("DisplayCanvasPosition").innerHTML = "Canvas X:" + Math.floor(rect.left) + " Canvas Y:" + Math.floor(rect.top);
        if (global.playerObject.x > 7000) {
            window.location.reload();
            
        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        console.log("Player created");
        // this.loadImages(["../images/player.png"]);
        this.loadImagesFromSpritesheet("images/fullCharacterSpriteSheet.png", 37, 1);
        this.switchCurrentSprites(0, 3);
    }
}

export {Player}