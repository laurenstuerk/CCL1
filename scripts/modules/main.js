import { global } from "./global.js";
import { Block } from "../gameObjects/block.js";
import { Player } from "../gameObjects/player.js";
import { MoveTrigger } from "../gameObjects/moveTrigger.js";
// import { MoveTriggerY } from "../gameObjects/moveTriggerY.js";
import { Floor } from "../gameObjects/floor.js";
import { map } from "./map.js";


function gameLoop(totalRunningTime) {
    global.deltaTime = totalRunningTime - global.prevTotalRunningTime; // Time in milliseconds between frames
    global.deltaTime /= 1000; // Convert milliseconds to seconds for consistency in calculations
    global.prevTotalRunningTime = totalRunningTime; // Save the current state of "totalRunningTime", so at the next call of gameLoop (== next frame) to calculate deltaTime again for that next frame.
    global.ctx.clearRect(0, 0, global.canvas.width, global.canvas.height); // Completely clear the canvas for the next graphical output 

    for (var i = 0; i < global.allGameObjects.length; i++) { //loop in the (game)loop -> the gameloop is continous anyways.. and on every cylce we do now loop through all objects to execute several operations (functions) on each of them: update, draw, collision detection, ...
        if (global.allGameObjects[i].active == true) {
            global.allGameObjects[i].storePositionOfPreviousFrame();
            global.allGameObjects[i].update();
            global.checkCollisionWithAnyOther(global.allGameObjects[i]);
            global.allGameObjects[i].applyGravity();
            global.allGameObjects[i].draw();
        }
    }

    requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame() {
    console.log("Game setup");
    global.playerObject = new Player(300, 500 , 65, 95);
    // new Floor(0, 660, 9000, 40);
    // new Block(10, 300, 300, 50);
    // new Block(600, 300, 50, 500);
    global.leftMoveTrigger = new MoveTrigger(200, -300, 20, 1500, 100);
    global.rightMoveTrigger = new MoveTrigger(800, -300, 20, 1500, -100);
    // global.topMoveTrigger = new MoveTriggerY(200, 350, 600, 20);
    // global.bottomMoveTrigger = new MoveTriggerY(200, 650, 600, 20);

    // new BlockObject(300, 400, 50, 50);
    // setup your game here - means: Create instances of the GameObjects that belong to your game.
    // e.g.: 
    /*    
                global.playerObject = new PacMan(200, 300, 60, 60);
                new Wall(0, 0, 100, 100);
                new Candy(100, 100, 100, 100);
    }*/

    // Generate World Map
    console.log(map.world);
    for (let i= 0; i <map.world.length; i++) {
        let innerArray = map.world[i];
        for  (let j = 0; j < innerArray.length; j++) {
            if (innerArray[j] !== 0) {
                new Block(j * 50, i * 50, 50, 50);

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


