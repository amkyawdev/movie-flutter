'use client';

import { useState, useCallback, useRef } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

export function useFFmpeg() {
  const [loaded, setLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const ffmpegRef = useRef<FFmpeg | null>(null);

  const load = useCallback(async () => {
    if (loaded || loading) return;
    
    setLoading(true);
    const ffmpeg = new FFmpeg();
    ffmpegRef.current = ffmpeg;

    ffmpeg.on('log', ({ message }) => {
      console.log(message);
    });

    ffmpeg.on('progress', ({ progress: p }) => {
      setProgress(Math.round(p * 100));
    });

    try {
      const baseURL = '/ffmpeg';
      await ffmpeg.load({
        coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
        wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
      });
      setLoaded(true);
    } catch (error) {
      console.error('Failed to load FFmpeg:', error);
    } finally {
      setLoading(false);
    }
  }, [loaded, loading]);

  const exec = useCallback(async (args: string[], input?: File, output?: string) => {
    if (!ffmpegRef.current || !loaded) {
      throw new Error('FFmpeg not loaded');
    }

    const ffmpeg = ffmpegRef.current;

    if (input) {
      await ffmpeg.writeFile('input', await fetchFile(input));
    }

    await ffmpeg.exec(args);

    if (output) {
      const data = await ffmpeg.readFile(output);
      // Convert Uint8Array to ArrayBuffer for Blob
      const uint8Array = data as unknown as Uint8Array;
      return new Blob([uint8Array.buffer], { type: 'video/mp4' });
    }

    return null;
  }, [loaded]);

  return { load, exec, loaded, loading, progress };
}