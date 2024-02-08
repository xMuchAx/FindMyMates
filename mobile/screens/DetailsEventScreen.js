import React from 'react';
import NavBar from '../components/NavBar';
import DetailsEvent from '../components/DetailsEvent';
import { View, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native';
import { Dimensions } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export function DetailsEventScreen() {
  const route = useRoute();

  const { eventImage } = route.params
  const parts = eventImage.split('/');
  const eventImage2 = parts[parts.length - 1];
  const navigation = useNavigation(); // Ajout de cette ligne


  const handleGoBack = () => {
    navigation.goBack();
  };


  return (
    <View style={styles.containerAll}>

      
      <ScrollView contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity style={styles.backButton} onPress={handleGoBack}>
        <Image style={styles.imgArrow} source={require(`../assets/arrowLeft.png`)} />
      </TouchableOpacity>
      <View>
      <Image style={styles.imgGame} source={require(`../assets/${eventImage2}`)} />

      </View>
        <View style={styles.container}>

        <DetailsEvent/>

        </View>
      </ScrollView>

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
    marginTop: `${(Dimensions.get('window').height)*25/100}px`,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: `${(Dimensions.get('window').height)*75/100}px`,
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
  imgGame : {
    position:"absolute",
    width:"100%",
    height : `${(Dimensions.get('window').height)*30/100}px`,
  },
  imgArrow: {
    height: 30,
    width: 30,
    
    zIndex: 3,
  },
  backButton: {
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 4,
  },
  
});


