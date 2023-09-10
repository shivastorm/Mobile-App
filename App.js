import "react-native-gesture-handler";
import { useCallback } from 'react';
import Sidebar from "./navigation/Sidebar";
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar
} from 'react-native';
import NoInternetConnection from "./utils/CheckInternetConnection";
import { RootSiblingParent } from 'react-native-root-siblings';
SplashScreen.preventAutoHideAsync();
const App = () => {
  const [fontsLoaded] = useFonts({
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
    'Roboto-MediumItalic': require('./assets/fonts/Roboto-MediumItalic.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Inter-Bold': require('./assets/fonts/Inter-Bold.ttf'),

  });
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);
  if (!fontsLoaded) {
    return null;
  }
  return (
    <>
      <RootSiblingParent>
        <SafeAreaView style={styles.container}>
          <StatusBar style="light"/>
          <NoInternetConnection>
            <View style={styles.container} onLayout={onLayoutRootView}>
              <Sidebar />
            </View >
          </NoInternetConnection>
        </SafeAreaView>
      </RootSiblingParent>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontSize: 25,
    fontWeight: '500',
  },
});

export default App
