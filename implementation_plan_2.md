# Bulk PNG to WebP Conversion

This plan outlines the enhancements to support bulk conversion of multiple PNG files to WebP format, enforcing limits on both file count and total size, and preserving the retro terminal aesthetic.

## Confirmed Decisions
- **Limits**: Max 50 files OR max 50 MB total size. Whichever limit is hit first triggers an error.
- **UI Style**: Terminal-style text list with status indicators (e.g., `> file1.png [ OK ]`) instead of image grids for bulk mode.
- **ZIP Download**: Uses `JSZip` library via CDN for downloading multiple WebP files as a single `.zip` file.
- **Dynamic Download Button**: Shows "DOWNLOAD .WEBP" for single-file conversion, and "DOWNLOAD ALL (.zip)" for bulk conversions (>1 file).
- **Tip Box**: Added a small tip explaining the dual options (Single or Bulk).
- **Error Popup**: Validation errors (exceeding 50 files or 50 MB) trigger a terminal-styled modal popup that requires user acknowledgment (an "OK" button) rather than just inline text.

## Proposed Changes

### Core Logic & UI

#### [MODIFY] index.html
- Add `multiple` attribute to the file input.
- Add JSZip CDN script: `<script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js"></script>`.
- Add a small tip box explaining single vs bulk options.
- Replace the single image preview section with a dynamic file list container.
- Add a terminal-style modal popup structure for error messages (hidden by default).
- Dynamic download button that changes text/action based on file count.

#### [MODIFY] script.js
- **State Management**: Replace `currentFile` with an array `selectedFiles`.
- **Validation**: Filter dropped files for PNGs. Check `files.length > 50` or `totalSize > 50 * 1024 * 1024`. If exceeded, trigger the new terminal modal popup and block conversion.
- **Rendering**: Dynamically render a text-based list of selected files (e.g., `> file1.png ... 2.4 MB [ WAIT ]`).
- **Conversion Loop**: Iterate over `selectedFiles` asynchronously. Convert each to WebP, update the list item status to `[ OK ]`, and store the Blob.
- **Download**: 
  - If 1 file: Download single `.webp`.
  - If >1 file: Use JSZip to bundle blobs and trigger a single `.zip` download.

#### [MODIFY] style.css
- Add styles for the terminal-style file list.
- Add styles for the modal popup overlay, content box, and acknowledge button.
- Add styling for the single/bulk tip box.

## Verification Plan

### Manual Verification
1. Drop >50 files or >50MB and verify the custom terminal modal appears and blocks progression. Click "OK" to dismiss it.
2. Drop 1 PNG file. Verify the preview shows the list item, conversion works, and button says "DOWNLOAD .WEBP".
3. Drop multiple PNGs (e.g., 3 files). Verify list UI populates, conversion processes sequentially, and button says "DOWNLOAD ALL (.zip)".
4. Download the ZIP and verify contents.
