import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class ovBlock extends BaseGameObject {
    name = "ovBlock";
    xVelocity = 0;
    yVelocity = 0;


    blockGravityForces = true;

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        this.loadImages(["./images/rStone.png"]);      
    }
}

export { ovBlock }