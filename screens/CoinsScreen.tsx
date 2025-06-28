import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getAllCoins } from "@/api/getAllCoins";
import CoinsItemComponent from "@/components/CoinsItemComponent";
import { useQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/LoadingComponent";

let icon = "" 
const CoinsScreen = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["coins"],
    queryFn: getAllCoins,
  });

  if (isLoading) {
    return (
      <LoadingComponent />
    );
  }
 
  return (
    <View className="overflow-hidden">
      <FlatList
        className="gap-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{gap: 15}}
        data={data?.coins}
        keyExtractor={(item) => item.uuid}
        renderItem={({ item }) => (
          <CoinsItemComponent
            rank={item.rank}
            src={item.iconUrl}
            name={item.name}
            symbol={item.symbol}
            price={item.price}
            change={item.change}
            uuid={item.uuid}
          />
        )}
      />
    </View>
  );
};

export default CoinsScreen;
