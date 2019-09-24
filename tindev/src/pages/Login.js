import React from 'react';
import {
  KeyboardAvoidingView, //so the keyboard does not overlap the content. Android is default
  Platform,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';

import logo from '../assets/logo.png';

export default function Login() {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      enabled={Platform.OS == 'ios'} //only for ios the content of the view should go up
      style={styles.container}>
      <Image source={logo} />
      <TextInput
        autoCapitalize="none" //first letter default is caps lock
        autoCorrect={false} //like diego3g
        placeholder="Digite seu usuário no Github"
        placeholderTextColor="#999"
        style={styles.input}
      />
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  input: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    marginTop: 20,
    paddingHorizontal: 15, //css = padding: 0 15
  },
  button: {
    height: 46,
    alignSelf: 'stretch',
    backgroundColor: '#DF4723',
    borderRadius: 4,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
