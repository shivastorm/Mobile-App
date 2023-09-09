import { View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from '../../components/CustomButton';
import { styles } from '../../Styles/styleSheet';
import React, { useState, useEffect } from "react";
import { getItem } from "../../utils/only-token";
import Toast from 'react-native-root-toast';
const TutorViewScreen = (props) => {
    const items = props.route.params
    const [isLoading, setIsLoading] = useState(false)
    const [item, setValue] = useState([])

    const getData = async () => {
        setIsLoading(true)
        let access_token = await getItem('access_token');
        let convertedToken = JSON.parse(access_token)
        let Api = await getItem('api')

        fetch(`${Api}/providers/view/${items}/?id${items}&expand=user`, {
            method: "GET",
            headers: {
                headers: { 'Content-Type': 'application/json' },
                Authorization: `Bearer ${convertedToken}`,
            },
        }).then((response) => response.json())
            .then((json) => {
                const newData = json?.details
                setValue(newData);
                setIsLoading(false)
            })
            .catch(err => {
                console.log('catch err in tutor list api=======', err)
                setIsLoading(false)
            })
    };

    useEffect(() => {
        getData()
    }, [items])

    const claimHandle = async (id, status) => {
            };

    const updateUserField = async (id, field, currentValue) => {
        setIsLoading(true);

        let accessToken = await getItem('access_token');
        let convertedToken = JSON.parse(accessToken);
        let api = await getItem('api');

        let url;
        let data;

        if (field === 'status') {
            url = `${api}/users/change-status`;
            data = {
                id,
                status: currentValue === 1 ? 0 : 1
            };
        } else if (field === 'verified') {
            url = `${api}/admin/change-verified`;
            data = {
                id,
                verified: currentValue === 1 ? 0 : 1
            };
        }

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${convertedToken}`
            },
            body: JSON.stringify(data)
        })
            .then(response => response.json())
            .then(json => {
                if (json.status === 200) {
                    setIsLoading(false);
                    Toast.show('✌️Success✌️');
                    getData();
                } else {
                    setIsLoading(false);
                    Toast.show('😞Error😞');
                }
            })
            .catch(error => {
                setIsLoading(false);
                Toast.show('😞Error😞');
                console.error('API request failed:', error);
            });

    }

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: "center" }}>
                <ActivityIndicator size={"large"} color={"#e9b4f0"} />
            </View>
        )
    };

    return (
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
                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 15 }}>
                            <CustomButton style={styles.cardButton}
                                onPress={() => claimHandle(item.id, item.user?.status)}
                                labelStyle={styles.labelStyle}
                                label={item.claim === 0 ? 'Unclaim' : 'Claim'} />
                            <CustomButton style={styles.cardButton}
                                onPress={() => updateUserField(item.user?.id, 'status', item.user?.status)}
                                labelStyle={styles.labelStyle}
                                label={item.user?.status === 1 ? 'Deactivate Now' : 'Activate Now'} />
                            <CustomButton style={styles.cardButton}
                                onPress={() => updateUserField(item.user?.id, 'verified', item.user?.verified)}
                                labelStyle={styles.labelStyle}
                                label={item.user?.verified === 1 ? 'Unverify Now' : 'Verify Now'} />
                        </View>
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

                        {item.firebase && item.firebase.length > 0 && (
                            <View style={styles.detailItem}>
                                <Text style={styles.detailLabel}>Firebase Tokens:</Text>

                                {item.firebase.map(item => (
                                    <View style={styles.detailItem}>
                                        <Text style={styles.detailValue} selectable={true}>
                                            Device ID: {item.device_id}
                                        </Text>
                                        <Text style={styles.detailValue} selectable={true}>
                                            Token: {item.fcm_token}
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        )}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default TutorViewScreen