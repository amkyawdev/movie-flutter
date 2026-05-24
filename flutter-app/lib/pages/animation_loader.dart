import 'package:flutter/material.dart';
import 'dart:async';

class AnimationLoaderPage extends StatefulWidget {
  const AnimationLoaderPage({super.key});

  @override
  State<AnimationLoaderPage> createState() => _AnimationLoaderPageState();
}

class _AnimationLoaderPageState extends State<AnimationLoaderPage> {
  double _progress = 0;

  @override
  void initState() {
    super.initState();
    _loadResources();
  }

  Future<void> _loadResources() async {
    for (int i = 0; i <= 100; i += 10) {
      await Future.delayed(const Duration(milliseconds: 200));
      if (mounted) {
        setState(() {
          _progress = i.toDouble();
        });
      }
    }
    if (mounted) {
      Navigator.of(context).pushReplacementNamed('/main');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: const BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [Color(0xFF667eea), Color(0xFF764ba2)],
          ),
        ),
        child: Center(
          child: Card(
            child: Padding(
              padding: const EdgeInsets.all(32),
              child: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  const Text(
                    'AMKyawDev Recap App',
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 24),
                  LinearProgressIndicator(
                    value: _progress / 100,
                    minHeight: 8,
                  ),
                  const SizedBox(height: 16),
                  Text('Loading... ${_progress.toInt()}%'),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}