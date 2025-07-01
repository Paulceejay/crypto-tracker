import { View, Text } from 'react-native'
import React from 'react'

type Props = {
    value: number;
    className?: string;
  };

const CoinChangeText = ({ value, className = '' }: Props)=> {
 const color =
  value > 0
    ? 'text-successColor'
    : value < 0
    ? 'text-dangerColor'
    : 'text-text';

    const hasValidChange = !isNaN(value);
const formatted = `${value > 0 ? '+' : ''}${parseFloat(value).toFixed(2)} %`;

return (
  <Text className={`${color} ${className}`}>
    {hasValidChange ? formatted : ""}
  </Text>
);}

export default CoinChangeText