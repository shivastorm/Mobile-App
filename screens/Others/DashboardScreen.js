import { View, StyleSheet, Dimensions } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';
const { width, height } = Dimensions.get('window');

export default function DashboardScreen() {

  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <LottieView source={require('../../assets/animations/confetti.json')} autoPlay loop />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  lottie: {
    width: width * 0.9,
    height: '100%',
    alignItems: "center"
  },
  doneButton: {
    padding: 20,
    fontFamily: 'Roboto-Regular',
    color: 'white'
  }
})