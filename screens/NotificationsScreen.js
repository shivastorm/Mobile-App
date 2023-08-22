import { useNavigation } from "@react-navigation/native";
import * as React from "react";
import { Button, View, Text } from "react-native";

export default function NotificationsScreen({ navigation }) {
  return (
    <>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Button onPress={() => navigation.goBack()} title="Go back Dash" />
      </View>
      <View>
        <Text>hi there</Text>
      </View>
    </>
  );
}
