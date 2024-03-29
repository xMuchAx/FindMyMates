import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAuth } from '../AuthContext';
import { Dimensions } from 'react-native';


const GameListHorizontal = () => {
  const [gameData, setGameData] = useState(null);
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const { token } = useAuth();
  const screenWidth = Dimensions.get('window').width;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await callApi('http://localhost:8000/event/games/', 'GET', null, token);
        console.log('Game Data:', gameData);
        setGameData(gameData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des jeux :', error);
      }
    };


    fetchData();
  }, []);

  useEffect(() => {
    // Utiliser la méthode scrollTo pour définir la position initiale après le rendu du composant
    if (scrollViewRef.current && gameData) {
      const initialX = ((gameData.length * ((150 + 40)) / 2) - screenWidth / 2)-15;
      scrollViewRef.current.scrollTo({ x: initialX, y: 0, animated: false });
    }
  }, [gameData]);

  function DisplayListEventByGame(nameGame, imageGame, event_number) {
    navigation.navigate('EventByGame', { nameGame: nameGame, imageGame : imageGame, event_number : event_number });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        style={styles.grid}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {gameData &&
          gameData.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.gameItem}
              onPress={() => DisplayListEventByGame(item.name, item.url, item.event_number)}
            >
              <View style={styles.imgBefore}></View>
              <Image style={styles.imgGame} source={require(`../assets/${item.url}`)} />
              <LinearGradient
                colors={['rgba(0, 0, 0, 0.2)', 'black']}
                locations={[0.7, 1]}
                style={styles.imgAfter}
              />
              <Text style={styles.nameGame}>{item.name}</Text>
            </TouchableOpacity>
          ))}
      </ScrollView>
      <LinearGradient
        colors={['rgba(255, 255, 255, 0.6)', 'transparent']}
        locations={[0, 1]}
        style={styles.opacityLeft}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
      <LinearGradient
        colors={['transparent', 'rgba(255, 255, 255, 0.6)']}
        locations={[0, 1]}
        style={styles.opacityRight}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      />
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: "flex",
    flexDirection: "column",
    width:"100%"
    // borderBlockColor:"red",
    // borderWidth:2
  },
  grid: {
    display: "flex",
    flexDirection: "row",
    height: 215,
  },
  gameItem: {
    width: 150, // Ajustez la largeur de chaque élément de la liste déroulante selon vos besoins
    marginRight: 20,
    height: 205,
    marginLeft : 20
  },
  imgGame: {
    height: "100%",
    width: "100%",
    // shadowColor: 'black',
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 20,
  },
  nameGame:{
    position:"absolute",
    bottom:0,
    fontFamily:"Outfit Medium",
    color:"white",
    fontSize: 18,
    padding:10
  },
  imgAfter:{
    position:"absolute",
    height:"100%",
    width:"100%",
  },
  imgBefore:{
    position:"absolute",
    height:"100%",
    width:"100%",
    top:10,
    right:10,
    backgroundColor:"#6E4AB5"
  },
  opacityLeft:{
    position:"absolute",
    height:"100%",
    width:"12%",
    left:-10
  },

  opacityRight:{
    position:"absolute",
    height:"100%",
    width:"12%",
    right:-10
  }
});

export default GameListHorizontal;
