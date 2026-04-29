import React from "react";
import { View } from "react-native";
import Text from "../../ui/AppText";
import ExchangeItem, { type ExchangeItemProps } from "../../cards/community/ExchangeItem";

type Props = {
  items: ExchangeItemProps[];
};

export default function CommunityExchangeSection({ items }: Props) {
  return (
    <View className="mx-4 rounded-[32px] bg-surface-secondary p-5 gap-6">
      <View className="gap-1">
        <View className="self-start bg-lavender rounded-full px-3 py-0.5">
          <Text className="text-lavender-dark text-[10px] font-bold tracking-widest uppercase">
            Exchange
          </Text>
        </View>
        <Text className="text-heading text-2xl font-semibold tracking-tight mt-1">
          영수증 인증 교환
        </Text>
        <Text className="text-muted text-sm">인증된 영수증으로 신뢰할 수 있는 굿즈 교환</Text>
      </View>
      <View className="flex-row gap-4">
        {items.map((item) => (
          <ExchangeItem key={`${item.title}-${item.time}`} {...item} />
        ))}
      </View>
    </View>
  );
}
