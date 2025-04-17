import React from "react";
import { useColorScheme } from "~/lib/useColorScheme";
import { Platform } from "react-native";
import { setAndroidNavigationBar } from "~/lib/android-navigation-bar";
import { Stack } from "expo-router";
import { ThemeToggle } from "~/components/ThemeToggle";

const useIsomorphicLayoutEffect =
  Platform.OS === "web" && typeof window === "undefined" ? React.useEffect : React.useLayoutEffect;

export default function HomeLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === "web") {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add("bg-background");
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"

        options={{
          headerBackVisible: false,
          headerSearchBarOptions: {
            placeholder: "Search",
            onChangeText: (e) => {

              if (e.nativeEvent.text.length > 3) {
                console.log(e.nativeEvent.text);
              }
            },
            onCancelButtonPress: () => {
              console.log("cancel");
            },
          },

          headerTitle: "Home",
          headerRight: () => <ThemeToggle />,
        }}
      />
    </Stack>
  );
}
