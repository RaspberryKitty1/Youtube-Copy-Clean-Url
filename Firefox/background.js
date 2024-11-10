// Create a context menu item
browser.contextMenus.create({
  id: "cleanYouTubeLink",
  title: "Copy Clean YouTube Link",
  contexts: ["link"],
  targetUrlPatterns: ["*://www.youtube.com/*", "*://youtu.be/*"]
});

// Handle clicks on the context menu item
browser.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "cleanYouTubeLink" && info.linkUrl) {
    const url = new URL(info.linkUrl);
    const videoId = url.searchParams.get("v");
    const timestamp = url.searchParams.get("t");
    const playlistId = url.searchParams.get("list");
    const playlistIndex = url.searchParams.get("index");

    if (videoId) {
      // Load settings to determine which parameters to include
      browser.storage.sync.get(["includeTimestamp", "includePlaylist"]).then((settings) => {
        let cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Add optional parameters if they exist and if the settings allow it
        if (settings.includeTimestamp && timestamp) {
          cleanUrl += `&t=${timestamp}`;
        }
        if (settings.includePlaylist && playlistId) {
          cleanUrl += `&list=${playlistId}`;
          if (playlistIndex) {
            cleanUrl += `&index=${playlistIndex}`;
          }
        }

        // Copy the clean URL to the clipboard
        navigator.clipboard.writeText(cleanUrl).then(() => {
          console.log("Cleaned URL copied to clipboard:", cleanUrl);
        }).catch(err => {
          console.error("Failed to copy URL:", err);
        });
      });
    }
  }
});
