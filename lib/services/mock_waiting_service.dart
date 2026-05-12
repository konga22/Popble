import '../models/mock_models.dart';

class MockWaitingService {
  const MockWaitingService._();

  static const status = WaitingStatus(
    currentTeams: 12,
    estimatedMinutes: 45,
    myNumber: 14,
    currentNumber: 12,
  );
}
