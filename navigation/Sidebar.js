import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerScreen from "../Drawer/DrawerScreen";
import { getAccessToken } from "../utils/get-access-token";
import { removeAccessToken } from "../utils/remove-access-token";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  //removeAccessToken();
  //getAccessToken()
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {isLoggedIn ?
          <>
            <Stack.Screen
              name="Dashboard"
              options={{ headerShown: false }}
              component={DrawerScreen} />
          </>
          :
          <>
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="SignUp"
              options={{ headerShown: false }}
              component={SignUpScreen}
            />
          </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
