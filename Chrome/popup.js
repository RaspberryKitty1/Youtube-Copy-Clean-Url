document.addEventListener("DOMContentLoaded", () => {
    const includeTimestamp = document.getElementById("includeTimestamp");
    const includePlaylist = document.getElementById("includePlaylist");

    // Load stored settings
    chrome.storage.sync.get(["includeTimestamp", "includePlaylist"], (data) => {
        includeTimestamp.checked = data.includeTimestamp ?? true;  // Default to true
        includePlaylist.checked = data.includePlaylist ?? true;    // Default to true
    });

    // Save settings when the Save button is clicked
    document.getElementById("saveBtn").addEventListener("click", () => {
        chrome.storage.sync.set({
            includeTimestamp: includeTimestamp.checked,
            includePlaylist: includePlaylist.checked
        }, () => {
            alert("Settings saved!");
        });
    });
});
