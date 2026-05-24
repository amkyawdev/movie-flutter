import 'package:flutter/material.dart';
import 'package:movie_flutter/widgets/video_player.dart';
import 'package:movie_flutter/services/subtitle_service.dart';

class PreviewPage extends StatefulWidget {
  const PreviewPage({super.key});

  @override
  State<PreviewPage> createState() => _PreviewPageState();
}

class _PreviewPageState extends State<PreviewPage> {
  String? _videoPath;
  List<SubtitleData> _subtitles = [];
  double _currentTime = 0;
  EditingOptionsData _options = EditingOptionsData();
  bool _processing = false;

  void _onExport(String format) async {
    if (format == 'srt') {
      // Export SRT file
      final content = SubtitleService.toSRT(_subtitles);
      // Show save dialog
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('SRT file exported')),
        );
      }
    } else {
      // Process video with FFmpeg
      setState(() {
        _processing = true;
      });
      // Simulate processing
      await Future.delayed(const Duration(seconds: 2));
      if (mounted) {
        setState(() {
          _processing = false;
        });
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Video processed successfully')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Preview & Download'),
      ),
      body: Stack(
        children: [
          Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                Expanded(
                  child: Container(
                    color: Colors.grey[100],
                    child: VideoPlayerWidget(
                      videoPath: _videoPath,
                      subtitles: _subtitles,
                      currentTime: _currentTime,
                      onTimeUpdate: (t) => setState(() => _currentTime = t),
                      options: _options,
                    ),
                  ),
                ),
                const SizedBox(height: 16),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    ElevatedButton.icon(
                      onPressed: _processing ? null : () => _onExport('mp4'),
                      icon: const Icon(Icons.download),
                      label: const Text('Download MP4'),
                    ),
                    const SizedBox(width: 16),
                    ElevatedButton.icon(
                      onPressed: () => _onExport('srt'),
                      icon: const Icon(Icons.subtitles),
                      label: const Text('Download SRT'),
                    ),
                  ],
                ),
              ],
            ),
          ),
          if (_processing)
            Container(
              color: Colors.black54,
              child: const Center(
                child: CircularProgressIndicator(),
              ),
            ),
        ],
      ),
    );
  }
}