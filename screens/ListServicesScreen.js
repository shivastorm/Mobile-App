import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { getItem } from "../utils/only-token";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListServices() {
  // useEffect(() => {
  //   // const proxy = {
  //   //   target: 'https://nurtemeventapi.nurtem.com',
  //   //   changeOrigin: true,
  //   // };
  //   const getData = async () => {
  //     const getTutors = await axios.get('https://nurtemeventapi.nurtem.com/services/list', {
  //       headers: {
  //         Authorization: 'Bearer ' + '3pSXmfET1seZwTYjdrFiWPn50b0HWLA6vJvKJ2tw8cwkqDnpNShK1LHkOYxMFIPZk6hQoLU7Pd7RCqS7JKXVWuyMJJ1JqYXGOD3Bb4GkmpVQpdSVvIyl8XjLi5N1mBbL7T5EXZqM33ai6Ryi7Ug2Fdnk7YZKddKMHwyqftvLMH20JfahHvAgJ11dN7NXjz8Bn8o40FQsbmxaHGR952iy0qUFictjuxD2jv8nOrptZNkFZSzHN6WWwVdYmAtnhLi',
  //       },
  //       withCredentials: true,
  //       changeOrigin: true,
  //       params: { sort: 'created_at.DESC', page: { page } },
  //     });
  //     // console.log("response ok ======", getTutors.data.items)
  //     // setValue([...value,...getTutors.data.items])
  //     setValue(getTutors.data.items)
  //     // console.log("id=================", getTutors.data.items)
  //     // console.log(page)
  //   }
  //   getData()
  // }, [page])
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/providers/list?sort=created_at.ASC&limit=20&page=${page}`, {
      method: "GET",
      headers: {
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${convertedToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        // Combine previous and new data
        const newData = [...value, ...json?.items];
        // console.log("hoivalue", newData)

        // Filter out duplicates based on item id
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)
      })
      .catch(err => {
        console.log('catch err in tutor list api call=======', err)
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
  }; const onRefresh = () => {
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

  const renderItem = ({ item, index }) => {
    // { console.log("index===========", item) }
    <View key={item.id} style={styles.cardsWrapper}>
      <View style={styles.card}>
        <View style={styles.cardImgWrapper}>
          <Image
            source={item.icon ? { uri: item.icon } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/nurtemnobg.png" }}
            style={styles.cardImg}
            resizeMode="contain"
          />
        </View>
        <View style={styles.cardInfo}>
          <TruncatedText text={item.name} />
          <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardDetails}>
            {item.description}
          </Text>
          <TouchableOpacity style={{
            backgroundColor: "#e9b4f0",
            width: 80,
            height: 25,
            margin: 2,
            padding: 2,
            borderRadius: 10,
          }}>
            <Text style={{
              color: "black",
              fontSize: 14,
              textAlign: "center"
            }}>{item.status === 1 ? 'Active' : 'Deactive'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  }
  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={value}
        onEndReachedThreshold={0.1}
        onEndReached={() => { setPage(page + 1) }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        onRefresh={onRefresh}
        refreshing={isRefreshing}
      />
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sliderContainer: {
    height: 200,
    width: '90%',
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 8,
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
  cardsWrapper: {
    marginTop: 5,
    width: '99%',
    borderColor: "black",
    alignSelf: 'center',
    borderBottomColor: "#fff",
  },
  card: {
    padding: 12,
    maxHeight: 130,
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
    height: '80%',
    width: '80%',
    borderRadius: 10,
    alignSelf: 'center',
    resizeMode: 'repeat',
    //backgroundColor: "yellow"
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
    paddingBottom: 3,
  },
  cardDetails: {
    fontSize: 15,
    paddingBottom: 5,
    color: '#7a7776',
  },
});