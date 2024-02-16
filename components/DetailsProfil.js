import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, Modal } from 'react-native';
import { callApi } from '../apiUtils';
import { useAuth } from '../AuthContext';
import { Dimensions } from 'react-native';
import Textarea from 'react-native-textarea';

const DetailsProfil = () => {
    const { userId, token } = useAuth();
    const [profilData, setProfilData] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isModalDeleteTagVisible, setModalDeleteTagVisible] = useState(null);
    const [selectedTagIndex, setSelectedTagIndex] = useState(null);



    const fetchProfilDetails = async () => {
        try {
            const profilDetails = await callApi(`http://localhost:8000/user/user-detail/${userId}/`, 'GET');
            console.log('Profil Details:', profilDetails);
            setProfilData(profilDetails);
        } catch (error) {
            console.error('Erreur lors de la récupération des détails du profil :', error);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchProfilDetails();
        }
    }, [userId]);

    const handleTextChange = (field, value) => {
        setProfilData((prevData) => ({ ...prevData, [field]: value }));
    };

    const updateUser = async () => {
        const data = {
            user: userId,
            username: profilData.username,
            email: profilData.email,
            bio: profilData.bio,
        };
        try {
            await callApi(`http://localhost:8000/user/update/`, 'PUT', data, token);
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

    const updateUserOnTextChange = (text) => {
        handleTextChange('bio', text);
        updateUser();
    };

    const openModal = () => {
        setInputValue(null)
        setModalVisible(true);
    };

    const openModalForTag = (tag) => {
        setInputValue(tag);
        setModalDeleteTagVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setModalDeleteTagVisible(false);
    };

    async function handleModalSubmit(newTag) {
        const data = {
            user: userId,
            tags: [newTag],
        };

        try {
            const addTag = await callApi(`http://localhost:8000/user/add-tags/`, 'POST', data, token);
            console.log('Nouvelle valeur de TextInput dans la modal :', newTag);
            updateUser();
            fetchProfilDetails();  // Rafraîchir les données après avoir ajouté le tag avec succès
            setInputValue(null)
            closeModal();
        } catch (error) {
            console.error('Erreur lors de l\'ajout du tag :', error);
        }
    };

    const handleTagDelete = async (inputValue) => {
        

        const data = {
            user: userId,
            tag: inputValue,
        };

        console.log(data)

        try {
            await callApi(`http://localhost:8000/user/deleted-tag/`, 'POST', data, token);
            updateUser();
            fetchProfilDetails();
            setInputValue(null)

        } catch (error) {
            console.error('Erreur lors de la suppression du tag :', error);
        }

        closeModal();
    };

    return (
        <View style={{paddingTop:30, marginBottom:100}}>
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
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={updateUserOnTextChange}
                            defaultValue={profilData.bio}
                            length={100}
                            placeholder={'Écrivez quelque chose...'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>

                    <View style={styles.tagContainer}>
                        {profilData.tags && profilData.tags.split(',').map((tag, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => openModalForTag(tag.trim())}
                            >
                                <Text style={{ ...styles.tag, backgroundColor: getRandomColor() }} key={index}>
                                    {tag.trim()}
                                </Text>
                            </TouchableOpacity>
                        ))}
                        <TouchableOpacity style={styles.buttonAdd} onPress={openModal}>
                            <Text style={styles.addTag}>+</Text>
                        </TouchableOpacity>
                    </View>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={isModalVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <TextInput
                                    style={styles.modalInput}
                                    value={inputValue}
                                    onChangeText={(text) => setInputValue(text)}
                                    placeholder="Ajouter un nouveau tag"
                                    autoFocus
                                />
                                <View style={{display:"flex", flexDirection:"row"}}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => handleModalSubmit(inputValue)}>
                                    <Text style={styles.modalButtonText}>Ajouter</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>Annuler</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>

                    <Modal
                        transparent={true}
                        animationType="slide"
                        visible={isModalDeleteTagVisible}
                        onRequestClose={closeModal}
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.modalContent}>
                                <Text style={[styles.modalInput, {textAlign:"center"}]}>{inputValue}</Text>

                                <View style={{display:"flex", flexDirection:"row"}}>
                                <TouchableOpacity style={styles.modalButton} onPress={() => handleTagDelete(inputValue)}>
                                    <Text style={styles.modalButtonText}>Delete</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                                    <Text style={styles.modalButtonText}>Annuler</Text>
                                </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Modal>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerSection: {
        width: "80%",
        marginLeft: "10%",
        marginBottom: 35,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#6E4AB5",
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
    textarea:{
        fontFamily: "Outfit Medium",
        fontSize: 18,
        paddingBottom: 5,
        outlineColor: 'transparent',
        outlineStyle: 'none',
        borderWidth: 0,
        borderColor: 'transparent',
        height:96
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
        marginLeft:"10%",
        display:"flex",
        alignItems:"center",
        justifyContent:"left",
        width:"auto",

    },
    tag:{
        marginRight:18,
        marginBottom:12,
        padding:7,
        paddingHorizontal :18,
        fontFamily:"Outfit Medium",
        color:"white",
        borderRadius:50,
        fontSize : 12,
        backgroundColor:""
        
    },
    textareaContainer:{
        height:96
    },
    addTag: {
        width: "100%",
        height:"100%",
        fontFamily: "Outfit Medium",
        color: "white",
        fontSize: 20,
        textAlign:"center",
        marginTop:1
    },
    buttonAdd:{
        height:30,
        width:30,
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        borderRadius: 50,
        backgroundColor: "#6E4AB5",
        marginBottom:12

    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalInput: {
        fontFamily: "Outfit Medium",
        fontSize: 18,
        marginBottom: 20,
        paddingVertical: 10,
        paddingHorizontal: 18,
        borderWidth: 1,
        borderColor: "#6E4AB5",
        borderRadius: 50,
        width: '100%',
        outlineColor: 'transparent',
        outlineStyle: 'none',
    },
    modalButton: {
        backgroundColor: "#6E4AB5",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        marginBottom: 10,
        marginHorizontal : 10
    },
    modalButtonText: {
        fontFamily: "Outfit Medium",
        fontSize: 18,
        color: "white",
        textAlign: "center",
    },
});

export default DetailsProfil;
