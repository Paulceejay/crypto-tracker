import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "../global.css";

const client = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    GroteskBold: require("../assets/fonts/SpaceGrotesk-Bold.ttf"),
    Grotesk: require("../assets/fonts/SpaceGrotesk-Regular.ttf"),
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <QueryClientProvider client={client}>
      <Stack>
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

<Stack.Screen
          name="[uuid]"
          options={{
            headerShown: false,
            presentation: "card",
          }}
        />
      </Stack>
      
    </QueryClientProvider>
  );
}
