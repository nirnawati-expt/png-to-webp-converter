# PNG to WebP Converter

A lightweight, 100% client-side web application for converting PNG images to WebP format. Designed with a striking terminal/console-inspired aesthetic.

_Note: This application was fully built and iterated upon by an AI coding assistant using [Antigravity](https://github.com/google/antigravity), powered by the **Gemini 3.1 Pro (High)** model._

## 🚀 Features

- **100% Client-Side Processing**: No servers, no APIs, no external requests. Your images never leave your browser, ensuring complete privacy and security.
- **Single & Bulk Conversion**: Drop a single PNG or process multiple files in bulk.
- **Built-in Constraints**: Safely handles up to 50 files or 50 MB in total size per batch, preventing browser crashes. Limits are enforced via retro-styled terminal modals.
- **Smart ZIP Downloads**: When converting multiple files, the app automatically bundles all converted WebP images into a single `.zip` archive for easy downloading.
- **Terminal-Inspired UI**: A high-contrast design featuring a true black background (`#0a0a0a`), vibrant green text (`#00ff00`), blinking cursor animations, and monospace typography.
- **Drag & Drop Support**: Easily upload your PNG files by clicking the upload area or dragging and dropping files directly into the browser window. Each new upload **appends** to the existing queue — files already in the list are never replaced.
- **Editable File Queue**: Remove individual files from the queue before conversion using the `[ X ]` button next to each file. The queue is re-validated against the 50-file / 50 MB limits on every append.
- **Live Preview & Stats**: Instantly view your uploaded files, track real-time status indicators during bulk conversion, and see the exact bandwidth saved.
- **One-Shot Conversion Lock**: Once you click `> CONVERT TO WEBP`, both the convert button and the file input (including drag & drop) are locked for the rest of the session — preventing accidental re-submissions. Click `↻ START OVER` to reload the page and start fresh.

## 🛠️ Tech Stack

This project is built purely with web standards. No heavy frameworks, no build tools.

- **HTML5**: Semantic structure.
- **CSS3**: Vanilla CSS utilizing custom CSS variables, Flexbox, and CSS transitions/animations.
- **Vanilla JavaScript**: DOM manipulation, File API, and HTML Canvas API for image processing.
- **JSZip (CDN)**: Utilized solely for creating ZIP archives when downloading bulk conversions.
- **Google Fonts**: Uses `JetBrains Mono` for that authentic coding aesthetic.

## ⚙️ How It Works

1. The application uses the `FileReader` API to read the uploaded PNG files locally.
2. The images are sequentially rendered onto a hidden HTML5 `<canvas>` element.
3. Using the `canvas.toBlob()` method with the `image/webp` MIME type, the images are compressed and converted entirely within the browser engine.
4. For single files, an `Object URL` is generated to allow the user to download the resulting WebP file.
5. For multiple files, the `JSZip` library asynchronously packs the WebP blobs into a `.zip` archive.

## 💻 Getting Started

Since this is a static web application, you don't need to install any dependencies (like Node.js or Python) to run it.

### Option 1: Direct Open

Simply double-click the `index.html` file to open it in your default web browser.

### Option 2: Local Web Server

If you prefer running it over a local server (recommended to avoid any potential CORS issues with local files in some strict browsers), you can use Python or any simple HTTP server:

```bash
# Using Python 3
python -m http.server 8080

# Using Node (http-server)
npx http-server -p 8080
```

Then navigate to `http://localhost:8080` in your browser.

## 🖼️ Design Direction

- **Font**: [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono)
- **Background**: `var(--bg-color)` (`#0a0a0a`)
- **Text & Accent**: `var(--accent-color)` (`#00ff00`)
- **Error/Danger**: `var(--error-color)` (`#ff3333`)
- **Info/Success**: `var(--info-color)` (`#00ccff`)

## 📝 License

This project is open-source and free to use for non commercial usage. see [LICENSE](/LICENSE) for details.
