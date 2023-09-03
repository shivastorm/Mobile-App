import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import DrawerScreen from "../Drawer/DrawerScreen";
import OnboardingScreen from "../screens/OnboardingScreen";
import { getAccessToken } from "../utils/get-access-token";
import { removeAllTokens } from "../utils/RemoveAllTokens";
import TutorViewScreen from "../screens/TutorViewScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboarding, setIsOnboarding] = useState(false)
  getAccessToken(setIsLoggedIn, setIsOnboarding)
  //removeAllTokens();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        {!isOnboarding ?
          <>
            <Stack.Screen
              name="OnBoard"
              options={{ headerShown: false }}
              component={OnboardingScreen}
            />
            <Stack.Screen
              name="Login"
              options={{ headerShown: false }}
              component={LoginScreen}
            />
            <Stack.Screen
              name="Dashboard"
              options={{ headerShown: false }}
              component={DrawerScreen} />
          </>
          :
          isLoggedIn ?
            <>
              <Stack.Screen
                name="Dashboard"
                options={{ headerShown: false }}
                component={DrawerScreen} />
              <Stack.Screen
                name="Login"
                options={{ headerShown: false }}
                component={LoginScreen}
              />
              <Stack.Screen
                name="TutorView"
                options={{ headerShown: false }}
                component={TutorViewScreen}
              />
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
              <Stack.Screen
                name="Dashboard"
                options={{ headerShown: false }}
                component={DrawerScreen}
              />
            </>
        }
      </Stack.Navigator>
    </NavigationContainer>
  );
}
