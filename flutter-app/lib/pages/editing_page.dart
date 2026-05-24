import 'package:flutter/material.dart';
import 'package:movie_flutter/widgets/video_player.dart';
import 'package:movie_flutter/widgets/subtitle_editor.dart';
import 'package:movie_flutter/widgets/editing_options.dart';
import 'package:movie_flutter/services/subtitle_service.dart';

class EditingPage extends StatefulWidget {
  const EditingPage({super.key});

  @override
  State<EditingPage> createState() => _EditingPageState();
}

class _EditingPageState extends State<EditingPage> {
  String? _videoPath;
  List<SubtitleData> _subtitles = [];
  double _currentTime = 0;
  EditingOptionsData _options = EditingOptionsData();

  void _onVideoSelected(String path) {
    setState(() {
      _videoPath = path;
    });
  }

  void _onSubtitlesChanged(List<SubtitleData> subtitles) {
    setState(() {
      _subtitles = subtitles;
    });
  }

  void _onTimeUpdate(double time) {
    setState(() {
      _currentTime = time;
    });
  }

  void _onOptionsChanged(EditingOptionsData options) {
    setState(() {
      _options = options;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Editing Page'),
      ),
      body: Row(
        children: [
          Expanded(
            flex: 2,
            child: Container(
              color: Colors.grey[100],
              child: VideoPlayerWidget(
                videoPath: _videoPath,
                subtitles: _subtitles,
                currentTime: _currentTime,
                onTimeUpdate: _onTimeUpdate,
                options: _options,
              ),
            ),
          ),
          SizedBox(
            width: 350,
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(16),
              child: Column(
                children: [
                  EditingOptionsWidget(
                    options: _options,
                    onChanged: _onOptionsChanged,
                  ),
                  const SizedBox(height: 16),
                  SubtitleEditorWidget(
                    subtitles: _subtitles,
                    onChanged: _onSubtitlesChanged,
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }
}