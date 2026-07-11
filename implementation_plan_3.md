# Goal Description

Update the PNG to WebP converter to support appending images to the current batch, and add the ability to remove specific files from the list before conversion.

## Open Questions

None at this time.

## Proposed Changes

### HTML
#### [MODIFY] index.html
- No structural HTML changes are strictly required, as the list rendering is dynamic, but we will ensure the list box layout can accommodate the new interaction.

### JavaScript
#### [MODIFY] script.js
- **Append Behavior & Limits**:
  - Update `handleFiles()` to combine newly selected/dropped files with the existing `selectedFiles` array rather than replacing it.
  - Implement a check against `MAX_FILES` (50) and `MAX_SIZE_BYTES` (50MB) on the *combined* list.
  - If the combined list exceeds these limits, display the existing `error-modal` with the exceeded size message and do *not* append the new files (the existing list remains unchanged).
- **Remove File Functionality**:
  - Extract the DOM list rendering logic into a new `renderFileList()` function so it can be re-run whenever a file is removed.
  - Change the initial status text for files from `[ WAIT ]` to `[ X ]`.
  - Add an event listener to the `[ X ]` element. When clicked, it will remove the corresponding file from the `selectedFiles` array and call `renderFileList()` to update the view.
- **Conversion Flow**:
  - When the CONVERT button is clicked, iterate through the DOM and change `[ X ]` to `[ RUNNING ]` for each file as it begins processing.
- **Download Behavior**:
  - The download functionality remains unchanged: use JSZip for downloading all files when multiple are present, and normal download for single files.

### CSS
#### [MODIFY] style.css
- **Remove Button Styling**:
  - Add a `.remove-btn` class for the `[ X ]` text.
  - Set its color to `var(--warning-color)`.
  - Set `cursor: pointer`.
  - Add a hover state (`.remove-btn:hover`) that makes the text `font-weight: bold;` or `bolder`, as requested.
