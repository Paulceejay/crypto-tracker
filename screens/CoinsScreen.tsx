import { View, Text, FlatList, Image, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { getAllCoins } from "@/api/getAllCoins";
import CoinsItemComponent from "@/components/CoinsItemComponent";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import LoadingComponent from "@/components/LoadingComponent";

const CoinsScreen = () => {
  const {
    data,
    error,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    queryFn: getAllCoins,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    refetchInterval: 200, // to simply update my coins price changes evry 2s
    refetchOnMount: true,
  });

  if (isLoading) {
    return <LoadingComponent />;
  }
  // coins data
  const coins = data?.pages.flatMap((page) => page.coins);

  return (
    <View className="overflow-hidden">
      <FlatList
        className="gap-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15 }}
        data={coins}
        keyExtractor={(item) => item.uuid + item.name}
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
        onEndReached={() => {
          if (hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
          }
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ActivityIndicator color={"#A288FD"} className="my-4" />
          ) : null
        }
      />
    </View>
  );
};

export default CoinsScreen;
