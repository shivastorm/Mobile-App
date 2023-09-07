import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getItem } from "../../utils/only-token";
import { SafeAreaView } from "react-native-safe-area-context";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "../../components/CustomButton";

export default function ListQuotes() {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/servicesquotes/list?page=${page}`, {
      method: "GET",
      headers: {
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${convertedToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        const newData = [...value, ...json?.items];
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)
      })
      .catch(err => {
        console.log('catch err in qutoes list api call=======', err)
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

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const renderItem = ({ item, index }) => {
    let date = new Date(item.updated_at)
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.card}>
          <View style={styles.cardImgWrapper}>
            <Image
              source={{ uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/user3d.jpg" }}
              style={styles.cardImg}
              resizeMode="cover"
            />
          </View>
          <View style={styles.cardInfo}>
            {/* <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
              <MIcon name="person" size={16} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}> {item.name} </Text>
            </View> */}
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <TruncatedText style={styles.cardDetails} text={item.description} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <MIcon name="calendar-today" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardDetails}>{`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
            </View>
            <CustomButton style={styles.cardButton} labelStyle={styles.labelStyle} label={item.status === 1 ? 'Active' : 'Deactive'} />
          </View>
        </View>
      </View>
    )
  };

  return (
    <View style={{ backgroundColor: "white" }} >
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

const styles = StyleSheet.create({

  cardicon: {
    alignSelf: "center",
    marginRight: 5
  },
  cardsWrapper: {
    marginTop: 20,
    width: '100%',
    alignSelf: 'center',
    borderBottomColor: "#fff",
  },
  card: {
    maxHeight: 145,
    flexDirection: 'row',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 3,
    backgroundColor: 'white',
    borderRadius: 5,
    paddingTop: 10,
    paddingBottom: 10,
  },
  cardImgWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  cardImg: {
    height: '50%',
    width: '80%',
    borderRadius: 10,
    padding: 30,
  },
  cardInfo: {
    flex: 4,
    paddingRight: 5,
  },
  cardTitle: {
    fontSize: 15,
    fontFamily: "Roboto-Bold",
    paddingBottom: 5,
  },
  cardDetails: {
    fontSize: 15,
    paddingBottom: 2,
    color: '#444',
  },
  cardButton: {
    backgroundColor: "#e9b4f0",
    width: 80,
    height: 25,
    margin: 2,
    padding: 2,
    borderRadius: 10,
    marginLeft: 5,
  },
  labelStyle: {
    color: "black",
    fontSize: 14,
    textAlign: "center"
  },
  searchbox: {
    width: "83%",
    paddingHorizontal: 20,
    marginRight: 5,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row"

  },
  searchboxicon: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 20,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: "row"
  }
});