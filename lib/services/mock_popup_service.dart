import 'package:flutter/material.dart';

import '../models/mock_models.dart';

class MockPopupService {
  const MockPopupService._();

  static final popups = <Popup>[
    const Popup(
      id: 'maison-kitsune',
      title: '메종 키츠네 가든 팝업',
      category: 'Fashion & Lifestyle',
      area: '성수동',
      address: '서울 성동구 연무장길 12',
      subtitle: '도심 속 작은 정원에서 만나는 메종의 큐레이션',
      period: '2024.05.10 - 2024.06.02',
      heroLabel: 'COMING SOON',
      waitTime: '약 45분',
      entryFee: '무료',
      hours: '11:00 - 20:00',
      distance: '200m away',
      dday: 'D-4',
      tags: ['FASHION', 'GARDEN', '성수'],
      colors: [Color(0xFF24262B), Color(0xFF8A7462)],
    ),
    const Popup(
      id: 'object-house',
      title: '오브제 아트 하우스',
      category: 'Living / Art',
      area: '한남동',
      address: '서울 용산구 한남대로 42',
      subtitle: '일상의 오브제를 새롭게 바라보는 전시형 팝업',
      period: '2024.05.20 - 2024.06.12',
      heroLabel: 'HOT',
      waitTime: '약 20분',
      entryFee: '무료',
      hours: '12:00 - 21:00',
      distance: '1.1km',
      dday: 'D-2',
      tags: ['LIVING', 'OBJECT', '한남'],
      colors: [Color(0xFF5A4C43), Color(0xFFD8C7B6)],
    ),
    const Popup(
      id: 'aromatic-cloud',
      title: 'Aromatic Cloud Popup',
      category: 'Beauty',
      area: '성수동',
      address: '서울 성동구 성수동 2가 314-1',
      subtitle: '향과 빛으로 구성한 체험형 뷰티 팝업',
      period: '2024.05.24 - 2024.06.09',
      heroLabel: 'NEW',
      waitTime: '약 12분',
      entryFee: '무료',
      hours: '10:30 - 19:30',
      distance: '500m',
      dday: '오늘 마감',
      tags: ['BEAUTY', 'AROMA', 'NEW'],
      colors: [Color(0xFF515D62), Color(0xFFB7C6C8)],
    ),
  ];

  static final reviews = <PopupReview>[
    const PopupReview(
      author: '김민지',
      date: '2024.05.15',
      rating: 4.8,
      body: '공간이 너무 예뻐요. 평일에 방문해서 웨이팅 없이 잘 구경했습니다.',
    ),
    const PopupReview(
      author: 'Park Jun',
      date: '2024.05.12',
      rating: 4.6,
      body: '입구 정원이 포토존이에요. 주말에는 미리 예약하고 오시는 걸 추천합니다.',
    ),
    const PopupReview(
      author: '이영희',
      date: '2024.05.10',
      rating: 4.9,
      body: '성수동 오면 꼭 들러야 할 팝업. 굿즈들도 다양해서 좋았어요.',
    ),
  ];

  static final inventory = <InventoryProduct>[
    const InventoryProduct(
      name: '한정판 세라믹 머그',
      category: 'Living / Ivory Matte',
      price: '₩32,000',
      status: '여유',
    ),
    const InventoryProduct(
      name: '아로마 디퓨저 세트',
      category: 'Beauty / Cloud',
      price: '₩48,000',
      status: '품절 임박',
    ),
    const InventoryProduct(
      name: '시그니처 토트백',
      category: 'Fashion / Black',
      price: '₩39,000',
      status: '품절',
    ),
  ];

  static final calendarEvents = <CalendarEvent>[
    const CalendarEvent(
      day: 1,
      title: '성수 XYZ 팝업',
      area: '성수동',
      period: '2024.12.01 - 2024.12.15',
      status: '운영 중',
    ),
    const CalendarEvent(
      day: 13,
      title: '한남 모던 갤러리 팝업',
      area: '한남동',
      period: '2024.11.25 - 2024.12.13',
      status: 'D-2 종료 임박',
    ),
    const CalendarEvent(
      day: 25,
      title: '청담 시그니처 뷰티',
      area: '청담동',
      period: '2024.12.05 - 2024.12.25',
      status: '예약중',
    ),
  ];

  static Popup popupById(String id) {
    return popups.firstWhere(
      (popup) => popup.id == id,
      orElse: () => popups.first,
    );
  }
}
