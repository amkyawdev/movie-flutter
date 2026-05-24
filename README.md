# AMKyawDev Recap App

A video subtitle editing application with both Next.js web frontend and Flutter desktop/web support.

## Features

- 🎬 Video playback with subtitle overlay
- 📝 SRT subtitle file editing
- 🎨 Font, size, color, and background customization
- ⚡ Client-side video processing with FFmpeg WASM
- 💾 Export to MP4 or SRT format
- 🔄 Support for both web (Next.js) and desktop (Flutter)

## Project Structure

```
movie-flutter/
├── nextjs-frontend/           # Next.js React App
│   ├── src/
│   │   ├── app/           # Next.js pages
│   │   ├── components/    # React components
│   │   ├── hooks/       # Custom React hooks
│   │   ├── utils/       # Utility functions
│   │   └── styles/      # Global styles
│   └── package.json
│
├── flutter-app/             # Flutter Desktop/Web App
│   ├── lib/
│   │   ├── pages/      # Flutter pages
│   │   ├── widgets/    # Flutter widgets
│   │   └── services/  # Services
│   └── pubspec.yaml
│
├── docker-compose.yml        # Docker Compose config
└── README.md
```

## Quick Start

### Using Docker Compose

```bash
# Build and run all services
docker-compose up --build

# Or run individual services
docker-compose up nextjs-frontend   # Port 3000
docker-compose up flutter-web         # Port 8080
```

### Manual Setup

#### Next.js Frontend

```bash
cd nextjs-frontend
npm install
npm run dev
# Visit http://localhost:3000
```

#### Flutter App

```bash
cd flutter-app
flutter pub get
flutter run -d chrome
# Visit http://localhost:8080
```

## Pages

### Next.js Frontend

- `/animation-loader` - Loading screen
- `/main` - Main menu
- `/editing` - Subtitle editing page
- `/preview` - Preview and download
- `/about` - About page

### Flutter App

- `AnimationLoaderPage` - Loading screen
- `MainBodyPage` - Main menu
- `EditingPage` - Subtitle editing
- `PreviewPage` - Preview and download
- `AboutPage` - About page

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Desktop**: Flutter 3.x
- **Video Processing**: FFmpeg WASM
- **Styling**: CSS Modules / Material Design

## License

MIT