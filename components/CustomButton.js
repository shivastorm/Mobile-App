import { Text, TouchableOpacity } from 'react-native';
import React from 'react';

export default function CustomButton({ label, onPress, style, labelStyle }) {
  // console.log('valueshere========', labelStyle)
  // console.log('valueshere========1', style)
  const defaultStyle = {
    backgroundColor: '#AD40AF',
    padding: 20,
    borderRadius: 10,
    marginBottom: 30,
  }
  const defaultLabelStyle = {
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 16,
    color: '#fff',
  }
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style ? style : defaultStyle}>
      <Text
        style={labelStyle ? labelStyle : defaultLabelStyle}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
