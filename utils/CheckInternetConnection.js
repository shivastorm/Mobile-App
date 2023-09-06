import React, { useState, useEffect } from 'react';
import { View,Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';


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
                <Text>No Internet</Text>

            </View>
        );
    }
};

export default NoInternetConnection;