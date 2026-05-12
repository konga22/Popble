import 'package:flutter_test/flutter_test.dart';
import 'package:popupmate/main.dart';

void main() {
  testWidgets('PopupMate boots into loading flow', (tester) async {
    await tester.pumpWidget(const AppRoot());

    expect(find.text('PopupMate'), findsOneWidget);
    expect(find.text('초기화 중...'), findsOneWidget);
  });
}
