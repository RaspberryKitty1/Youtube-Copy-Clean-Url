// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'copy-clean-link',
      title: 'Copy Clean YouTube Link',
      contexts: ['link']
    }, () => {
      if (chrome.runtime.lastError) {
        console.error('Context menu creation failed:', chrome.runtime.lastError);
      } else {
        console.log('Context menu created successfully');
      }
    });
});


// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'copy-clean-link') {
        console.log('Context menu clicked');
        
        let clickedUrl = info.linkUrl;
        console.log('Clicked URL:', clickedUrl);

        if (clickedUrl) {
            // Load settings and then clean the URL
            chrome.storage.sync.get(["includeTimestamp", "includePlaylist"], (settings) => {
                let cleanUrl = cleanYouTubeUrl(clickedUrl, settings);
                console.log('Clean URL:', cleanUrl);

                chrome.scripting.executeScript({
                    target: { tabId: tab.id },
                    files: ['content.js']
                }).then(() => {
                    chrome.tabs.sendMessage(tab.id, { action: "copyUrl", cleanUrl: cleanUrl });
                }).catch(err => {
                    console.error('Failed to inject content script:', err);
                });
            });
        } else {
            console.error('No URL found in context menu');
        }
    }
});

// Function to clean YouTube URL based on user settings
function cleanYouTubeUrl(url, settings) {
    let urlObj = new URL(url);

    let videoId = urlObj.searchParams.get('v');
    let timestamp = urlObj.searchParams.get('t');
    let playlistId = urlObj.searchParams.get('list');
    let playlistIndex = urlObj.searchParams.get('index');

    let cleanedUrl = 'https://www.youtube.com/watch';
    if (videoId) {
        cleanedUrl += `?v=${videoId}`;
    }
    if (settings.includeTimestamp && timestamp) {
        cleanedUrl += `&t=${timestamp}`;
    }
    if (settings.includePlaylist && playlistId) {
        cleanedUrl += `${videoId ? '&' : '?'}list=${playlistId}`;
        if (playlistIndex) {
            cleanedUrl += `&index=${playlistIndex}`;
        }
    }

    return cleanedUrl;
}

  