document.addEventListener("DOMContentLoaded", () => {
    const includeTimestamp = document.getElementById("includeTimestamp");
    const includePlaylist = document.getElementById("includePlaylist");
  
    // Load stored settings
    browser.storage.sync.get(["includeTimestamp", "includePlaylist"]).then((data) => {
      includeTimestamp.checked = data.includeTimestamp ?? true;  // Default to true
      includePlaylist.checked = data.includePlaylist ?? true;    // Default to true
    });

    // Save settings when the Save button is clicked
    document.getElementById("saveBtn").addEventListener("click", () => {
        browser.storage.sync.set({
          includeTimestamp: includeTimestamp.checked,
          includePlaylist: includePlaylist.checked
        }).then(() => {
          alert("Settings saved!");
        });
    });
});
