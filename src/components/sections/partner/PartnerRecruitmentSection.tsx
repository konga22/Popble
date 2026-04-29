import React, { useState } from "react";
import { View } from "react-native";
import PartnerFilterChipBar from "./PartnerFilterChipBar";
import PartnerRecruitCard from "../../cards/partner/PartnerRecruitCard";
import { COLORS } from "../../../constants/colors";
import { MOCK_IMAGES } from "../../../constants/mockImages";

const IMG_POPUP1 = MOCK_IMAGES.partnerObject;
const IMG_POPUP2 = MOCK_IMAGES.partnerHyundai;
const IMG_POPUP3 = MOCK_IMAGES.partnerBeauty;
const IMG_AVA1 = MOCK_IMAGES.avatarOne;
const IMG_AVA2 = MOCK_IMAGES.avatarTwo;
const IMG_AVA3 = MOCK_IMAGES.avatarThree;

export default function PartnerRecruitmentSection() {
  const [activeFilter, setActiveFilter] = useState("전체");

  return (
    <View className="gap-24">
      <PartnerFilterChipBar active={activeFilter} onSelect={setActiveFilter} />

      <View className="px-6 gap-5">
        <PartnerRecruitCard
          image={IMG_POPUP1}
          badge="모집중"
          badgeColor={COLORS.primary}
          title="이번주 토요일 오브제 마켓 같이 가실 분!"
          subtitle="성수동 • 11월 25일 오후 2시"
          tags={["#사진촬영", "#커피수다", "#20대"]}
          dDay="D-3"
          slots={2}
          avatars={[IMG_AVA1, IMG_AVA2, IMG_AVA3]}
          avatarBgs={[COLORS.lavender, COLORS.accentPink, COLORS.primaryLight]}
        />
        <PartnerRecruitCard
          image={IMG_POPUP2}
          badge="마감임박"
          badgeColor={COLORS.urgent}
          title="더현대 웨이팅 메이트 구해요 (사전예약 완료)"
          subtitle="더현대 서울 • 11월 26일 오전 11시"
          tags={["#웨이팅메이트", "#쇼핑", "#가이드가능"]}
          dDay="D-4"
          slots={1}
          avatars={[IMG_AVA2, IMG_AVA3]}
          avatarBgs={[COLORS.accentPink, COLORS.lavender]}
        />
        <PartnerRecruitCard
          image={IMG_POPUP3}
          badge="모집중"
          badgeColor={COLORS.accentPlum}
          title="글로우 뷰티 클로젯 팝업 동행 구해요"
          subtitle="청담동 • 11월 27일 오후 1시"
          tags={["#뷰티팝업", "#인스타감성", "#여성만"]}
          dDay="D-5"
          slots={3}
          avatars={[IMG_AVA1, IMG_AVA3]}
          avatarBgs={[COLORS.primaryLight, COLORS.lavender]}
        />
      </View>
    </View>
  );
}
