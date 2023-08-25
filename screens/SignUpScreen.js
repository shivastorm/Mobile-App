import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image, StyleSheet
} from 'react-native';
//import { RobotoMedium } from './assets/fonts/Roboto-Medium.ttf';
//import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomButton from '../components/CustomButton';

const RegisterScreen = ({ navigation }) => {
  const [usermail, setUsermail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = () => {
    console.log('Usermail:', usermail);
    console.log('Password:', password);
    console.log("name", username)
  };

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>

        </View>
        <Image
          source={require("../assets/images/login.png")}
          style={{
            width: 200, height: 200,
            marginTop: 60, marginLeft: 60
          }}
        />

        {/* <Text
          style={{
            //fontFamily: 'Roboto-Medium',
           
           //paddingHorizontal: 20,
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
                      
          }}>
          Register
        </Text> */}

        <View
          style={{
            paddingVertical: 20,
            paddingHorizontal: 30,
            flexDirection: 'row',
            justifyContent: 'space-between',

          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{

              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../assets/icons/facebook.png")}
              className="w-5 h-5"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{

              paddingHorizontal: 20,
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

              paddingHorizontal: 20,
              paddingVertical: 10,
            }}>
            <Image
              source={require("../assets/icons/google.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, register with email ...
        </Text>

        {/* <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        /> */}
        {/* username */}

        <TextInput
          style={styles.input}
          placeholder='UserName'

          keyboardType="default"
          // value={"text"}
          onChangeText={text => setUsername(text)} />

        {/* usermail */}

        <TextInput
          style={styles.input}
          placeholder='Email ID'

          keyboardType="email-address"
          // value={"Email ID"}
          onChangeText={text => setUsermail(text)} />

        {/* password */}

        <TextInput style={styles.input}
          placeholder="Enter password..."
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)} />

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
        /> */}
        {/* 
        <InputField
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
        />

        <InputField
          label={'Confirm Password'}
          icon={
            <Ionicons
              name="ios-lock-closed-outline"
              size={20}
              color="#666"
              style={{ marginRight: 5 }}
            />
          }
          inputType="password"
        /> */}

        <CustomButton label={'Register'} onPress={() => { handleLogin() }} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={{ color: '#AD40AF', fontWeight: '700' }}> Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
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