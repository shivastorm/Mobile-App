import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListTransaction() {
    return (
        <View>
            {/* Your dashboard screen UI components */}
            <SafeAreaView><Text>List Transaction</Text></SafeAreaView>
            {/* <Button
        onPress={() => {
          navigation.navigate("settings");
        }}
      >
        go to settings
      </Button> */}
        </View>
    );
}

//export default HomeScreen();