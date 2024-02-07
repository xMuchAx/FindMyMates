import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const EventList = ({ nameGame }) => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  const { token } = useAuth();
  const { userId } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let eventData;

        if (nameGame != null) {
          eventData = await callApi(`http://localhost:8000/event/search-event_by-game/${nameGame}/`, 'GET', null, token);
        } else {
          eventData = await callApi('http://localhost:8000/event/list/', 'GET', null, token);
        }

        console.log('Event Data:', eventData);
        setEventData(eventData);
      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }
    };

    fetchData();
  }, [nameGame]);

  function formatEventDate(dateString) {
    const eventDate = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = eventDate.toLocaleDateString('fr-FR', options);
    let [day, month] = formattedDate.split(' ');
    month = month.replace(/\./g, '');
  
    // Calculer la largeur minimale nécessaire en fonction de la longueur du texte
    const minCardDateWidth = Math.max(month.length, 3) * 16; // Ajustez la taille en conséquence
  
    return (
      <View style={[styles.cardDate, { width: minCardDateWidth }]}>
        <Text style={styles.day}>{day}</Text>
        {'\n'}
        <Text style={styles.month}>{month.toUpperCase()}</Text>
      </View>
    );
  }

  const redirectDetailEvent = (eventId) => {
    navigation.navigate('DetailsEvent', { eventId });
  };

  return (
      <View>
        <Text style={styles.title}>Liste des événements {nameGame || ""}:</Text>
        {eventData && eventData.map(event => (
          <TouchableOpacity
            key={event.id}
            onPress={() => redirectDetailEvent(event.id)}
            style={styles.cardEvent}
            >
            
            <Image style={styles.imgGame}   source={require(`../assets/backgroundEvent.jpg`)}/>
            {formatEventDate(event.date)}
            <View style={styles.containerInfo}>
              <Text style={styles.titleEvent}>{event.title}</Text>
              <View style={styles.containerLoc}>
                <Image style={styles.imgLoc}   source={require(`../assets/pinPurple.png`)}/>

                <Text style={styles.location}>{event.location}</Text>
              </View>
            </View>
            <View style={styles.arrowRedirect}>
            <Image style={{height:14, width:14}}   source={require(`../assets/arrowRightWhite.png`)}/>

            </View>
            
          </TouchableOpacity>
        ))}
      </View>
  );
};

const styles = StyleSheet.create({
  
  
  title:{
    marginTop: 5,
    fontFamily:"Outfit Bold",
    fontSize: 21,
    marginLeft:25,
    marginBottom: 15
  },
  imgGame:{ 
    position:"absolute",
    height: "60%", 
    width: "100%", 
    borderRadius: 20,

  },
  cardEvent:{
    borderRadius: 20,
    height:250,
    width : "78%",
    marginLeft : "11%",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4.84,
    elevation: 7, // Pour Android
    marginTop : 40
  },
  month:{
    fontSize:12,
    fontFamily : "Outfit Bold",
  },
  day:{
    fontSize:24,
    fontFamily : "Outfit Medium",
  },
  cardDate:{
    backgroundColor:"white",
    borderRadius: 15,
    paddingVertical : 6,
    display:"flex",
    justifyContent : "center",
    alignItems:"center",
    position : "absolute",
    right : 10,
    top : 10,
    borderColor : "#a1a1a1",
    borderWidth : 1
  },
  titleEvent: {
    fontSize: 20,
    color: "black",
    left: 15,
    fontFamily : "Outfit Medium",
    marginTop : 10
  },
  location:{
    marginTop : 10,
    fontSize: 15,
    color: "black",
    left: 10,
    fontFamily : "Outfit Medium",

  },
  containerInfo:{
    position:"absolute",
    bottom  :"10%",
    width:"100%",
    height : "30%"
  },
  imgLoc:{
    height:20,
    width:20,
    marginTop: 5
  },
  containerLoc:{
    display:"flex", 
    flexDirection:"row", 
    marginLeft: 15,
    alignItems:"center",
    width : "78%",
    // borderColor : "red",
    // borderWidth :1
  },
  arrowRedirect:{
    borderRadius:50,
    backgroundColor : "#6E4AB5",
    height:30,
    width:30,
    display : "flex",
    alignItems:"center",
    justifyContent:"center",
    position:"absolute",
    bottom: 14,
    right:14,
  },
  
  
  
  
});

export default EventList;
