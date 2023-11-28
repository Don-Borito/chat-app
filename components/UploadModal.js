import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  Button,
  Image,
  Platform
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function UploadModal(props) {
  const [selectedImage, setSelectedImage] = useState(null);
  const fetchURL = "https://chatcharm.onrender.com"

  const openGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedAsset = result.assets[0];
      setSelectedImage(selectedAsset.uri);
      uploadImage(selectedAsset);
    }
  };

  const uploadImage = async (image) => {
    const formData = new FormData();

    const uriParts = image.uri.split(".");
    const fileType = uriParts[uriParts.length - 1];

    formData.append("image", {
      uri: Platform.OS === "ios" ? image.uri.replace("file://", "") : image.uri,
      name: `photo.${fileType}`,
      type: `image/${fileType}`,
    });

    try {
      const response = await fetch(fetchURL + "/UploadImage", {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization" : "Bearer " + props.token,
        },
      });

      if (response.ok) {
        const responseData = await response.text();
        console.log("Upload successful", responseData);
      } else {
        console.error("Upload failed", response);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.toggleModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Upload a Profile Image</Text>
          <Button onPress={openGallery} title="Open Gallery"></Button>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage }}
              style={{ width: 300, height: 300 }}
            />
          )}
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => props.toggleModal()}
          >
            <Text style={styles.textStyle}>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 20,
  },
});
