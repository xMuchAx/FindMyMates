import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { callApi } from '../apiUtils';
import { useAuth } from '../AuthContext';

const DetailsProfil = () => {
    const { userId } = useAuth();


  useEffect(() => {

    const fetchProfilDetails = async () => {
      try {
        console.log(eventId )
        const ProfilDetails = await callApi(`http://localhost:8000/user-detail/${userId}`, 'GET');
        console.log('Profil Details:', ProfilDetails);
      } catch (error) {
        console.error('Erreur lors de la récupération des détails de l\'événement :', error);
      }
    };

    if (eventId) {
      fetchProfilDetails(); // Appelez la fonction fetchProfilDetails si eventId est défini
    }
  }, [eventId]);

  return (
    <View>
      <Text>Détails de l'événement :</Text>
      {eventData && (
        <View>
          <Text>Title: {eventData.title}</Text>
          <Text>Description: {eventData.description}</Text>
          {/* Ajoutez d'autres champs d'événement selon vos besoins */}
        </View>
      )}
    </View>
  );
};

export default DetailsProfil;
