import { BaseGameObject } from "./baseGameObject.js";
import { global } from "../modules/global.js";

class Block extends BaseGameObject {
    name = "Block";
    xVelocity = 0;
    yVelocity = 0;


    blockGravityForces = true;

    reactToCollision = function (collidingObject){
        // console.log(collidingObject.previousX);
        // console.log(collidingObject.previousY);
        if (collidingObject.name == "Player") {
            console.log("Block collided with Player");
            collidingObject.x = collidingObject.previousX;
            collidingObject.y = collidingObject.previousY;
        }
    }

    loadImages = function (imageSources) {
        /* first load images from path */

        for (let i = 0; i < imageSources.length; i++) {
            let image = new Image();
            image.src = "../images/stone.png";

            /* after images have been loaded, they are added to an array that consists of each single sprite for our animation */
            this.animationData.animationSprites.push(image);
        }

    };

    // draw = function() {
    //     global.ctx.fillStyle = "black";
    //     global.ctx.fillRect(this.x, this.y, this.width, this.height);
    // };

    constructor(x, y, width, height) {
        super(x, y, width, height);  
        this.loadImages(["./images/stone.png"]);      
    }
}

export {Block}