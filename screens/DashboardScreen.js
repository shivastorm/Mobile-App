import * as React from "react";
import { StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import TutorScreen from "./TutorScreen";
import ManageUser from "../Drawer/Manageuser";
import ManageClaim from "../Drawer/Manageclaim";
import ListCategory from "../Drawer/Listcategory";
import CreateCategory from "../Drawer/Createcategory";
import ListQuotes from "../Drawer/Listquotes";
import CreateQuotes from "../Drawer/CreateQuotes";
import ManageServices from "../Drawer/ManageServices";
import Configurations from "../Drawer/Configurations";
import ManageTransaction from "../Drawer/ManageTransaction";
import Settings from "../Drawer/Settings";
import Ionicons from 'react-native-vector-icons/MaterialIcons';

export default function DashboardScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      <Drawer.Navigator  >
        <Drawer.Screen name="Manage Tutor"
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
        <Drawer.Screen name="Manage Claim"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="assignment" size={20} color={color} />
            )
          }}
          component={ManageClaim} />

        <Drawer.Screen name="List Category"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="auto-awesome-motion" size={20} color={color} />
            )
          }}
          component={ListCategory} />
        <Drawer.Screen name="Create Category"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="dashboard-customize" size={20} color={color} />
            )
          }}
          component={CreateCategory} />

        <Drawer.Screen name="List Quotes"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="auto-awesome-motion" size={20} color={color} />
            )
          }}
          component={ListQuotes} />
        <Drawer.Screen name=" Create Quotes"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="dashboard-customize" size={20} color={color} />
            )
          }}
          component={CreateQuotes} />
        <Drawer.Screen name="Manage Services"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="corporate-fare" size={20} color={color} />
            )
          }}
          component={ManageServices} />
        <Drawer.Screen name="Configurations"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="settings-input-component" size={20} color={color} />
            )
          }}
          component={Configurations} />
        <Drawer.Screen name="Manage Transaction"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="monetization-on" size={20} color={color} />
            )
          }}
          component={ManageTransaction} />
        <Drawer.Screen name="Settings"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="settings" size={20} color={color} />
            )
          }}
          component={Settings} />


        {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      </Drawer.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  drawer: {
    fontFamily: "Roboto-Medium",
    fontSize: 20,
    fontFamily: "Roboto-Medium"
  }
})