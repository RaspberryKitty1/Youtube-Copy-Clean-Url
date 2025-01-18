// Create a context menu item
browser.contextMenus.create({
  id: "cleanYouTubeLink",
  title: "Copy Clean YouTube Link",
  contexts: ["link"],
  targetUrlPatterns: ["*://www.youtube.com/*", "*://youtu.be/*"],
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
      browser.storage.sync
        .get(["includeTimestamp", "includePlaylist", "shortenLink"])
        .then((settings) => {
          // Determine whether to shorten the link
          let cleanUrl = settings.shortenLink
            ? `https://youtu.be/${videoId}`
            : `https://www.youtube.com/watch?v=${videoId}`;

          // Add optional parameters if they exist and if the settings allow it
          if (settings.shortenLink) {
            // Only include timestamp with shortened links
            if (settings.includeTimestamp && timestamp) {
              cleanUrl += `?t=${timestamp}`;
            }
          } else {
            if (settings.includeTimestamp && timestamp) {
              cleanUrl += `&t=${timestamp}`;
            }
            if (settings.includePlaylist && playlistId) {
              cleanUrl += `&list=${playlistId}`;
              if (playlistIndex) {
                cleanUrl += `&index=${playlistIndex}`;
              }
            }
          }

          // Escape URLs for safe injection
          const escapedOriginalUrl = JSON.stringify(info.linkUrl);
          const escapedCleanUrl = JSON.stringify(cleanUrl);

          // Inject logs into the tab's console with colorized output
          browser.tabs
            .executeScript(tab.id, {
              code: `
    console.log("%c[Youtube Link Cleaner] %cOriginal URL: %c" + ${escapedOriginalUrl}, "color: pink", "color: red; font-weight: bold;", "color: white;");
    console.log("%c[Youtube Link Cleaner] %cCleaned URL: %c" + ${escapedCleanUrl}, "color: pink", "color: green; font-weight: bold;", "color: white;");
  `,
            })
            .catch((err) => {
              console.error("Failed to inject logs into tab's console:", err);
            });

          // Copy the clean URL to the clipboard
          navigator.clipboard
            .writeText(cleanUrl)
            .catch((err) => {
              console.error("Failed to copy URL:", err);
            });
        });
    }
  }
});
