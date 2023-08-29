import AsyncStorage from '@react-native-async-storage/async-storage';

export const removeAccessToken = async () => {
try {
    await AsyncStorage.removeItem('access_token');
    console.log('Logged out successfully.');
    // Perform any additional logout actions
  } catch (error) {
    console.log('Failed to log out:', error);
  }
}