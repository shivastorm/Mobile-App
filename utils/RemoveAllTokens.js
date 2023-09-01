import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeAllTokens = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.removeItem('access_token');
      await AsyncStorage.removeItem('refresh_token');
      await AsyncStorage.removeItem('expires_in');
      await AsyncStorage.removeItem('onboarded');
      resolve(true);
    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
}