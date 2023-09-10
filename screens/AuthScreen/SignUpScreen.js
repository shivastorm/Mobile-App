import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity, Image
} from 'react-native';
import CustomButton from '../../components/CustomButton';
import { styles } from '../../Styles/AuthScreenStyleSheet';
import LottieView from 'lottie-react-native';

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
              source={require("../../assets/icons/facebook.png")}
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
              source={require("../../assets/icons/apple.png")}
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
              source={require("../../assets/icons/google.png")}
              className="w-10 h-10"
              style={{ height: 35, width: 35 }}
            />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 30 }}>
          Or, register with email ...
        </Text>

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