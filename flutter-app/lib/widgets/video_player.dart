import 'dart:io';
import 'package:flutter/material.dart';
import 'package:video_player/video_player.dart';
import 'package:movie_flutter/services/subtitle_service.dart';

class VideoPlayerWidget extends StatefulWidget {
  final String? videoPath;
  final List<SubtitleData> subtitles;
  final double currentTime;
  final Function(double) onTimeUpdate;
  final EditingOptionsData options;

  const VideoPlayerWidget({
    super.key,
    this.videoPath,
    required this.subtitles,
    required this.currentTime,
    required this.onTimeUpdate,
    required this.options,
  });

  @override
  State<VideoPlayerWidget> createState() => _VideoPlayerWidgetState();
}

class _VideoPlayerWidgetState extends State<VideoPlayerWidget> {
  VideoPlayerController? _controller;

  @override
  void didUpdateWidget(VideoPlayerWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.videoPath != oldWidget.videoPath && widget.videoPath != null) {
      _initVideo(widget.videoPath!);
    }
  }

  Future<void> _initVideo(String path) async {
    _controller?.dispose();
    _controller = VideoPlayerController.file(File(path));
    await _controller!.initialize();
    _controller!.addListener(_onVideoUpdate);
    setState(() {});
  }

  void _onVideoUpdate() {
    if (_controller != null) {
      widget.onTimeUpdate(_controller!.value.position.inMilliseconds / 1000.0);
    }
  }

  @override
  void dispose() {
    _controller?.dispose();
    super.dispose();
  }

  SubtitleData? _getCurrentSubtitle() {
    final time = widget.currentTime;
    for (final sub in widget.subtitles) {
      final start = SubtitleService.timeToSeconds(sub.startTime);
      final end = SubtitleService.timeToSeconds(sub.endTime);
      if (time >= start && time <= end) {
        return sub;
      }
    }
    return null;
  }

  @override
  Widget build(BuildContext context) {
    if (widget.videoPath == null) {
      return Container(
        color: Colors.black,
        child: const Center(
          child: Text(
            'No video loaded',
            style: TextStyle(color: Colors.white),
          ),
        ),
      );
    }

    if (_controller == null || !_controller!.value.isInitialized) {
      return const Center(child: CircularProgressIndicator());
    }

    final currentSub = _getCurrentSubtitle();

    return Stack(
      alignment: Alignment.center,
      children: [
        AspectRatio(
          aspectRatio: _controller!.value.aspectRatio,
          child: VideoPlayer(_controller!),
        ),
        if (currentSub != null)
          Positioned(
            bottom: 20,
            child: Container(
              padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
              decoration: BoxDecoration(
                color: widget.options.backgroundColor,
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                currentSub.text,
                style: TextStyle(
                  fontFamily: widget.options.font,
                  fontSize: widget.options.fontSize.toDouble(),
                  color: widget.options.color,
                ),
                textAlign: TextAlign.center,
              ),
            ),
          ),
        Positioned(
          bottom: 8,
          right: 8,
          child: IconButton(
            icon: Icon(
              _controller!.value.isPlaying ? Icons.pause : Icons.play_arrow,
            ),
            onPressed: () {
              setState(() {
                if (_controller!.value.isPlaying) {
                  _controller!.pause();
                } else {
                  _controller!.play();
                }
              });
            },
          ),
        ),
      ],
    );
  }
}