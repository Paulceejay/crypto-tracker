import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import CoinChangeText from "./CoinChangeText";
import MarketStatsComponent from "./MarketStatsComponent";
import { useRouter } from "expo-router";
import CoinChart from "./CoinChart";

type coinDetailsProps = {
  rank: Number | any;
  src: String;
  name: String;
  symbol: String;
  price: Number | String;
  change: Number | String;
  marketCap: String;
  volume: Number;
  allTimeHigh: number;
};

const CoinDetailsComponent = ({
  rank,
  src,
  name,
  symbol,
  price,
  change,
  marketCap,
  volume,
  allTimeHigh,
  uuid,
}: any) => {
  const router = useRouter();

  const icon = src?.endsWith(".svg") ? src.replace(".svg", ".png") : src;

  return (
    <View className="mt-5">
      {/* arrow left || coin name and symbol || star */}
      <View className="flex-row justify-between">
        <TouchableOpacity onPress={() => router.back()}>
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
          <Text className="text-base text-text font-normal font-GroteskBold">
            {name} price
          </Text>
          <Text className="text-lg text-title font-GroteskBold font-bold my-1">
            ${parseFloat(price).toFixed(2)}
          </Text>
          <CoinChangeText value={change} />
        </View>

        <Image
          resizeMode="cover"
          source={{ uri: icon }}
          className="w-20 h-20 mx-2 mt-2 flex justify-self-center self-center rounded-full"
        />
      </View>

      {/* coin chart */}
      <View className="bg-white rounded-lg p-2">
       <CoinChart name={name} uuid={uuid} /> 
      </View>

      {/* coin basic market stats */}
      <Text className="text-xl text-title2 font-bold font-GroteskBold my-5">
        Market Statistics
      </Text>

      <View className="flex flex-row flex-wrap justify-between w-full">
        <MarketStatsComponent title="Market Cap" item={marketCap} />
        <MarketStatsComponent title="Volume (24 hours)" item={volume} />
        <MarketStatsComponent title="Popularity" item={`#${rank}`} />
        <MarketStatsComponent
          title="All Time High"
          item={parseFloat(allTimeHigh).toFixed(2)}
        />
      </View>
    </View>
  );
};

export default CoinDetailsComponent;
