import axios from "axios";
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ListServices() {

  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [imageURL, setImageURL] = useState(null);

  useEffect(() => {
    // const proxy = {
    //   target: 'https://nurtemeventapi.nurtem.com',
    //   changeOrigin: true,
    // };
    const getData = async () => {
      const getTutors = await axios.get('https://nurtemeventapi.nurtem.com/services/list', {
        headers: {
          Authorization: 'Bearer ' + 'NCX24CRbXTw8bnmx3eHYLrV1mdx2KAQdmE2B7WPWXtJmHztqWGwvNLa84LuxbP4D0j5xJ4C7fUn1b3EXoCkNmZ1YMEiAKZGD1M4HjfulFEgQNLmUdR9Ud27DmsCnJnVb70Caq0CbHMSWwzYhakRP04iMUObiuSdIIbLklh6b8NgmLNX1HY3IOoumqFJJPOfbrOQlKzE9ycvbbgp0Y3ewmRr8oofOaiVNJZiKjb0bLGsyl69v201wNYUguKlUroi',
        },
        withCredentials: true,
        changeOrigin: true,
        params: { sort: 'created_at.DESC', page: { page } },
      });
      // console.log("response ok ======", getTutors.data.items)
      // setValue([...value,...getTutors.data.items])
      setValue(getTutors.data.items)
      // console.log("id=================", getTutors.data.items)
      // console.log(page)
    }
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

  return (
    <View style={{ backgroundColor: 'white' }}>
      <FlatList
        data={value}
        // onEndReachedThreshold={0.5}
        // onEndReached={()=>{setPage(page + 1)}}
        renderItem={(value) => {
          return (
            <View key={value.item.id} style={styles.cardsWrapper}>
              {/* {console.log("index===========", value.item.icon)} */}
              <View style={styles.card}>
                {/* <Text>hi</Text> */}
                <View style={styles.cardImgWrapper}>
                  <Image
                    source={value.item.icon ? { uri: value.item.icon } : { uri: "https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/nurtemnobg.png" }}
                    style={styles.cardImg}
                    resizeMode="cover"
                  />
                </View>
                <View style={styles.cardInfo}>
                  <TruncatedText text={value.item.name} />
                  <Text numberOfLines={3} ellipsizeMode="tail" style={styles.cardDetails}>
                    {value.item.description}
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
                    }}>{value.item.status === 1 ? 'Active' : 'Deactive'}</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )
        }}
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
    height: '50%',
    width: '75%',
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