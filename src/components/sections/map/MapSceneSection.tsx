import React from "react";
import { Image, View } from "react-native";
import MapDetailCard from "../../cards/map/MapDetailCard";
import MapFilterChips from "./MapFilterChips";
import MapPin from "../../cards/map/MapPin";
import MapRefreshButton from "../../cards/map/MapRefreshButton";
import { MOCK_IMAGES } from "../../../constants/mockImages";

const IMG_MAP_BG = MOCK_IMAGES.mapScene;
const IMG_DETAIL_THUMB = MOCK_IMAGES.mapDetail;

type Props = {
  activeChip: string;
  onSelectChip: (value: string) => void;
};

export default function MapSceneSection({ activeChip, onSelectChip }: Props) {
  return (
    <View className="flex-1 bg-surface">
      <Image
        source={{ uri: IMG_MAP_BG }}
        className="absolute inset-0 w-full h-full opacity-40"
        resizeMode="cover"
        style={{ width: "100%", height: "100%" }}
      />
      <View className="absolute inset-0 bg-surface opacity-60" />

      <MapFilterChips active={activeChip} onSelect={onSelectChip} />
      <MapPin label="성수 디올" top={294} left={97} />
      <MapPin label="홍대 팝업" top={442} left={183} />
      <MapPin label="현재 선택됨" top={370} left={182} selected />
      <MapRefreshButton />
      <MapDetailCard
        imageUri={IMG_DETAIL_THUMB}
        title="무신사 뷰티 X\n라벤더 팝업 스토어"
        dDay="D-4"
        waitTime="대기 45분"
        distance="350m"
      />
    </View>
  );
}
