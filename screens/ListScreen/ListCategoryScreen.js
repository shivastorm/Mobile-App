import { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { getItem } from "../../utils/only-token";
import { styles } from '../../Styles/styleSheet';

import MIcon from 'react-native-vector-icons/MaterialIcons';
import CustomButton from "../../components/CustomButton";
import CreateCategory from "../CreateScreen/CreateCategoryScreen";

export default function ListCategories({ navigation }) {
  const [value, setValue] = useState([])
  const [page, setPage] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const getData = async () => {
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')
    fetch(`${Api}/categories/list?sort=updated_at.asc&page=${page}`, {
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
        console.log('catch err in service list api call=======', err)
        setIsLoading(false)
      })
  };

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
  const EditCategory = (id, nameValue, desc) => {
    // Pass the values as an object
    navigation.navigate('EditCategory', { id, nameValue, desc });
  };
  const CreateCategory = () => {
    // Pass the values as an object
    navigation.navigate('EditCategory' );
  };

  if (isLoading && page === 1) {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} color={"#e9b4f0"} />
      </View>
    )
  };

  const renderItem = ({ item, index }) => {
    let date = new Date(item.updated_at)
    let id = item.id
    let nameValue = item.name
    let desc = item.description
    return (
      <>
      

        

          <View style={styles.cardsWrapper}>
            <TouchableOpacity
              onPress={() => EditCategory(id, nameValue, desc)}>
              <View style={styles.cardcategory}>
                <View style={styles.categorycardInfo}>

                  <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                    <MIcon
                      name="person" size={16}
                      color="#900"
                      style={styles.cardicon} />
                    <Text style={styles.cardTitle}> {nameValue} </Text>
                  </View>


                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <TruncatedText style={styles.cardDetails} text={desc} />
                  </View>
                  <View style={{ display: 'flex', flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
                    <View style={{ display: "flex", flexDirection: "row" }}>
                      <MIcon
                        name="calendar-today"
                        size={15} color="#900"
                        style={styles.cardicon} />
                      <Text style={styles.cardDetails}>
                        {`${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                      </Text>
                    </View>
                    <CustomButton
                      style={styles.cardButton}
                      labelStyle={styles.labelStyle}
                      label={item.status === 1 ? 'Active' : 'Deactive'} />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        
      </>

    )
  };

  return (
    <View style={{ backgroundColor: "white" }} >
        <View styel={{display:"flex",flexDirection:"row",alignItems:'',justifyContent:"center"}}>
          <CustomButton
            style={styles.cardButton}
            labelStyle={styles.labelStyle}
            label={'create'} 
            onPress={() => CreateCategory()}
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

  );
};
