import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image, StyleSheet, Alert, ActivityIndicator
} from 'react-native';
import CustomButton from '../components/CustomButton';
import LoginSave from '../utils/login/LoginSave';

export default LoginScreen = ({ navigation }) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = async () => {
    if (username === '' || password === '') {
      Alert.alert('Error', 'Username and password are required');
      return;
    }
    try {
      setIsLoading(true)
      const response = await fetch('https://api.nurtem.com/oauth/token', {
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
      console.log("response====", data.status)
      if (data.status && (data.status === 400 || data.status === 401 || data.status === 500)) {
        console.log("response===2", data)
        Alert.alert('Error', data.message);
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

        {/* <CustomButton onPress={() => navigation.navigate('Dashboard')} label={"Login"}/> */}
        {isLoading ? <ActivityIndicator size="large" color="yellow" />
          :
          <CustomButton onPress={() => handleLogin()} label={"Login"} />
        }

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