import { Stack } from "expo-router";
import { useFonts } from 'expo-font';
import "../global.css"

export default function RootLayout() {
  const [loaded] = useFonts({
    GroteskBold: require('../assets/fonts/SpaceGrotesk-Bold.ttf'),
    Grotesk: require('../assets/fonts/SpaceGrotesk-Regular.ttf'),
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    return null;
  }
  return <Stack>
    <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />

<Stack.Screen
          name="coins"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
  </Stack>;
}
