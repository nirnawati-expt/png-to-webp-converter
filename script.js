document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const dropLabel = document.getElementById('drop-label');
    const previewSection = document.getElementById('preview-section');
    const fileListContainer = document.getElementById('file-list');
    const totalPngSizeSpan = document.getElementById('total-png-size');
    const convertBtn = document.getElementById('convert-btn');
    const resultBox = document.getElementById('result-box');
    const totalWebpSizeSpan = document.getElementById('total-webp-size');
    const totalReductionSpan = document.getElementById('total-reduction');
    const downloadBtn = document.getElementById('download-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const errorModal = document.getElementById('error-modal');
    const modalMessage = document.getElementById('modal-message');
    const modalOkBtn = document.getElementById('modal-ok-btn');

    let selectedFiles = [];
    let convertedBlobs = []; // { name, blob, originalSize }
    let isLocked = false; // true once conversion starts; reset only on page reload
    
    // Constants
    const MAX_FILES = 50;
    const MAX_SIZE_BYTES = 50 * 1024 * 1024; // 50MB

    function showError(msg) {
        modalMessage.textContent = msg;
        errorModal.classList.remove('hidden');
    }

    modalOkBtn.addEventListener('click', () => {
        errorModal.classList.add('hidden');
    });

    // Drag and Drop Events
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.add('dragover');
        }, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        dropZone.addEventListener(eventName, () => {
            dropZone.classList.remove('dragover');
        }, false);
    });

    dropZone.addEventListener('drop', (e) => {
        const dt = e.dataTransfer;
        handleFiles(dt.files);
    }, false);

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(filesList) {
        if (isLocked) return; // block both drop and input once conversion starts
        if (filesList.length === 0) return;
        
        let files = Array.from(filesList).filter(f => f.type === 'image/png');
        
        if (files.length === 0) {
            showError("No valid PNG files found in selection.");
            return;
        }

        let combinedFiles = selectedFiles.concat(files);

        // Check limits
        if (combinedFiles.length > MAX_FILES) {
            showError(`Limit exceeded: You selected ${combinedFiles.length} files. Maximum is ${MAX_FILES}.`);
            fileInput.value = ''; // reset input
            return;
        }

        let totalSize = combinedFiles.reduce((acc, f) => acc + f.size, 0);
        if (totalSize > MAX_SIZE_BYTES) {
            showError(`Limit exceeded: Total size is ${formatBytes(totalSize)}. Maximum is 50 MB.`);
            fileInput.value = '';
            return;
        }

        // Accept files
        selectedFiles = combinedFiles;
        convertedBlobs = [];
        fileInput.value = ''; // reset so same files can be re-added after removal
        
        renderFileList();
    }

    function renderFileList() {
        if (selectedFiles.length === 0) {
            previewSection.classList.add('hidden');
            resultBox.classList.add('hidden');
            dropLabel.textContent = `[ DRAG & DROP PNGs HERE OR CLICK TO BROWSE ]`;
            totalPngSizeSpan.textContent = '0 KB';
            return;
        }

        let totalSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

        // Reset UI
        resultBox.classList.add('hidden');
        previewSection.classList.remove('hidden');
        dropLabel.textContent = `[ SELECTED: ${selectedFiles.length} FILE(S) ]`;
        totalPngSizeSpan.textContent = formatBytes(totalSize);

        // Render file list
        fileListContainer.innerHTML = '';
        selectedFiles.forEach((f, idx) => {
            const div = document.createElement('div');
            div.className = 'file-item';
            
            const nameSpan = document.createElement('span');
            nameSpan.className = 'file-name';
            nameSpan.textContent = `> ${f.name}`;
            
            const statusSpan = document.createElement('span');
            statusSpan.className = 'file-status remove-btn';
            statusSpan.id = `status-${idx}`;
            statusSpan.textContent = '[ X ]';
            statusSpan.addEventListener('click', () => {
                if (!convertBtn.disabled) {
                    selectedFiles.splice(idx, 1);
                    renderFileList();
                }
            });

            div.appendChild(nameSpan);
            div.appendChild(statusSpan);
            fileListContainer.appendChild(div);
        });

        // Update button text
        downloadBtn.textContent = selectedFiles.length > 1 ? "> DOWNLOAD ALL (.zip)" : "> DOWNLOAD .WEBP";
    }

    convertBtn.addEventListener('click', async () => {
        if (selectedFiles.length === 0) return;
        
        isLocked = true;
        convertBtn.disabled = true;
        fileInput.disabled = true;
        convertBtn.textContent = "> CONVERTING...";
        
        convertedBlobs = [];
        let totalWebpSize = 0;
        let totalOriginalSize = selectedFiles.reduce((acc, f) => acc + f.size, 0);

        for (let i = 0; i < selectedFiles.length; i++) {
            const file = selectedFiles[i];
            const statusEl = document.getElementById(`status-${i}`);
            statusEl.textContent = '[ RUNNING ]';
            statusEl.style.color = '#fff';

            try {
                const blob = await convertToWebP(file);
                convertedBlobs.push({
                    name: file.name.replace(/\.png$/i, '.webp'),
                    blob: blob
                });
                totalWebpSize += blob.size;
                
                statusEl.textContent = '[ OK ]';
                statusEl.className = 'file-status ok';
            } catch (err) {
                console.error(err);
                statusEl.textContent = '[ ERROR ]';
                statusEl.className = 'file-status error';
                statusEl.style.color = '#ff3333';
            }
        }

        // Show results
        totalWebpSizeSpan.textContent = formatBytes(totalWebpSize);
        const reduction = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
        if (reduction > 0) {
            totalReductionSpan.textContent = `(-${reduction}%)`;
            totalReductionSpan.style.color = '#00ff00';
        } else {
            totalReductionSpan.textContent = `(+${Math.abs(reduction)}%)`;
            totalReductionSpan.style.color = '#ff3333';
        }

        resultBox.classList.remove('hidden');
        resultBox.scrollIntoView({ behavior: 'smooth' });
        
        // convertBtn and fileInput remain disabled — user must refresh to start over
        convertBtn.textContent = "> CONVERT TO WEBP";
        refreshBtn.classList.remove('hidden');
    });

    function convertToWebP(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    canvas.width = img.naturalWidth;
                    canvas.height = img.naturalHeight;
                    ctx.drawImage(img, 0, 0);
                    canvas.toBlob((blob) => {
                        if (blob) resolve(blob);
                        else reject(new Error("Canvas toBlob failed"));
                    }, 'image/webp', 0.8);
                };
                img.onerror = () => reject(new Error("Image load failed"));
                img.src = e.target.result;
            };
            reader.onerror = () => reject(new Error("File read failed"));
            reader.readAsDataURL(file);
        });
    }

    downloadBtn.addEventListener('click', async () => {
        if (convertedBlobs.length === 0) return;

        if (convertedBlobs.length === 1) {
            // Single download
            const blobInfo = convertedBlobs[0];
            const url = URL.createObjectURL(blobInfo.blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = blobInfo.name;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } else {
            // Zip download
            downloadBtn.textContent = "> ZIPPING...";
            downloadBtn.disabled = true;
            
            try {
                const zip = new JSZip();
                convertedBlobs.forEach(b => {
                    zip.file(b.name, b.blob);
                });
                
                const zipBlob = await zip.generateAsync({ type: 'blob' });
                const url = URL.createObjectURL(zipBlob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'converted_images.zip';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
            } catch (err) {
                showError("Failed to generate ZIP file.");
                console.error(err);
            }
            
            downloadBtn.textContent = "> DOWNLOAD ALL (.zip)";
            downloadBtn.disabled = false;
        }
    });

    refreshBtn.addEventListener('click', () => {
        location.reload();
    });

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});
