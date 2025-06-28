import { View } from "react-native";
import React from "react";
import CoinDetailsScreen from "@/screens/CoinDetailsScreen";

const coin = () => {
  return (
    <View className="bg-background px-6 my-10 flex-1">
   <CoinDetailsScreen />
    </View>
  );
};

export default coin;
