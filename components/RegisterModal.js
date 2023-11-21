import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  KeyboardAvoidingView,
  TextInput,
} from "react-native";

export default function RegisterModal(props) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const fetchURL = "http://172.20.10.2:7261";

  const handleRegister = async () => {
    console.log("Registering:", username, password);
    try {
      const response = await fetch(`${fetchURL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        // Handle the response data
        console.log("Registration successful:", data);
        props.toggleModal();
        props.toggleModalLogin();
      } else {
        // Handle HTTP errors
        console.error("Registration failed:", response.status);
      }
    } catch (error) {
      // Handle network errors
      console.error("Network error:", error);
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
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Register</Text>

            <TextInput
              style={styles.input}
              onChangeText={setName}
              value={username}
              placeholder="Name"
            />

            <TextInput
              style={styles.input}
              onChangeText={setPassword}
              value={password}
              placeholder="Password"
              secureTextEntry
            />

            <Pressable
              style={[styles.button, styles.buttonSubmit]}
              onPress={handleRegister}
            >
              <Text style={styles.textStyle}>Register</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.toggleModal()}
            >
              <Text style={styles.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    width: "100%",
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
    width: "90%",
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
    marginVertical: 10,
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
  input: {
    width: "80%",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    borderColor: "grey",
  },
  buttonSubmit: {
    backgroundColor: "#2196F3",
    marginTop: 10,
  },
});
