import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
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
            fetchProfilDetails();
        }
    }, [userId]);

    const handleTextChange = (field, value) => {
        setProfilData((prevData) => ({ ...prevData, [field]: value }));
    };

    const updateUser = async () => {
        const data{
            
        }
        try {
            // Appel API pour mettre à jour l'utilisateur avec les données du profilData
            // await callApi(`http://localhost:8000/user/update/${userId}/`, 'PUT', profilData);
            console.log('Utilisateur mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
    };

    return (
        <View style={{ borderWidth: 2 }}>
            {profilData && (
                <View>

                    <View style={styles.containerSection}>
                        <Text style={styles.title}>Full Name</Text>
                        <TextInput
                            style={styles.input}
                            value={profilData.username}
                            onChangeText={(text) => handleTextChange('username', text)}
                            onSubmitEditing={updateUser}
                            returnKeyType="done"  // Ceci permet d'afficher "Done" sur iOS
                        />
                    </View>

                    <View style={styles.containerSection}>
                        <Text style={styles.title}>Email</Text>
                        <TextInput
                            style={styles.input}
                            value={profilData.email}
                            onChangeText={(text) => handleTextChange('email', text)}
                            onSubmitEditing={updateUser}
                            returnKeyType="done"
                        />
                    </View>

                    <View style={styles.containerSection}>
                        <Text style={styles.title}>Biographie</Text>
                        <TextInput
                            style={styles.input}
                            value={profilData.bio}
                            onChangeText={(text) => handleTextChange('bio', text)}
                            onSubmitEditing={updateUser}
                            returnKeyType="done"
                        />
                    </View>

                    <Text>tags: {profilData.tags}</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerSection: {
        width: "80%",
        marginLeft: "10%",
        marginBottom: 40,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#6E4AB5"
    },
    title: {
        fontFamily: "Outfit Medium",
        fontSize: 17,
        marginBottom: 10,
        color: "#6E4AB5"
    },
    input: {
        fontFamily: "Outfit Medium",
        fontSize: 18,
        paddingBottom: 5,
        outlineColor: 'transparent',
        outlineStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
    }
});

export default DetailsProfil;
