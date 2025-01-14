const global = {};

global.canvas = document.querySelector("#canvas");
global.ctx = canvas.getContext("2d");
global.prevTotalRunningTime = 0;
global.deltaTime = 0;
global.allGameObjects = [];
global.playerObject = {};
global.backgroundShiftX = 0;
global.backgroundMaxShiftX = -100000;
global.backgroundShiftY = -1000;
global.backgroundMaxShiftY = 10000;
global.gravityForce = 9.8;
global.pixelToMeter = 100;
global.leftMoveTrigger;
global.rightMoveTrigger;
global.topMoveTrigger;
global.bottomMoveTrigger;

global.camera = {
    x: 0,
    y: 0,
}
global.ScrollPostRight = 300;
global.ScrollPostTop = 200;
global.ScrollPostBottom = 600;





global.getCanvasBounds = function () {
    let bounds = {
        "left": 0,
        "right": this.canvas.width,
        "top": 0,
        "bottom": this.canvas.height
    }
    return bounds;
}

global.checkCollisionWithAnyOther = function (givenObject) {

    for (let i = givenObject.index; i < global.allGameObjects.length; i++) {
        let otherObject = global.allGameObjects[i];
        if (otherObject.active == true) {
            let collisionHappened = this.detectBoxCollision(givenObject, otherObject);
            if (collisionHappened) {
                givenObject.reactToCollision(otherObject);
                otherObject.reactToCollision(givenObject);
            }
        }
    }
}


global.detectBoxCollision = function (gameObject1, gameObject2) {
    let box1 = gameObject1.getBoxBounds();
    let box2 = gameObject2.getBoxBounds();
    if (gameObject1 != gameObject2) {
        if (box1.top <= box2.bottom &&
            box1.left <= box2.right &&
            box1.bottom >= box2.top &&
            box1.right >= box2.left) {
            return true;
        }
    }
    return false;
}

// global.detectPlatformCollision = function (gameObject1, gameObject2) {
//     let box1 = gameObject1.getBoxBounds();
//     let box2 = gameObject2.getBoxBounds();
//     if (gameObject1 != gameObject2) {
//         if (box1.bottom >= box2.top) {
//             return true;
//         }
//     }
//     return false;
// }


export { global }