import { levelManager } from './levelManager.js';

function startLevel1() {
    window.location.href = "./Game/index.html?level=1";
}
function startLevel2() {
    window.location.href = "./Game/index.html?level=2";
}
function startLevel3() {
    window.location.href = "./Game/index.html?level=3";
}

document.getElementById("startBtn").addEventListener("click", function () {
    console.log("Start button clicked");
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('levelSelectMenu').style.display = 'flex';
});

document.getElementById("guideBtn").addEventListener("click", function () {
    document.getElementById('gameGuide').style.display = 'flex';
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('guideBtn').style.display = 'none';
});

function goBackToMainMenu() {
    document.getElementById('levelSelectMenu').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'flex';
    document.getElementById('startBtn').style.display = '';
    document.getElementById('guideBtn').style.display = '';
    document.getElementById('gameGuide').style.display = 'none';

}

// Enable levels based on completion
window.onload = () => {
    console.log('Window loaded');
    console.log("Lv1Comp " + levelManager.level1Complete);
    if (levelManager.level1Complete) {
        document.getElementById('level2').disabled = false;
    }
    if (levelManager.level2Complete) {
        document.getElementById('level3').disabled = false;
    }
};

// Audio autoplay fix
const audioElement = document.querySelector('audio');
document.body.addEventListener('click', () => {
    if (audioElement.paused) {
        audioElement.play();
    }
});

// Export functions for global use
window.startLevel1 = startLevel1;
window.startLevel2 = startLevel2;
window.startLevel3 = startLevel3;
window.goBackToMainMenu = goBackToMainMenu;