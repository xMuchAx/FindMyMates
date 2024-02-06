import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const EventRecommendation = () => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  const {token} = useAuth()
  const {userId} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let eventData;
        eventData = await callApi(`http://localhost:8000/user/recommendation/${userId}/`, 'GET', null, token);
        console.log('Event RECOMMANDATION Data:', eventData);
        setEventData(eventData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }
    };
  
    fetchData(); // Appelez la fonction fetchData pour effectuer l'appel à l'API lorsque le composant est monté
  }, []); // Aucune dépendance, le useEffect s'exécutera uniquement lors du montage initial du composant

  const redirectDetailEvent = (eventId) => {
    navigation.navigate('DetailsEvent', { eventId });
  };

  return (
    <View>
      <Text>Liste des événements recommandé:</Text>
      {eventData && eventData.map(event => (
        <TouchableOpacity
          key={event.id}
          onPress={() => redirectDetailEvent(event.id)}
          style={{ marginBottom: 10, padding: 10, backgroundColor: 'lightgray' }}
        >
          <Text>{event.title}</Text>
          <Text>{event.description}</Text>
          {/* Ajoutez d'autres champs d'événement selon vos besoins */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EventRecommendation;
