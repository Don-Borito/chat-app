import React, { useState } from 'react';
import { View, TextInput, Button, ScrollView, Text, StyleSheet, KeyboardAvoidingView, Image} from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  const sendText = () => {
    if (text) {
      const aiResponse = `AI Antwort auf: ${text}`;

      setMessages([...messages, { sender: 'user', text }, { sender: 'ai', text: aiResponse }]);
      setText('');
    }
  };
  return (
    <View style={{ flex: 1, padding: 10, paddingTop: 50 , paddingBottom: 50}}>
      <View style={styles.header}>
      <Image style={styles.logoImg} source={require("./assets/chatcharmlogo.png")}></Image>
        <Text style={styles.logoText}>ChatCharm</Text>
        <Image style={styles.settings} source={require("./assets/settings.png")}></Image>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {messages.map((message, index) => (
          <View key={index} style={message.sender === 'user' ? styles.userMessage : styles.aiMessage}>
            <Text>{message.text}</Text>
          </View>
        ))}
      </ScrollView>
      <KeyboardAvoidingView style={styles.inputContainer} behavior="padding" enabled>
        <TextInput 
          style={styles.textInput} 
          value={text} 
          onChangeText={setText} 
          placeholder="Enter message"
        />
        <Button title="Send" onPress={sendText} />
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#DCF8C6',
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
  aiMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#ECECEC',
    borderRadius: 10,
    padding: 8,
    marginVertical: 5,
  },
  header:{
    alignItems: "center",
    borderBottomWidth: 1,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: 'space-between',
    paddingBottom: 10
  },
  logoText:{
    fontSize: 20,
    fontWeight: "600",
  },
  logoImg:{
    width: 25,
    height: 25,
  },
  settings:{
    width: 25,
    height: 25
  }
});

