import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { callApi } from '../apiUtils';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import NavBar from './NavBar';

const DetailsEvent = () => {
  const [eventData, setEventData] = useState(null);
  const [isJoined, setIsJoined] = useState(false); // Mise à jour du nom de la variable
  const route = useRoute();
  const { userId } = useAuth();
  const { token } = useAuth();

  const eventId = route.params?.eventId;

  async function displayEventDetails() {
    try {
      const eventDetails = await callApi(`http://localhost:8000/event/event-detail/${eventId}/`, 'GET', null, token);
      setEventData(eventDetails);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'événement :', error);
    }
  }

  async function checkUserJoinedEvent() { 
    try {
      const data = {
        event: eventId,
        user: userId
      };
  
      const result = await callApi(`http://localhost:8000/event/history/`, 'POST', data, token); 

      if(result.length != 0){
        setIsJoined(true);
      }else{
        setIsJoined(false);
      }

      console.log("Résultat de la vérification :", result);
    } catch (error) {
      console.error('Erreur lors de la vérification de la participation de l\'utilisateur à l\'événement :', error);
    }
  }
  

  useEffect(() => {
    if (eventId) {
      displayEventDetails();
      checkUserJoinedEvent(); // Mise à jour du nom de la fonction
    }
  }, [eventId, userId]);



  const joinEvent = async (eventIdToJoin) => {
    try {
      const data = {
        event: eventIdToJoin,
        user: userId,
      };

      console.log(data);

      // Appeler l'API pour rejoindre l'événement
      const response = await callApi('http://localhost:8000/event/joined-event/', 'POST', data, token);
      console.log('Join Event Response:', response);

      // Mettre à jour les détails de l'événement après avoir rejoint
      displayEventDetails();
      // Mettre à jour l'état isJoined
      setIsJoined(true);
    } catch (error) {
      console.error('Erreur lors de la tentative de rejoindre l\'événement :', error);
    }
  };

  const leaveEvent = async (eventIdToJoin) => {
    try {
      const data = {
        event: eventIdToJoin,
        user: userId,
      };

      console.log(data);

      // Appeler l'API pour rejoindre l'événement
      const response = await callApi('http://localhost:8000/event/delete-user-history', 'POST', data, token);
      console.log('Join Event Response:', response);

      // Mettre à jour les détails de l'événement après avoir rejoint
      displayEventDetails();
      // Mettre à jour l'état isJoined
      setIsJoined(false);
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
          {isJoined ? (
            <Button title="Quitter l'evenement" onPress={() => leaveEvent(eventId)} />
          ) : (
            <Button title="Rejoindre l'événement" onPress={() => joinEvent(eventId)} />
          )}
        </View>
      )}
      

    </View>
  );
};

export default DetailsEvent;
