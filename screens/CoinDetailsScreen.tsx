import { View, Text } from 'react-native'
import React from 'react'
import { useQuery } from "@tanstack/react-query";
import { getCoinDetails } from "@/api/getCoinDetails";
import { useLocalSearchParams } from "expo-router";
import LoadingComponent from "@/components/LoadingComponent";
import CoinDetailsComponent from "@/components/CoinDetailsComponent";

const CoinDetailsScreen = () => {
 
  const { uuid } = useLocalSearchParams();

  const { data, error, isLoading } = useQuery({
    queryKey: ["coins", uuid],
    queryFn: () => getCoinDetails(uuid),
  });

  if(isLoading){
    return <LoadingComponent />
  }
  // console.log(historyData)
  return (
    <View>
        <CoinDetailsComponent
        src={data?.iconUrl}
        name={data?.name}
        symbol={data?.symbol}
        change={data?.change}
        price={data?.price}
        marketCap={data?.marketCap}
        volume={data?.['24hVolume']}
        rank={data?.rank}
        allTimeHigh={data?.allTimeHigh.price}
        uuid={data?.uuid}
      />
    </View>
  )
}

export default CoinDetailsScreen