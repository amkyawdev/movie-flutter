'use client';

export default function AboutPage() {
  return (
    <div className="about-container">
      <h1>About AMKyawDev Recap App</h1>
      
      <div className="about-content">
        <section>
          <h2>Features</h2>
          <ul>
            <li>Video playback with subtitle overlay</li>
            <li>SRT subtitle file editing</li>
            <li>Font, size, color, and background customization</li>
            <li>Client-side video processing with FFmpeg WASM</li>
            <li>Export to MP4 or SRT</li>
          </ul>
        </section>
        
        <section>
          <h2>Technology Stack</h2>
          <ul>
            <li>Next.js 14 - React framework</li>
            <li>FFmpeg WASM - Video processing</li>
            <li>TypeScript - Type safety</li>
          </ul>
        </section>
        
        <section>
          <h2>Developer</h2>
          <p>AMKyawDev - Video editing application</p>
        </section>
      </div>
    </div>
  );
}