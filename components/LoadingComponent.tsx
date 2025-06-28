import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingComponent = () => {
  return (
    <View className="flex-1 justify-center items-center">
      <ActivityIndicator color={"#A288FD"} />
      <Text className="text-lg text-title font-GroteskBold font-bold capitalize">
        Loading...
      </Text>
    </View>
  );
};

export default LoadingComponent;
