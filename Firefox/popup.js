document.addEventListener("DOMContentLoaded", () => {
    const includeTimestamp = document.getElementById("includeTimestamp");
    const includePlaylist = document.getElementById("includePlaylist");
    const shortenLink = document.getElementById("shortenLink");

    // Load stored settings
    browser.storage.sync.get(["includeTimestamp", "includePlaylist"]).then((data) => {
      includeTimestamp.checked = data.includeTimestamp ?? true;  // Default to true
      includePlaylist.checked = data.includePlaylist ?? true;    // Default to true
      shortenLink.checked = data.shortenLink ?? true; // Default to true
    });

    // Save settings when the Save button is clicked
    document.getElementById("saveBtn").addEventListener("click", () => {
        browser.storage.sync.set({
          includeTimestamp: includeTimestamp.checked,
          includePlaylist: includePlaylist.checked,
          shortenLink: shortenLink.checked
        }).then(() => {
          alert("Settings saved!");
        });
    });
});
