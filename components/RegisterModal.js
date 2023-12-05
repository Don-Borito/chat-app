import React, { useState } from "react";
import Toast from "react-native-root-toast";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Platform,
} from "react-native";

export default function RegisterModal(props) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const fetchURL = "https://chatcharm.onrender.com";

  const handleRegister = async () => {
    try {
      if (username == "" || password == "") {
        throw new Error("One of your values is null !!!");
      }
      const response = await fetch(
        `${fetchURL}/register?Username=${username}&Password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        props.toggleModal();
        props.toggleModalLogin();
        Toast.show("Registration succeeded 😊", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "green",
          opacity: 100,
        });
      } else {
        // Handle HTTP errors
        Toast.show("Registration failed 🥺 \n Error: " + response.status, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "red",
          opacity: 100,
        });
      }
    } catch (error) {
      Toast.show("Registration failed 🥺 \n  " + error, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        opacity: 100,
      });
    }
  };

  const switchToLogin = () => {
    props.toggleModal("register");
    props.toggleModal("login");
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={() => {
        props.toggleModal("register");
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
              onPress={switchToLogin}
            >
              <Text style={styles.textStyle}>Already have an account?</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.toggleModal("register")}
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
    position: "absolute",
    bottom: 150,
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
    width: 250,
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
