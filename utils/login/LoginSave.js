import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSave = ({ access_token, refresh_token, expires_in }) => {
  // Check if access token is about to expire (e.g. within 5 minutes)
  const currentTime = Date.now() / 1000; // Convert milliseconds to seconds
  const expirationTime = currentTime + expires_in;
  const refreshThreshold = 300; // 5 minutes in seconds
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(access_token));
      await AsyncStorage.setItem('refresh_token', JSON.stringify(refresh_token));
      await AsyncStorage.setItem('expires_in', JSON.stringify(expires_in));
      await AsyncStorage.setItem('currentTime', JSON.stringify(currentTime));
      await AsyncStorage.setItem('expirationTime', JSON.stringify(expirationTime));
      await AsyncStorage.setItem('refreshThreshold', JSON.stringify(refreshThreshold));

      resolve(true);

    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
}


export default LoginSave