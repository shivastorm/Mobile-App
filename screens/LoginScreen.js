import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image, StyleSheet
} from 'react-native';
import * as Font from 'expo-font';
// import { useFonts } from 'expo-font';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

export default LoginScreen = ({ navigation }) => {

  // const [fontsLoaded] = useFonts({
  //   'Roboto-Regular': require('../assets/fonts/Roboto-Regular.ttf'),
  // });
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('Username:', username);
    console.log('Password:', password);
  };

  // const handleLogin = async () => {
  //   try {
  //     const response = await fetch('https://nurtemeventapi.nurtem.com/oauth/token', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username: username,
  //         password: password,
  //         // grant_type: "password",

  //         // client_id: "8MONB4VIJX",

  //         // client_secret: "3C4I0UJUT8vuG17NWhhcguAQf6rJFj",

  //         // username: "nurtemadmin@gmail.com",

  //         // password: "Nurtem1!"
  //       }),
  //     });
  //     console.log("response===", response)
  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log("response==", data)
  //       // Handle successful login, store tokens, navigate to next screen, etc.
  //     } else {
  //       // Handle error cases, display error messages, etc.
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //   }
  // };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require("../assets/images/signup.png")}
            style={{
              width: 300, height: 200, justifyContent: 'center',
              marginTop: 50,

            }}
          />
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

        <CustomButton onPress={() => navigation.navigate('Dashboard')} label={"Login"}
        // onPress={() => handleLogin()} 
        />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, login with ...
        </Text>

        <View
          style={{

            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 30,
            paddingHorizontal: 20,

          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{

              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../assets/icons/facebook.png")}
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
              source={require("../assets/icons/apple.png")}
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
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to the app?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});