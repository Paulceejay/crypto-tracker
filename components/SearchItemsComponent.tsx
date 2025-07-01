import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';

type searchProps = {
  src: String
  name: String
  symbol: String
  price: Number | String
  uuid: Number | String
}

const SearchItemsComponent = ({ src, name, symbol, price, uuid }: searchProps) => {
  const router = useRouter()

  const icon = src?.endsWith('.svg')
  ? src.replace('.svg', '.png')
  : src;

  return (
    <TouchableOpacity onPress={() => router.push(`/${uuid}`)} className='flex-row bg-white shadow-lg shadow-text px-3 h-20 rounded-lg'>
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

        </View>
      </View>
    </TouchableOpacity>
  )
}

export default SearchItemsComponent