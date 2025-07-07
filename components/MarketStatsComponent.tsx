import { View, Text } from 'react-native'
import React from 'react'

const MarketStatsComponent = ({title, item}: any) => {

    // Format price for display
    const formatPrice = (label: any) => {
      const price = Number(label);
      if (isNaN(price)) return label;
    
      if (price >= 1_000_000_000_000) {
        return `$${(price / 1_000_000_000_000).toFixed(2)} T`;
      } else if (price >= 1_000_000_000) {
        return `$${(price / 1_000_000_000).toFixed(2)} B`;
      } else if (price >= 1_000_000) {
        return `$${(price / 1_000_000).toFixed(2)} M`;
      } else if (price >= 1_000) {
        return `$${(price / 1_000).toFixed(2)} K`;
      } else if (price >= 1) {
        return `$${price.toFixed(2)}`;
      } else {
        return `$${price.toFixed(4)}`;
      }
    };

  return (
    <View className='w-[45%] my-2'>
      <Text className='text-sm text-text font-GroteskBold font-semibold py-2'>{title}</Text>
      <Text className='text-sm text-title font-bold font-Grotesk'>{formatPrice(item)}</Text>
    </View>
  )
}

export default MarketStatsComponent