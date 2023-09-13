
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react';
import LottieView from 'lottie-react-native';
import { color } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
import TIcons from 'react-native-vector-icons/FontAwesome5';
import Micons from 'react-native-vector-icons/MaterialIcons'
import { ScrollView } from 'react-native-gesture-handler';
import ListCategories from '../ListScreen/ListCategoryScreen';

export default function DashboardScreen({ navigation }) {


  return (
    <ScrollView style={styles.container}>
      <View style={styles.lottie}>
        <LottieView source={require('../../assets/animations/confetti.json')} autoPlay loop />
        <View style={{ flexDirection: 'row', marginBottom: 350, marginTop: 20 }}>
          <View style={{ marginLeft: 15, marginRight: 10 }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Manage Tutors')} >
              <View style={styles.innercontainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                  <Text style={styles.insideText}> Tutors
                  </Text>
                  <TIcons name="chalkboard-teacher" size={30} color="#43a9e8" />
                </View>
                <View>
                  <Text style={styles.NumberText}> 150 </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('Manage Tutors')} >
              <View style={styles.innercontainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                  <Text style={styles.insideText}> Classes
                  </Text>
                  <TIcons name="users" size={25} color="#43a9e8" />
                </View>
                <View>
                  <Text style={styles.NumberText}> 350 </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate('List Services')} >
              <View style={styles.innercontainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                  <Text style={styles.insideText}> Service
                  </Text>
                  <Micons name="miscellaneous-services" size={30} color="#43a9e8" />
                </View>
                <View>
                  <Text style={styles.NumberText}> 230 </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.innercontainer}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                <Text style={styles.insideText}> Camp
                </Text>
                <TIcons name="campground" size={25} color="#43a9e8" />
              </View>
              <View>
                <Text style={styles.NumberText}> 200 </Text>
              </View>
            </View>
          </View>
          <View style={{ marginRight: 20, }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('Manage User')} >
              <View style={styles.innercontainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                  <Text style={styles.insideText}> Users
                  </Text>
                  <TIcons name="user-alt" size={25} color="#43a9e8" />
                </View>
                <View>
                  <Text style={styles.NumberText}> 183 </Text>
                </View>
              </View>
            </TouchableOpacity>
            <View style={styles.innercontainer}>
              <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                <Text style={styles.insideText}> Competition
                </Text>
                <TIcons name="chess-king" size={30} color="#43a9e8" />
              </View>
              <View>
                <Text style={styles.NumberText}> 100 </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('List Category')} >
              <View style={styles.innercontainer}>
                <View style={{ display: "flex", flexDirection: "row", justifyContent: 'space-between', alignContent: "space-between" }}>
                  <Text style={styles.insideText}> Category
                  </Text>
                  <Micons name="category" size={30} color="#43a9e8" />
                </View>
                <View>
                  <Text style={styles.NumberText}> 200 </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView >
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  },
  lottie: {
    width: width * 0.9,
    height: '100%',
    alignItems: "center",
    flexDirection: "row"
  },
  doneButton: {
    padding: 20,
    fontFamily: 'Roboto-Regular',
    color: 'white'
  },
  innercontainer: {
    display: "flex",
    marginBottom: 15,
    height: 100,
    width: 180,
    borderRadius: 20,
    margin: 5,
    padding: 10,
    backgroundColor: "white",
    shadowColor: "skyblue",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  insideText: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    fontSize: 20,
    fontFamily: 'Roboto-Bold',
    marginBottom: 20,
    color: 'skyblue',
    width: "80%",
    position: "relative",

  },
  NumberText: {
    fontSize: 20,
    fontFamily: 'Roboto-Regular',
    padding: 2,
    color: 'black'
  }
})