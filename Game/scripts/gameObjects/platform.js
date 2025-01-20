import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class PLatform extends BaseGameObject {
    name = "Platform";
    xVelocity = 0;
    yVelocity = 0;

    blockGravityForces = true;

    physicsData = {
        "fallVelocity": 0,
        "terminalVelocity": 53,
        "jumpForce": 0,
        "jumpForceDecay": 0,
    };

    draw = function() {
        global.ctx.fillStyle = "brown";
        global.ctx.fillRect(this.x, this.y, this.width, this.height);
    };

    constructor(x, y, width, height) {
        super(x, y, width, height);
        // //this.loadImages(["./images/apple.png"]);
        // this.loadImagesFromSpritesheet("./images/BODY_skeleton.png", 9, 4);
    }
}

export {PLatform}