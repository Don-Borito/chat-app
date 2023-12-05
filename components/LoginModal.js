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

export default function LoginModal(props) {
  const [username, setName] = useState("");
  const [password, setPassword] = useState("");
  const fetchURL = "https://chatcharm.onrender.com";

  const handleLogin = async () => {
    console.log("Login:", username, password);
    try {
      if (username == "" || password == "") {
        throw new Error("One of your values is null !!!");
      }
      const response = await fetch(
        `${fetchURL}/Login?Username=${username}&Password=${password}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.text();
        Toast.show("Login succeeded 😊", {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "green",
          opacity: 100,
        });
        props.toggleModalLogin();
        props.login(data);
      } else {
        Toast.show("Bad Request 🥺 \n Error: " + response.status, {
          duration: Toast.durations.LONG,
          position: Toast.positions.TOP,
          backgroundColor: "red",
          opacity: 100,
        });
      }
    } catch (error) {
      Toast.show("Something went wrong 🥺 \n Error:  " + error, {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
        backgroundColor: "red",
        opacity: 100,
      });
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.loginModalVisible}
      onRequestClose={() => {
        props.toggleModalLogin();
      }}
    >
      <KeyboardAvoidingView
        style={styles.centeredView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        enabled
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Login</Text>

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
              onPress={handleLogin}
            >
              <Text style={styles.textStyle}>Login</Text>
            </Pressable>

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => props.toggleModalLogin()}
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
    bottom: 180,
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
  badToast: {
    backgroundColor: "red",
    shadowColor: "red",
    marginBottom: "40%",
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
