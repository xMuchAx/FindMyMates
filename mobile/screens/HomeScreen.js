import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { useState } from 'react';

import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import GameListHorizontal from '../components/GameListHorizontal';
import EventRecommendation from '../components/EventRecommendation';

export function HomeScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  const { searchText, setSearchText } = useAuth(); 

  
  function handleSearchSubmit() {
    console.log("envoie")
    navigation.navigate('SearchEvent'); // Envoyer la valeur actuelle de searchText

  };

  const userIsLoggedIn = isLoggedIn();

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
  if (!userIsLoggedIn) {
    console.log("Erreur");
    navigation.navigate('Login');
  }

 

  return (
    <View style={styles.containerAll}>

      
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <View>
        <TextInput
              style={styles.searchInput}
              placeholder="Search games..."
              onChangeText={(text) => setSearchText(text)} // Mettre à jour searchText avec la valeur du champ de recherche
              onSubmitEditing={handleSearchSubmit}

            />
      </View>
        <View style={styles.container}>

          <Text style={styles.title}>Games</Text>
          <GameListHorizontal />

          <View style={{marginBottom:40}}>
            <EventList next={true}/>
          </View>

          <EventRecommendation />
        </View>
      </ScrollView>
      <NavBar bubblePositionInit={0} route="Home" />

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
    marginTop: 75,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingBottom: 100,
    minHeight:"70%"
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
