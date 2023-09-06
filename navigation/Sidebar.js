import React, { useEffect, useState } from "react";
import {ActivityIndicator ,View,Image} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/AuthScreen/LoginScreen";
import SignUpScreen from "../screens/AuthScreen/SignUpScreen";
import DrawerScreen from "../Drawer/DrawerScreen";
import { getAccessToken } from "../utils/get-access-token";
import { removeAllTokens } from "../utils/RemoveAllTokens";
import TutorViewScreen from "../screens/Tutors/TutorViewScreen";
import UserViewScreen from "../screens/UserViewScreen";
const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isOnboarding, setIsOnboarding] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getAccessToken(setIsLoggedIn, setIsOnboarding)
    .then(() => setIsLoading(false))
    .catch((error) => {
      console.log('Failed to retrieve access token and onboarding status:', error);
      setIsLoading(false);
    });
  }, []);
  //removeAllTokens();
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
          <Image
              source={require('../assets/nurtemnobg.png')}
              style={{ width: "100%", height: 180, alignSelf: 'center', marginTop: 50 }}
              resizeMode="cover"
            />
        <ActivityIndicator size={"large"} color={"#002c83"} />
      </View>
    )
  }
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OnBoard">
        {
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
                name="SignUp"
                options={{ headerShown: false }}
                component={SignUpScreen}
              />
              <Stack.Screen
                name="TutorView"
                options={{ headerShown: false }}
                component={TutorViewScreen}
              />
                <Stack.Screen
                name="UserView"
                options={{ headerShown: false }}
                component={UserViewScreen}
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
