import React from "react";
import { View, Text, Button, TextInput, Alert } from "react-native";
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet'
export default function CreateCategory() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const handleNameChange = (text) => {
    setName(text);
  };
  const handleDescriptionChange = (text) => {
    setDescription(text);
  };

  const handleSubmit = async () => {
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
          Alert.alert('category created sucessfully ');
          setName(null)
          setDescription(null)
          return;

        } else {
          Alert.alert('Error! ');
        }
      })
      .catch((error) => {
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
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
}