import React, { useMemo, useState } from "react";
import {
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BottomNavBar from "../components/common/BottomNavBar";
import TopAppBar from "../components/common/TopAppBar";
import Text from "../components/ui/AppText";
import { COLORS } from "../constants/colors";
import type { TabName } from "../global/navigation/tabConfig";

type PopupSubmissionScreenProps = {
  activeTab: TabName;
  onBack: () => void;
  onTabPress: (tab: TabName) => void;
};

export default function PopupSubmissionScreen({
  activeTab,
  onBack,
  onTabPress,
}: PopupSubmissionScreenProps) {
  const [title, setTitle] = useState("");
  const [area, setArea] = useState("");
  const [note, setNote] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const canSubmit = useMemo(
    () => title.trim().length > 0 && area.trim().length > 0,
    [area, title]
  );

  const handleSubmit = () => {
    if (!canSubmit) {
      return;
    }

    setSubmitted(true);
  };

  return (
    <View className="flex-1 bg-surface">
      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />
      <TopAppBar
        variant="back"
        title="팝업 제보"
        rightIcon="checkmark-circle-outline"
        rightAccessibilityLabel="제보 접수하기"
        onLeftPress={onBack}
        onRightPress={handleSubmit}
      />

      <ScrollView
        className="flex-1"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingTop: 112,
          paddingHorizontal: 20,
          paddingBottom: 128,
          gap: 18,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="rounded-[30px] bg-primary px-5 py-6">
          <Text className="text-[13px] font-semibold uppercase tracking-[1.1px] text-white/75">
            Popup Report
          </Text>
          <Text className="mt-2 text-[28px] font-semibold leading-9 text-white">
            새로 발견한 팝업을{"\n"}팝업메이트에 알려주세요
          </Text>
          <Text className="mt-3 text-[14px] leading-5 text-white/80">
            운영팀 확인 후 홈 추천과 지도에 반영할 수 있어요.
          </Text>
        </View>

        {submitted ? (
          <View className="items-center rounded-[28px] bg-primary-light px-6 py-8">
            <Ionicons
              name="sparkles"
              size={30}
              color={COLORS.primary}
            />
            <Text className="mt-3 text-[18px] font-semibold text-heading">
              제보가 임시 접수됐어요
            </Text>
            <Text className="mt-2 text-center text-[13px] leading-5 text-muted">
              지금은 mock 흐름이라 앱 안에서만 확인됩니다. API가 붙으면
              운영팀 검수 상태까지 보여줄게요.
            </Text>
          </View>
        ) : null}

        <View className="gap-4 rounded-[28px] bg-white p-5">
          <View className="gap-2">
            <Text className="text-[14px] font-semibold text-heading">
              팝업 이름
            </Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              placeholder="예: 성수 라벤더 팝업"
              placeholderTextColor={COLORS.searchPlaceholder}
              className="min-h-12 rounded-[18px] bg-surface-secondary px-4 text-[15px] text-heading"
            />
          </View>

          <View className="gap-2">
            <Text className="text-[14px] font-semibold text-heading">
              지역
            </Text>
            <TextInput
              value={area}
              onChangeText={setArea}
              placeholder="예: 성수동"
              placeholderTextColor={COLORS.searchPlaceholder}
              className="min-h-12 rounded-[18px] bg-surface-secondary px-4 text-[15px] text-heading"
            />
          </View>

          <View className="gap-2">
            <Text className="text-[14px] font-semibold text-heading">
              메모
            </Text>
            <TextInput
              value={note}
              onChangeText={setNote}
              multiline
              textAlignVertical="top"
              placeholder="운영 기간, 위치, 예약 정보 등을 적어주세요."
              placeholderTextColor={COLORS.searchPlaceholder}
              className="min-h-[120px] rounded-[18px] bg-surface-secondary px-4 py-3 text-[15px] leading-5 text-heading"
            />
          </View>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          disabled={!canSubmit}
          onPress={handleSubmit}
          accessibilityRole="button"
          accessibilityLabel="팝업 제보 접수하기"
          accessibilityState={{ disabled: !canSubmit }}
          className={`min-h-14 items-center justify-center rounded-[18px] ${
            canSubmit ? "bg-primary" : "bg-muted-subtle"
          }`}
        >
          <Text
            className={`text-[15px] font-semibold ${
              canSubmit ? "text-white" : "text-muted"
            }`}
          >
            제보 접수하기
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <BottomNavBar activeTab={activeTab} onTabPress={onTabPress} />
    </View>
  );
}
