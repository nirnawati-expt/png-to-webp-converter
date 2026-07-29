# Engineering Notes

This project was intentionally designed as a lightweight, local-first browser utility rather than a traditional web application.

## Design Goals

- [x] Process images entirely on-device.
- [x] No image uploads to cloud servers.
- [x] No cloud services.
- [x] Minimal dependencies.
- [x] Fast startup and low memory footprint.
- [x] Reusable build pipeline for future browser utilities.

## Core Stack & Technology Choice

- **Vanilla JavaScript & CSS:** Built without frontend frameworks or complex module architectures. The entire client-side logic resides in a single, clean JavaScript file to keep execution straightforward and overhead at absolute zero.
- **Minimal Dependencies:** Third-party libraries are strictly restricted to essential core utilities.
- **Vite:** Used solely as a bundler and development server for asset handling and multi-target compilation.

## Architecture

Instead of maintaining separate projects for different deployment targets, the project uses a single source code base capable of producing multiple outputs:

- [x] Standalone portable HTML (offline, no installation required)
- [x] Static web application
- [x] Browser extension

Each target shares the same core application logic while using target-specific build configuration.

## Build System

The project uses **Vite** as the build tool because it provides a lightweight development experience while supporting multiple build targets without introducing unnecessary complexity.

The build pipeline was designed to be modular:

- [x] reusable configuration
- [x] shared functions, constants, variables
- [x] grouped build logic
- [x] target-specific overrides
- [x] Adding a new deployment target requires only a small configuration layer instead of duplicating the application.

## Custom Build Pipeline

Rather than introducing additional plugins with features unnecessary for this project, a small custom Vite plugin was implemented.

The plugin automatically:

- generates the browser extension manifest
- generates the background script
- prepares build artifacts for the extension target

This keeps the dependency tree small while making the build process predictable and easy to maintain.

## Code Organization

The project was refactored by human from a plain HTML/CSS/JavaScript prototype built with AI agent, into a modular code base.
Given the small scope of the utility, the JavaScript codebase was intentionally kept in a single, cohesive file. Refactoring focused on:

- Structuring code clearly.
- Eliminating duplicated logic and extracting magic values into constants.
- Avoiding unnecessary abstraction or over-engineering while maintaining readability.

The goal was long-term maintainability rather than simply making the application work.

## Offline-first

- [x] External CDN assets were intentionally removed.
- [x] Fonts and assets are bundled locally so the application maintains the same appearance and functionality without requiring an internet connection.

The result is a truly standalone application with no runtime dependency on third-party services.

## Privacy

- [x] Image processing happens entirely inside the browser.
- [x] Images are never uploaded to a server, making the application suitable for users who prefer local processing or work with sensitive files.

## Performance

The project intentionally minimizes runtime overhead by:

- [x] reducing external dependencies
- [x] bundling assets locally
- [x] avoiding unnecessary frameworks
- [x] keeping the generated output lightweight

The focus is not achieving benchmark numbers, but delivering a responsive experience with a simple and maintainable architecture.
