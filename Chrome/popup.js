document.addEventListener("DOMContentLoaded", () => {
    const includeTimestamp = document.getElementById("includeTimestamp");
    const includePlaylist = document.getElementById("includePlaylist");
    const shortenLink = document.getElementById("shortenLink");

    // Load stored settings
    chrome.storage.sync.get(["includeTimestamp", "includePlaylist", "shortenLink"], (data) => {
        includeTimestamp.checked = data.includeTimestamp ?? true; // Default to true
        includePlaylist.checked = data.includePlaylist ?? true;  // Default to true
        shortenLink.checked = data.shortenLink ?? true;          // Default to true
    });

    // Save settings automatically when switches are toggled
    includeTimestamp.addEventListener("change", () => {
        chrome.storage.sync.set({ includeTimestamp: includeTimestamp.checked });
    });

    includePlaylist.addEventListener("change", () => {
        chrome.storage.sync.set({ includePlaylist: includePlaylist.checked });
    });

    shortenLink.addEventListener("change", () => {
        chrome.storage.sync.set({ shortenLink: shortenLink.checked });
    });
});


document.addEventListener("DOMContentLoaded", () => {
    const versionElement = document.getElementById("version");

    // Fetch the manifest and set the version
    const manifest = chrome.runtime.getManifest();
    versionElement.textContent = `v${manifest.version}`;
});