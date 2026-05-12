import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/router/app_page.dart';
import '../../../app/router/app_tab.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class SearchPage extends StatefulWidget {
  const SearchPage({super.key});

  @override
  State<SearchPage> createState() => _SearchPageState();
}

class _SearchPageState extends State<SearchPage> {
  final _queryController = TextEditingController(text: '성수 팝업스토어');
  String _filter = '전체';

  @override
  void dispose() {
    _queryController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    final popups = MockPopupService.popups;

    return MainShellPage(
      activeTab: AppTab.search,
      title: '검색',
      actions: [
        IconButton(
          onPressed: () => showNotReadySnackBar(context),
          icon: const Icon(LucideIcons.slidersHorizontal),
        ),
      ],
      child: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          TextField(
            controller: _queryController,
            decoration: const InputDecoration(
              prefixIcon: Icon(LucideIcons.search),
              hintText: '팝업명, 지역, 브랜드 검색',
            ),
          ),
          16.heightBox,
          FilterChipBar(
            labels: const ['전체', '성수', '한남', '강남', '라이프스타일'],
            selected: _filter,
            onSelected: (value) => setState(() => _filter = value),
          ),
          24.heightBox,
          SectionHeader(
            title: '${popups.length}건의 결과',
            caption: 'SEARCH RESULTS',
          ),
          16.heightBox,
          ...popups.map(
            (popup) => Padding(
              padding: const EdgeInsets.only(bottom: 16),
              child: PopupCard(
                popup: popup,
                onTap:
                    () => context.pushNamed(
                      AppPage.popupDetail.name,
                      pathParameters: {'id': popup.id},
                    ),
              ),
            ),
          ),
          20.heightBox,
          const SectionHeader(
            title: '검색 결과 유사 팝업',
            caption: 'Bento Grid Style',
          ),
          14.heightBox,
          Row(
            children: [
              Expanded(child: _SuggestionTile(label: '브랜드 위크')),
              12.widthBox,
              Expanded(child: _SuggestionTile(label: '미니멀리스트 쇼룸')),
            ],
          ),
        ],
      ),
    );
  }
}

class _SuggestionTile extends StatelessWidget {
  const _SuggestionTile({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 124,
      padding: const EdgeInsets.all(14),
      decoration: BoxDecoration(
        color: const Color(0xFFF0EDED),
        borderRadius: BorderRadius.circular(18),
      ),
      child: Align(
        alignment: Alignment.bottomLeft,
        child: Text(
          label,
          style: const TextStyle(fontWeight: FontWeight.w800, fontSize: 16),
        ),
      ),
    );
  }
}
