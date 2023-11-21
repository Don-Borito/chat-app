import {
  KeyboardAvoidingView,
  TextInput,
  Button,
  StyleSheet,
} from "react-native";

export default function InputContainer(props) {
  return (
    <KeyboardAvoidingView
      style={styles.inputContainer}
      behavior="padding"
      enabled={!props.isAnyModalActive}
    >
      <TextInput
        style={styles.textInput}
        value={props.userText}
        onChangeText={props.setUserText}
        placeholder="Enter message"
      />
      <Button title="Send" onPress={props.sendText} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 5,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "gray",
    marginRight: 10,
    borderRadius: 5,
    paddingLeft: 10,
  },
});
