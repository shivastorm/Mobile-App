import React from "react";
import { View, Text, Button, TextInput, ActivityIndicator, Keyboard } from "react-native";
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet'
import Toast from 'react-native-root-toast';

export default function CreateQutoes() {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false)

  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    setIsLoading(true)
    let access_token = await getItem('access_token');
    let convertedToken = JSON.parse(access_token)
    let Api = await getItem('api')

    const data = {
      description: description
    }
    fetch(`${Api}/servicesquotes/create`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${convertedToken}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.status === 200) {
          Toast.show('✌️Success✌️')
          setIsLoading(false)
          setDescription(null)
          return;
        } else {
          setIsLoading(false)
          Toast.show('😞Error😞')
        }
      })
      .catch((error) => {
        Toast.show('😞Error😞')
        setIsLoading(false)
        console.error('API request failed in create category====>', error);
      });
  };

  return (
    <View style={styles.container}>
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
        <Button title="Submit" onPress={handleSubmit} />
      )}
    </View>
  );
}