import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import CoinChangeText from './CoinChangeText';
import { useRouter } from 'expo-router';
import { truncateText } from './trunicateText';

type coinProps = {
  rank: number | any
  src: string
  name: string
  symbol: String
  price: number | string
  change: number | string
  uuid: number | string
}

const CoinsItemComponent = ({rank, src, name, symbol, price, change, uuid }: coinProps) => {
  const router = useRouter()

  const icon = src?.endsWith('.svg')
  ? src.replace('.svg', '.png')
  : src;

  const hasValidPrice = !isNaN(price)

  return (
    <TouchableOpacity onPress={() => router.push(`/${uuid}`)} className='flex-row bg-white shadow-lg shadow-text px-3 h-20 rounded-lg'>
      <Text className='flex justify-self-center self-center text-text text-sm font-Grotesk font-normal'>{rank}</Text>
      <Image resizeMode='cover' source={{ uri: icon}} className="w-10 h-10 mx-2 flex justify-self-center self-center rounded-full" />

      <View className='flex-1 flex-row justify-between'>
        <View className='flex justify-self-center self-center'>
          <Text className='text-lg text-title font-GroteskBold font-bold capitalize'>
          {truncateText({text: name, maxLength: 20})}
          </Text>
          <Text className='text-text text-base font-Grotesk font-normal'>{symbol}</Text>
        </View>

        <View className='flex justify-self-center self-center'>
        <Text className="text-base text-title font-GroteskBold font-bold">{hasValidPrice ? parseFloat(price).toFixed(2) : ""} $</Text>
      
        <CoinChangeText value={change} className='font-bold text-sm text-center'/>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default CoinsItemComponent