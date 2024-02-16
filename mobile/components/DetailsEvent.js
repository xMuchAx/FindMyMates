import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { callApi } from '../apiUtils';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import moment from 'moment';  // Importez moment


const DetailsEvent = () => {
  const [eventData, setEventData] = useState(null);
  const [isJoined, setIsJoined] = useState(false); // Mise à jour du nom de la variable
  const route = useRoute();
  const { userId } = useAuth();
  const navigation = useNavigation(); // Ajout de cette ligne

  const { token } = useAuth();
  const [hostData, setHostData] = useState(null);
  const [imageOrga, setImageOrga] = useState("default.png");  // Ajout de l'état pour l'image de l'organisateur



  const eventId = route.params?.eventId;

  async function loadHostDetails(hostId) {
    try {
      const hostDetails = await callApi(`http://localhost:8000/user/user-detail/${hostId}/`, 'GET', null, token);
      setHostData(hostDetails);

      const imageAvatar = hostDetails?.avatar;
      const parts = imageAvatar.split('/');
      const orgaImage = parts[parts.length - 1];
      setImageOrga(orgaImage);  // Mettre à jour l'état avec le nom de l'image
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'hôte :', error);
    }  }
  

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
    if (eventData && eventData.host) {
      loadHostDetails(eventData.host);

    }
  }, [eventData?.host]);

  useEffect(() => {
    console.log("Nouvelle valeur de imageOrga :", imageOrga);
  }, [imageOrga]);

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

  const deleteEvent = async (eventId) => {
   
    callApi(`http://localhost:8000/event/delete-event/${eventId}/`, 'DELETE', null, token);
      
    navigation.navigate('Home');

      
  };

  const handleGoBack = () => {
    navigation.goBack();
  };





  const formatDuration = (duration) => {
    const momentDuration = moment.duration(duration );
    const days = momentDuration.days();

    const hours = momentDuration.hours();
    const minutes = momentDuration.minutes();
  
    console.log(days+"j" + hours +"h"+ minutes)
    if (days > 0) {
      console.log("testttaaa")

      return false;
    }else if (hours === 0) {
      console.log("testtt")
      return `Durée : ${minutes}min`;
    
    }else{
      console.log("testttbbbbb")

      return `Durée : ${hours}h${minutes}`;
    }
  };


  return (
    <View >
      {eventData && (
        <View>
          <Text style={styles.title}>{eventData.title}</Text>

          <View style={styles.containerParticipant}>

            <View style={styles.round}>
              <Text style={{fontSize : 12, fontFamily : "Outfit Bold", }}>{eventData.vacant_places}</Text>
              <View style={styles.line}></View>
              <Text style={{fontSize : 12, fontFamily : "Outfit Bold", color : "#6E4AB5" }}>{eventData.maximum_place}</Text>
            </View>

            <View style={styles.containerBigLine}>

              <Text style={{fontSize : 18, fontFamily : "Outfit Medium", marginLeft : 15}}>Participants</Text>

              <View style={styles.bigLine}>          
              <View style={[styles.bodyBigLine, { width: `${(eventData.vacant_places / eventData.maximum_place) * 100 - 4}%` }]}>
                
                </View>
              </View>

            </View>

          </View>

          <View style={styles.containerSection}>

            <Image style={styles.img}   source={require(`../assets/calendar.png`)}/>

            <View style={{display:"flex", justifyContent:"center"}}>
              <Text style={styles.text}>Start : {moment(eventData.date_start).format('DD MMMM YYYY, HH[h]mm')}</Text>
              <Text style={styles.textBottom}>
                {formatDuration(eventData.duration) === false
                ? `End : ${moment(eventData.date_end).format('DD MMMM YYYY, HH[h]mm')}`
                : formatDuration(eventData.duration)}
              </Text>
            </View>

          </View>

          <View style={styles.containerSection}>

            <Image style={styles.img}   source={require(`../assets/pinPurple.png`)}/>

            <View style={{display:"flex", justifyContent:"center"}}>
              <Text style={styles.text}>{eventData.location}</Text>
              
            </View>

          </View>

          <View style={styles.containerSection}>

          <Image style={styles.img}   source={require(`../assets/avatar/${imageOrga}`)}/>

            <View style={{display:"flex", justifyContent:"center"}}>
              <Text style={styles.text}>{hostData?.username}</Text>
              <Text style={styles.textBottom}>Organizer</Text>
            </View>

          </View>







          <Text style={styles.descriptiontxt}>Description:</Text>


          <Text style={styles.description}>{eventData.description}</Text>

          {hostData?.id === userId ? (
        // Si l'utilisateur est l'hôte de l'événement
        <TouchableOpacity onPress={() => deleteEvent(eventId)}>
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>Supprimer</Text>
          </View>
        </TouchableOpacity>
      ) : (
        // Sinon, affiche les boutons "Rejoindre" ou "Quitter"
        isJoined ? (
          <TouchableOpacity onPress={() => leaveEvent(eventId)}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Quitter</Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => joinEvent(eventId)}>
            <View style={styles.buttonContainer}>
              <Text style={styles.buttonText}>Rejoindre</Text>
            </View>
          </TouchableOpacity>
        )
      )}
        </View>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
 title:{
  fontFamily: "Outfit Bold",
    fontSize: 28,
    marginLeft : "8%",
    width : "84%"
 }, 
 containerParticipant:{
  marginTop : 40,
  width:"84%",
  height:60,
  marginLeft: "8%",
  display:"flex",
  flexDirection:"row",
  justifyContent:"space-between",
  alignItems:"center"
 },
 round:{
  height:50,
  width:50,
  borderRadius:50,
  borderColor : "#6E4AB5",
  borderWidth : 2,
  display : "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent : "center"
 },
 line:{
  width:24,
  height:2,
  marginVertical : 3,
  backgroundColor:"#6E4AB5"
 },
 containerBigLine:{
  
  height:60,
  width:"76%",
  display : "flex",
  justifyContent:"center"
 },
 bigLine:{
  height:20,
  window:"100%",
  borderColor:"#6E4AB5",
  borderWidth:2,
  marginTop : 6,
  borderRadius:50,
  display:"flex",
  justifyContent : "center"
 },
 bodyBigLine:{
  height: 12,
  backgroundColor : "#6E4AB5",
  marginLeft : 2,
  borderRadius: 50
 },
 containerSection:{
  marginTop : 25,
  width:"84%",
  height:60,
  marginLeft: "9%",
  display:"flex",
  flexDirection:"row",
  alignItems:"center",
 },
 img:{
  width:40,
  height:40,
  marginRight : 20
 },
 text:{
  fontFamily:"Outfit Medium",
  fontSize: 18
 },
 textBottom:{
  fontFamily:"Outfit Medium",
  fontSize: 15,
  color:"grey"
 },
 description:{
  width:"84%",
  marginLeft : "8%",
  fontFamily : "Outfit Medium",
  fontSize : 18,
  marginBottom:140
 },
 descriptiontxt:{
  width:"84%",
  marginLeft : "8%",
  fontFamily : "Outfit Bold",
  fontSize : 18,
  marginTop : 30,
  marginBottom : 15
 }, 
 buttonContainer : {
  position:"absolute",
  bottom: 0,
  width:"50%",
  height : 60,
  marginVertical : 30,

  marginLeft:"25%",
  backgroundColor : "#6E4AB5",
  borderRadius:50,
  display:"flex",
  alignItems:"center",
  justifyContent:"center",
 }, 
 buttonText:{
  color:"white",
  fontFamily : "Outfit Medium",
  fontSize :18
 }

  
 
});

export default DetailsEvent;

