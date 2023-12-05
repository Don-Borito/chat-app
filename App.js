import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Modal,
  Pressable,
  Text,
  TouchableWithoutFeedback,
} from "react-native";
import Header from "./components/Header";
import InputContainer from "./components/InputContainer";
import MessageContainer from "./components/MessageContainer";
import UploadModal from "./components/UploadModal";
import RegisterModal from "./components/RegisterModal";
import LoginModal from "./components/LoginModal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootSiblingParent } from "react-native-root-siblings";

export default function App() {
  const [userText, setUserText] = useState("");
  const [messages, setMessages] = useState([]);
  const [uploadModalVisible, setUploadModalVisible] = useState(false);
  const [registerModalVisible, setRegisterModalVisible] = useState(false);
  const [loginModalVisible, setLoginModalVisible] = useState(false);
  const [isAnyModalActive, setIsAnyModalActive] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [JWT, setJWT] = useState("");
  const [profileURI, setProfileURI] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const fetchURL = "https://chatcharm.onrender.com";

  const checkIfLoggedIn = async () => {
    if (await AsyncStorage.getItem("jwt")) {
      setJWT(await AsyncStorage.getItem("jwt"));
      setLoggedIn(true);
      const pic = await getProfileImage();
      setProfileURI(pic);
    }
  };
  const sendText = async () => {
    if (userText) {
      const aiResponse = `AI Antwort auf: ${userText}`;

      /*setMessages([
        ...messages,
        { sender: "user", text: userText },
        { sender: "ai", text: aiResponse },
      ]);*/
      const storedMessages = await AsyncStorage.getItem("messages");
      const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
      parsedMessages.push(
        { sender: "user", text: userText },
        { sender: "ai", text: aiResponse }
      );
      setMessages(parsedMessages);
      await AsyncStorage.setItem("messages", JSON.stringify(parsedMessages));
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
  async function setLogin(token) {
    setJWT(token);
    setLoggedIn(true);
    await AsyncStorage.setItem("jwt", token);
  }
  async function getProfileImage() {
    try {
      const response = await fetch(fetchURL + "/GetProfile", {
        method: "GET",
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + (await AsyncStorage.getItem("jwt")),
        },
      });

      if (response.ok) {
        const responseData = await response.blob();
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onload = function () {
            resolve(reader.result);
          };
          reader.readAsDataURL(responseData);
        });
      } else {
        // Handle HTTP errors
        console.error("GetProfile failed:", response.status);
        return null;
      }
    } catch {
      console.log("No profile image");
    }
  }

  async function renderMessages() {
    const storedMessages = await AsyncStorage.getItem("messages");
    const parsedMessages = storedMessages ? JSON.parse(storedMessages) : [];
    setMessages(parsedMessages);
  }

  const closeDropdown = () => {
    setDropdownVisible(false);
  };

  useEffect(() => {
    checkIfLoggedIn();
    renderMessages();
  }, []);
  return (
    <RootSiblingParent>
      <TouchableWithoutFeedback onPress={closeDropdown}>
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
            token={JWT}
          ></UploadModal>
          <Header
            closeDropdown={closeDropdown}
            dropdownVisible={dropdownVisible}
            setDropdownVisible={setDropdownVisible}
            setModalVisible={ToggleModal}
            loggedIn={loggedIn}
            setRegisterModalVisible={ToggleModalRegister}
            profileIMG={profileURI}
            setMessages={setMessages}
          ></Header>
          <MessageContainer
            messages={messages}
            profileURI={profileURI}
          ></MessageContainer>
          <InputContainer
            sendText={sendText}
            setUserText={setUserText}
            userText={userText}
            isAnyModalActive={isAnyModalActive}
          ></InputContainer>
        </View>
      </TouchableWithoutFeedback>
    </RootSiblingParent>
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
