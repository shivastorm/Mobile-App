import { View, Text, StyleSheet, Image, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../../components/CustomButton';
import { styles } from '../../Styles/styleSheet';
import React, { useState, useEffect } from "react";
import { getItem } from "../../utils/only-token";
import { TextInput } from "react-native-gesture-handler";

const TutorViewScreen = (props) => {
    const items = props.route.params.props.id
    const [isLoading, setIsLoading] = useState(false)
    const [item, setValue] = useState([])

    const getData = async () => {
        setIsLoading(true)
        let access_token = await getItem('access_token');
        let convertedToken = JSON.parse(access_token)
        let Api = await getItem('api')
        // console.log('acessTOken=====', Api)
        
        fetch(`${Api}/providers/view/${items}/?id${items}&expand=user`, {
            method: "GET",
            headers: {
                headers: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${access_token}`,
            },
            
        }).then((response) => response.json())
            .then((json) => {
                // Combine previous and new data
                const newData = json?.details
                // console.log('acessTOken=====', json?.details)
                setValue(newData);
                setIsLoading(false)
            })
            .catch(err => {
                console.log('catch err in tutor list api=======', err)
                setIsLoading(false)
            })
    }
    useEffect(() => {
        getData()
    }, [items])
    const claimHandle = (value) => {
        console.log('item=================', value)
    }
    const statusHandle = (value) => {
        console.log('item=================', value)

    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={"#e9b4f0"} />
            </View>
        )
    };
    return (
        <>
            <SafeAreaView>


                <ScrollView>

                    <View style={styles.container}>
                        <View style={styles.profileImageContainer}>
                            <Image
                                source={{ uri: 'https://nurtem-s3.s3.us-west-2.amazonaws.com/Assets/user3d.jpg' }}
                                style={styles.profileImage}
                            />
                        </View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.firstName}>{item.type === 'Individual' ? item.firstname : item.businessname}</Text>
                        </View>
                        <View style={styles.detailsContainer}>
                        <View style={{ display: 'flex', flexDirection: 'row',justifyContent:"space-between",marginVertical:15 }}>
                                
                                    {/* <Text style={styles.detailLabel}>Claim:</Text>
                                      <Text  >{item.claim === 0 ? "Claimed" : 'Unclaimed'} </Text> */}
                                    <CustomButton style={styles.cardButton}  onPress={() => claimHandle(item.id)} labelStyle={styles.labelStyle} label={item.claim === 0 ? 'Unclaim' : 'Claim'} />
                               
                                    {/* <Text style={styles.detailLabel}>Status:</Text>
                                   <Text style={styles.detailValue}>{item.user?.status === 0 ? "Deactivated" : 'Activated'} </Text> */}
                                    <CustomButton style={styles.cardButton} onPress={() => statusHandle()} labelStyle={styles.labelStyle} label={item.user?.status === 1 ? 'Deactivate Now' : 'Activate Now'} />
                                 
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Email:</Text>
                                {/* <TextInput
                                style={styles.detailValue}
                                disabled="true"
                                editable={false}
                                value={item.email}
                            >
                            </TextInput> */}
                                <Text style={styles.detailValue}>{item.email}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Address:</Text>
                                <Text style={styles.detailValue}>{item.address}</Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Phone:</Text>
                                <Text style={styles.detailValue}>{item.mobile_number} </Text>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Type:</Text>
                                <Text style={styles.detailValue}>{item.type} </Text>

                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Bio:</Text>
                                <Text style={styles.detailValue}>{item.bio} </Text>
                            </View>
                            <View  >
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Experience:</Text>
                                    <Text style={styles.detailValue}>{item.years_of_experience} </Text>
                                </View>
                                <View style={styles.detailItem}>
                                    <Text style={styles.detailLabel}>Students Taught:</Text>
                                    <Text style={styles.detailValue}>{item.no_of_students_taught} </Text>
                                </View>
                            </View>
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Teaching Modes:</Text>
                                <Text style={styles.detailValue}>{item.teaching_modes} </Text>
                            </View>
                          
                            {/* Add more details as needed */}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         alignItems: 'center',
//         backgroundColor: '#ff',
//         flexDirection: 'column',
//         margin: 20,

//     },
//     profileImageContainer: {
//         marginTop: 20,
//         alignItems: 'center',
//     },
//     labelStyle: {
//         fontSize: 14,
//         color: "white",
//         fontFamily: 'Roboto-Bold',
//         textAlign: "center"

//     },
//     profileImage: {
//         width: 150,
//         height: 150,
//         borderRadius: 75, // To make the image round
//     },
//     nameContainer: {
//         marginTop: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     firstName: {
//         fontSize: 24,
//         fontFamily: 'Roboto-Bold',
//         marginRight: 10,
//     },
//     detailsContainer: {

//         alignItems: 'flex-start',
//         justifyContent: 'flex-start',
//         padding: 25

//     },
//     detailItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginBottom: 10,
//     },
//     detailLabel: {
//         //width: 100,
//         fontSize: 14,

//         fontFamily: 'Roboto-Bold',
//     },
//     detailLabelstu: {
//         //width: 100,
//         fontSize: 14,
//         textAlignVertical: "bottom",

//         fontFamily: 'Roboto-Bold',
//     },
//     detailValue: {
//         fontSize: 14,
//         marginLeft: 10,
//         fontFamily: 'Roboto-Regular',
//     },
//     cardButton: {
//         backgroundColor: "#1b00b3",
//         width: 80,
//         height: 30,
//         margin: 2,
//         padding: 5,
//         borderRadius: 10,
//         alignContent: 'center'
//     },
// });

export default TutorViewScreen