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

    let videoId = urlObj.searchParams.get('v');
    let timestamp = urlObj.searchParams.get('t');

    console.log("Original URL:", url);  // Debug log
    console.log("Video ID:", videoId);  // Debug log
    console.log("Timestamp:", timestamp);  // Debug log

    let cleanedUrl = 'https://www.youtube.com/watch';
    if (videoId) {
        cleanedUrl += `?v=${videoId}`;
    }
    if (timestamp) {
        cleanedUrl += `&t=${timestamp}`;
    }

    console.log("Cleaned URL:", cleanedUrl);  // Debug log

    return cleanedUrl;
}
