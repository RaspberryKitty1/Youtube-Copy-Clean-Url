// Function to clean YouTube URL
function cleanYouTubeUrl(url) {
    let urlObj = new URL(url);

    let videoId = urlObj.searchParams.get('v');
    let timestamp = urlObj.searchParams.get('t');
    let playlistId = urlObj.searchParams.get('list');  // Capture the playlist ID

    let cleanedUrl = 'https://www.youtube.com/watch';
    if (videoId) {
        cleanedUrl += `?v=${videoId}`;
    }
    if (playlistId) {
        cleanedUrl += `${videoId ? '&' : '?'}list=${playlistId}`;  // Append playlist ID
    }
    if (timestamp) {
        cleanedUrl += `&t=${timestamp}`;
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
