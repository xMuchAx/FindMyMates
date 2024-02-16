import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { View, Text, StyleSheet, TextInput, ScrollView, Image } from 'react-native';

export function EventByGameScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const route = useRoute();
  const { nameGame } = route.params;
  const { imageGame } = route.params
  const { event_number } = route.params



  

  const userIsLoggedIn = isLoggedIn();

    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    if (!userIsLoggedIn) {
      navigation.navigate('Login');
    }

  return (
    

    

    <View style={styles.containerAll}>

      
      <ScrollView contentContainerStyle={styles.scrollContent}>
      
      <View style={styles.containerGame}>

        <Image style={styles.imgGame}   source={require(`../assets/largeImage/${imageGame}`)}/>

      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Liste des événements {nameGame} :</Text>

        <EventList nameGame={nameGame}/>
      </View>

      </ScrollView>

      <NavBar bubblePositionInit={1} route="Game" />

    </View>



  );
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "#6E4AB5",
    overflow: "hidden",
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 40,
    marginTop: 240,
    minHeight:"70%",
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 100,
  },
  title: {
    fontFamily: "Outfit Bold",
    fontSize: 19,
    width:"100%",
    textAlign:"center"
  },
  
  imgGame:{
    height:"100%",
    width:"100%",
  },
  
  containerGame:{
    display:"flex", 
    width :"100%", 
    height: 260,
    position:"absolute", 
  },
  infoGame:{
    display:"flex",
    flexDirection:"column"
  }
  
});
