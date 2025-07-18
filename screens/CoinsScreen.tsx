import { View, Text, FlatList, ActivityIndicator } from "react-native";
import { useState, useCallback } from "react";
import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import CoinsItemComponent from "@/components/CoinsItemComponent";
import LoadingComponent from "@/components/LoadingComponent";
import SearchComponent from "@/components/SearchComponent";
import { getAllCoins } from "@/api/getAllCoins";
import { searchCoin } from "@/api/searchCoin";

const CoinsScreen = () => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Debounce the search text input
  const debouncedSearch = useCallback(
    debounce((text: string) => {
      setSearchQuery(text);
    }, 500),
    []
  );

  const handleChange = (text: string) => {
    setSearchInput(text);
    debouncedSearch(text);
  };

  // coins data to display for the user immediately after loading
  const {
    data: getAllCoinsData,
    error: allCoinsError,
    isLoading: allCoinIsLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ["coins"],
    queryFn: getAllCoins,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset,
    refetchInterval: 1000, // to simply update my coins price changes evry 1 second
    refetchOnMount: true,
  });

  // coins data for when a user is searching
  const {
    data: searchData,
    error: searchError,
    isLoading: searchIsLoading,
  } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: () => searchCoin(searchQuery),
    enabled: !!searchQuery,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const isSearching = !!searchQuery;
  // coins data switching data when searching and when not searching
  const coins = isSearching
    ? searchData
    : getAllCoinsData?.pages.flatMap((page) => page.coins);

  if (allCoinIsLoading) {
    return <LoadingComponent />;
  }

  return (
    <View className="overflow-hidden mb-14">
      <SearchComponent value={searchInput} onChangeText={handleChange} />
      <FlatList // Flatlist to display default coins and also while searching
        className="gap-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 15 }}
        data={coins}
        keyExtractor={(item) => item.uuid + item.name}
        renderItem={({ item }) => (
          <CoinsItemComponent
            name={item.name}
            symbol={item.symbol}
            rank={item.rank}
            src={item.iconUrl}
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
          ) :  <Text className="text-center text-gray-400 mt-8">
          No results found.
        </Text>
        }
      />
    </View>
  );
};

export default CoinsScreen;
