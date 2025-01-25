const levelManager = {
    level1Complete: false,
    level2Complete: false,
    level3Complete: false,
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