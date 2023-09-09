import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getItem } from "../../utils/only-token";
import { styles } from "../../Styles/styleSheet"

import { SafeAreaView } from "react-native-safe-area-context";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "../../components/CustomButton";

export default function ListServices() {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/services/list?page=${page}`, {
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
        //console.log('values=========', newData)
        // Filter out duplicates based on item id
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)
      })
      .catch(err => {
        console.log('catch err in service list api call=======', err)
        setIsLoading(false)
      })
  }

  useEffect(() => {
    getData()
  }, [page])

  const TruncatedText = ({ text }) => {
    return (
      <View  >
        <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardDetails}>
          {text}
        </Text>
      </View>
    );
  };

  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const renderItem = ({ item, index }) => {
    let date = new Date(item.created_at)
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{ uri: item.icon } ? { uri: item.icon } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/user3d.jpg" }}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
              <MIcon name="person" size={16} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}> {item.name} </Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TruncatedText style={styles.cardDetails} text={item.description} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <MIcon name="calendar-today" size={15} color="#900" style={styles.cardicon} />
                <Text style={styles.cardDetails}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
              </View>
              <CustomButton style={styles.cardButton} labelStyle={styles.labelStyle} label={item.status === 1 ? 'Active' : 'Deactive'} />
            </View>
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={{ backgroundColor: "white" }}  >
      <FlatList
        data={value}
        onEndReachedThreshold={0.1}
        onEndReached={() => { setPage(page + 1) }}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
      />
    </View>

  );
};
