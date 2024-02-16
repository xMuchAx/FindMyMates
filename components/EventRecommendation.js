import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, Image } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import { LinearGradient } from 'expo-linear-gradient';

const EventRecommendation = () => {
  const [eventDataByGameAndLoc, setEventDataByGameAndLoc] = useState(null);
  const [eventDataByGameOrLoc, setEventDataByGameOrLoc] = useState(null);
  const [eventDataByLoc, setEventDataByLoc] = useState(null);

  const navigation = useNavigation();
  const {token} = useAuth()
  const {userId} = useAuth()

  useEffect(() => {
    const fetchData = async () => {
      try {
        let eventData;
        eventData = await callApi(`http://localhost:8000/user/recommendation/${userId}/`, 'GET', null, token);
        setEventDataByGameAndLoc(eventData.result_game_location);
        setEventDataByGameOrLoc(eventData.result_game_location);
        setEventDataByLoc(eventData.result_location);

      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }
    };
  
    fetchData(); // Appelez la fonction fetchData pour effectuer l'appel à l'API lorsque le composant est monté
  }, []); // Aucune dépendance, le useEffect s'exécutera uniquement lors du montage initial du composant

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

  const redirectDetailEvent = (eventId, eventImage) => {
    navigation.navigate('DetailsEvent', { eventId, eventImage });
  };

  return (
    <View>
      {eventDataByGameAndLoc && eventDataByGameAndLoc.length > 0 && (
        <Text style={styles.title}>Events</Text>
      )}
      <View>
      <ScrollView
        style={styles.grid}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {eventDataByGameAndLoc && eventDataByGameAndLoc.map(event => (
          <TouchableOpacity
            key={event.id}
            onPress={() => redirectDetailEvent(event.id, event.avatar)}
            style={styles.cardEvent}
            >
            
            <Image style={styles.imgGame}   source={require(`../assets${event.avatar}`)}/>
            {formatEventDate(event.date_start)}
            <View style={styles.containerInfo}>
              <Text style={styles.titleEvent}>{event.title}</Text>
              <View style={styles.containerLoc}>
                <Image style={styles.imgLoc}   source={require(`../assets/pinWhite.png`)}/>

                <Text style={styles.location}>{event.location}</Text>
              </View>
            </View>
            <View style={styles.arrowRedirect}>
            <Image style={{height:14, width:14}}   source={require(`../assets/arrowRightWhite.png`)}/>

            </View>
            
          </TouchableOpacity>
        ))}



      </ScrollView>
      <LinearGradient colors={['transparent','rgba(255, 255, 255, 0.6)']} locations={[0, 1]} style={styles.opacityRight}  start={{ x: 0, y: 0.5 }}  end={{ x: 1, y: 0.5 }}  />
      </View>





{/* 
      {eventDataByGameOrLoc && eventDataByGameOrLoc.map(event => (
        <TouchableOpacity
          key={event.id}
          onPress={() => redirectDetailEvent(event.id)}
          style={{ marginBottom: 10, padding: 10, backgroundColor: 'lightgray' }}
        >
          <Text>{event.title}</Text>
          <Text>{event.description}</Text>
        </TouchableOpacity>
      ))} */}
    </View>
  );
};


const styles = StyleSheet.create({
  
  
  grid: {
    display: "flex",
    flexDirection: "row",
    paddingRight:30,
  },
  title:{
    fontFamily:"Outfit Bold",
    fontSize: 24,
    marginLeft:"8%",
    marginBottom: 20
  },
  imgGame:{ 
    position:"absolute",
    height: "100%", 
    width: "100%", 
    borderRadius: 20,

    
  },
  cardEvent:{
    borderRadius: 20,
    height:300,
    width : 220,
    marginLeft : 30
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
    color: "white",
    left: 10,
    fontFamily : "Outfit Medium",

    textShadow: `-0.5px -0.5px 0 #a1a1a1, 0.5px -0.5px 0 #a1a1a1, -0.5px 0.5px 0 #a1a1a1, 0.5px 0.5px 0 #a1a1a1`,
  },
  location:{
    marginTop : 10,
    fontSize: 17,
    color: "white",
    left: 10,
    fontFamily : "Outfit Medium",

    textShadow: `-0.5px -0.5px 0 #a1a1a1, 0.5px -0.5px 0 #a1a1a1, -0.5px 0.5px 0 #a1a1a1, 0.5px 0.5px 0 #a1a1a1`,
  },
  containerInfo:{
    position:"absolute",
    bottom  :50,
    width:"100%",
  },
  imgLoc:{
    height:23,
    width:23,
    borderColor : "#9232a1",
    borderWidth : 1,
    borderRadius:50, 
  },
  containerLoc:{
    display:"flex", 
    flexDirection:"row", 
    marginLeft: 10,
    alignItems:"center",
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
  opacityRight:{
    position:"absolute",
    height:"100%",
    width:"18%",
    right:-10
  }
  
  
  
});


export default EventRecommendation;
