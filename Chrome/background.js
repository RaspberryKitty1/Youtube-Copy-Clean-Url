// Create context menu item
chrome.contextMenus.create({
    id: 'copy-clean-link',
    title: 'Copy Clean YouTube Link',
    contexts: ['link']  // Use 'link' to get the URL of the link that was right-clicked
}, () => {
    if (chrome.runtime.lastError) {
        console.error('Context menu creation failed:', chrome.runtime.lastError);
    } else {
        console.log('Context menu created successfully');
    }
});

// Handle context menu click
chrome.contextMenus.onClicked.addListener((info, tab) => {
    if (info.menuItemId === 'copy-clean-link') {
        console.log('Context menu clicked');
        
        // Get the URL of the link that was right-clicked
        let clickedUrl = info.linkUrl;
        console.log('Clicked URL:', clickedUrl);  // Debug log

        if (clickedUrl) {
            let cleanUrl = cleanYouTubeUrl(clickedUrl);
            console.log('Clean URL:', cleanUrl);  // Debug log

            // Check if the content script is already injected
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                files: ['content.js']
            }).then(() => {
                chrome.tabs.sendMessage(tab.id, { action: "copyUrl", cleanUrl: cleanUrl });
            }).catch(err => {
                console.error('Failed to inject content script:', err);
            });
        } else {
            console.error('No URL found in context menu');
        }
    }
});

// Function to clean YouTube URL
function cleanYouTubeUrl(url) {
    let urlObj = new URL(url);

    let videoId = urlObj.searchParams.get('v');   // Capture the video ID
    let timestamp = urlObj.searchParams.get('t');   // Capture the timestamp
    let playlistId = urlObj.searchParams.get('list');  // Capture the playlist ID
    let playlistIndex = urlObj.searchParams.get('index');  // Capture the playlist index

    console.log("Original URL:", url);  // Debug log
    console.log("Video ID:", videoId);  // Debug log
    console.log("Timestamp:", timestamp);  // Debug log
    console.log("Playlist ID:", playlistId);  // Debug log
    console.log("Playlist Index:", playlistIndex);  // Debug log

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

    console.log("Cleaned URL:", cleanedUrl);  // Debug log

    return cleanedUrl;
}
