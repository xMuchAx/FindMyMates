import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { callApi } from '../apiUtils';
import { useAuth } from '../AuthContext';

const DetailsProfil = () => {
    const { userId } = useAuth();
    const [profilData, setProfilData] = useState(null);

    useEffect(() => {
        const fetchProfilDetails = async () => {
            try {
                const profilDetails = await callApi(`http://localhost:8000/user/user-detail/${userId}/`, 'GET');
                console.log('Profil Details:', profilDetails);
                setProfilData(profilDetails);
            } catch (error) {
                console.error('Erreur lors de la récupération des détails du profil :', error);
            }
        };

        if (userId) {
            fetchProfilDetails(); // Appelez la fonction fetchProfilDetails si userId est défini
        }
    }, [userId]);

    return (
        <View>
            <Text>Détails du profil :</Text>
            {profilData && (
                <View>
                    <Text>Username: {profilData.username}</Text>
                    <Text>Email: {profilData.email}</Text>
                    {/* Ajoutez d'autres champs de profil selon vos besoins */}
                </View>
            )}
        </View>
    );
};

export default DetailsProfil;
