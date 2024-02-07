import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, FlatList } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const GameList = () => {
  const [gameData, setGameData] = useState(null);
  const navigation = useNavigation();
  const {token} = useAuth()

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

  function DisplayListEventByGame(nameGame, imageGame, event_number) {
    navigation.navigate('EventByGame', { nameGame: nameGame, imageGame : imageGame, event_number : event_number });
  }

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.grid}
        data={gameData}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.gameItem}
            onPress={() => DisplayListEventByGame(item.name, item.avatar, item.event_number)}
          >
              <Image style={styles.imgGame} source={require(`../assets/${item.avatar}`)} />
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    display: "flex",
    flexDirection: "column",
    // borderWidth: 1.4,
    // borderColor: '#6E4AB5',
  },
  grid: {
    display: "flex",
    width: "100%",
    borderWidth: 1.4,
    borderColor: 'red',
  },
  gameItem: {
    width: '38%',
    marginBottom: 10,
    marginLeft: "8%",
    height: 250,
    // shadowColor: 'black', 
    // shadowOffset: { width: 10, height: 10 }, 
    // shadowOpacity: 1, 
    // shadowRadius: 5, 
    // elevation: 20
  },
  imgGame:{ 
    height: "80%", 
    width: "100%", 
    shadowColor: 'black', 
    shadowOffset: { width: 10, height: 10 }, 
    shadowOpacity: 1, 
    shadowRadius: 5, 
    elevation: 20
  }
});

export default GameList;