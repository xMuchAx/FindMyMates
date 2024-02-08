import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { callApi } from '../apiUtils';
import { useAuth } from '../AuthContext';
import { Dimensions } from 'react-native';


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
        // const data{

        // }
        try {
            // Appel API pour mettre à jour l'utilisateur avec les données du profilData
            // await callApi(`http://localhost:8000/user/update/${userId}/`, 'PUT', profilData);
            console.log('Utilisateur mis à jour avec succès');
        } catch (error) {
            console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
        }
    };

    const getRandomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <View style={{paddingTop:30}}>
            {profilData && (

                <View>
                    <Image style={styles.imgAvatar} source={require(`../assets/avatar/default.png`)} />
                    <Text style={styles.titleName}>{profilData.username}</Text>


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

                    {profilData.tags && (
                    <View style={styles.tagContainer}>
                        {profilData.tags.split(',').map((tag, index) => (
                            <Text style={{ ...styles.tag, backgroundColor: getRandomColor() }}
                            key={index}>{tag.trim()}</Text>
                        ))}
                    </View>
                    )}                
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
    },
    imgAvatar:{
        height : `${(Dimensions.get('window').height)*12.5/100}px`,
        width:`${(Dimensions.get('window').height)*12.5/100}px`,
        zIndex:2,
        position:"absolute",
        top:`-${(Dimensions.get('window').height)*20/100}px`,
        marginTop:-30,
        left: `${((Dimensions.get('window').width * 40) / 100) - (Dimensions.get('window').height * 10.2/200)}px`

    },
    titleName:{
        zIndex:2,
        position:"absolute",
        top:`-${(Dimensions.get('window').height)*6/100}px`,
        width:"100%",
        marginTop:-30,
        textAlign:"center",
        fontFamily:"Outfit Bold",
        color:"white",
        fontSize:18

    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        width:"80%",
        marginLeft:"10%"
    },
    tag:{
        width:"auto",
        marginRight:18,
        padding:7,
        paddingHorizontal :18,
        fontFamily:"Outfit Medium",
        color:"white",
        borderRadius:50,
        fontSize : 12,
        backgroundColor:""
    }
});

export default DetailsProfil;
