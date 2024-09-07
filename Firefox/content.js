// Listen for a message from the background script to clean and replace the URL
browser.runtime.onMessage.addListener((request) => {
    if (request.action === "cleanUrl") {
        let cleanUrl = request.cleanUrl;
        window.history.replaceState({}, '', cleanUrl);
    }
});
