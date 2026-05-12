class MockAuthService {
  const MockAuthService._();

  static Future<bool> login({
    required String email,
    required String password,
  }) async {
    await Future<void>.delayed(const Duration(milliseconds: 450));
    return email.trim().isNotEmpty && password.trim().isNotEmpty;
  }
}
