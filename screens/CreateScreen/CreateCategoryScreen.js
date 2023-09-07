import React from "react";
import { View, Text, Button, TextInput, Keyboard, ActivityIndicator } from "react-native";
import Toast from 'react-native-root-toast';
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet'
export default function CreateCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false)

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

    const data = {
      name: name,
      description: description
    }
    fetch(`${Api}/categories/create`, {
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