import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView,ScrollView} from "react-native-safe-area-context"; 
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "../../Styles/SettingScreenStyles"


 export default function Configurations1() {
 
  return (
    <ScrollView>
      <View style={styles.maincontainer}  >
        <View style={styles.container}>
        
          <View style={styles.TopCardsContainer} >
            <Text style={styles.Titile}>Account</Text>
            <View style={styles.cards}>
              <View style={styles.cardstyle}>
                <MIcon name="lock" size={16} color="#900" style={styles.cardicon} />
                <Text >Change password </Text>
              </View>
            </View>
            <View style={styles.cards}>
              <View style={styles.cardstyle}>
                <MIcon name="account-cancel" size={16} color="#900" style={styles.cardicon} />
                <Text>Delete my account</Text>
              </View>
            </View>
            <TouchableOpacity  >
              <View style={styles.cards}>
                <View style={styles.cardstyle}>
                  <MIcon name="logout" size={16} color="#900" style={styles.cardicon} />
                  <Text >Logout</Text>
                  
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// export default Configurations();
