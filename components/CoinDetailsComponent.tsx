import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Feather from '@expo/vector-icons/Feather';
import CoinChangeText from "./CoinChangeText";
import MarketStatsComponent from "./MarketStatsComponent";

type coinDetailsProps = {
    rank: Number | any
    src: String
    name: String
    symbol: String
    price: Number | String
    change: Number | String
    marketCap: String
    volume: Number
  }

const CoinDetailsComponent = ({rank, src, name, symbol, price, change, marketCap, volume}: any) => {
    const icon = src?.endsWith('.svg')
    ? src.replace('.svg', '.png')
    : src;
    
  return (
    <View className='mt-5'>
        {/* arrow left || coin name and symbol || star */}
      <View className="flex-row justify-between">
        <TouchableOpacity>
          <Feather name="arrow-left" size={24} color="#010015" />
        </TouchableOpacity>
        <View className="flex-row justify-center items-center gap-2">
          <Text className="text-xl text-title font-normal font-GrotoeskBold capitalize">
           {name}
          </Text>
          <Text className="text-sm text-text font-normal font-Grotesk uppercase">
           ({symbol})
          </Text>
        </View>
        <Feather name="star" size={24} color="black" />
      </View>

{/* coin name, price, price change and coin icon */}
<View className="flex-row justify-between my-10">
<View>
    <Text className="text-base text-text font-normal font-GroteskBold">{name} price</Text>
    <Text className="text-lg text-title font-GroteskBold font-bold my-1">${parseFloat(price).toFixed(0)}</Text>
    <CoinChangeText value={(change)} />
</View>

<Image resizeMode='cover' source={{ uri: icon}} className="w-20 h-20 mx-2 flex justify-self-center self-center rounded-full" />
</View>

{/* coin chart */}
<View></View>

{/* coin stats */}
<Text className="text-base text-title2 font-semibold font-GroteskBold">Market Statistics</Text>

<View className="flex flex-row flex-wrap justify-between w-full">
   
    <MarketStatsComponent title="Market Cap" item={marketCap} />
    <MarketStatsComponent title="Volume (24 hours)" item={volume} />
    <MarketStatsComponent title="Popularity" item={`#${rank}`} />
</View>
    </View>
  );
};

export default CoinDetailsComponent;
