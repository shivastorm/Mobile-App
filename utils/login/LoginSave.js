import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginSave = ({ access_token, refresh_token, expires_in }) => {
  return new Promise(async (resolve, reject) => {
    try {
      await AsyncStorage.setItem('access_token', JSON.stringify(access_token));
      await AsyncStorage.setItem('refresh_token', JSON.stringify(refresh_token));
      await AsyncStorage.setItem('expires_in', JSON.stringify(expires_in));

      resolve(true);

    } catch (err) {
      console.log(err);
      reject(false);
    }
  });
}

export default LoginSave