import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async (setIsLoggedIn) => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
        console.log('responseaccess========', accessToken);
        return setIsLoggedIn;
    } catch (error) {
        console.log('Failed to retrieve access token:', error);
        return null;
    }
};

