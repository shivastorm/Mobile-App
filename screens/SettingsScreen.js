import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { removeItem } from "../utils/only-token";
export default function SettingsScreen({ navigation }) {
  const logoutHandle = () => {
    console.log('handled logut')
    removeItem('access_token')
    removeItem('refresh_token')
    removeItem('expires_in')
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}  >
      <View style={styles.container}>
        <Text style={styles.Titile}>Logout:</Text>
        <CustomButton label={"Logout"} onPress={logoutHandle} />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  Titile: {
    fontFamily: 'Roboto-Bold',
    padding: 10
  }

});