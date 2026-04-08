import React, { useMemo, useRef } from "react";
import {
  FlatList,
  PanResponder,
  Platform,
  type FlatListProps,
  type ListRenderItem,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
  View,
} from "react-native";

type HorizontalCardListProps<ItemT> = {
  data: ItemT[];
  keyExtractor: (item: ItemT, index: number) => string;
  renderItem: ListRenderItem<ItemT>;
  contentPaddingRight?: number;
} & Omit<
  FlatListProps<ItemT>,
  "data" | "renderItem" | "keyExtractor" | "horizontal"
>;

export default function HorizontalCardList<ItemT>({
  data,
  keyExtractor,
  renderItem,
  contentPaddingRight = 16,
  ...rest
}: HorizontalCardListProps<ItemT>) {
  const listRef = useRef<FlatList<ItemT>>(null);
  const scrollOffsetRef = useRef(0);
  const dragStartOffsetRef = useRef(0);

  const handleScroll = (
    event: NativeSyntheticEvent<NativeScrollEvent>
  ) => {
    scrollOffsetRef.current = event.nativeEvent.contentOffset.x;
  };

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gestureState) =>
          Platform.OS === "web" &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy) &&
          Math.abs(gestureState.dx) > 6,
        onPanResponderGrant: () => {
          dragStartOffsetRef.current = scrollOffsetRef.current;
        },
        onPanResponderMove: (_, gestureState) => {
          if (Platform.OS !== "web") {
            return;
          }

          listRef.current?.scrollToOffset({
            animated: false,
            offset: Math.max(0, dragStartOffsetRef.current - gestureState.dx),
          });
        },
      }),
    []
  );

  return (
    <View {...(Platform.OS === "web" ? panResponder.panHandlers : {})}>
      <FlatList
        ref={listRef}
        horizontal
        data={data}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        nestedScrollEnabled
        bounces
        alwaysBounceHorizontal
        overScrollMode="never"
        scrollEventThrottle={16}
        onScroll={handleScroll}
        ItemSeparatorComponent={() => <View className="w-4" />}
        contentContainerStyle={{ paddingRight: contentPaddingRight }}
        {...rest}
      />
    </View>
  );
}
