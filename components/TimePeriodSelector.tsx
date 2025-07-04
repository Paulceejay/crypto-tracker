import React from 'react';
import { ScrollView, Text, Dimensions } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { timePeriods } from '@/constants/coinsContants';

const { width } = Dimensions.get('window');

interface TimePeriodSelectorProps {
    period: string;
    onPeriodChange: (period: string) => void;
  }

const TimePeriodSelector = ({ period, onPeriodChange }: TimePeriodSelectorProps) => {
  return (
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    scrollEnabled={false}
    contentContainerStyle={{marginBottom: 20, paddingHorizontal: 8}}
    className='w-full'
  >
    {timePeriods.map((time) => (
      <Animated.View 
        key={time.id}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        <Text     
         className={`text-base font-medium rounded-full font-Grotesk mx-1 py-2 px-4 ${
          period === time.id 
            ? "bg-title text-white" 
            : "bg-transparent text-text"
        }`}
          onPress={() => onPeriodChange(time.id)}
        >
          {time.label}
        </Text>
      </Animated.View>
    ))}
  </ScrollView>
  )
}

export default TimePeriodSelector