import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';


const EventList = () => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const eventData = await callApi('http://localhost:8000/event/list/', 'GET');
        console.log('Event Data:', eventData);
        setEventData(eventData); // Mettez à jour l'état avec les données de l'événement
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }
    };

    fetchData(); // Appelez la fonction fetchData pour effectuer l'appel à l'API lorsque le composant est monté
  }, []);

  const redirectDetailEvent = (eventId) => {
    navigation.navigate('DetailsEvent', { eventId });
  };

  return (
    <View>
      <Text>Liste des événements :</Text>
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

export default EventList;
