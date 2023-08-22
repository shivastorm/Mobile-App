import React from "react";
import { View, Text } from "react-native";
import { StyleSheet, ScrollView, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import DrawerHomeScreen from "../screens/DrawerHome";
import NotificationsScreen from "../screens/NotificationsScreen";
const Drawer = createDrawerNavigator();
export default function DashboardPage() {
  return (
    <>
      <Drawer.Navigator>
        <Drawer.Screen name="Dash" component={DrawerHomeScreen} />
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      </Drawer.Navigator>

      {/* <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.heading}>
            Welcome to the Educational Dashboard!
          </Text>
          <View style={styles.content}>
            <Text style={styles.subtitle}>Featured Courses</Text>
            <Text style={styles.courseTitle}>Introduction to React Native</Text>
            <Text style={styles.courseDescription}>
              Learn how to build mobile apps using React Native.
            </Text>
            <Text style={styles.courseTitle}>JavaScript Fundamentals</Text>
            <Text style={styles.courseDescription}>
              Master the basics of JavaScript programming.
            </Text>
            <Text style={styles.courseTitle}>
              Data Structures and Algorithms
            </Text>
            <Text style={styles.courseDescription}>
              Dive into advanced programming concepts.
            </Text>
          </View>
         
        </ScrollView>
      </View> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  content: {
    backgroundColor: "#ccffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
  },
  courseDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
});

//export default DashboardPage;
