import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import MIcon from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Ionicons';
import AIcon from 'react-native-vector-icons/AntDesign';
import { styles } from "../../Styles/styleSheet"
import { FlatList } from "react-native-gesture-handler";
import { getItem } from "../../utils/only-token";
import CustomButton from "../../components/CustomButton";
import _ from 'lodash'

export default function ListTransactions({ navigation }) {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    // console.log("api value===",`${Api}/transactions/list/?page=1&sort=created_at.desc&expand=class_details,camp_details,provider,user,dependent_user,payment_details`)
    fetch(`${Api}/transactions/list/?page=1&sort=created_at.DESC&expand=class_details,camp_details,provider,user,dependent_user,payment_details`, {
      method: "GET",
      headers: {
        headers: { 'Content-Type': 'application/json' },
        Authorization: `Bearer ${convertedToken}`,
      },
    }).then((response) => response.json())
      .then((json) => {
        // console.log("hgac=====",json)
        const newData = [...value, ...json?.items];

        // Filter out duplicates based on item id
        const uniqueData = Array.from(new Set(newData.map(item => item.id))).map(id => newData.find(item => item.id === id));

        setValue(uniqueData);
        setIsLoading(false)
      })
      .catch(err => {
        console.log('catch err in tutor list api call=======', err)
        setIsLoading(false)
      })

  };

  useEffect(() => {
    getData()
  }, [page])

  const TruncatedText = ({ text }) => {
    return (
      <View  >
        <Text numberOfLines={2} ellipsizeMode="tail" style={styles.context}>
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
  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const ViewProfile = (props) => {
    navigation.navigate('TutorView', { props });
  };

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.cardsWrapper}>
        <View style={styles.card_Trans_Cat}>         
          <View style={styles.cardInfo}>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center', }}>
              <AIcon name="idcard" size={16} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}>ID:   </Text>
              <TruncatedText text={item.id} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
              <MIcon name="style" size={16} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}>Type:   </Text>
              <TruncatedText text={item.class_type} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
              <Icon name="stats-chart-outline" size={16} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}>Status:  </Text>
              <TruncatedText text={item.status === 1 ? 'Active' : 'Deactive'} />
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="person" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}>User Name:   </Text>
              <Text style={styles.cardDetails}>{item.user.firstname}</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <MIcon name="person" size={15} color="#900" style={styles.cardicon} />
              <Text style={styles.cardTitle}>Session:   </Text>
              <Text style={styles.cardDetails}>{
              item.class_type === "class" ? 
              _.get(item,"class_details.session_name"," ") 
              :item.class_type === "camp"?
              _.get(item,"camp_details.session_name"," ") :
             _.get(item,"competition_details.session_name","undefined")             
                       

            }</Text>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 10 }}>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MIcon name="access-time" size={15} color="#900" style={styles.cardicon} />
                <Text style={styles.cardTitle}>No Session paid:   </Text>
                <Text style={styles.cardDetails}>{item.number_session_paid}</Text>
              </View>
              <View style={{ display: 'flex', flexDirection: 'row' }}>
                <MIcon name="attach-money" size={15} color="#900" style={styles.cardicon} />
                <Text style={styles.cardTitle}>Amount:    </Text>
                <Text style={styles.cardDetails}>{item.amount}</Text>
              </View>
            </View>
            {/* <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
              <CustomButton style={styles.cardButton} labelStyle={styles.labelStyle} label={item.user.status === 1 ? 'Active' : 'Deactive'} />
              <CustomButton style={styles.cardButton} onPress={() => ViewProfile(item)} labelStyle={styles.labelStyle} label={'View Profile'} />
            </View> */}
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
      // onRefresh={onRefresh}
      // refreshing={isRefreshing}
      />
    </View >
  )
}

