import { SafeAreaView, View } from "react-native";

import CoinsScreen from "@/screens/CoinsScreen";

export default function coins() {
  return (
    <SafeAreaView className="bg-background px-6 my-10 flex-1 relative">
      <CoinsScreen />
    </SafeAreaView>
  );
}
