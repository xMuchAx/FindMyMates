import NavBar from '../components/NavBar';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';

import GameListHorizontal from '../components/GameListHorizontal';
import EventRecommendation from '../components/EventRecommendation';

export function HomeScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const { token } = useAuth();
  
  function handleSearchSubmit() {
    navigation.navigate('SearchEvent', { searchText: searchText });
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
              onSubmitEditing={handleSearchSubmit}

            />
      </View>
        <View style={styles.container}>
          <Text style={styles.title}>Games</Text>
          <GameListHorizontal />
          {/* <EventList/> */}
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
    paddingBottom: 100
  },
  title: {
    fontFamily: "Outfit Bold",
    fontSize: 26,
    marginLeft: 25,
    marginBottom: 15,
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
