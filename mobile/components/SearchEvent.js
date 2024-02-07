import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';





const SearchEvent = ({ nameGame }) => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  const {token} = useAuth()
  const {userId}=useAuth()
  const route = useRoute();
  const { searchText } = route.params;

  useEffect(() => {
    const fetchData = async () => {
      try {
        

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
      <Text>Liste des événements recherché:</Text>
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

export default SearchEvent;
