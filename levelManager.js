const levelManager = {
    // Level 1
    level1Complete: false,
    cutSceneElement1Watched: false,

    // Level 2
    level2Complete: false,
    cutSceneElement2Watched: false,

    // Level 3
    level3Complete: false,
    cutSceneElement3Watched: false
};

// Save levelManager to localStorage
function saveLevelManager() {
    localStorage.setItem('levelManager', JSON.stringify(levelManager));
}

// Load levelManager from localStorage
function loadLevelManager() {
    const savedData = localStorage.getItem('levelManager');
    if (savedData) {
        Object.assign(levelManager, JSON.parse(savedData));
    }
}

// Call loadLevelManager when the script is loaded
loadLevelManager();

// Save levelManager to localStorage before the page unloads
window.addEventListener('beforeunload', saveLevelManager);

export { levelManager };