import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import '../../../app/extensions/spacing_extension.dart';
import '../../../app/theme/app_theme.dart';
import '../../../services/mock_popup_service.dart';
import '../../common/app_components.dart';

class InventoryPage extends StatefulWidget {
  const InventoryPage({super.key});

  @override
  State<InventoryPage> createState() => _InventoryPageState();
}

class _InventoryPageState extends State<InventoryPage> {
  String _category = '전체';

  @override
  Widget build(BuildContext context) {
    final products = MockPopupService.inventory;

    return Scaffold(
      appBar: const AppTopBar(title: '재고 현황', showBack: true),
      body: ListView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 28),
        children: [
          const TextField(
            decoration: InputDecoration(
              prefixIcon: Icon(LucideIcons.search),
              hintText: '상품명을 입력하세요',
            ),
          ),
          16.heightBox,
          FilterChipBar(
            labels: const ['전체', '의류', '액세서리', '리빙', '여유', '품절 임박', '품절'],
            selected: _category,
            onSelected: (value) => setState(() => _category = value),
          ),
          24.heightBox,
          ...products.map(
            (product) => Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: ListTile(
                tileColor: AppColors.surface,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                  side: const BorderSide(color: AppColors.softBorder),
                ),
                leading: const Icon(LucideIcons.package),
                title: Text(product.name),
                subtitle: Text('${product.category} · ${product.price}'),
                trailing: StatusBadge(
                  label: product.status,
                  tone:
                      product.status == '품절'
                          ? BadgeTone.danger
                          : product.status == '품절 임박'
                          ? BadgeTone.warning
                          : BadgeTone.success,
                ),
              ),
            ),
          ),
        ],
      ),
    );
  }
}
