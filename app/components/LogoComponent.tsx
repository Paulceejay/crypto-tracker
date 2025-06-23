import { View, Text } from 'react-native'
import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import MaskedView from '@react-native-masked-view/masked-view';

const LogoComponent = () => {
  return (
    <View className='absolute top-10 flex-row gap-2'>
      <Text className="text-2xl font-extrabold">Crypto</Text>
     
      <MaskedView
    maskElement={
      <Text className="text-2xl font-extrabold">Cloud</Text>
    }
  >
    <LinearGradient
      colors={['#A288FD', '#622ff6', '#A288FD']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      className="w-full"
    >
      {/* Invisible filler to apply gradient */}
      <Text className="opacity-0 text-2xl font-extrabold">
        Cloud
      </Text>
    </LinearGradient>
  </MaskedView>
    </View>
  )
}

export default LogoComponent