import React from "react";
import { useRouter } from "expo-router";
import TabScreenTransition from "../src/components/navigation/TabScreenTransition";
import HomeScreen from "../src/screens/HomeScreen";
import { useAppScreenProps } from "../src/global/navigation/NavigationContext";
import type { HomeSectionKey } from "../src/features/home/homeData";

export default function HomeRoute() {
  const router = useRouter();
  const screenProps = useAppScreenProps();

  return (
    <TabScreenTransition direction={screenProps.tabTransitionDirection}>
      <HomeScreen
        {...screenProps}
        onOpenPopup={(popupId) => router.push(`/popups/${popupId}`)}
        onOpenPopupSection={(section: HomeSectionKey) =>
          router.push(`/popups/section/${section}`)
        }
        onOpenSearch={(query) =>
          router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search")
        }
        onOpenSubmission={() => router.push("/popups/submit")}
      />
    </TabScreenTransition>
  );
}
