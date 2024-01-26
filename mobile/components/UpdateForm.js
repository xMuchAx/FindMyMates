import React, { useEffect, useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useAuth } from '../AuthContext';
import { callApi } from '../apiUtils';


const UpdateForm = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { token } = useAuth();


  async function updateProfil() {
    console.log(token)
    const data = {
        email: email,
        password: password,
        username: name,
        bio: description,
      };
      console.log(data)


      // Appel à votre API et gestion de la réponse
      try {
        
        await callApi('http://localhost:8000/user/update/','PUT',data, token);


      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
      }
  }



  return (
    <View style={styles.container}>
      {/* <Image
        source={require('../assets/logo.png')}
        style={styles.image}
      /> */}

      <View style={styles.containerForm}>

        <TextInput 
            style = {styles.inputName}
            placeholder='Name'
            onChangeText={(text) => setName(text)}
            value={name}
        />

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

        <TextInput
          style={styles.input}
          placeholder="Description"
          onChangeText={(text) => setDescription(text)}
          value={description}
        />

        <TouchableOpacity style={styles.buttonUpdate} onPress={updateProfil}>
          <Text style={styles.buttonText}>
            Modifier
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
};

export default UpdateForm;

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
    buttonUpdate: {
      
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
