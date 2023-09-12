import { Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import DashboardScreen from "../screens/Others/DashboardScreen";
import TutorScreen from "../screens/ListScreen/ListTutorScreen";
import ManageUser from "../screens/ListScreen/ListUserScreen";
import ManageClaim from "../screens/Others/ClaimScreen";
import ListCategories from '../screens/ListScreen/ListCategoryScreen'; 
import ListQuotes from "../screens/ListScreen/ListQuotesScreen.js";
import CreateQuotes from "../screens/CreateScreen/CreateQutoesScreen";
import ListServices from "../screens/ListScreen/ListServicesScreen";
//import Configurations from "../screens/ListScreen/ListConfiguration";
import ListTransaction from "../screens/ListScreen/ListTransactions";
import SettingsScreen from "../screens/Others/SettingsScreen";
import CreateServices from "../screens/CreateScreen/CreateServices";
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Iicons from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/MaterialCommunityIcons';
import TIcons from 'react-native-vector-icons/FontAwesome5';
import Tcons from 'react-native-vector-icons/FontAwesome';
import Configurations1 from '../screens/ListScreen/ListConfiguration';

export default function DrawerScreen() {
  const Drawer = createDrawerNavigator();
  const headerStyle = {
    shadowColor: 'black',
   
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 3,
      }
  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        color:"black",
        backgroundColor: '#f1f1f1',
        width: 230,
        paddingTop: 50
      },
      drawerContent: (props) => (
        <View>
          <Image
            source={require('../assets/nurtemnobg.png')}
            style={{ width: 180, height: 180, marginTop: 60 }}
          />
        </View>
      )
    }} >

      <Drawer.Screen name="Dashboard Page"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Icons name="desktop-mac-dashboard" paddingleft={30} size={20} color={color} />
          )
        }} component={DashboardScreen} />
      <Drawer.Screen name="Manage Tutors"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <TIcons name="chalkboard-teacher" paddingleft={30} size={20} color={color} />
          )
        }}

        component={TutorScreen} />
      <Drawer.Screen name="Manage User"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="person-add-alt-1" size={20} color={color} />
          )
        }}
        component={ManageUser} />
      <Drawer.Screen name="List Category"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="category" size={20} color={color} />
          )
        }}
        component={ListCategories} />
      <Drawer.Screen name="List Quotes"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Icons name="comment-quote-outline" size={20} color={color} />
          )
        }}
        component={ListQuotes} />
      <Drawer.Screen name="List Services"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="design-services" size={20} color={color} />
          )
        }}
        component={ListServices} />
      <Drawer.Screen name="List Transaction"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="monetization-on" size={20} color={color} />
          )
        }}
        component={ListTransaction} />
      <Drawer.Screen name="Manage Claim"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Tcons name="pencil-square-o" size={20} color={color} />
          )
        }}
        component={ManageClaim} />    
      <Drawer.Screen name="Create Services"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Iicons name="creative-commons-share" size={20} color={color} />
          )
        }}
        component={CreateServices} />
      <Drawer.Screen name=" Create Quotes"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="add-comment" size={20} color={color} />
          )
        }}
        component={CreateQuotes} />
      <Drawer.Screen name="Configurations"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="settings-input-component" size={20} color={color} />
          )
        }}
        component={Configurations1} />
      <Drawer.Screen name="Settings"
        options={{
          headerShown: true,
          headerStyle,
          headerTitleAlign: 'center',
          drawerIcon: ({ color }) => (
            <Ionicons name="settings" size={20} color={color} />
          )
        }}
        component={SettingsScreen} />

    </Drawer.Navigator>
  );
}