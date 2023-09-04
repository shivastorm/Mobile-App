import * as React from "react";
import { StyleSheet, View, Text } from "react-native";
import { DrawerContentScrollView, createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/DashboardScreen";
import TutorScreen from "../screens/TutorScreen";
import ManageUser from "../screens/UserScreen";
import ManageClaim from "../screens/ClaimScreen";
import ListCategories from "../screens/CategoryScreen";
import CreateCategory from "../screens/CreateCategoryScreen";
import ListQuotes from "../screens/ListQuotesScreen.js";
import CreateQuotes from "../screens/CreateQutoesScreen";
import ListServices from "../screens/ListServicesScreen";
import ListConfigurations from "../screens/ListConfiguration";
import ListTransaction from "../screens/ListTransactions";
import SettingsScreen from "../screens/SettingsScreen";
import CreateServices from "../screens/CreateServices";
import Ionicons from 'react-native-vector-icons/MaterialIcons';

export default function DrawerScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      {/* drawerContent={props => <DrawerContent {...props} />} */}
      <Drawer.Navigator  >

        <Drawer.Screen name="Dashboard Page"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-add-alt-1" paddingleft={30} size={20} color={color} />
            )
          }} component={DashboardScreen} />
        <Drawer.Screen name="Manage Tutors"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-add-alt-1" paddingleft={30} size={20} color={color} />
            )
          }}

          component={TutorScreen} />
        <Drawer.Screen name="Manage User"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-add-alt-1" size={20} color={color} />
            )
          }}
          component={ManageUser} />
        <Drawer.Screen name="List Category"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="auto-awesome-motion" size={20} color={color} />
            )
          }}
          component={ListCategories} />
        <Drawer.Screen name="List Quotes"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="auto-awesome-motion" size={20} color={color} />
            )
          }}
          component={ListQuotes} />
        <Drawer.Screen name="List Services"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="corporate-fare" size={20} color={color} />
            )
          }}
          component={ListServices} />
        <Drawer.Screen name="List Transaction"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="monetization-on" size={20} color={color} />
            )
          }}
          component={ListTransaction} />
        <Drawer.Screen name="Manage Claim"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="assignment" size={20} color={color} />
            )
          }}
          component={ManageClaim} />

        <Drawer.Screen name="Create Category"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="dashboard-customize" size={20} color={color} />
            )
          }}
          component={CreateCategory} />
        <Drawer.Screen name="Create Services"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="dashboard-customize" size={20} color={color} />
            )
          }}
          component={CreateServices} />
        <Drawer.Screen name=" Create Quotes"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="dashboard-customize" size={20} color={color} />
            )
          }}
          component={CreateQuotes} />

        <Drawer.Screen name="Configurations"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-input-component" size={20} color={color} />
            )
          }}
          component={ListConfigurations} />

        <Drawer.Screen name="Settings"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="settings" size={20} color={color} />
            )
          }}
          component={SettingsScreen} />

      </Drawer.Navigator>

    </>
  );
}
const styles = StyleSheet.create({
  drawer: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
  }
})