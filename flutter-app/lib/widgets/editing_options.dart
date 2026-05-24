import 'package:flutter/material.dart';
import 'package:movie_flutter/services/subtitle_service.dart';

class EditingOptionsWidget extends StatelessWidget {
  final EditingOptionsData options;
  final Function(EditingOptionsData) onChanged;

  const EditingOptionsWidget({
    super.key,
    required this.options,
    required this.onChanged,
  });

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Editing Options',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            DropdownButtonFormField<String>(
              value: options.font,
              decoration: const InputDecoration(
                labelText: 'Font',
                border: OutlineInputBorder(),
              ),
              items: const [
                DropdownMenuItem(value: 'Arial', child: Text('Arial')),
                DropdownMenuItem(value: 'Helvetica', child: Text('Helvetica')),
                DropdownMenuItem(value: 'Times New Roman', child: Text('Times New Roman')),
                DropdownMenuItem(value: 'Georgia', child: Text('Georgia')),
                DropdownMenuItem(value: 'Courier New', child: Text('Courier New')),
              ],
              onChanged: (value) {
                if (value != null) {
                  onChanged(EditingOptionsData(
                    font: value,
                    fontSize: options.fontSize,
                    color: options.color,
                    backgroundColor: options.backgroundColor,
                  ));
                }
              },
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text('Font Size: '),
                Expanded(
                  child: Slider(
                    value: options.fontSize.toDouble(),
                    min: 12,
                    max: 72,
                    divisions: 60,
                    label: '${options.fontSize}',
                    onChanged: (value) {
                      onChanged(EditingOptionsData(
                        font: options.font,
                        fontSize: value.toInt(),
                        color: options.color,
                        backgroundColor: options.backgroundColor,
                      ));
                    },
                  ),
                ),
                Text('${options.fontSize}'),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text('Text Color: '),
                const Spacer(),
                ColorPickerWidget(
                  color: options.color,
                  onChanged: (color) {
                    onChanged(EditingOptionsData(
                      font: options.font,
                      fontSize: options.fontSize,
                      color: color,
                      backgroundColor: options.backgroundColor,
                    ));
                  },
                ),
              ],
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text('Background: '),
                const Spacer(),
                ColorPickerWidget(
                  color: options.backgroundColor,
                  onChanged: (color) {
                    onChanged(EditingOptionsData(
                      font: options.font,
                      fontSize: options.fontSize,
                      color: options.color,
                      backgroundColor: color,
                    ));
                  },
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}

class ColorPickerWidget extends StatelessWidget {
  final String color;
  final Function(String) onChanged;

  const ColorPickerWidget({
    super.key,
    required this.color,
    required this.onChanged,
  });

  static const List<String> _colors = [
    '#FFFFFF',
    '#000000',
    '#FF0000',
    '#00FF00',
    '#0000FF',
    '#FFFF00',
    '#FF00FF',
    '#00FFFF',
  ];

  @override
  Widget build(BuildContext context) {
    return PopupMenuButton<String>(
      initialValue: color,
      onSelected: onChanged,
      itemBuilder: (context) => _colors
          .map((c) => PopupMenuItem(
                value: c,
                child: Container(
                  width: 24,
                  height: 24,
                  decoration: BoxDecoration(
                    color: _parseColor(c),
                    border: Border.all(color: Colors.grey),
                  ),
                ),
              ))
          .toList(),
      child: Container(
        width: 32,
        height: 32,
        decoration: BoxDecoration(
          color: _parseColor(color),
          border: Border.all(color: Colors.grey),
        ),
      ),
    );
  }

  Color _parseColor(String hex) {
    final value = int.parse(hex.replaceFirst('#', ''), radix: 16);
    return Color(0xFF000000 | value);
  }
}