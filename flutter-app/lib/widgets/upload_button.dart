import 'package:flutter/material.dart';
import 'package:file_picker/file_picker.dart';

class UploadButton extends StatelessWidget {
  final Function(String) onUpload;
  final String accept;

  const UploadButton({
    super.key,
    required this.onUpload,
    this.accept = 'video/*',
  });

  @override
  Widget build(BuildContext context) {
    return ElevatedButton.icon(
      onPressed: () => _pickFile(context),
      icon: const Icon(Icons.upload),
      label: const Text('Upload Video'),
    );
  }

  Future<void> _pickFile(BuildContext context) async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.video,
    );
    if (result != null && result.files.single.path != null) {
      onUpload(result.files.single.path!);
    }
  }
}