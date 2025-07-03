import { View, Text } from 'react-native'
import React from 'react'

const MarketStatsComponent = ({title, item}: any) => {
  return (
    <View className='w-[45%] my-2'>
      <Text className='text-sm text-text font-GroteskBold font-semibold py-2'>{title}</Text>
      <Text className='text-sm text-title font-bold font-Grotesk'>{item}</Text>
    </View>
  )
}

export default MarketStatsComponent