import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { callApi } from '../apiUtils';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import { Button } from 'react-native';


const DetailsEvent = () => {
  const [eventData, setEventData] = useState(null);
  const route = useRoute();
  const { userId } = useAuth();


  const eventId = route.params?.eventId;



  useEffect(() => {

    const fetchEventDetails = async () => {
      try {
        console.log(eventId )
        const eventDetails = await callApi(`http://localhost:8000/event/event-detail/${eventId}/`, 'GET');
        console.log('Event Details:', eventDetails);
        setEventData(eventDetails); // Mettez à jour l'état avec les détails de l'événement
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'événement :', error);
      }
    };

    if (eventId) {
      fetchEventDetails(); // Appelez la fonction fetchEventDetails si eventId est défini
    }
  }, [eventId]);

  const joinEvent = async (eventIdToJoin) => {
    try {

      const data = {
        event: eventIdToJoin,
        user: userId,
      };

      console.log(data)

      
      const response = await callApi('http://localhost:8000/event/joined-event/', 'POST', data);
      console.log('Join Event Response:', response);

      fetchEventDetails();
    } catch (error) {
      console.error('Erreur lors de la tentative de rejoindre l\'événement :', error);
    }
  };

  return (
    <View>
      <Text>Détails de l'événement :</Text>
      {eventData && (
        <View>
          <Text>Title: {eventData.title}</Text>
          <Text>Description: {eventData.description}</Text>
          <Button title="Rejoindre l'événement" onPress={() => joinEvent(eventId)} />
        </View>

      )}
    </View>
  );
};

export default DetailsEvent;
