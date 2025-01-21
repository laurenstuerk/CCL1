import { global } from "./global.js";
import { Block } from "../gameObjects/block.js";
import { Player } from "../gameObjects/player.js";
import { map } from "../maps/map.js";
import { map1 } from "../maps/map1.js";
import { Monster } from "../gameObjects/monster.js";
import { Coin } from "../gameObjects/coin.js";
import { GrasBlock } from "../gameObjects/grasBlock.js";
import { Blocker } from "../gameObjects/blocker.js";
import { HolyBeer } from "../gameObjects/HolyBeer.js";
import { Background } from "../gameObjects/background.js";
import { DefenseTower } from "../gameObjects/defenseTower.js";
import { levelManager } from "../../../levelManager.js";

let background;

function gameLoop(totalRunningTime) {

    if (global.gameOver === true) {
        document.getElementById("gameOverScreen").style.display = "flex";
        global.playerObject.physicsData.terminalVelocity = 0;

        return;
    }

    background.update();
    background.draw(global.ctx);

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

    filterVisibleObjects();
    // console.log(global.visibleGameObjects)

    global.ctx.save();
    global.ctx.translate(-global.camera.x, global.camera.y);
    // global.ctx.drawImage()


    for (let i = 0; i < global.visibleGameObjects.length; i++) {
        const obj = global.visibleGameObjects[i];
        if (obj.active == true) {
            obj.storePositionOfPreviousFrame();
            obj.update();
            global.checkCollisionWithAnyOther(obj);
            obj.applyGravity();
            obj.draw();
        }
    }
    global.ctx.restore()
    requestAnimationFrame(gameLoop);
    // global.cancelAnimationFrame = requestAnimationFrame(gameLoop); // This keeps the gameLoop running indefinitely
}

function setupGame1() {
    background = new Background(0, 0, global.canvas.width, global.canvas.height);
    // Create Player
    global.playerObject = new Player(300, 500, 65, 95);

    console.log(global.playerObject.y);
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
            if (innerArray[j] === 3) {
                new Coin(j * 100, i * 100, 100, 100);
            }

        }
    }
    new Coin(400, 500, 50, 50);
    new Monster(2200, 1100, 100, 100);
    new HolyBeer(2800, 1780, 60, 68);
    new DefenseTower(3000, 1100, 130, 100);
    global.playerObject.yVelocity = 0;
    global.playerObject.physicsData.FallingVelocity = 0;
    global.playerObject.useGravityForces = true;


    global.gameOver = false;
    requestAnimationFrame(gameLoop);

}

function setupGame2() {
    global.playerObject = new Player(300, 500, 65, 95);

    // Generate World Map
    for (let i = 0; i < map.world.length; i++) {
        let innerArray = map.world[i];
        for (let j = 0; j < innerArray.length; j++) {
            // if (innerArray[j] === 1) {
            //     new Block(j * 100, i * 100, 100, 100);
            // }
            if (innerArray[j] === 2) {
                new GrasBlock(j * 100, i * 100, 100, 100);
            }
            // if (innerArray[j] === 3) {
            //     new Coin(j * 100, i * 100, 100, 100);
            // }

        }
    }
    new Coin(400, 500, 50, 50);
    new Monster(2200, 1100, 100, 100);
    new HolyBeer(2800, 1780, 60, 68);
    global.playerObject.yVelocity = 0;
    global.playerObject.physicsData.FallingVelocity = 0;
    global.playerObject.useGravityForces = true;


    global.gameOver = false;
    requestAnimationFrame(gameLoop);

}

document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById("gameOverScreen").style.display = "none";
    // setupGame1();
    window.location.reload();
});

document.getElementById("home").addEventListener("click", function () {
    window.location.href = "../index.html";
});

/* this is a fix that makes your game still runable after you left the tab/browser for some time: */
document.addEventListener("visibilitychange", () => {
    if (!document.hidden) {
        global.deltaTime = performance.now();
    }
});

function filterVisibleObjects() {
    global.visibleGameObjects = global.allGameObjects.filter(obj => {
        const dx = Math.abs(obj.x - global.playerObject.x);
        const dy = Math.abs(obj.y - global.playerObject.y);
        return dx <= 1000 && dy <= 1000;
    });
}

function playCutscene(cutsceneSrc) {
    const cutsceneElement = document.getElementById("cutscene");
    const cutsceneVideo = document.getElementById("cutsceneVideo");
    const gameContainer = document.getElementById("gameContainer");
    const skipButton = document.getElementById("skipCutscene");

    // Function to handle skipping
    function endCutScene() {
        cutsceneVideo.pause();
        cutsceneElement.style.display = "none";
        gameContainer.style.display = "flex";
        skipButton.style.display = "none";
        setupGame1();
    };

    // Add skip button event listener
    document.getElementById("endCutScene").onclick;

    cutsceneVideo.src = cutsceneSrc;
    cutsceneElement.style.display = "block";
    skipButton.style.display = "block";
    gameContainer.style.display = "none";

    cutsceneVideo.onended = () => {
        endCutScene();
        levelManager.cutSceneElement1Watched = true;
        console.log(levelManager.cutSceneElement1Watched);
    };
}

function levelSelect() {
    console.log(levelManager.cutSceneElement1Watched);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("level") === "1") {
        if (levelManager.cutSceneElement1Watched) {
            setupGame1();
        }
        else {
            playCutscene("../assets/cutscenes/cutscene1.mp4");

        }
    } else if (urlParams.get("level") === "2") {
        setupGame2();

    }

}


levelSelect();