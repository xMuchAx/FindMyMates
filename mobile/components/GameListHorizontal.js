import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';

const GameListHorizontal = () => {
  const [gameData, setGameData] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await callApi('http://localhost:8000/event/games/', 'GET');
        console.log('Game Data:', gameData);
        setGameData(gameData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données des jeux :', error);
      }
    };

    fetchData();
  }, []);

  function DisplayListEventByGame(nameGame) {
    navigation.navigate('EventByGame', { nameGame: nameGame });
  }

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.grid}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {gameData && gameData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.gameItem}
            onPress={() => DisplayListEventByGame(item.name)}
          >
            <Image style={styles.imgGame} source={{ uri: `../assets/${item.avatar}` }} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    display: "flex",
    flexDirection: "column",
    paddingTop:40,
    paddingLeft:40,
    paddingRight:40,

    borderBlockColor:"red",
    borderWidth:2
  },
  grid: {
    display: "flex",
    flexDirection: "row",
  },
  gameItem: {
    width: 150, // Ajustez la largeur de chaque élément de la liste déroulante selon vos besoins
    marginRight: 10,
    height: 250,
  },
  imgGame: {
    height: "80%",
    width: "100%",
    // shadowColor: 'black',
    // shadowOffset: { width: 10, height: 10 },
    // shadowOpacity: 1,
    // shadowRadius: 5,
    // elevation: 20,
  }
});

export default GameListHorizontal;
