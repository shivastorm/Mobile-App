import React from "react";
import { View, Text, TextInput, Keyboard, ActivityIndicator } from "react-native";
import Toast from 'react-native-root-toast';
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet';
import CustomButton from "../../components/CustomButton";

export default function EditQutoes({ route }) {
    const { id, desc,create } = route.params;
    const creation = !!create;
    const isEdit = !!id;
    const [description, setDescription] = useState(isEdit ? desc : '');
    const [isLoading, setIsLoading] = useState(false);
    const handleDescriptionChange = (text) => {
        setDescription(text);
    };
    const handleSubmit = async () => {
        Keyboard.dismiss();
        setIsLoading(true)
        let access_token = await getItem('access_token');
        let convertedToken = JSON.parse(access_token)
        let Api = await getItem('api')
        let PayLoad
        if (isEdit) {
            PayLoad = {
                id: id,
                description: description
            }
        } if(creation) {
            PayLoad = {
                description: description
            }
        }
        let url = isEdit ? `${Api}/servicesquotes/update/${id}`: creation? `${Api}/servicesquotes/create`:null;
        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${convertedToken}`,
            },
            body: JSON.stringify(PayLoad),
        })
            .then((response) => response.json())
            .then((json) => {
               //     console.log('response for edit=========', json)
                if (json.errors) {
                    const errorMessages = json.errors.map((error) => error.rules[0].message);
                    const errorMessage = errorMessages.join('\n');
                    setIsLoading(false);
                    Toast.show(errorMessage);
                } else if (json.status === 200 || json.status === 201) {
                    setIsLoading(false)
                    Toast.show('✌️Success✌️')
                    return;
                } else {
                    setIsLoading(false)
                    Toast.show('😞Error😞')
                }
            })
            .catch((error) => {
                setIsLoading(false)
                Toast.show('😞Error😞')
                console.error('API request failed in Edit servicequtoes====>', error);
            });
    };
    return (
        <View style={styles.container}>
            <Text style={styles.detailLabel}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a description"
                value={description}
                onChangeText={handleDescriptionChange}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="rose" />
            ) : (
                <CustomButton onPress={() => handleSubmit()}  label={'Submit'} />
            )}
        </View>
    );
}