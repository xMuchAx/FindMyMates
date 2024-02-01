import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { View, Text } from 'react-native';
import GameListHorizontal from '../components/GameListHorizontal';

export function HomeScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  

  const userIsLoggedIn = isLoggedIn();

    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    if (!userIsLoggedIn) {
      console.log("erreuuuuuur")
      navigation.navigate('Login');
    }

  return (
    <View style={{ flex: 1 }}>
      <GameListHorizontal/>
      <EventList />
      <NavBar />
    </View>
  );
}
