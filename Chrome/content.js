console.log('Content script loaded.');

if (typeof window.isProcessing === 'undefined') {
    window.isProcessing = false;
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "copyUrl") {
        if (window.isProcessing) return;  // Prevent multiple processing

        window.isProcessing = true;
        let cleanUrl = request.cleanUrl;
        console.log('Received URL:', cleanUrl);

        // Copy the cleaned URL to the clipboard
        navigator.clipboard.writeText(cleanUrl).then(() => {
            console.log('Clean URL copied to clipboard:', cleanUrl);
            window.isProcessing = false;  // Reset flag after processing
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            window.isProcessing = false;  // Reset flag on error
        });
    }
});
