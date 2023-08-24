import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image
} from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';
import InputField from '../components/InputField';

export default LoginScreen = ({ navigation }) => {
  const [username1, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('Username:=========', (prev) => username1);
    console.log('Password:', password);
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
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Login
        </Text>

        {/* <InputField
          label={'Email ID'}
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />

          }
          keyboardType="email-address"
          value={username}
          onChangeText={(value) => (setUsername(value))}
        /> */}
        <TextInput
          placeholder='Email ID'
          icon={
            <MaterialIcons
              name="alternate-email"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          keyboardType="email-address"
          value={Text}
          onChangeText={() => { setUsername(username1) }} />


        {/* <InputField
          label={'Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
          fieldButtonLabel={"Forgot?"}
          fieldButtonFunction={() => { }}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        /> */}

        <CustomButton label={"Login"} onPress={() => { handleLogin() }} />

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

  //export default LoginScreen;