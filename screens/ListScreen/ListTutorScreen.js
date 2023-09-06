import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator,TextInput,Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MIcon1 from 'react-native-vector-icons/Octicons';
import {styles} from '../../Styles/styleSheet';
import { FlatList } from "react-native-gesture-handler";
import StarRating from "../../components/starRating";
import { getItem } from "../../utils/only-token";
import CustomButton from "../../components/CustomButton";
export default function TutorScreen({ navigation }) {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/providers/list?sort=created_at.ASC&limit=20&page=${page}&email=${searchQuery}`, {
      method: "GET",
      headers: {
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${convertedToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        // Combine previous and new data
        const newData = [...value, ...json?.items];

        // Filter out duplicates based on item id
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)

      })
      .catch(err => {
        console.log('catch err in tutor list api=======', err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [page])

  const TruncatedText = ({ text }) => {
    return (
      <View  >
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>
          {text}
        </Text>
      </View>
    );
  };

  const onRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false);
    }, 2000)
  };

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const ViewProfile = (props) => {
    navigation.navigate('TutorView', { props });
  };
  
  const handleSearch = () => {
    (searchQuery ? getData():Alert.alert('Error', 'enter data') )
    setPage(1)
     
  };
    

   // console.log('Searching for:',searchQuery);
     
  

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={item.photo ? { uri: item.photo } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/user3d.jpg" }}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="person" size={16} color="#900" style={styles.cardicon} />
              <TruncatedText text={item.type === 'Individual' ? item.firstname : item.businessname} />
              {item.verified ===1 ? 
             <MIcon1 name="verified" size={20} color="#197808" style={{marginLeft:5}} />
             :
            <MIcon1 name="unverified" size={20} color="#197808" style={{marginLeft:5}} />
            }
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="email" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardDetails}>{item.email}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', marginTop: 5, marginBottom: 5 }}>
              <MIcon name="phone-iphone" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardDetails}>{item.mobile_number}</Text>
            </View>
            <View style={styles.cardDetails}>
              <StarRating ratings={item.average_rating} reviews={item.rating_count} />
            </View>

            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
              <CustomButton style={styles.cardButton1} labelStyle={styles.labelStyle} label={item.user.status === 1 ? 'Active' : 'Deactive'} />
              <CustomButton style={styles.cardButton1} onPress={() => ViewProfile(item)} labelStyle={styles.labelStyle} label={'View'} />

            </View>

          </View>
        </View>
      </View>
    )
  };
  return (
    <SafeAreaView style={{ backgroundColor: "white" }}  >
      <View style={{ flexDirection: "row", padding: 20,}}>
       <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.tutorsearchbox}
          onChangeText={(query) => {
            setSearchQuery(query);
           // handleSearch(query);
          }}
          value={searchQuery}
          
          />
           <MIcon name="search" size={20} color="#900" 
           style={styles.tutorsearchboxicon} 
           onPress={() => handleSearch()} />
        </View>
      <FlatList
        data={value}
        onEndReachedThreshold={0.1}
        onEndReached={() => { setPage(page + 1) }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      // onRefresh={onRefresh}
      // refreshing={isRefreshing}
      />
    </SafeAreaView >
  )
}


// const styles = StyleSheet.create({

//   cardicon: {
//     alignSelf: "center",
//     marginRight: 5
//   },
//   cardsWrapper: {
//     marginTop: 20,
//     width: '100%',
//     alignSelf: 'center',
//     borderBottomColor: "#fff",
//   },
//   card: {
//     maxHeight: 145,
//     flexDirection: 'row',
//     shadowColor: 'black',
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 6,
//     shadowOpacity: 0.26,
//     elevation: 3,
//     backgroundColor: 'white',
//     borderRadius: 5,
//     paddingTop: 10,
//     paddingBottom: 10,
//   },
//   cardImgWrapper: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   cardImg: {
//     height: '50%',
//     width: '80%',
//     borderRadius: 10,
//     padding: 30,
//   },
//   cardInfo: {
//     flex: 4,
//     paddingRight: 5,
//   },
//   cardTitle: {
//     fontSize: 15,
//     fontFamily: "Roboto-Bold",
//     paddingBottom: 5,
//   },
//   cardDetails: {
//     fontSize: 15,
//     paddingBottom: 2,
//     color: '#444',
//   },
//   cardButton: {
//     backgroundColor: "#e9b4f0",
//     width: 80,
//     height: 25,
//     margin: 2,
//     padding: 2,
//     borderRadius: 10
//   },
//   labelStyle: {
//     color: "black",
//     fontSize: 14,
//     textAlign: "center"
//   }, 
//    searchbox: {
//     width:"83%",
//     paddingHorizontal: 20,  
//     marginRight:5,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     flexDirection:"row"

//   },
//   searchboxicon:{
//     paddingHorizontal: 20,
//     paddingVertical: 10,
//     paddingRight: 20,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     flexDirection:"row"
//   }
// });