import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import Lottie from 'lottie-react-native';

const NoInternetConnection = (props) => {
    const [isOnline, setOnline] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setOnline(state.isConnected);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    if (isOnline) {
        return props.children;
    } else {
        return (
            <View>
                <Lottie source={require('../assets/animations/NoInternetConnection.json')} autoPlay loop />

            </View>
        );
    }
};

export default NoInternetConnection;