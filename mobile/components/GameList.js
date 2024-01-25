import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
// import { useNavigation } from '@react-navigation/native';


const GameList = () => {
  const [gameData, setGameData] = useState(null);
//   const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameData = await callApi('http://localhost:8000/event/games/', 'GET');
        console.log('Game Data:', gameData);
        setGameData(gameData); // Mettez à jour l'état avec les données de l'événement
      } catch (error) {
        console.error('Erreur lors de la récupération des données des jeu :', error);
      }
    };

    fetchData(); // Appelez la fonction fetchData pour effectuer l'appel à l'API lorsque le composant est monté
  }, []);


  return (
    <View>
      <Text>Liste des jeu :</Text>
      {gameData && gameData.map(game => (
        <TouchableOpacity
          key={game.id}
        //   onPress={() => redirectDetailEvent(game.id)}
          style={{ marginBottom: 10, padding: 10, backgroundColor: 'lightgray' }}
        >
          <Text>{game.name}</Text>
          {/* Ajoutez d'autres champs d'événement selon vos besoins */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default GameList;
