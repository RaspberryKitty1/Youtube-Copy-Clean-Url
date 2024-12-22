# YouTube Copy Clean URL

A Firefox and Chrome extension designed to simplify sharing clean YouTube links.  
**Note:** This extension is only available for **PC**.

## Why This Extension Was Made

This extension was created out of my frustration with YouTube injecting parameters like `?si=` and `&pp=` into copied links, even when using the CleanURL extension. I decided to make my own extension to fix this issue (with some assistance from ChatGPT for the skeleton code, as I didn't know how to make an extension).

## What This Extension Does

This extension removes all unnecessary tracking parameters like `?si=` and `&pp=` and retains the important ones such as `&t=` (for the timestamp), `?v=` (for the video ID), `&list=` (for playlist ID), and `&index=` (for playlist index).

## Installation Guide

### Firefox

1. Go to the [Releases page](https://github.com/RaspberryKitty1/Youtube-Copy-Clean-Url/releases) and click the `.xpi` file.
2. Allow GitHub to install the extension.  
   ![image](https://github.com/user-attachments/assets/97145067-c370-4d1f-b87d-2ee8c0189c24)
3. Click "Add" to confirm.  
   ![image](https://github.com/user-attachments/assets/59f32b9f-9443-4cc4-a76d-b732bf893b7e)

### Chromium-Based Browsers (Chrome, Edge, Opera, etc.)

1. Open the Extensions page (`chrome://extensions/` or `browser://extensions/` for other browsers) and enable **Developer mode**.  
   ![image](https://github.com/user-attachments/assets/c53c8b31-ecb9-4605-943b-f604028d83b3)
2. Download the ZIP file from the [Releases page](https://github.com/RaspberryKitty1/Youtube-Copy-Clean-Url/releases).
3. Extract the ZIP file to a folder you won't move or delete.
4. In the browser, click **Load unpacked** and select the folder with the extracted files.  
   ![image](https://github.com/user-attachments/assets/376682ed-92ed-4b9c-bf77-7694f40ae7ca)  
   ![image](https://github.com/user-attachments/assets/33fc4ede-0d73-4775-be09-629506f3933e)
5. Done! The extension is now installed.  
   ![image](https://github.com/user-attachments/assets/5eb362e1-209d-4a1d-aaa9-9d40a924f587)

## How to Use

1. Right-click on any YouTube link.
2. From the context menu, select **Copy Clean YouTube Link**. The cleaned link will be copied to your clipboard.  
   ![image](https://github.com/user-attachments/assets/8339cfc3-e814-4e90-8097-e0f04214ee30)

## New Settings Menu

- Click the extension icon in your extension list to open the settings menu.
- Use the toggles to enable or disable options for **Timestamp**, **Playlist** and **Shorten Link**.
   - Enabling the **Playlist** setting will also disable the `&index=` parameter from the URL.  
- Settings should sync across devices, though this is not fully guaranteed.
![image](https://github.com/user-attachments/assets/3091e5f3-dbfd-4871-a4ec-9c6f6b278fb7)

