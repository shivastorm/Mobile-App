import React from "react";
import { View, Text, Button, TextInput, Keyboard, ActivityIndicator } from "react-native";
import Toast from 'react-native-root-toast';
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet'

export default function EditCategory({ route }) {
    const { id, nameValue, desc } = route.params;
    console.log('editcat==========', id)
    console.log('editcat==========', nameValue)
    console.log('editcat==========', desc)
    // Check if you received an 'id' from props to determine if it's an edit or create operation.
    const isEdit = !!id;

    const [name, setName] = useState(isEdit ? nameValue : ''); // Initialize with received 'nameValue'
    const [description, setDescription] = useState(isEdit ? desc : ''); // Initialize with received 'desc'
    const [isLoading, setIsLoading] = useState(false);

    const handleNameChange = (text) => {
        setName(text);
    };
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
                name: name,
                description: description
            }
        } else {
            PayLoad = {
                name: name,
                description: description
            }
        }

        let url = isEdit ? `${Api}/categories/edit/${id}` : `${Api}/categories/create`;
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
                console.log('response for edit=========', json)
                if (json.status === 200) {
                    setName(null)
                    setDescription(null)
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
                console.error('API request failed in create category====>', error);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter your name"
                value={name}
                onChangeText={handleNameChange}
            />
            <Text style={styles.label}>Description:</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter a description"
                value={description}
                onChangeText={handleDescriptionChange}
            />
            {isLoading ? (
                <ActivityIndicator size="large" color="rose" />
            ) : (
                <Button
                    title={"Submit"}
                    onPress={handleSubmit}
                    disabled={isLoading}
                />
            )}
        </View>
    );
}