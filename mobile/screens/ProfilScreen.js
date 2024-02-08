import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import DetailsProfil from '../components/DetailsProfil';
import { Dimensions } from 'react-native';


export function ProfilScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  

  const userIsLoggedIn = isLoggedIn();

    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    if (!userIsLoggedIn) {
      navigation.navigate('Login');
    }

    

  return (
    
    <View style={styles.containerAll}>

          
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.containerPurple}>
          
      </View>
      <View style={styles.container}>

      <DetailsProfil/>

      </View>
    </ScrollView>
    <NavBar bubblePositionInit={3} route="Profil" />

    </View>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  containerPurple:{
    backgroundColor: "#6E4AB5",
    width:"100%",
    height:`${(Dimensions.get('window').height)*40/100}px`,
    position:"absolute",
    top:0,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: 40,
    marginTop: `${(Dimensions.get('window').height)*25/100}px`,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: `${(Dimensions.get('window').height)*65/100}px`,
    width:"86%",
    marginLeft:"7%",

  },
  title: {
    fontFamily: "Outfit Bold",
    fontSize: 24,
    marginLeft: "8%",
    marginBottom: 20,
  },
  searchInput:{
    backgroundColor : "white",
    height : 50,
    width: "70%",
    marginTop: 75,
    marginLeft:"15%",
    borderRadius : 50,
    paddingLeft : 15,
    fontFamily : "Outfit Medium",
    borderWidth:0
  },
  
});
