import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "./HomeScreen";
//import Settings from "../screens/";
export default function DashboardScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Dashboard screen</Text>
      </View> */}
      <Drawer.Navigator>
        <Drawer.Screen name="Home"
          options={{ headerShown: true }} component={Home} />
        {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      </Drawer.Navigator>
    </>
  );
}
