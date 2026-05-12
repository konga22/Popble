import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/context_extension.dart';
import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class ReviewWritePage extends StatefulWidget {
  const ReviewWritePage({super.key});

  @override
  State<ReviewWritePage> createState() => _ReviewWritePageState();
}

class _ReviewWritePageState extends State<ReviewWritePage> {
  final _reviewController = TextEditingController();
  double _rating = 4;

  @override
  void dispose() {
    _reviewController.dispose();
    super.dispose();
  }

  Future<bool> _confirmExit() async {
    if (_reviewController.text.trim().isEmpty) return true;
    final shouldExit = await showDialog<bool>(
      context: context,
      builder:
          (context) => AlertDialog(
            title: const Text('작성을 중단하시겠어요?'),
            content: const Text('지금 나가시면 작성 중인 내용이 저장되지 않습니다.'),
            actions: [
              TextButton(
                onPressed: () => Navigator.of(context).pop(false),
                child: const Text('계속 작성하기'),
              ),
              TextButton(
                onPressed: () => Navigator.of(context).pop(true),
                child: const Text('나가기'),
              ),
            ],
          ),
    );
    return shouldExit ?? false;
  }

  void _onSubmit() {
    if (_reviewController.text.trim().isEmpty) {
      context.showSnackbar('상세 리뷰를 입력해주세요.', isError: true);
      return;
    }
    context.showSnackbar('mock 리뷰가 등록되었습니다.');
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return PopScope(
      canPop: false,
      onPopInvokedWithResult: (didPop, result) async {
        if (didPop) return;
        final shouldExit = await _confirmExit();
        if (!context.mounted || !shouldExit) return;
        context.pop();
      },
      child: Scaffold(
        appBar: AppTopBar(
          title: '리뷰 작성',
          showBack: true,
          actions: [TextButton(onPressed: _onSubmit, child: const Text('저장'))],
        ),
        body: ListView(
          padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
          children: [
            const StatusBadge(label: '방문 완료'),
            12.heightBox,
            const Text(
              '성수동 에디토리얼 팝업',
              style: TextStyle(
                color: AppColors.ink,
                fontSize: 22,
                fontWeight: FontWeight.w800,
              ),
            ),
            26.heightBox,
            const Text(
              '경험은 어떠셨나요?',
              style: TextStyle(fontWeight: FontWeight.w800),
            ),
            Slider(
              min: 1,
              max: 5,
              divisions: 8,
              value: _rating,
              label: _rating.toStringAsFixed(1),
              onChanged: (value) => setState(() => _rating = value),
            ),
            Center(
              child: Text(
                _rating.toStringAsFixed(1),
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w800,
                ),
              ),
            ),
            24.heightBox,
            const EmptyPlaceholder(
              title: '사진 추가 (최대 5장)',
              message: '0/5 · 실제 업로드는 다음 Firebase 단계에서 연결합니다.',
              icon: LucideIcons.image,
            ),
            24.heightBox,
            LabelTextField(
              label: '상세 리뷰',
              hint: '분위기나 특별했던 점은 무엇인가요?',
              controller: _reviewController,
              icon: LucideIcons.penLine,
              maxLines: 7,
            ),
            24.heightBox,
            PrimaryButton(
              label: '리뷰 등록하고 배지 받기',
              icon: LucideIcons.badgeCheck,
              onPressed: _onSubmit,
            ),
          ],
        ),
      ),
    );
  }
}
