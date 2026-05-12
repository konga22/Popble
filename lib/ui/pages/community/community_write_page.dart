import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/context_extension.dart';
import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../common/app_components.dart';

class CommunityWritePage extends StatefulWidget {
  const CommunityWritePage({super.key});

  @override
  State<CommunityWritePage> createState() => _CommunityWritePageState();
}

class _CommunityWritePageState extends State<CommunityWritePage> {
  final _bodyController = TextEditingController();

  @override
  void dispose() {
    _bodyController.dispose();
    super.dispose();
  }

  void _onSubmit() {
    if (_bodyController.text.trim().isEmpty) {
      context.showSnackbar('게시글 내용을 입력해주세요.', isError: true);
      return;
    }
    context.showSnackbar('mock 게시글이 저장되었습니다.');
    context.pop();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppTopBar(
        title: '커뮤니티 글 작성',
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
          4.heightBox,
          const Text(
            '2024년 05월 24일 방문',
            style: TextStyle(color: AppColors.muted),
          ),
          28.heightBox,
          LabelTextField(
            label: '상세 리뷰',
            hint: '이곳에서의 경험을 기록해 보세요.',
            controller: _bodyController,
            icon: LucideIcons.penLine,
            maxLines: 8,
          ),
          10.heightBox,
          Align(
            alignment: Alignment.centerRight,
            child: Text(
              '${_bodyController.text.length} / 1000',
              style: const TextStyle(color: AppColors.muted),
            ),
          ),
          28.heightBox,
          const EmptyPlaceholder(
            title: '리뷰 혜택',
            message: "작성 완료 시 프로필에 '성수 에디토리얼' 배지가 부여됩니다.",
            icon: LucideIcons.badgeCheck,
          ),
          24.heightBox,
          PrimaryButton(
            label: '리뷰 등록하고 배지 받기',
            icon: LucideIcons.send,
            onPressed: _onSubmit,
          ),
        ],
      ),
    );
  }
}
