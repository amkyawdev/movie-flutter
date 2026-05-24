import 'package:flutter/material.dart';
import 'package:movie_flutter/pages/animation_loader.dart';
import 'package:movie_flutter/pages/main_body.dart';
import 'package:movie_flutter/pages/editing_page.dart';
import 'package:movie_flutter/pages/preview_page.dart';
import 'package:movie_flutter/pages/about_page.dart';

void main() {
  runApp(const MovieFlutterApp());
}

class MovieFlutterApp extends StatelessWidget {
  const MovieFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'AMKyawDev Recap App',
      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.blue),
        useMaterial3: true,
      ),
      home: const AnimationLoaderPage(),
      routes: {
        '/main': (context) => const MainBodyPage(),
        '/editing': (context) => const EditingPage(),
        '/preview': (context) => const PreviewPage(),
        '/about': (context) => const AboutPage(),
      },
    );
  }
}