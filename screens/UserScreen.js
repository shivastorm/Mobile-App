import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
//import filter from "lodash.filter"
import { getItem } from "../utils/only-token";
import CustomButton from "../components/CustomButton";

export default function ManageUser() {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const getData = async () => {
    setIsLoading(true)
    let onboarded = await getItem('access_token');
    let convertedToken = JSON.parse(onboarded)
    console.log('acessTOken=====', convertedToken)
    fetch(`https://nurtemeventapi.nurtem.com/users/list?sort=created_at.ASC&limit=20&page=${page}`, {
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
  //console.log('pagehere=======', page)
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>

    )
  }
  const renderItem = ({ item, index }) => {
    return (
      <View key={item.id} style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={item.photo ? { uri: item.photo } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/default-profile.png" }}
              style={styles.cardImg}
              resizeMode="contain"
            />
          </View>
          <View style={styles.cardInfo}>
            <TruncatedText text={item.firstname} />
            <Text style={styles.cardDetails}>{item.email}</Text>
            <Text style={styles.cardDetails}>{item.mobile_number}</Text>
            <TouchableOpacity style={{
              backgroundColor: "#e9b4f0",
              width: 80,
              height: 25,
              margin: 2,
              padding: 2,
              borderRadius: 10
            }}>
              <Text style={styles.activebutton}>
                {item.user.status === 1 ? 'Active' : 'Deactive'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  return (
    <View style={{ backgroundColor: "white" }} >
      <View style={{
        marginHorizontal: 10
      }} >
        <TextInput
          placeholder="Search"
          clearButtonMode="always"
          style={styles.searchbox}
          value={searchQuery}
          onChangeText={(query) => handleChange(query)}
        />
      </View>
      <FlatList
        data={value}
        onEndReachedThreshold={0.1}
        onEndReached={() => { setPage(page + 1) }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>
  )
};


{/* <FlatList
        data={value}
        // keyExtractor={(value) => value.item.id}
        renderItem={(value) => (
          <><View style={styles.itemcontainer}>
            <Image source={{ uri: value.item.photo }} style={styles.serachboximage} />

            <View>
              <Text style={styles.serachemail}>
                {value.item.firstname}{value.item.email}
              </Text>
            </View>
          </View>
          </>
        )} /> */}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  activebutton: {
    color: "black",
    fontSize: 14,
    textAlign: "center"
  },
  serachboximage: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
  },
  searchbox: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8
  },
  serachemail: {
    fontSize: 14,
    marginLeft: 10,
    color: "grey"
  },

  wrapper: {},

  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 8,
  },
  categoryContainer: {
    flexDirection: 'row',
    width: '90%',
    alignSelf: 'center',
    marginTop: 25,
    marginBottom: 10,
  },
  categoryBtn: {
    flex: 1,
    width: '30%',
    marginHorizontal: 0,
    alignSelf: 'center',
  },
  categoryIcon: {
    borderWidth: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 70,
    height: 70,
    backgroundColor: '#fdeae7' /* '#FF6347' */,
    borderRadius: 50,
  },
  categoryBtnTxt: {
    alignSelf: 'center',
    marginTop: 5,
    color: '#de4f35',
  },
  itemcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    marginTop: 10,
  },
  cardsWrapper: {
    marginTop: 5,
    width: '99%',
    borderColor: "black",
    alignSelf: 'center',
    borderBottomColor: "#fff",
  },
  card: {
    height: 130,
    marginVertical: -5,
    flexDirection: 'row',
    shadowColor: '#999',

    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,

  },
  cardImgWrapper: {
    flex: 1,

  },
  cardImg: {
    height: '50%',
    width: '75%',
    borderRadius: 10,
    alignSelf: 'center',
    borderColor: "black",
    //borderRadius: 8,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,

  },
  cardInfo: {
    flex: 4,
    padding: 0,
    borderColor: '#fff',
    borderWidth: 1,
    borderLeftWidth: 0,
    borderRightWidth: 13,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    backgroundColor: '#fff',
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    /// fontFamily: "Roboto-Regular",
    paddingBottom: 5,
  },
  cardDetails: {
    fontSize: 15,
    paddingBottom: 2,
    color: '#444',
  },
});