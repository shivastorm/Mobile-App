import React from "react";
import { View, Text,Image, TextInput, } from "react-native";
import { Button, SearchBar } from "react-native-elements";
import { getItem } from "../../utils/only-token";
import { useState } from "react";
import { styles } from '../../Styles/CreateStyleSheet' 
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';

export default function CreateServices() {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [searchText, setSearchText] = useState('')
    const [selectedImage, setSelectedImage] = useState(null);

    const handleNameChange = (text) => {
        setName(text);
    };
    const handleDescriptionChange = (text) => {
        setDescription(text);
    };
    const handleAssignCategory = (text) => {
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
            description: description,
            
        }
        
        const formData = new data();
        formData.append("ID","5f5f06011acf25b11eb5b997");
        formData.append('image', {
          uri: selectedImage.assets[0].uri,
          type: 'image/jpeg', // Adjust the type as needed
          name: 'image.jpg',
        });
        fetch(`${Api}categories/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${convertedToken}`,
              //  body: JSON.stringify(data),
            }
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((responseData) => {
                // Handle the API response here
                console.log('API response:', responseData);
            })
            .catch((error) => {
                // Handle errors here
                console.error('API request failed:', error);
            });
           
    };
    const handlechange = (query) => {
        setSearchText(query);
        //console.log("change===",searchText)
      }
      const handleChooseImage = async () => {
        const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
        
        if (permissionResult.granted === false) {
          alert('Permission to access media library is required!');
          return;
        }
    
        const pickerResult = await ImagePicker.launchImageLibraryAsync();
        
        if (!pickerResult.canceled) {
          setSelectedImage(pickerResult);
        }
      };

      const handleUploadImage = async () => {
        let access_token = await getItem('access_token');
        let convertedToken = JSON.parse(access_token)
        let Api = await getItem('api')
        if (!selectedImage) {
          return;
        }
    
        const formData = new FormData();
        formData.append("ID","5f5f06011acf25b11eb5b997");
        formData.append('image', {
          uri: selectedImage.assets[0].uri,
          type: 'image/jpeg', // Adjust the type as needed
          name: 'image.jpg',
        });
    
        try {
          const response = await axios.post(`${Api}services/create`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${convertedToken}`,
            },
          });
    
          // Handle the API response here
          console.log(response.data);
        } catch (error) {
          // Handle errors
          console.error(error);
        }
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
            <Text style={styles.label}>Assign Category:</Text>
            <SearchBar
          placeholder="Search..."
          returnType="text"
          onChangeText={handlechange}
          value={searchText}
          cancelButtonTitle="Cancel" // Customize the cancel button text (optional)
          containerStyle={{ backgroundColor: "grey", height: 51,padding:-1 }}
          inputContainerStyle={{ backgroundColor: '#fff', borderWidth: 1,borderTopColor:"white", borderColor: "#000",borderBottomColor:"black" }}
        // Customize the input container style (optional)
        />
   <Text style={styles.label}>Upload Image:</Text>
   <View style={styles.containerimage} >
      {selectedImage && (
        <Image source={{ uri: selectedImage.assets[0].uri }} style={styles.previewImage} />
      )}
      <Button title="Choose Image" onPress={handleChooseImage} />
      {selectedImage && (
        <Button title="Upload Image" onPress={handleUploadImage} />
      )}
    </View>
            <Button title="Submit" onPress={handleSubmit} />
        </View>
    );
}

 