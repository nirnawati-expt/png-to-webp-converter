# Terminal PNG to WebP Converter

A lightweight, 100% client-side web application for converting PNG images to WebP format. Designed with a striking terminal/console-inspired aesthetic.

## 🚀 Features

- **100% Client-Side Processing**: No servers, no APIs, no external requests. Your images never leave your browser, ensuring complete privacy and security.
- **Terminal-Inspired UI**: A high-contrast design featuring a true black background (`#0a0a0a`), vibrant green text (`#00ff00`), blinking cursor animations, and monospace typography.
- **Drag & Drop Support**: Easily upload your PNG files by clicking the upload area or dragging and dropping the file directly into the browser window.
- **Live Preview & Stats**: Instantly view your uploaded PNG, check its file size, and compare it with the converted WebP image and the percentage of file size reduction.
- **Interactive Elements**: Enjoy smooth micro-animations, glowing hover effects, and tactile feedback on all interactive elements.
- **Dynamic Refresh**: Quickly start over with a dedicated "START OVER" button that appears seamlessly after downloading your converted file.

## 🛠️ Tech Stack

This project is built purely with web standards. No frameworks, no build tools, and no unnecessary dependencies.
- **HTML5**: Semantic structure.
- **CSS3**: Vanilla CSS utilizing Flexbox, custom variables, and CSS transitions/animations.
- **Vanilla JavaScript**: DOM manipulation, File API, and HTML Canvas API for image processing.
- **Google Fonts**: Uses `JetBrains Mono` for that authentic coding aesthetic.

## ⚙️ How It Works

1. The application uses the `FileReader` API to read the uploaded PNG file locally.
2. The image is rendered onto a hidden HTML5 `<canvas>` element.
3. Using the `canvas.toBlob()` method with the `image/webp` MIME type, the image is compressed and converted entirely within the browser engine.
4. An `Object URL` is generated to allow the user to preview and download the resulting WebP file.

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
- **Background**: `#0a0a0a`
- **Text & Accent**: `#00ff00`
- **Error/Danger**: `#ff3333`
- **Info/Success**: `#00ccff`

## 📝 License
This project is open-source and free to use for non commercial usage. see [LICENSE](/LICENSE) for details.
