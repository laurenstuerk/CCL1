import { global } from "./global.js";
import { Block } from "../gameObjects/block.js";
import { Player } from "../gameObjects/player.js";
import { map1 } from "../maps/map1.js";
import { Monster } from "../gameObjects/monster.js";
import { Coin } from "../gameObjects/coin.js";
import { GrasBlock } from "../gameObjects/grasBlock.js";
import { Blocker } from "../gameObjects/blocker.js";
import { HolyBeer } from "../gameObjects/HolyBeer.js";


function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    // Track scroll post distance
    if (global.playerObject.x > global.ScrollPostRight) {
        const scrollPostDistance = global.playerObject.x - global.ScrollPostRight;
        global.camera.x = scrollPostDistance;
    }
    if (global.playerObject.y < global.ScrollPostTop && global.playerObject.y > 0) {
        const scrollPostDistance = global.ScrollPostTop - global.playerObject.y;
        global.camera.y = scrollPostDistance;
    }
    if (global.playerObject.y > global.ScrollPostBottom) {
        const scrollPostDistance = global.playerObject.y - global.ScrollPostBottom;
        global.camera.y = -scrollPostDistance;
    }

    global.ctx.save();
    global.ctx.translate(-global.camera.x, global.camera.y);
    // global.ctx.drawImage()

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }
    global.ctx.restore()

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    console.log("Game setup");
    new Coin(400, 500, 50, 50);
    new Monster(2200, 1100, 100, 100);
    new HolyBeer(2800, 1780, 92, 123);
    global.playerObject = new Player(300, 500, 65, 95);

    // Generate World Map
    for (let i = 0; i < map1.world.length; i++) {
        let innerArray = map1.world[i];
        for (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] === 1) {
                new Block(j * 100, i * 100, 100, 100);

            }
            if (innerArray[j] === 2) {
                new GrasBlock(j * 100, i * 100, 100, 100);
            }
            // if (innerArray[j] === 3) {
            //     new Coin(j * 100, i * 100, 100, 100);
            // }
            if (innerArray[j] === 4) {
                new Blocker(j * 100, i * 100, 100, 100);
            }
        }
    }

}

setupGame();
requestAnimationFrame(gameLoop);


/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    }
});


