import { global } from "./global.js";
import { Block } from "../gameObjects/block.js";
import { Player } from "../gameObjects/player.js";
import { map1 } from "../maps/map1.js";
import { map2 } from "../maps/map2.js";
import { map3 } from "../maps/map3.js";
import { Monster } from "../gameObjects/monster.js";
import { Coin } from "../gameObjects/coin.js";
import { GrasBlock } from "../gameObjects/grasBlock.js";
import { Blocker } from "../gameObjects/blocker.js";
import { HolyBeer } from "../gameObjects/HolyBeer.js";
import { Background } from "../gameObjects/background.js";
import { DefenseTowerL } from "../gameObjects/defenseTowerL.js";
import { Landmine } from "../gameObjects/landmine.js";
import { ovBlock } from "../gameObjects/ovBlock.js";
import { Spike } from "../gameObjects/spikes.js";
import { DefenseTowerR } from "../gameObjects/defenseTowerR.js";
import { levelManager } from "../../../levelManager.js";
import { Gun } from "../gameObjects/gun.js";

let currentLevel = "1"; // 😀 Track the current level
const cutscenesPlayed = {}; // 😀 Track cutscenes played during the current instance

function resetLevel() {
    // 😀 Reset all game objects and visible elements for the level
    global.allGameObjects = [];
    global.visibleGameObjects = [];
    global.camera = { x: 0, y: 0 };

    // Restart the current level without altering player position unnecessarily
    if (currentLevel === "1") {
        setupGame1(true);
    } else if (currentLevel === "2") {
        setupGame2(true);
    } else if (currentLevel === "3") {
        setupGame3(true);
    }
}

function gameLoop(totalRunningTime) {

    if (global.gameOver === true) {
        document.getElementById("gameOverScreen").style.display = "flex";
        return;
    }
    if (global.levelComplete === true) {
        if (currentLevel === "1") {
            document.getElementById("levelCompleteScreen").style.display = "flex";
            new global.audio("./audio/level-passed.mp3");
            levelManager.level1Complete = true;
            return;
        } else if (currentLevel === "2") {
            levelManager.level2Complete = true;
            playCutscene("./cutScene/cutScene2.mp4");
            return;
        } else if (currentLevel === "3") {
            playCutscene("./cutScene/cutScene3.mp4");
            return;
        }
    }

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
    global.ctx.save();
    global.ctx.translate(-global.camera.x, global.camera.y);

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
}

function setupGame1(reset = false) {
    global.prevTotalRunningTime = performance.now();
    global.gameOver = false;
    currentLevel = "1"; // 😀 Set the current level

    new Background(0, 0, global.canvas.width, global.canvas.height);


    // Create Player
    global.playerObject = new Player(300, 500, 65, 95);
    global.playerObject.physicsData.maxJumps = 0;
    global.playerObject.canShoot = false;
    // Generate World Map
    for (let i = 0; i < map1.world.length; i++) {
        let innerArray = map1.world[i];
        for (let j = 0; j < innerArray.length; j++) {
            switch (innerArray[j]) {
                case 1:
                    new Block(j * 100, i * 100, 100, 100);
                    break;
                case 2:
                    new GrasBlock(j * 100, i * 100 - 25, 100, 125);
                    break;
                case 3:
                    new Coin(j * 100 + 25, i * 100 + 25, 50, 50);
                    break;
                case 4:
                    new Blocker(j * 100, i * 100, 100, 100);
                    break;
                case 5:
                    new Landmine(j * 100 + 25, i * 100 + 80, 50, 20);
                    break;
                case 6:
                    new Spike(j * 100, i * 100 + 60, 100, 40);
                    break;
                case 7:
                    new Monster(j * 100, i * 100, 100, 100);
                    break;
                case 8:
                    new DefenseTowerR(j * 100, i * 100, 100, 100);
                    break;
                case 9:
                    new HolyBeer(j * 100, i * 100, 100, 100);
                    break;
                case 10:
                    new DefenseTowerL(j * 100, i * 100, 100, 100);
                    break;
                case 11:
                    new ovBlock(j * 100, i * 100, 100, 100);
                    break;
                default:
                    break;
            }
        }
    }
    // new HolyBeer(4200, 2800, 60, 60);
    global.playerObject.yVelocity = 0;
    global.playerObject.physicsData.FallingVelocity = 0;
    global.playerObject.useGravityForces = true;


    global.gameOver = false;
    if (!reset) requestAnimationFrame(gameLoop);
}

function setupGame2(reset = false) {
    global.prevTotalRunningTime = performance.now();
    global.gameOver = false;
    currentLevel = "2"; // 😀 Set the current level
    new Background(0, 0, global.canvas.width, global.canvas.height);

    // Create Player
    global.playerObject = new Player(300, 500, 65, 95);
    global.playerObject.physicsData.maxJumps = 2;
    global.playerObject.canShoot = false;

    console.log(global.playerObject.y);
    // Generate World Map
    for (let i = 0; i < map2.world.length; i++) {
        let innerArray = map2.world[i];
        for (let j = 0; j < innerArray.length; j++) {
            switch (innerArray[j]) {
                case 1:
                    new Block(j * 100, i * 100, 100, 100);
                    break;
                case 2:
                    new GrasBlock(j * 100, i * 100 - 25, 100, 125);
                    break;
                case 3:
                    new Coin(j * 100 + 25, i * 100 + 25, 50, 50);
                    break;
                case 4:
                    new Blocker(j * 100, i * 100, 100, 100);
                    break;
                case 5:
                    new Landmine(j * 100 + 25, i * 100 + 80, 50, 20);
                    break;
                case 6:
                    new Spike(j * 100, i * 100 + 60, 100, 40);
                    break;
                case 7:
                    new Monster(j * 100, i * 100, 100, 100);
                    break;
                case 8:
                    new DefenseTowerR(j * 100, i * 100, 100, 100);
                    break;
                case 9:
                    new Gun(j * 100, i * 100, 100, 33);
                    break;
                case 10:
                    new DefenseTowerL(j * 100, i * 100, 100, 100);
                    break;
                case 11:
                    new ovBlock(j * 100, i * 100, 100, 100);
                    break;
                default:
                    break;
            }
        }
    }

    global.gameOver = false;
    if (!reset) requestAnimationFrame(gameLoop);
}

function setupGame3(reset = false) {
    global.prevTotalRunningTime = performance.now();
    global.gameOver = false;
    currentLevel = "3"; // 😀 Set the current level

    new Background(0, 0, global.canvas.width, global.canvas.height);


    global.playerObject = new Player(300, 500, 65, 95);
    global.playerObject.canShoot = true;
    global.playerObject.physicsData.maxJumps = 2;
    // Generate World Map
    for (let i = 0; i < map3.world.length; i++) {
        let innerArray = map3.world[i];
        for (let j = 0; j < innerArray.length; j++) {
            switch (innerArray[j]) {
                case 1:
                    new Block(j * 100, i * 100, 100, 100);
                    break;
                case 2:
                    new GrasBlock(j * 100, i * 100 - 25, 100, 125);
                    break;
                case 3:
                    new Coin(j * 100 + 25, i * 100 + 25, 50, 50);
                    break;
                case 4:
                    new Blocker(j * 100, i * 100, 100, 100);
                    break;
                case 5:
                    new Landmine(j * 100 + 25, i * 100 + 80, 50, 20);
                    break;
                case 6:
                    new Spike(j * 100, i * 100 + 60, 100, 40);
                    break;
                case 7:
                    new Monster(j * 100, i * 100, 100, 100);
                    break;
                case 8:
                    new DefenseTowerR(j * 100, i * 100, 100, 100);
                    break;
                case 10:
                    new DefenseTowerL(j * 100, i * 100, 100, 100);
                    break;
                case 11:
                    new ovBlock(j * 100, i * 100, 100, 100);
                    break;
                default:
                    break;
            }
        }
    }


    global.gameOver = false;
    if (!reset) requestAnimationFrame(gameLoop);
}

// 😀 Update restart button functionality
document.getElementById("restartButton").addEventListener("click", function () {
    document.getElementById("gameOverScreen").style.display = "none";
    requestAnimationFrame(gameLoop)
    resetLevel();
});

document.getElementById("home").addEventListener("click", function () {
    window.location.href = "../index.html";
});
document.getElementById("home1").addEventListener("click", function () {
    window.location.href = "../index.html";
});

document.getElementById("nextLevelBtn").addEventListener("click", function () {
    if (currentLevel === "1") {
        window.location.href = "./index.html?level=2";
    } else if (currentLevel === "2") {
        window.location.href = "./index.html?level=3";
    }
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
        return dx <= 1100 && dy <= 600;
    });
}

const cutsceneElement = document.getElementById("cutscene");
const cutsceneVideo = document.getElementById("cutsceneVideo");
const gameContainer = document.getElementById("gameContainer");
const skipButton = document.getElementById("skipCutscene");

function playCutscene(cutsceneSrc) {
    const cutsceneKey = cutsceneSrc.split("/").pop(); // 😀 Extract filename as key
    if (cutscenesPlayed[cutsceneKey]) return; // 😀 Skip if already played



    // Add skip button event listener
    document.getElementById("skipCutscene").addEventListener("click", function () {
        cutscenesPlayed[cutsceneKey] = true;
        endCutScene();
    });
    cutsceneVideo.src = cutsceneSrc;
    cutsceneElement.style.display = "block";
    skipButton.style.display = "block";
    gameContainer.style.display = "none";

    // Function to handle skipping
    function endCutScene() {
        cutsceneVideo.pause();
        if (currentLevel === "1") {
            cutsceneElement.style.display = "none";
            gameContainer.style.display = "flex";
            skipButton.style.display = "none";
            setupGame1();
        }
        else if (currentLevel === "2") {
            console.log("Level 2");
            cutsceneElement.style.display = "none";
            gameContainer.style.display = "flex";
            skipButton.style.display = "none";
            document.getElementById("levelCompleteScreen").style.display = "flex";
            new global.audio("./audio/level-passed.mp3");
        }
        else if (currentLevel === "3") {
            document.getElementById("levelCompleteImage").src = "./images/gameComplete.png";
            cutsceneElement.style.display = "none";
            gameContainer.style.display = "flex";
            skipButton.style.display = "none";
            document.getElementById("nextLevelBtn").style.display = "none";
            document.getElementById("levelCompleteScreen").style.display = "flex";
            new global.audio("./audio/level-passed.mp3");
        };
    }

    cutsceneVideo.onended = () => {
        cutscenesPlayed[cutsceneKey] = true; // 😀 Mark cutscene as played
        endCutScene();
    };
}

function levelSelect() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("level") === "1") {
        if (!cutscenesPlayed["CutScene1.mp4"]) {
            playCutscene("./cutScene/CutScene1.mp4");
        } else {
            setupGame1();
        }
    } else if (urlParams.get("level") === "2") {
        cutsceneElement.style.display = "none";
        gameContainer.style.display = "flex";
        skipButton.style.display = "none";
        setupGame2();
    } else if (urlParams.get("level") === "3") {
        cutsceneElement.style.display = "none";
        gameContainer.style.display = "flex";
        skipButton.style.display = "none";
        setupGame3();
    }
}


levelSelect();