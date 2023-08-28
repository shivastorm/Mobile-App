import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Home from "./HomeScreen";
import ManageUser from "../Drawer/Manageuser";
import ManageClaim from "../Drawer/Manageclaim";
import ManageCategories from "../Drawer/Managecategories";
import ListCategory from "../Drawer/Listcategory";
import CreateCategory from "../Drawer/Createcategory";
import ManageQuotes from "../Drawer/Managequotes";
import ListQuotes from "../Drawer/Listquotes";
import CreateQuotes from "../Drawer/CreateQuotes";
import ManageServices from "../Drawer/ManageServices";
import Configurations from "../Drawer/Configurations";
import ManageTransaction from "../Drawer/ManageTransaction";
//import Ionicons from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
//import { Icon } from "react-native-vector-icons/icon";
//import Settings from "../screens/";
export default function DashboardScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <>
      {/* <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Dashboard screen</Text>
      </View> */}
      <Drawer.Navigator>
        <Drawer.Screen name="Manage Tutor"

          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person-add-alt-1" paddingleft={30} size={20} color={color} />
            )
          }}

          component={Home} />
        <Drawer.Screen name="Manage User"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="desktop-mac" size={20} color={color} />
            )
          }}
          component={ManageUser} />
        <Drawer.Screen name="Manage claim"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="desktop-mac" size={20} color={color} />
            )
          }}
          component={ManageClaim} />
        <Drawer.Screen name="Manage categories"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            )
          }}
          component={ManageCategories} />
        <Drawer.Screen name="Listcategory"
          options={{ headerShown: true }}
          component={ListCategory} />
        <Drawer.Screen name="Create category"
          options={{ headerShown: true }}
          component={CreateCategory} />
        <Drawer.Screen name="Manage Quotes"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            )
          }}
          component={ManageQuotes} />
        <Drawer.Screen name="List Quotes"
          options={{ headerShown: true }}
          component={ListQuotes} />
        <Drawer.Screen name=" Create Quotes"
          options={{ headerShown: true }}
          component={CreateQuotes} />
        <Drawer.Screen name="Manage Services"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="people" size={20} color={color} />
            )
          }}
          component={ManageServices} />
        <Drawer.Screen name="Configurations"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="people" size={20} color={color} />
            )
          }}
          component={Configurations} />
        <Drawer.Screen name="Manage Transaction"
          options={{
            headerShown: true,
            drawerIcon: ({ color }) => (
              <Ionicons name="people" size={20} color={color} />
            )
          }}
          component={ManageTransaction} />


        {/* <Drawer.Screen name="Settings" component={Settings} /> */}
      </Drawer.Navigator>
    </>
  );
}
