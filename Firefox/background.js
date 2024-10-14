// Function to clean YouTube URL
function cleanYouTubeUrl(url) {
    let urlObj = new URL(url);

    let videoId = urlObj.searchParams.get('v');   // Capture the video ID
    let timestamp = urlObj.searchParams.get('t');  // Capture the timestamp
    let playlistId = urlObj.searchParams.get('list');  // Capture the playlist ID
    let playlistIndex = urlObj.searchParams.get('index');  // Capture the playlist index

    let cleanedUrl = 'https://www.youtube.com/watch';
    if (videoId) {
        cleanedUrl += `?v=${videoId}`;  // Append video ID
    }
    if (timestamp) {
        cleanedUrl += `&t=${timestamp}`;  // Append timestamp
    }
    if (playlistId) {
        cleanedUrl += `${videoId ? '&' : '?'}list=${playlistId}`;  // Append playlist ID
    }
    if (playlistIndex) {
        cleanedUrl += `&index=${playlistIndex}`;  // Append playlist index
    }

    return cleanedUrl;
}

// Handle browser action click to clean and copy URL
browser.browserAction.onClicked.addListener((tab) => {
    let currentUrl = tab.url;
    let cleanUrl = cleanYouTubeUrl(currentUrl);

    navigator.clipboard.writeText(cleanUrl).then(() => {
        console.log('Clean URL copied to clipboard:', cleanUrl);

        // Send the cleaned URL back to the content script to update the URL
        browser.tabs.sendMessage(tab.id, { action: "cleanUrl", cleanUrl: cleanUrl });
    }).catch(err => {
        console.error('Failed to copy URL:', err);
    });
});
