import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

function Home() {
  const navigation = useNavigation();
  return (
    <View>
      {/* Your dashboard screen UI components */}
      <Text>home</Text>
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

export default Home();
