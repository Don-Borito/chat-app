import React, { useState } from "react";
import { View, StyleSheet, Modal, Pressable, Text } from "react-native";
import Header from "./components/Header";
import InputContainer from "./components/InputContainer";
import MessageContainer from "./components/MessageContainer";
import UploadModal from "./components/UploadModal";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";

export default function App() {
  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isAnyModalActive, setIsAnyModalActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const sendText = () => {
    if (userText) {
      const aiResponse = `AI Antwort auf: ${userText}`;

      setMessages([
        ...messages,
        { sender: "user", text: userText },
        { sender: "ai", text: aiResponse },
      ]);
      setUserText("");
    }
  };
  function ToggleModal() {
    setUploadModalVisible(!uploadModalVisible);
    setIsAnyModalActive(!isAnyModalActive);
  }
  function ToggleModalRegister() {
    setRegisterModalVisible(!registerModalVisible);
    setIsAnyModalActive(!isAnyModalActive);
  }
  function ToggleModalLogin() {
    setLoginModalVisible(!loginModalVisible);
    setIsAnyModalActive(!isAnyModalActive);
  }
  function setLogin() {
    setLoggedIn(true);
  }
  return (
    <View style={styles.container}>
      <LoginModal
        toggleModalLogin={ToggleModalLogin}
        loginModalVisible={loginModalVisible}
        login={setLogin}
      ></LoginModal>
      <RegisterModal
        toggleModal={ToggleModalRegister}
        modalVisible={registerModalVisible}
        toggleModalLogin={ToggleModalLogin}
      ></RegisterModal>
      <UploadModal
        toggleModal={ToggleModal}
        modalVisible={uploadModalVisible}
      ></UploadModal>
      <Header
        setModalVisible={ToggleModal}
        loggedIn={loggedIn}
        setRegisterModalVisible={ToggleModalRegister}
      ></Header>
      <MessageContainer messages={messages}></MessageContainer>
      <InputContainer
        sendText={sendText}
        setUserText={setUserText}
        userText={userText}
        isAnyModalActive={isAnyModalActive}
      ></InputContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
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
