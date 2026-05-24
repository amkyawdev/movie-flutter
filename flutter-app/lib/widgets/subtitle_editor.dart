import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';
import 'package:movie_flutter/services/subtitle_service.dart';

class SubtitleEditorWidget extends StatefulWidget {
  final List<SubtitleData> subtitles;
  final Function(List<SubtitleData>) onChanged;

  const SubtitleEditorWidget({
    super.key,
    required this.subtitles,
    required this.onChanged,
  });

  @override
  State<SubtitleEditorWidget> createState() => _SubtitleEditorWidgetState();
}

class _SubtitleEditorWidgetState extends State<SubtitleEditorWidget> {
  late List<SubtitleData> _subtitles;
  final TextEditingController _startController = TextEditingController(text: '00:00:00,000');
  final TextEditingController _endController = TextEditingController(text: '00:00:05,000');
  final TextEditingController _textController = TextEditingController();

  @override
  void initState() {
    super.initState();
    _subtitles = List.from(widget.subtitles);
  }

  @override
  void didUpdateWidget(SubtitleEditorWidget oldWidget) {
    super.didUpdateWidget(oldWidget);
    if (widget.subtitles != oldWidget.subtitles) {
      _subtitles = List.from(widget.subtitles);
    }
  }

  @override
  void dispose() {
    _startController.dispose();
    _endController.dispose();
    _textController.dispose();
    super.dispose();
  }

  void _addSubtitle() {
    final newSub = SubtitleData(
      id: DateTime.now().millisecondsSinceEpoch,
      startTime: _startController.text,
      endTime: _endController.text,
      text: _textController.text,
    );
    _subtitles.add(newSub);
    _subtitles.sort((a, b) => a.startTime.compareTo(b.startTime));
    widget.onChanged(_subtitles);
    _textController.clear();
  }

  void _deleteSubtitle(int id) {
    _subtitles.removeWhere((s) => s.id == id);
    widget.onChanged(_subtitles);
  }

  void _updateSubtitle(int id, String field, String value) {
    final index = _subtitles.indexWhere((s) => s.id == id);
    if (index != -1) {
      final old = _subtitles[index];
      final updated = SubtitleData(
        id: old.id,
        startTime: field == 'startTime' ? value : old.startTime,
        endTime: field == 'endTime' ? value : old.endTime,
        text: field == 'text' ? value : old.text,
      );
      _subtitles[index] = updated;
      widget.onChanged(_subtitles);
    }
  }

  Future<void> _importSRT() async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['srt'],
    );
    if (result != null && result.files.single.path != null) {
      final file = result.files.single;
      // Would read file here
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Imported: ${file.name}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Subtitle Editor',
              style: TextStyle(
                fontSize: 18,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _startController,
              decoration: const InputDecoration(
                labelText: 'Start Time',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _endController,
              decoration: const InputDecoration(
                labelText: 'End Time',
                border: OutlineInputBorder(),
              ),
            ),
            const SizedBox(height: 8),
            TextField(
              controller: _textController,
              decoration: const InputDecoration(
                labelText: 'Subtitle Text',
                border: OutlineInputBorder(),
              ),
              maxLines: 3,
            ),
            const SizedBox(height: 8),
            SizedBox(
              width: double.infinity,
              child: ElevatedButton(
                onPressed: _addSubtitle,
                child: const Text('Add'),
              ),
            ),
            const SizedBox(height: 16),
            Row(
              children: [
                const Text('Import/Export: '),
                TextButton(
                  onPressed: _importSRT,
                  child: const Text('Import SRT'),
                ),
              ],
            ),
            const Divider(),
            const Text('Subtitles:', style: TextStyle(fontWeight: FontWeight.bold)),
            const SizedBox(height: 8),
            SizedBox(
              height: 200,
              child: ListView.builder(
                itemCount: _subtitles.length,
                itemBuilder: (context, index) {
                  final sub = _subtitles[index];
                  return Card(
                    child: ListTile(
                      title: Text(sub.text, maxLines: 2, overflow: TextOverflow.ellipsis),
                      subtitle: Text('${sub.startTime} --> ${sub.endTime}'),
                      trailing: IconButton(
                        icon: const Icon(Icons.delete),
                        onPressed: () => _deleteSubtitle(sub.id),
                      ),
                    ),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}