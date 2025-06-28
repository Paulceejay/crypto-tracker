import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'
import React from 'react'
import CoinChangeText from './CoinChangeText';
import { useRouter } from 'expo-router';

type coinProps = {
  rank: Number | any
  src: String
  name: String
  symbol: String
  price: Number | String
  change: Number | String
  uuid: Number | String
}

const CoinsItemComponent = ({rank, src, name, symbol, price, change, uuid }: coinProps) => {
  const router = useRouter()

  const icon = src?.endsWith('.svg')
  ? src.replace('.svg', '.png')
  : src;

  return (
    <TouchableOpacity onPress={() => router.push(`/${uuid}`)} className='flex-row bg-white shadow-lg shadow-text px-3 h-20 rounded-lg'>
      <Text className='flex justify-self-center self-center text-text text-sm font-Grotesk font-normal'>{rank}</Text>
      <Image resizeMode='cover' source={{ uri: icon}} className="w-10 h-10 mx-2 flex justify-self-center self-center rounded-full" />

      <View className='flex-1 flex-row justify-between'>
        <View className='flex justify-self-center self-center'>
          <Text className='text-lg text-title font-GroteskBold font-bold capitalize'>
            {name}
          </Text>
          <Text className='text-text text-base font-Grotesk font-normal'>{symbol}</Text>
        </View>

        <View className='flex justify-self-center self-center'>
        <Text className="text-base text-title font-GroteskBold font-bold">{parseFloat(price).toFixed(2)} $</Text>
      
        <CoinChangeText value={change} className='font-bold text-sm text-center'/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CoinsItemComponent