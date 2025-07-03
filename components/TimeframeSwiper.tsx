import React, { useRef } from 'react';
import { View, Text, PanResponder } from 'react-native';

const timeframes = ['1h', '24h', '7d'];

const TimeframeSwiper = ({ selected, onChange }: any) => {
    const index = useRef(timeframes.indexOf(selected));

    const responder = useRef(
      PanResponder.create({
        onMoveShouldSetPanResponder: (_, gesture) =>
          Math.abs(gesture.dx) > 20,
        onPanResponderRelease: (_, gesture) => {
          if (gesture.dx > 20 && index.current > 0) {
            index.current--;
            onChange(timeframes[index.current]);
          } else if (gesture.dx < -20 && index.current < timeframes.length - 1) {
            index.current++;
            onChange(timeframes[index.current]);
          }
        },
      })
    ).current;
  
    return (
      <View className="items-center my-2" {...responder.panHandlers}>
        <Text className="text-white text-base font-semibold">
          Timeframe: {selected}
        </Text>
        <Text className="text-gray-500 text-xs">(Swipe left or right)</Text>
      </View>
    );
}

export default TimeframeSwiper