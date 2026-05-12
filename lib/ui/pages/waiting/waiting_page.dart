import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/context_extension.dart';
import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_waiting_service.dart';
import '../../common/app_components.dart';

class WaitingPage extends StatefulWidget {
  const WaitingPage({super.key});

  @override
  State<WaitingPage> createState() => _WaitingPageState();
}

class _WaitingPageState extends State<WaitingPage> {
  final _phoneController = TextEditingController(text: '010-0000-0000');
  int _people = 2;

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }

  void _onSubmit() {
    if (_phoneController.text.trim().isEmpty) {
      context.showSnackbar('휴대폰 번호를 입력해주세요.', isError: true);
      return;
    }
    context.goNamed(AppPage.waitingStatus.name);
  }

  @override
  Widget build(BuildContext context) {
    final waiting = MockWaitingService.status;

    return Scaffold(
      appBar: const AppTopBar(title: '대기 등록', showBack: true),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          Row(
            children: [
              MetricTile(
                label: '현재 대기',
                value: '${waiting.currentTeams}',
                icon: LucideIcons.users,
              ),
              12.widthBox,
              MetricTile(
                label: '예상 시간',
                value: '${waiting.estimatedMinutes}',
                icon: LucideIcons.clock,
              ),
            ],
          ),
          28.heightBox,
          const SectionHeader(title: '대기 등록', caption: 'CURRENT STATUS'),
          12.heightBox,
          const Text(
            '현재 매장이 혼잡하여 웨이팅이 필요합니다.',
            style: TextStyle(color: AppColors.body),
          ),
          24.heightBox,
          const Text('방문 인원', style: TextStyle(fontWeight: FontWeight.w800)),
          10.heightBox,
          Row(
            children: [
              IconButton(
                onPressed:
                    () => setState(() => _people = (_people - 1).clamp(1, 6)),
                icon: const Icon(LucideIcons.minus),
              ),
              Text('$_people', style: const TextStyle(fontSize: 24)),
              IconButton(
                onPressed:
                    () => setState(() => _people = (_people + 1).clamp(1, 6)),
                icon: const Icon(LucideIcons.plus),
              ),
            ],
          ),
          20.heightBox,
          LabelTextField(
            label: '휴대폰 번호',
            hint: '010-0000-0000',
            controller: _phoneController,
            icon: LucideIcons.phone,
          ),
          24.heightBox,
          const EmptyPlaceholder(
            title: '매장 이용 정책',
            message: '호출 후 5분 내 미입장 시 대기가 자동 취소될 수 있습니다.',
            icon: LucideIcons.shieldCheck,
          ),
          24.heightBox,
          PrimaryButton(
            label: 'Register for Waiting',
            icon: LucideIcons.send,
            onPressed: _onSubmit,
          ),
        ],
      ),
    );
  }
}
