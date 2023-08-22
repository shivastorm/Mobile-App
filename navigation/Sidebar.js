import React, { useState } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import LoginScreen from '../screens/LoginScreen';
const Drawer = createDrawerNavigator();

export default function Sidebar() {
    const [isLogin, setIsLogin] = useState(false)
    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home">
                {isLogin ?
                    <Drawer.Screen name="Login" component={LoginScreen} />
                    :
                    <>
                        <Drawer.Screen name="Home" component={HomeScreen} />
                        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                    </>
                }
            </Drawer.Navigator>
        </NavigationContainer>
    );
}