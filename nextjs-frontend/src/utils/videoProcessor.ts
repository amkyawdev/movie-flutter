import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile } from '@ffmpeg/util';
import { Subtitle } from './subtitleParser';

export interface VideoProcessingOptions {
  font?: string;
  fontSize?: number;
  fontColor?: string;
  backgroundColor?: string;
  bottomMargin?: number;
}

export interface ProcessingResult {
  success: boolean;
  outputUrl?: string;
  error?: string;
}

export async function processVideo(
  ffmpeg: FFmpeg,
  videoFile: File,
  subtitles: Subtitle[],
  options: VideoProcessingOptions = {}
): Promise<ProcessingResult> {
  try {
    // Write video file
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));

    // Write SRT file
    const srtContent = subtitles
      .sort((a, b) => a.startTime.localeCompare(b.startTime))
      .map((sub, index) => `${index + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}\n`)
      .join('\n');
    await ffmpeg.writeFile('subtitles.srt', srtContent);

    // Build FFmpeg command
    const fontSize = options.fontSize || 24;
    const fontColor = options.fontColor || 'white';
    const bgColor = options.backgroundColor || 'black@0.5';
    const margin = options.bottomMargin || 20;

    const args = [
      '-i', 'input.mp4',
      '-vf', `subtitles=subtitles.srt:force_style='Fontname=${options.font || "Arial"},FontSize=${fontSize},PrimaryColour=&H${hexToASS(color)\\n}'`,
      '-c:a', 'copy',
      'output.mp4'
    ];

    await ffmpeg.exec(args);

    // Read output
    const data = await ffmpeg.readFile('output.mp4');
    const outputUrl = URL.createObjectURL(new Blob([data], { type: 'video/mp4' }));

    return { success: true, outputUrl };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

function hexToASS(hex: string): string {
  // Convert #RRGGBB to &HRRGGBBAA
  const color = hex.replace('#', '');
  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  return `H${b.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${r.toString(16).padStart(2, '0')}FF`;
}

export async function extractAudio(
  ffmpeg: FFmpeg,
  videoFile: File
): Promise<Blob | null> {
  try {
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
    await ffmpeg.exec(['-i', 'input.mp4', '-vn', '-c:a', 'copy', 'output.aac']);
    const data = await ffmpeg.readFile('output.aac');
    return new Blob([data], { type: 'audio/aac' });
  } catch {
    return null;
  }
}

export async function getVideoInfo(
  ffmpeg: FFmpeg,
  videoFile: File
): Promise<{ duration: number; width: number; height: number } | null> {
  try {
    await ffmpeg.writeFile('input.mp4', await fetchFile(videoFile));
    await ffmpeg.exec(['-i', 'input.mp4', '-f', 'null', '-']);
    // Note: This is simplified - real implementation would parse ffprobe output
    return { duration: 0, width: 0, height: 0 };
  } catch {
    return null;
  }
}