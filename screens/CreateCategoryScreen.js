import React from "react";
import { View, Text, Button, StyleSheet, TextInput, } from "react-native";
import { getItem } from "../utils/only-token";
import { useState } from "react";

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
    // console.log('Name:', name),
    //     console.log('Description:', description)
    // Add your logic to send data to the server or perform any other action
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
      .then((response) => {
        if (!response.ok) {
          console.error(`API request failed with status guys: ${response.status}`);
          return response.json()
            .then(errorData => {
              console.error('Error response data:', errorData);
              throw new Error('Network response was not ok');
            });
        }
        return response.json();
      })
      .then((responseData) => {
        // Handle the API response here
        console.log('API response guys:', responseData);
        console.log('status response hello:', responseData.status);
        // if (responseData.status === 200) {
        //   Alert.alert('category created sucessfully ');
        //   return;
        // }
      })
      .catch((error) => {
        // Handle errors here
        console.error('API request failed:', error);
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  input: {
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
});




