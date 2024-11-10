// Create a context menu item
chrome.contextMenus.create({
    id: "cleanYouTubeLink",
    title: "Copy Clean YouTube Link",
    contexts: ["link"],
    targetUrlPatterns: ["*://www.youtube.com/*", "*://youtu.be/*"]
  });
  
  // Handle clicks on the context menu item
  chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === "cleanYouTubeLink" && info.linkUrl) {
      const url = new URL(info.linkUrl);
      const videoId = url.searchParams.get("v");
      const timestamp = url.searchParams.get("t");
      const playlistId = url.searchParams.get("list");
      const playlistIndex = url.searchParams.get("index");
  
      if (videoId) {
        // Construct a clean URL with video ID and optional parameters (timestamp, playlist ID, index)
        let cleanUrl = `https://www.youtube.com/watch?v=${videoId}`;
        
        // Add optional parameters if they exist
        if (timestamp) {
          cleanUrl += `&t=${timestamp}`;
        }
        if (playlistId) {
          cleanUrl += `&list=${playlistId}`;
        }
        if (playlistIndex) {
          cleanUrl += `&index=${playlistIndex}`;
        }
  
        // Copy the clean URL to the clipboard
        navigator.clipboard.writeText(cleanUrl).then(() => {
          console.log("Cleaned URL copied to clipboard:", cleanUrl);
        }).catch(err => {
          console.error("Failed to copy URL:", err);
        });
      }
    }
  });
  