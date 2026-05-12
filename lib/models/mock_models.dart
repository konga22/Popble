import 'package:flutter/material.dart';

class Popup {
  const Popup({
    required this.id,
    required this.title,
    required this.category,
    required this.area,
    required this.address,
    required this.subtitle,
    required this.period,
    required this.heroLabel,
    required this.waitTime,
    required this.entryFee,
    required this.hours,
    required this.distance,
    required this.dday,
    required this.tags,
    required this.colors,
  });

  final String id;
  final String title;
  final String category;
  final String area;
  final String address;
  final String subtitle;
  final String period;
  final String heroLabel;
  final String waitTime;
  final String entryFee;
  final String hours;
  final String distance;
  final String dday;
  final List<String> tags;
  final List<Color> colors;

  Map<String, dynamic> toMap() => {
    'id': id,
    'title': title,
    'category': category,
    'area': area,
    'address': address,
    'subtitle': subtitle,
    'period': period,
    'heroLabel': heroLabel,
    'waitTime': waitTime,
    'entryFee': entryFee,
    'hours': hours,
    'distance': distance,
    'dday': dday,
    'tags': tags,
  };
}

class PopupReview {
  const PopupReview({
    required this.author,
    required this.date,
    required this.rating,
    required this.body,
  });

  final String author;
  final String date;
  final double rating;
  final String body;
}

class CommunityPost {
  const CommunityPost({
    required this.author,
    required this.timeAgo,
    required this.category,
    required this.title,
    required this.popupTitle,
    required this.body,
    required this.likes,
    required this.comments,
    required this.status,
  });

  final String author;
  final String timeAgo;
  final String category;
  final String title;
  final String popupTitle;
  final String body;
  final int likes;
  final int comments;
  final String status;
}

class InventoryProduct {
  const InventoryProduct({
    required this.name,
    required this.category,
    required this.price,
    required this.status,
  });

  final String name;
  final String category;
  final String price;
  final String status;
}

class WaitingStatus {
  const WaitingStatus({
    required this.currentTeams,
    required this.estimatedMinutes,
    required this.myNumber,
    required this.currentNumber,
  });

  final int currentTeams;
  final int estimatedMinutes;
  final int myNumber;
  final int currentNumber;
}

class UserBadge {
  const UserBadge({required this.title, required this.caption});

  final String title;
  final String caption;
}

class UserProfile {
  const UserProfile({
    required this.name,
    required this.handle,
    required this.bio,
    required this.reviewCount,
    required this.savedCount,
    required this.badges,
  });

  final String name;
  final String handle;
  final String bio;
  final int reviewCount;
  final int savedCount;
  final List<UserBadge> badges;
}

class CalendarEvent {
  const CalendarEvent({
    required this.day,
    required this.title,
    required this.area,
    required this.period,
    required this.status,
  });

  final int day;
  final String title;
  final String area;
  final String period;
  final String status;
}
