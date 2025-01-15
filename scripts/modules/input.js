import { global } from "./global.js";


// document.addEventListener("keypress", move);
// document.addEventListener("keyup", stop);

// function move(event) {

//     //Example Movement
//     switch (event.key) {
//         case "d":
//             if (global.playerObject.xVelocity == 0)
//                 // global.playerObject.switchCurrentSprites(27, 35);
//                 global.playerObject.xVelocity = 500;
//             console.log("velocity set");
//             break;
//         case "a":
//             if (global.playerObject.xVelocity == 0)
//                 // global.playerObject.switchCurrentSprites(9, 17);
//                 global.playerObject.xVelocity = -500;
//             break;
//         case " ":
//             global.playerObject.setJumpForce(3);
//             break;
//     }
// }



// function stop(event) {
//     switch (event.key) {
//         case "d":
//             global.playerObject.xVelocity = 0;
//             break;
//         case "a":
//             global.playerObject.xVelocity = 0;
//             break;
//     }
// }

let activeKey = null; // The key currently controlling movement
let fallbackKey = null; // The previous key to fall back to when activeKey is released

document.addEventListener("keydown", move);
document.addEventListener("keyup", stop);

function move(event) {
    const key = event.key;

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
        global.playerObject.switchCurrentSprites(5, 20);
    } else {
        global.playerObject.xVelocity = 0; // Stop movement if no keys are active
        global.playerObject.switchCurrentSprites(0, 3);
    }
}
