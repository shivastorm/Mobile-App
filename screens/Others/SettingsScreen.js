import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import { removeItem } from "../../utils/only-token";
export default function SettingsScreen({ navigation }) {
  const logoutHandle = () => {
    console.log('handled logut')
    removeItem('access_token')
    removeItem('refresh_token')
    removeItem('expires_in')
    removeItem('api')
    removeItem('onboarded')
    navigation.navigate('Login');
  }
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}  >
      <View style={styles.container}>
        <Text style={styles.Titile}>Logout:</Text>
        <CustomButton label={"Logout"} onPress={logoutHandle} style={styles.loginbtn} />
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
    padding: 5
  },
  loginbtn: {
    backgroundColor: "#9303a3",
    fontFamily: 'Roboto-Bold',
    padding: 5,
    borderRadius: 10,
    width: "25%"
  }

});