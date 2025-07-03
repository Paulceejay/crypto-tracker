import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { TIME_PERIODS } from '@/constants/coinsContants';

interface TimePeriodSelectorProps {
    period: string;
    onPeriodChange: (period: string) => void;
  }

const TimePeriodSelector = ({ period, onPeriodChange }: TimePeriodSelectorProps) => {
  return (
    <ScrollView 
    horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={styles.container}
  >
    {TIME_PERIODS.map((timePeriod) => (
      <Animated.View 
        key={timePeriod.id}
        entering={FadeIn.duration(300)}
        exiting={FadeOut.duration(200)}
      >
        <Text
          style={[
            styles.button,
            period === timePeriod.id && styles.activeButton
          ]}
          onPress={() => onPeriodChange(timePeriod.id)}
        >
          {timePeriod.label}
        </Text>
      </Animated.View>
    ))}
  </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      marginBottom: 20,
      paddingHorizontal: 8,
    },
    button: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      marginHorizontal: 4,
      borderRadius: 20,
      backgroundColor: '#f0f0f0',
      color: '#666',
      fontSize: 14,
      fontWeight: '500',
    },
    activeButton: {
      backgroundColor: '#007AFF',
      color: 'white',
    },
  });

export default TimePeriodSelector