import { View, Text, StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../components/CustomButton';
import React, { useState, useEffect } from "react";
import { getItem } from "../utils/only-token";

const TutorViewScreen = (props) => {
    const items = props.route.params.props.id
    const [isLoading, setIsLoading] = useState(false)
    const [item, setValue] = useState([])

    const getData = async () => {
        setIsLoading(true)
        let onboarded = await getItem('access_token');
        let convertedToken = JSON.parse(onboarded)
        fetch(`https://nurtemeventapi.nurtem.com/providers/view/${items}/?id${items}&expand=user`, {
            method: "GET",
            headers: {
                headers: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${convertedToken}`,
            },
        }).then((response) => response.json())
            .then((json) => {
                // Combine previous and new data
                const newData = json?.details
                console.log('acessTOken=====', json?.details)
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
        const setStatus = async () => {
            // setIsLoading(true)
            let onboarded = await getItem('access_token');
            let convertedToken = JSON.parse(onboarded)
            fetch(`https://nurtemeventapi.nurtem.com/users/change-status`, {
                method: "POST",
                headers: {
                    headers: { 'Content-Type': 'application/json' },
                    Authorization: `Bearer ${convertedToken}`,
                },
                body: JSON.stringify({
                    id: items,
                    status: item.user.status,
                }),
            }).then((response) => response.json())
                .then((json) => {
                    // Combine previous and new data
                    // const newData = json?.details
                    console.log('acessTOken=====', json)
                    // setValue(newData);
                    //setIsLoading(false)
                })
                .catch(err => {
                    console.log('catch err in tutor list api=======', err)
                    setIsLoading(false)
                })
        }
        setStatus()
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
            </View>
            <View style={styles.container}>

                <View style={styles.detailsContainer}>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Email:</Text>
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
                        <Text style={styles.detailLabel}>Claim:</Text>
                        <Text style={styles.detailValue}>{item.claim === 0 ? "Claimed" : 'Unclaimed'} </Text>
                        <CustomButton style={styles.cardButton} onPress={() => claimHandle(item.id)} labelStyle={styles.labelStyle} label={item.claim === 0 ? 'Unclaim' : 'Claim'} />
                    </View>
                    <View style={styles.detailItem}>
                        <Text style={styles.detailLabel}>Status:</Text>
                        <Text style={styles.detailValue}>{item.user.status === 0 ? "Deactivated" : 'Activated'} </Text>
                        <CustomButton style={styles.cardButton} onPress={() => statusHandle()} labelStyle={styles.labelStyle} label={item.user.status === 1 ? 'Deactivate Now' : 'Activate Now'} />
                    </View>
                    {/* Add more details as needed */}
                </View>
            </View>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF',
        flexDirection: 'column'
    },
    profileImageContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75, // To make the image round
    },
    nameContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    firstName: {
        fontSize: 24,
        fontFamily: 'Roboto-Bold',
        marginRight: 10,
    },
    detailsContainer: {
        marginTop: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        padding: 10

    },
    detailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    detailLabel: {
        //width: 100,
        fontSize: 14,
        fontFamily: 'Roboto-Bold',
    },
    detailValue: {
        fontSize: 14,
        marginLeft: 10,
        fontFamily: 'Roboto-Regular',
    },
    cardButton: {
        backgroundColor: "#1b00b3",
        width: 90,
        height: 25,
        margin: 2,
        padding: 5,
        borderRadius: 10,
        alignContent:'center'
    },
});

export default TutorViewScreen