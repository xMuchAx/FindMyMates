import React, { useEffect, useState } from 'react';
import { View, ScrollView, TextInput, StyleSheet } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import NavBar from '../components/NavBar';






export function SearchEventScreen()  {
  const navigation = useNavigation();
  // const {token} = useAuth()
  // const {userId}=useAuth()
  const route = useRoute();

  const { searchText, setSearchText } = useAuth(); // Utilisez searchText et setSearchText du contexte
  console.log("gggggggggggggggggggggg" + searchText)
  const [newText, setNewText] = useState(searchText);

  


  function handleSearchSubmit() {
    console.log(newText)
    setSearchText(newText)
  };


  return (
    <View style={styles.containerAll}>

      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View>
          <TextInput
                style={styles.searchInput}
                placeholder="Search games..."
                // defaultValue={newText}  // Utiliser defaultValue pour définir le texte par défaut
                value={newText}
                onChangeText={setNewText}
                onSubmitEditing={handleSearchSubmit}

              />
        </View>
        <View style={styles.container}>

            <EventList searchText={searchText}/>

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
    minHeight:"70%",

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