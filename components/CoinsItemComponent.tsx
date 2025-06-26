import { View, Text, Image  } from 'react-native'
import React from 'react'

type iconItems = {
  rank: Number
  src: String
  name: String
  symbol: String
  price: Number | String
  change: Number | String
}

const CoinsItemComponent = ({rank, src, name, symbol, price, change }: any ) => {
  return (
    <View className='flex-row bg-white shadow-lg shadow-text my-2 px-2 h-20 rounded-lg'>
      <Text className='flex justify-self-center self-center text-text text-sm font-Grotesk font-normal'>{rank}</Text>
      <Image source={{ uri: src }} className="w-8 h-8 mx-2 flex justify-self-center self-center rounded-full" />

      <View className='flex-1 flex-row justify-between'>
        <View className='flex justify-self-center self-center'>
          <Text className='text-lg text-title font-GroteskBold font-bold capitalize'>
            {name}
          </Text>
          <Text className='text-text text-base font-Grotesk font-normal'>{symbol}</Text>
        </View>

        <View className='flex justify-self-center self-center'>
        <Text className="text-base text-title font-GroteskBold font-bold">{price}</Text>
        <Text className="text-green-400 font-bold text-sm">{change}</Text>
        </View>
      </View>
    </View>
  )
}

export default CoinsItemComponent