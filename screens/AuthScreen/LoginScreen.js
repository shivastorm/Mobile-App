import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image, ActivityIndicator, Keyboard
} from 'react-native';
import Toast from 'react-native-root-toast';
import CustomButton from '../../components/CustomButton';
import LoginSave from '../../utils/login/LoginSave';
import LottieView from 'lottie-react-native';
import { setItem } from '../../utils/only-token';
import { getItem } from "../../utils/only-token";
import { styles } from '../../Styles/AuthScreenStyleSheet';
import Checkbox from 'expo-checkbox';

export default LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isChecked, setChecked] = useState(null);

  const setCheckedHandle = (props) => {
    setChecked(props)
  };

  const handleLogin = async () => {
    if (username === '' || password === '' || !isChecked) {
      Toast.show('Username, password , checkbox values are required!!🤷‍♀️')
      return;
    }
    Keyboard.dismiss();
    let Api
    if (isChecked === 'live') {
      setItem('api', 'https://api.nurtem.com');
      Api = 'https://api.nurtem.com'
    } else {
      setItem('api', 'https://nurtemeventapi.nurtem.com');
      Api = "https://nurtemeventapi.nurtem.com"
    }

    try {
      setIsLoading(true)
      const response = await fetch(`${Api}/oauth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          grant_type: "password",
          client_id: "8MONB4VIJX",
          client_secret: "3C4I0UJUT8vuG17NWhhcguAQf6rJFj",
        }),
      });
      const data = await response.json();
      //console.log("response====", data.status)
      if (data.status && (data.status === 400 || data.status === 401 || data.status === 500)) {
        //console.log("response===2", data)
        Toast.show('❌ Wrong username or password ❌')
        setIsLoading(false)
      } else {
        try {
          const success = await LoginSave(data);
          if (success) {
            navigation.navigate('Dashboard');
          }
          setIsLoading(false)
        } catch (error) {
          console.log('Failed to store access token:', error);
          setIsLoading(false)
        }
      }


    } catch (error) {
      console.error('Error in login:', error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ display: "flex", flexDirection: 'row', justifyContent: 'center' }}>
          <LottieView
            source={require('../../assets/animations/Login.json')}
            style={{
              width: 200,
              height: 250,
              alignItems: "center",
            }}
            autoPlay loop />
        </View>

        <Text
          style={{
            fontFamily: "Roboto-Regular",
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>
        <TextInput
          style={styles.input}
          placeholder='Email ID'
          keyboardType="email-address"
          value={username}
          onChangeText={text => setUsername(text)} />
        <TextInput style={styles.input}
          placeholder="Enter password..."
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)} />

        <View style={styles.radiosection}>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked === 'live' ? true : false}
              onValueChange={() => setCheckedHandle('live')}
              color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.paragraph}>Login Class nurtem</Text>
          </View>
          <View style={styles.section}>
            <Checkbox
              style={styles.checkbox}
              value={isChecked === 'event' ? true : false}
              onValueChange={() => setCheckedHandle('event')}
              color={isChecked ? '#4630EB' : undefined}
            />
            <Text style={styles.paragraph}>Login event nurtem</Text>
          </View>
        </View>
        {isLoading ? <ActivityIndicator size="large" color="yellow" />
          :
          <CustomButton onPress={() => handleLogin()} label={"Login"} />
        }

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={styles.footerIcons}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../../assets/icons/facebook.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../../assets/icons/apple.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../../assets/icons/google.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={styles.footer}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};