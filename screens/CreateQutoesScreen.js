import React from "react";
import { View, Text, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateQuotes() {
    return (
        <View>
            {/* Your dashboard screen UI components */}
            <SafeAreaView><Text>Create Qutoes</Text></SafeAreaView>
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
