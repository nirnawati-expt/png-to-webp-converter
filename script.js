document.addEventListener('DOMContentLoaded', () => {
    const dropZone = document.getElementById('drop-zone');
    const fileInput = document.getElementById('file-input');
    const dropLabel = document.getElementById('drop-label');
    const errorMessage = document.getElementById('error-message');
    const previewSection = document.getElementById('preview-section');
    const sourceImg = document.getElementById('source-img');
    const pngSizeSpan = document.getElementById('png-size');
    const convertBtn = document.getElementById('convert-btn');
    const resultBox = document.getElementById('result-box');
    const resultImg = document.getElementById('result-img');
    const webpSizeSpan = document.getElementById('webp-size');
    const sizeReductionSpan = document.getElementById('size-reduction');
    const downloadBtn = document.getElementById('download-btn');
    const refreshBtn = document.getElementById('refresh-btn');
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    let currentFile = null;
    let webpBlobURL = null;

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
        const files = dt.files;
        handleFiles(files);
    }, false);

    fileInput.addEventListener('change', function() {
        handleFiles(this.files);
    });

    function handleFiles(files) {
        if (files.length === 0) return;
        
        const file = files[0];
        
        // Reset state
        errorMessage.classList.add('hidden');
        previewSection.classList.add('hidden');
        resultBox.classList.add('hidden');
        
        if (webpBlobURL) {
            URL.revokeObjectURL(webpBlobURL);
            webpBlobURL = null;
        }

        // Validate file type
        if (file.type !== 'image/png') {
            errorMessage.classList.remove('hidden');
            return;
        }

        currentFile = file;
        
        // Show source preview
        const reader = new FileReader();
        reader.onload = (e) => {
            sourceImg.src = e.target.result;
            pngSizeSpan.textContent = formatBytes(file.size);
            previewSection.classList.remove('hidden');
            dropLabel.textContent = `[ SELECTED: ${file.name} ]`;
        };
        reader.readAsDataURL(file);
    }

    convertBtn.addEventListener('click', () => {
        if (!currentFile || !sourceImg.complete) return;

        // Set canvas dimensions to match image
        canvas.width = sourceImg.naturalWidth;
        canvas.height = sourceImg.naturalHeight;

        // Draw image to canvas
        ctx.drawImage(sourceImg, 0, 0);

        // Convert to WebP
        canvas.toBlob((blob) => {
            if (!blob) {
                console.error("Canvas toBlob failed");
                return;
            }

            if (webpBlobURL) {
                URL.revokeObjectURL(webpBlobURL);
            }

            webpBlobURL = URL.createObjectURL(blob);
            resultImg.src = webpBlobURL;
            webpSizeSpan.textContent = formatBytes(blob.size);

            // Calculate reduction
            const reduction = ((currentFile.size - blob.size) / currentFile.size * 100).toFixed(1);
            if (reduction > 0) {
                sizeReductionSpan.textContent = `(-${reduction}%)`;
                sizeReductionSpan.style.color = '#00ff00';
            } else {
                sizeReductionSpan.textContent = `(+${Math.abs(reduction)}%)`;
                sizeReductionSpan.style.color = '#ff3333';
            }

            resultBox.classList.remove('hidden');
            
            // Scroll to result
            resultBox.scrollIntoView({ behavior: 'smooth' });

        }, 'image/webp', 0.8); // 0.8 is quality
    });

    downloadBtn.addEventListener('click', () => {
        if (!webpBlobURL) return;

        const a = document.createElement('a');
        a.href = webpBlobURL;
        
        // Create filename based on original
        const originalName = currentFile.name;
        const newName = originalName.replace(/\.png$/i, '.webp');
        a.download = newName || 'converted.webp';
        
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        // Show refresh button after download
        refreshBtn.classList.remove('hidden');
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
