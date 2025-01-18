if (typeof window.isProcessing === 'undefined') {
    window.isProcessing = false;
}

chrome.runtime.onMessage.addListener((request) => {
    if (request.action === "copyUrl") {
        if (window.isProcessing) return;  // Prevent multiple processing

        window.isProcessing = true;
        let cleanUrl = request.cleanUrl;
        console.log("%c[Youtube Link Cleaner] %cOriginal URL: " + cleanUrl, "color: pink", "color: red; font-weight: bold;");


        // Copy the cleaned URL to the clipboard
        navigator.clipboard.writeText(cleanUrl).then(() => {
            console.log("%c[Youtube Link Cleaner] %cCleaned URL: " + cleanUrl, "color: pink", "color: green; font-weight: bold;");
            window.isProcessing = false;  // Reset flag after processing
        }).catch(err => {
            console.error('Failed to copy URL:', err);
            window.isProcessing = false;  // Reset flag on error
        });
    }
});
