import React, { useEffect, useState } from "react";
import { View, Text, Image, TextInput, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { styles } from '../../Styles/styleSheet';
import { getItem } from "../../utils/only-token";
import CustomButton from "../../components/CustomButton";

export default function ManageUser({ navigation }) {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getData = async () => {
    setIsLoading(true)
    let newData
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/users/list?sort=created_at.ASC&limit=20&page=${page}&email=${searchQuery}`, {
      method: "GET",
      headers: {
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${convertedToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        // Combine previous and new data
        //console.log("res user====",json)
        if (searchQuery) {
          // If there's a search query, set newData to the JSON items
          newData = json?.items;
          setSearchQuery(null);
        } else {
          // If there's no search query, concatenate the previous data and the new JSON items
          newData = [...value, ...json?.items];
        }

        // Filter out duplicates based on item id
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)

      })
      .catch(err => {
        console.log('catch err in user list api=======', err)
        setIsLoading(false)
      })
  }
  //console.log('pagehere=======', page)
  useEffect(() => {
    getData()
  }, [page])

  const handleSearch = () => {
    (searchQuery ? getData() : Alert.alert('Error', 'enter data'))
    setPage(1)
  };
  const TruncatedText = ({ text }) => {
    return (
      <View  >
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.cardTitle}>
          {text}
        </Text>
      </View>
    );
  };
  const ViewProfile = (props) => {
    navigation.navigate('UserView', (props.id));
    console.log("value=====",props.id)
  };

  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const renderItem = ({ item, index }) => {
    return (
      <View key={item.id} style={styles.userCardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={item.photo ? { uri: item.photo } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/user3d.jpg" }}
              style={styles.cardImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="person" size={15} color="#900" style={styles.cardicon} />
              <TruncatedText text={item.firstname + ("  ") + item.lastname} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="email" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardDetails}>{item.email}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="phone-iphone" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardDetails}>{item.mobile_number}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <TouchableOpacity style={{
                backgroundColor: "#1b00b3",
                width: 80,
                height: 30,
                margin: 2,
                padding: 5,
                borderRadius: 10,
              }}>
                <Text style={styles.labelStyle}>
                  {item.user.status === 1 ? 'Active' : 'Deactive'}
                </Text>
              </TouchableOpacity>
              <CustomButton style={styles.cardButton} onPress={() => ViewProfile(item)} labelStyle={styles.labelStyle} label={'View'} />

            </View>
          </View>
        </View>
      </View>
    )
  };

  return (
    <>
      <View style={{ backgroundColor: "white" }} >
        <View style={{ flexDirection: "row", padding: 20, }} >
          <TextInput
            placeholder="Search"
            clearButtonMode="always"
            style={styles.tutorsearchbox}
            onChangeText={(query) => {
              //  handleChange(query)
              setSearchQuery(query);
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
        />
      </View>
    </>
  )
};
 