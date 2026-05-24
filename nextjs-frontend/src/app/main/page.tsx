'use client';

import Link from 'next/link';

export default function MainPage() {
  return (
    <div className="main-container">
      <header className="main-header">
        <h1>AMKyawDev Recap App</h1>
        <p>Video subtitle editing application</p>
      </header>
      
      <main className="main-content">
        <div className="feature-grid">
          <Link href="/editing" className="feature-card">
            <h2>🎬 Edit Subtitles</h2>
            <p>Edit video subtitles with SRT support</p>
          </Link>
          
          <Link href="/preview" className="feature-card">
            <h2>👁️ Preview</h2>
            <p>Preview and download your video</p>
          </Link>
          
          <Link href="/about" className="feature-card">
            <h2>ℹ️ About</h2>
            <p>Learn more about this app</p>
          </Link>
        </div>
      </main>
    </div>
  );
}