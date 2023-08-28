import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState } from "react";

export const getAccessToken = async (setIsLoggedIn) => {
    try {
        const accessToken = await AsyncStorage.getItem('access_token');
        accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false)
        console.log('responseaccess========', accessToken)
        //accessToken ? setIsLoggedIn(true) : setIsLoggedIn(false)
        return accessToken;
    } catch (error) {
        console.log('Failed to retrieve access token:', error);
        return null;
    }
};
