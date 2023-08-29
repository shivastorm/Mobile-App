import React, { useState, useEffect } from "react";
import axios from "axios";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from "../components/starRating";
import { TouchableOpacity } from "react-native-gesture-handler";
export default function TutorScreen() {

  
  const [value, setValue] = useState([])

  useEffect(() => {
    // const proxy = {
    //   target: 'https://nurtemeventapi.nurtem.com',
    //   changeOrigin: true,
    // };
    const getData = async () => {
      const getTutors = await axios.get('https://nurtemeventapi.nurtem.com/providers/list', {
        headers: {
          Authorization: 'Bearer ' + 'wsP9cxjLMPV1AjttpJPMMDTMjXvCtwa5tgG8lHG2qB3EBBEcb9EeumIGp03KMoSMPrV7Ze20yfNnvAvBWDNxH4Yt2uX5lh36zNZ2wvmkG12CKXRuvheacFm42Ef5oZwcdGUUWhQnj5iCPEiDpiH3y7hmsEemdFZFQOrsWnfaCCn7t93zkdznBKXeR6epTDUupz2DOcBAlSjgZ2PNf8IlqlxBoE9fY00Vs09C3ie8D5cSDbbM2LQmtFrAmmCwMEj',
        },
        withCredentials: true,
        changeOrigin: true,
        params: { sort: 'created_at.DESC', page: 1},
      });
      // console.log("response ok ======", getTutors.data.items)
      setValue(getTutors.data.items)
      // if (getTutors.status === 200) {
      //   dispatch(listTutor(getTutors.data))
      //   return getTutors.data
      // }
    }
    getData()
  }, [])
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
  <SafeAreaView style={{ backgroundColor: "white" }}  >
    
    <ScrollView style={{ backgroundColor: "white" }}  >
      {value.map((value) => {
        return(
          <View key={value.id} style={styles.cardsWrapper}>
          
            <View style={styles.card}>

              <View style={styles.cardImgWrapper}>
                <Image
                  source={require("../assets/images/girl.webp")}
                  style={styles.cardImg}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.cardInfo}>
                <TruncatedText text={value.type ==='Individual' ? value.firstname : value.businessname} />
                <Text style={styles.cardDetails}>{value.email}</Text>
                <Text style={styles.cardDetails}>{value.mobile_number}</Text>
                <TouchableOpacity style={{
                  backgroundColor: "#e9b4f0",
                  width: 80,
                  height: 25,
                  margin:2,
                  padding: 2,
                  borderRadius: 10
                }}>
                  <Text style={{
                    color: "black",
                    fontSize: 14,
                    textAlign: "center"
                  }}>{value.user.status === 1 ? 'Active' : 'Deactive'} </Text>
                </TouchableOpacity>

      
              </View>
            </View>
          </View>
        )
      })}
    </ScrollView>

  </SafeAreaView >
  )
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
    borderRadius:10,
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