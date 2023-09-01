import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async (setIsLoggedIn,setIsOnboarding) => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        const expires_in = await AsyncStorage.getItem('expires_in');
        const OnBoardToken = await AsyncStorage.getItem('onboarded');

        accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false);
        OnBoardToken ? setIsOnboarding(true) : setIsOnboarding(false);
        console.log('responseaccess========', accessToken);
        console.log('responseaccess========1', expires_in, OnBoardToken);
        return ;
    } catch (error) {
        console.log('Failed to retrieve access token expires in:', error);
        return null;
    }
};

