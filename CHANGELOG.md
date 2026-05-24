# Changelog

All notable changes to **AMKyawDev Recap App** will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2024-XX-XX

### Added

#### 🌐 Web Frontend (Next.js)
- **Video Playback** - Real-time video streaming with subtitle overlay rendering
- **Subtitle Editor** - Full-featured SRT subtitle editor
  - Import/Export SRT files
  - Add/Edit/Delete subtitles
  - Timing adjustment
- **Editing Options** - Comprehensive customization
  - Font family selection (Arial, Helvetica, Times New Roman, Georgia, Courier New)
  - Font size (12px - 72px)
  - Text color picker
  - Background opacity control
- **FFmpeg WASM** - Client-side video processing
  - Browser-based video encoding
  - Subtitle burning to video
- **Download Options** - Export workflows
  - MP4 with burned subtitles
  - Standalone SRT file
- **PWA Support** - Progressive Web App features
  - Service worker caching
  - Offline support
  - Installable app
- **Responsive Design** - Works on all devices

#### 🖥️ Desktop App (Flutter)
- **Video Player Widget** - Native video playback
- **Subtitle Editor Widget** - Full Flutter-based editor
- **File Picker Integration** - Native file dialogs
- **Material Design 3** - Modern UI components

#### 🛠️ Infrastructure
- **Docker Compose** - Multi-container orchestration
- **Vercel Configuration** - One-click deployment
- **Production Configs** - Production-ready setups

### Technology Stack

| Component | Technology |
|-----------|-------------|
| Web Framework | Next.js 14 |
| UI Library | React 18 |
| Language | TypeScript 5 |
| Desktop | Flutter 3.x |
| Video Processing | FFmpeg WASM |
| Styling | CSS / Material Design 3 |

---

## [Unreleased]

### Planned Features

- [ ] Dark mode support
- [ ] Multiple subtitle format support (ASS, SSA, VTT)
- [ ] Batch video processing
- [ ] Cloud storage integration
- [ ] Collaborative editing
- [ ] Audio waveform visualization

---

## [Older Versions]

See [CHANGELOG archive](https://github.com/amkyawdev/movie-flutter/releases) for previous versions.

---

## Migration Guides

### v0.x → v1.0.0

Version 1.0.0 is the initial stable release. No migration needed from pre-v1 versions.

---

## Deprecation Notices

None at this time.

---

## Known Issues

| Issue | Status | Workaround |
|-------|--------|-----------|
| Large video files may be slow | Investigating | Use shorter videos |
| FFmpeg WASM memory intensive | Known limitation | Close other tabs |

---

<p align="center">
  <a href="https://github.com/amkyawdev/movie-flutter/releases">
    <img src="https://img.shields.io/github/v/release/amkyawdev/movie-flutter?style=flat-square" alt="Latest Release">
  </a>
  <a href="https://github.com/amkyawdev/movie-flutter/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/amkyawdev/movie-flutter?style=flat-square" alt="Contributors">
  </a>
  <a href="https://github.com/amkyawdev/movie-flutter/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/amkyawdev/movie-flutter?style=flat-square" alt="License">
  </a>
</p>