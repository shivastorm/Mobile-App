import React, { useState } from 'react';
import { View, Button, Image, StyleSheet } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { getItem } from "../../utils/only-token";
import axios from 'axios';

const ImageUpload = () => {
  const [selectedImage, setSelectedImage] = useState(null);

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
      {selectedImage && (
        <Image source={{ uri: selectedImage.assets[0].uri }} style={styles.previewImage} />
      )}
      <Button title="Choose Image" onPress={handleChooseImage} />
      {selectedImage && (
        <Button title="Upload Image" onPress={handleUploadImage} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewImage: {
    width: 200,
    height: 200,
    marginVertical: 10,
  },
});

export default ImageUpload;