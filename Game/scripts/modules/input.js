import { global } from "./global.js";
import { Projectile } from "../gameObjects/projectile.js";

let activeKey = null; // The key currently controlling movement
let fallbackKey = null; // The previous key to fall back to when activeKey is released

document.addEventListener("keydown", move);
document.addEventListener("keyup", stop);
window.addEventListener("mousedown", shoot);

function move(event) {
    const key = event.key;
    if (global.gameOver) return;

    // Check if the key pressed is a movement key
    if (key === "d" || key === "a") {
        if (activeKey !== key) {
            fallbackKey = activeKey; // Set the fallback key to the previously active key
            activeKey = key; // Update the active key
            updateVelocity(); // Update the movement based on the new active key
        }
    }

    if (key === " ") {
        global.playerObject.setJumpForce(3); // Handle jump
    }
}

function stop(event) {
    const key = event.key;

    if (key === activeKey) {
        activeKey = fallbackKey; // Switch to the fallback key when the active key is released
        fallbackKey = null; // Clear the fallback key
        updateVelocity(); // Update the movement based on the new active key
    } else if (key === fallbackKey) {
        fallbackKey = null; // Clear the fallback key if it was released
    }
}

function updateVelocity() {
    if (activeKey === "d") {
        global.playerObject.xVelocity = 500;
        global.playerObject.switchCurrentSprites(5, 20);
    } else if (activeKey === "a") {
        global.playerObject.xVelocity = -500;
        global.playerObject.switchCurrentSprites(21, 36);
    } else {
        global.playerObject.xVelocity = 0; // Stop movement if no keys are active
        global.playerObject.switchCurrentSprites(0, 3);
    }
}



function shoot(event) {
    if (event.button === 0 && global.playerObject.canShoot  && !global.gameOver) {
        const rect = global.canvas.getBoundingClientRect();

        //Calculate mouse position relative to canvas and adjust for camera position
        const mouseX = event.clientX - rect.left + global.camera.x;
        const mouseY = event.clientY - rect.top - global.camera.y;

        //Get player's center position
        const playerCenterX = global.playerObject.x + global.playerObject.width / 2;
        const playerCenterY = global.playerObject.y + global.playerObject.height / 2;

        //Calculate direction vector from player to mouse
        const dx = mouseX - playerCenterX;
        const dy = mouseY - playerCenterY;

        //Create new projectile from player's center position
        new Projectile(
            playerCenterX,
            playerCenterY,
            10,
            10,
            mouseX,
            mouseY
        );
        global.audio("./audio/laser-gun.mp3");
    }
}
