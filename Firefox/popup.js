document.addEventListener("DOMContentLoaded", () => {
    const includeTimestamp = document.getElementById("includeTimestamp");
    const includePlaylist = document.getElementById("includePlaylist");
    const shortenLink = document.getElementById("shortenLink");

    // Load stored settings
    browser.storage.sync.get(["includeTimestamp", "includePlaylist", "shortenLink"]).then((data) => {
        includeTimestamp.checked = data.includeTimestamp ?? true; // Default to true
        includePlaylist.checked = data.includePlaylist ?? true;   // Default to true
        shortenLink.checked = data.shortenLink ?? true;           // Default to true
    });

    // Save settings automatically when switches are toggled
    includeTimestamp.addEventListener("change", () => {
        browser.storage.sync.set({ includeTimestamp: includeTimestamp.checked });
    });

    includePlaylist.addEventListener("change", () => {
        browser.storage.sync.set({ includePlaylist: includePlaylist.checked });
    });

    shortenLink.addEventListener("change", () => {
        browser.storage.sync.set({ shortenLink: shortenLink.checked });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const versionElement = document.getElementById("version");
  
    // Fetch the manifest and set the version
    const manifest = browser.runtime.getManifest();
    versionElement.textContent = `v${manifest.version}`;
  });
  
  
  