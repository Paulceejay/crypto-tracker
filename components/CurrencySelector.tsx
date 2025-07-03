import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { CURRENCIES } from '@/constants/coinsContants';

interface CurrencySelectorProps {
    currency: string;
    onCurrencyChange: (uuid: string) => void;
  }

const CurrencySelector = ({ currency, onCurrencyChange }: CurrencySelectorProps) => {
    const [showPicker, setShowPicker] = useState(false);
  const selectedCurrency = CURRENCIES.find(c => c.uuid === currency) || CURRENCIES[0];
  return (
    <View style={styles.container}>
    <Pressable
      style={styles.button}
      onPress={() => setShowPicker(!showPicker)}
    >
      <Text style={styles.text}>{selectedCurrency.symbol}</Text>
      <Text style={styles.arrow}>{showPicker ? '▲' : '▼'}</Text>
    </Pressable>

    {showPicker && (
      <Animated.View 
        style={styles.pickerContainer}
        entering={FadeIn.duration(200)}
        exiting={FadeOut.duration(150)}
      >
        <Picker
          selectedValue={currency}
          onValueChange={(value) => {
            onCurrencyChange(value);
            setShowPicker(false);
          }}
        >
          {CURRENCIES.map(currency => (
            <Picker.Item 
              key={currency.uuid} 
              label={`${currency.symbol} - ${currency.name}`} 
              value={currency.uuid} 
            />
          ))}
        </Picker>
      </Animated.View>
    )}
  </View>
);
}

const styles = StyleSheet.create({
    container: {
      position: 'relative',
      zIndex: 10,
    },
    button: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      borderRadius: 20,
      paddingVertical: 6,
      paddingHorizontal: 12,
    },
    text: {
      fontWeight: '600',
      color: '#007AFF',
      marginRight: 4,
    },
    arrow: {
      color: '#007AFF',
      fontSize: 12,
    },
    pickerContainer: {
      position: 'absolute',
      top: 40,
      right: 0,
      backgroundColor: 'white',
      borderRadius: 8,
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      width: 200,
    },
  });

export default CurrencySelector