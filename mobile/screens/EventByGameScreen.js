import React, { useEffect } from 'react';
import NavBar from '../components/NavBar';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { View, Text } from 'react-native';

export function EventByGameScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();
  const route = useRoute();
  const { params } = route;
  const { nameGame } = params;

  

  const userIsLoggedIn = isLoggedIn();

    // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
    if (!userIsLoggedIn) {
      navigation.navigate('Login');
    }

  return (
    <View style={{ flex: 1 }}>
      <EventList nameGame={nameGame}/>
      <NavBar />
    </View>
  );
}
