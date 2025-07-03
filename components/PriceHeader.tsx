import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import  CurrencySelector  from './CurrencySelector';
import { CURRENCIES } from '@/constants/coinsContants';

interface PriceHeaderProps {
    price: string;
    currency: string;
    onCurrencyChange: (uuid: string) => void;
  }

const PriceHeader = ({ price, currency, onCurrencyChange }: PriceHeaderProps) => {
    const selectedCurrency = CURRENCIES.find(c => c.uuid === currency) || CURRENCIES[0];
  
    const formatPrice = (price: string) => {
      const value = parseFloat(price);
      if (selectedCurrency.symbol === 'BTC' || selectedCurrency.symbol === 'ETH') {
        return `${value.toFixed(8)} ${selectedCurrency.symbol}`;
      }
      return value >= 1
        ? `${selectedCurrency.symbol}${value.toLocaleString('en-US', { 
            minimumFractionDigits: 2, 
            maximumFractionDigits: 2 
          })}`
        : `${selectedCurrency.symbol}${value.toFixed(6)}`;
    };
  
    return (
      <View style={styles.container}>
        <Text style={styles.price}>{formatPrice(price)}</Text>
        <CurrencySelector 
          currency={currency} 
          onCurrencyChange={onCurrencyChange} 
        />
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 16,
    },
    price: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#333',
      flex: 1,
    },
  });

export default PriceHeader