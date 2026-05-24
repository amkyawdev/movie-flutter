export interface Subtitle {
  id: number;
  startTime: string;
  endTime: string;
  text: string;
}

export function parseSRT(content: string): Subtitle[] {
  const blocks = content.trim().split(/\n\n+/);
  return blocks.map(block => {
    const lines = block.split('\n');
    const times = lines[1]?.split(' --> ') || [];
    return {
      id: parseInt(lines[0]) || Date.now() + Math.random(),
      startTime: times[0]?.trim() || '00:00:00,000',
      endTime: times[1]?.trim() || '00:00:05,000',
      text: lines.slice(2).join('\n'),
    };
  }).filter(s => s.text);
}

export function toSRT(subtitles: Subtitle[]): string {
  return subtitles
    .sort((a, b) => a.startTime.localeCompare(b.startTime))
    .map((sub, index) => `${index + 1}\n${sub.startTime} --> ${sub.endTime}\n${sub.text}\n`)
    .join('\n');
}

export function timeToSeconds(time: string): number {
  const [hms, ms] = time.split(',');
  const [h, m, s] = hms.split(':').map(Number);
  return h * 3600 + m * 60 + s + Number(ms) / 1000;
}

export function secondsToTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  const ms = Math.floor((seconds % 1) * 1000);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')},${ms.toString().padStart(3, '0')}`;
}