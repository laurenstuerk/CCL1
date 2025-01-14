import { global } from "../modules/global.js";
import { BaseGameObject } from "./baseGameObject.js";

class Enemy extends BaseGameObject {
    xVelocity = 0;
    yVelocity = -200;
    name = "Enemy";
    blockGravityForces = true;

    
}

export {Enemy}