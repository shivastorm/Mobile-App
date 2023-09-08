import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../../components/CustomButton";
import {styles} from "../../Styles/SettingScreenStyles"
import { removeItem } from "../../utils/only-token";
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
export default function SettingsScreen({ navigation }) {
  const logoutHandle = () => {
    Alert.alert(
      'Logout  ',
      'Are you sure, Do you wish to Logout from the app?',
      [
        {
          text: 'OK',
          onPress: () => {
            console.log('handled logut')
            removeItem('access_token')
            removeItem('refresh_token')
            removeItem('expires_in')
            removeItem('api')
            navigation.navigate('Login');
          },
        },
      ],
      { cancelable: true }
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: 'center', paddingTop: 10, }}  >
      <View style={styles.container}>

        {/* <Text style={styles.Titile}>Logout:</Text>
        <CustomButton label={"Logout"} onPress={logoutHandle} style={styles.loginbtn} /> */}
        <View style={styles.TopCardsContainer} >
          <Text style={styles.Titile}>Account</Text>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="lock" size={16} color="#900" style={styles.cardicon} />
              <Text >Change password        </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="account-cancel" size={16} color="#900" style={styles.cardicon} />
              <Text>Delete my account</Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="logout" size={16} color="#900" style={styles.cardicon} />
              <Text onPress={() => { logoutHandle() }}>Logout</Text>
              {/* <CustomButton label={"Logout"} onPress={logoutHandle} style={styles.loginbtn} /> */}

            </View>
          </View>
        </View>
        <View style={styles.MiddleCardsContainer} >
          <Text style={styles.Titile}>Help</Text>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="progress-question" size={16} color="#900" style={styles.cardicon} />
              <Text>FAQ's      </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="format-list-checks" size={16} color="#900" style={styles.cardicon} />
              <Text>Terms and Conditions</Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Icon name="privacy-tip" size={16} color="#900" style={styles.cardicon} />
              <Text>Privacy Policy       </Text>
            </View>
          </View>
        </View>

        <View style={styles.BottomCardsContainer} >
          <Text style={styles.Titile}>Follow Us</Text>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="facebook" size={16} color="#900" style={styles.cardicon} />
              <Text>Facebook </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="twitter" size={16} color="#900" style={styles.cardicon} />
              <Text>Twitter</Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="youtube" size={16} color="#900" style={styles.cardicon} />
              <Text>YouTube     </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="instagram" size={16} color="#900" style={styles.cardicon} />
              <Text>Instagram    </Text>
            </View>
          </View>
          <View style={styles.cards}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <MIcon name="pinterest" size={16} color="#900" style={styles.cardicon} />
              <Text>Pinterest    </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
