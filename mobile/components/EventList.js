import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';





const EventList = ({ nameGame }) => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  const {token} = useAuth()
  const {userId}=useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let eventData;

        const data = {
          user : userId,
          tags : "GTA"
        };
      
        console.log(data);
      
        // Appeler l'API pour rejoindre l'événement
        const addTag = callApi('http://localhost:8000/user/add-tags/', 'POST', data, token);
        console.log('Join Event Response:', addTag);

        if (nameGame != null) {
          eventData = await callApi(`http://localhost:8000/event/search-event_by-game/${nameGame}/`, 'GET', null, token);
        } else {
          eventData = await callApi('http://localhost:8000/event/list/', 'GET', null, token);
        }

        console.log('Event Data:', eventData);
        setEventData(eventData); // Mettez à jour l'état avec les données de l'événement
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }
    };
    fetchData(); // Appelez la fonction fetchData pour effectuer l'appel à l'API lorsque le composant est monté
  }, [nameGame]);

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
