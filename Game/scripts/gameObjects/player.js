import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Player extends BaseGameObject {
    name = "Player";
    xVelocity = 0;
    yVelocity = 0;
    useGravityForces = true;
    canShoot = true;

    physicsData = {
        "fallVelocity": 10,
        "terminalVelocity": 60,
        "jumpForce": 0,
        "prevFallingVelocity": 10,
        "jumpForceDecay": 2,
        "isGrounded": false,
        "remainingJumps": 1, // Allows double jump by default
        "maxJumps": 2        // Maximum number of jumps
    }
    animationData = {
        "animationSprites": [],
        "timePerSprite": 0.1,
        "currentSpriteElapsedTime": 0,
        "firstSpriteIndex": 36,
        "lastSpriteIndex": 0,
        "currentSpriteIndex": 0
    };


    update = function () {
        this.x += this.xVelocity * global.deltaTime;
        this.y += this.yVelocity * global.deltaTime;
        

        document.getElementById("PositionDisplay").innerHTML = "X:" + Math.floor(global.playerObject.x) + " Y:" + Math.floor(global.playerObject.y);


        if (global.playerObject.x > 9000) {
            global.levelComplete = true;

        }
        if (global.playerObject.y > 3000) {
            global.gameOver = true;
            console.log("Game Over" + global.playerObject.y);

        }
    }

    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.loadImagesFromSpritesheet("images/fullCharacterSpriteSheet.png", 37, 1);
        this.switchCurrentSprites(0, 3);
    }
}

export { Player }