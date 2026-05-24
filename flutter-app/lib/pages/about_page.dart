import 'package:flutter/material.dart';

class AboutPage extends StatelessWidget {
  const AboutPage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('About'),
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'About AMKyawDev Recap App',
              style: TextStyle(
                fontSize: 24,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 24),
            const Text(
              'Features',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const _FeatureItem(text: 'Video playback with subtitle overlay'),
            const _FeatureItem(text: 'SRT subtitle file editing'),
            const _FeatureItem(text: 'Font, size, color, and background customization'),
            const _FeatureItem(text: 'Client-side video processing with FFmpeg WASM'),
            const _FeatureItem(text: 'Export to MP4 or SRT'),
            const SizedBox(height: 24),
            const Text(
              'Technology Stack',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const _FeatureItem(text: 'Flutter - Cross-platform UI framework'),
            const _FeatureItem(text: 'FFmpeg - Video/audio processing'),
            const _FeatureItem(text: 'Dart - Programming language'),
            const SizedBox(height: 24),
            const Text(
              'Developer',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            const Text('AMKyawDev - Video editing application'),
          ],
        ),
      ),
    );
  }
}

class _FeatureItem extends StatelessWidget {
  final String text;

  const _FeatureItem({required this.text});

  @override
  Widget build(BuildContext context) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        children: [
          const Icon(Icons.check_circle, size: 20),
          const SizedBox(width: 8),
          Expanded(child: Text(text)),
        ],
      ),
    );
  }
}