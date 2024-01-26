import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { callApi } from '../apiUtils';
import { useRoute } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const DetailsEvent = () => {
  const [eventData, setEventData] = useState(null);
  const [isJoined, setIsJoined] = useState(false);
  const route = useRoute();
  const { userId } = useAuth();
  const eventId = route.params?.eventId;

  // Effectuer la vérification lors du montage initial
  useEffect(() => {
    const checkIfJoined = async () => {
      try {
        const data = {
          event: eventId,
          user: userId
        };
        
        const result = await callApi(`http://localhost:8000/event/history/`, 'GET', data);

        // Mettre à jour l'état isJoined en fonction du résultat
        setIsJoined(result && result.length > 0);
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'événement:', error);
      }
    };

    // Appeler la fonction de vérification
    checkIfJoined();
  }, [eventId, userId]);

  // Déclarer fetchEventDetails en dehors de useEffect
  const fetchEventDetails = async () => {
    try {
      const eventDetails = await callApi(`http://localhost:8000/event/event-detail/${eventId}/`, 'GET');
      setEventData(eventDetails);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'événement :', error);
    }
  };

  useEffect(() => {
    if (eventId) {
      // Appeler fetchEventDetails au montage du composant
      fetchEventDetails();
    }
  }, [eventId]);

  const joinEvent = async (eventIdToJoin) => {
    try {
      const data = {
        event: eventIdToJoin,
        user: userId,
      };

      console.log(data);

      // Appeler l'API pour rejoindre l'événement
      const response = await callApi('http://localhost:8000/event/joined-event/', 'POST', data);
      console.log('Join Event Response:', response);

      // Mettre à jour les détails de l'événement après avoir rejoint
      fetchEventDetails();
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
      const response = await callApi('http://localhost:8000/event/delete-user-history', 'POST', data);
      console.log('Join Event Response:', response);

      // Mettre à jour les détails de l'événement après avoir rejoint
      fetchEventDetails();
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
            <Button title="Quitter l'événement" onPress={() => leaveEvent(eventId)} />
          ) : (
            <Button title="Rejoindre l'événement" onPress={() => joinEvent(eventId)} />
          )}
        </View>
      )}
    </View>
  );
};

export default DetailsEvent;
