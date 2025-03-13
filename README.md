# YouTube Copy Clean URL

A Firefox and Chrome extension designed to simplify sharing clean YouTube links.  
**Note:** This extension is currently only available for **PC**.

## Why This Extension Was Created

This extension was created out of frustration with YouTube injecting unnecessary parameters like `?si=` and `&pp=` into copied links, even when using the CleanURL extension. To solve this issue, I decided to build my own extension (with some assistance from ChatGPT for the initial code, as I wasn’t familiar with extension development).

## What This Extension Does

This extension removes all unnecessary tracking parameters such as `?si=` and `&pp=` from YouTube links while preserving important parameters like:
- `?v=` for the video ID
- `&t=` for the timestamp
- `&list=` for the playlist ID
- `&index=` for the playlist index

## Installation Guide

### Firefox

1. Visit the [Releases page](https://github.com/RaspberryKitty1/Youtube-Copy-Clean-Url/releases) and download the `.xpi` file.
2. Allow GitHub to install the extension.  
   ![image](https://github.com/user-attachments/assets/97145067-c370-4d1f-b87d-2ee8c0189c24)
3. Click **"Add"** to confirm the installation.  
   ![image](https://github.com/user-attachments/assets/59f32b9f-9443-4cc4-a76d-b732bf893b7e)

### Chromium-Based Browsers (Chrome, Edge, Opera, etc.)

1. Open the Extensions page (`chrome://extensions/` or `browser://extensions/` for other browsers) and enable **Developer mode**.  
   ![image](https://github.com/user-attachments/assets/c53c8b31-ecb9-4605-943b-f604028d83b3)
2. Download the ZIP file from the [Releases page](https://github.com/RaspberryKitty1/Youtube-Copy-Clean-Url/releases).
3. Extract the ZIP file to a folder you won't move or delete.
4. In your browser, click **Load unpacked** and select the folder with the extracted files.  
   ![image](https://github.com/user-attachments/assets/376682ed-92ed-4b9c-bf77-7694f40ae7ca)  
   ![image](https://github.com/user-attachments/assets/33fc4ede-0d73-4775-be09-629506f3933e)
5. Done! The extension is now installed.  
   ![image](https://github.com/user-attachments/assets/5eb362e1-209d-4a1d-aaa9-9d40a924f587)

## How to Use

1. Right-click on any YouTube link.
2. From the context menu, select **Copy Clean YouTube Link**. The cleaned link will be copied to your clipboard.  
   ![image](https://github.com/user-attachments/assets/8339cfc3-e814-4e90-8097-e0f04214ee30)

## New Settings Menu

- Click the extension icon in your browser toolbar to open the settings menu.
- Use the toggles to enable or disable options for:
  - **Timestamp**
  - **Playlist**
  - **Shorten Link**
  
   - Enabling the **Playlist** setting will also disable the `&index=` parameter in the URL.  
- Settings should sync across devices, but this feature is not fully guaranteed.
  
   ![image](https://github.com/user-attachments/assets/e77cbebc-57b1-4a4d-b4f7-6b8ca802b0c9)