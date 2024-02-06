// AuthentificationForm.js
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image } from 'react-native';
import { StyleSheet } from 'react-native';
import { callApi } from '../apiUtils'; // Importez la fonction callApi depuis votre fichier apiUtils.js
import { useAuth } from '../AuthContext';


function AuthentificationForm({mode, navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login } = useAuth();
  

  const ClickAuth = async () => {

    if (mode === 'connexion') {

      const data = {
        email: email,
        password: password,
      };

      // Appel à votre API et gestion de la réponse
      try {

        const response = await callApi('http://localhost:8000/user/login/','POST',data);
        const token = response.token;
        const id_user = response['user_id'];

        if (token) {
          login(token, id_user);

          navigation.navigate('Home');
        }

      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }

    } else if (mode === 'inscription') {

      const data = {
        email: email,
        password: password,
        username: name,
      };

      // Appel à votre API pour l'enregistrement
      try {

        const response = await callApi('http://localhost:8000/user/register/','POST',data);
        const token = response.token;

        if (token) {
          navigation.navigate('Login');
        }

      } catch (error) {
        console.error('Erreur lors de l\'inscription :', error);
      }

    }

  };

  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      /> */}

      <View style={styles.containerForm}>

        {mode === 'inscription' && (
            <Text style={styles.text}>Name</Text>
        )}

        {mode === 'inscription' && (
                      <TextInput 
            style = {styles.inputName}
            placeholder='Name'
            onChangeText={(text) => setName(text)}
            value={name}
          />
        )}

        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => setEmail(text)}
          value={email}
        />
        <Text style={styles.text}>Password</Text>

        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          value={password}
        />
        <TouchableOpacity style={styles.buttonLogin} onPress={ClickAuth}>
          <Text style={styles.buttonText}>
            {mode === 'inscription' ? 'Register' : 'Login'}
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default AuthentificationForm;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerForm : {
    width : "100%",
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center', 
    marginTop : 130, 
  },
  input: {
    
    backgroundColor: 'white',
    width: '78%',
    height: 65,
    borderRadius: 20,
    marginBottom: 10,
    padding: 8,
    marginBottom: 40,
    paddingLeft: 20,
  },
  inputName: {
    backgroundColor: 'white',
    width: '78%',
    height: 65,
    borderRadius: 20,
    marginBottom: 10,
    padding: 8,
    marginBottom: 40,
    paddingLeft: 20,
  },
  buttonLogin: {
    
    marginTop: 80,
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: '76%',
    borderRadius: 60,
    display : "flex",
    alignItems : "center",
    justifyContent : "center",
  },
  buttonText: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image:{
    width: 200,
    height: 210,
    position : "absolute",
    top : -60
  },
  text:{
    alignSelf:"flex-start",
    marginLeft: "13%",
    marginBottom:6,
    color : "white",
    fontWeight : "bold",
    fontSize : 16
  }
});
