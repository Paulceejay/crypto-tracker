import { View, Text } from 'react-native'
import React from 'react'

const MarketStatsComponent = ({title, item}: any) => {
  return (
    <View className='w-2/6 aspect-square'>
      <Text className='text-sm text-text font-GroteskBold font-semibold'>{title}</Text>
      <Text className='text-sm text-title font-bold font-Grotesk'>{item}</Text>
    </View>
  )
}

export default MarketStatsComponent