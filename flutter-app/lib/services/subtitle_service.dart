import 'dart:ui';

/// Subtitle data model
class SubtitleData {
  final int id;
  final String startTime;
  final String endTime;
  final String text;

  SubtitleData({
    required this.id,
    required this.startTime,
    required this.endTime,
    required this.text,
  });

  SubtitleData copyWith({
    int? id,
    String? startTime,
    String? endTime,
    String? text,
  }) {
    return SubtitleData(
      id: id ?? this.id,
      startTime: startTime ?? this.startTime,
      endTime: endTime ?? this.endTime,
      text: text ?? this.text,
    );
  }
}

/// Editing options data model
class EditingOptionsData {
  final String font;
  final int fontSize;
  final Color color;
  final Color backgroundColor;

  EditingOptionsData({
    this.font = 'Arial',
    this.fontSize = 24,
    this.color = const Color(0xFFFFFFFF),
    Color? backgroundColor,
  }) : backgroundColor = backgroundColor ?? const Color(0x80000000);

  EditingOptionsData copyWith({
    String? font,
    int? fontSize,
    Color? color,
    Color? backgroundColor,
  }) {
    return EditingOptionsData(
      font: font ?? this.font,
      fontSize: fontSize ?? this.fontSize,
      color: color ?? this.color,
      backgroundColor: backgroundColor ?? this.backgroundColor,
    );
  }
}

/// Service for handling subtitle operations
class SubtitleService {
  /// Parse SRT content to subtitle data
  static List<SubtitleData> parseSRT(String content) {
    final blocks = content.trim().split(RegExp(r'\n\n+'));
    return blocks.map((block) {
      final lines = block.split('\n');
      final times = lines[1]?.split(' --> ') ?? [];
      return SubtitleData(
        id: int.tryParse(lines[0]) ?? DateTime.now().millisecondsSinceEpoch,
        startTime: times[0]?.trim() ?? '00:00:00,000',
        endTime: times[1]?.trim() ?? '00:00:05,000',
        text: lines.sublist(2).join('\n'),
      );
    }).toList();
  }

  /// Convert subtitles to SRT format
  static String toSRT(List<SubtitleData> subtitles) {
    final sorted = List<SubtitleData>.from(subtitles)
      ..sort((a, b) => a.startTime.compareTo(b.startTime));
    return sorted.asMap().entries.map((entry) {
      final index = entry.key + 1;
      final sub = entry.value;
      return '$index\n${sub.startTime} --> ${sub.endTime}\n${sub.text}';
    }).join('\n\n');
  }

  /// Convert time string to seconds
  static double timeToSeconds(String time) {
    final parts = time.split(',');
    final hms = parts[0].split(':').map(int.parse).toList();
    final ms = parts.length > 1 ? int.parse(parts[1]) : 0;
    return hms[0] * 3600 + hms[1] * 60 + hms[2] + ms / 1000;
  }

  /// Convert seconds to time string
  static String secondsToTime(double seconds) {
    final h = (seconds / 3600).floor();
    final m = ((seconds % 3600) / 60).floor();
    final s = (seconds % 60).floor();
    final ms = ((seconds % 1) * 1000).floor();
    return '${h.toString().padLeft(2, '0')}:${m.toString().padLeft(2, '0')}:${s.toString().padLeft(2, '0')},${ms.toString().padLeft(3, '0')}';
  }
}