import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import LottieView from 'lottie-react-native';


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
            <View style={styles.lottie}>
                <LottieView source={require('../assets/animations/NoInternetConnection.json')} autoPlay loop />
            </View>
        );
    }
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: 300,
        height: 400,
        alignItems: "center"
    },
    doneButton: {
        padding: 20,
        fontFamily: 'Roboto-Regular',
        color: 'white'
    }
})
export default NoInternetConnection;