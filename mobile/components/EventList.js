import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { callApi } from '../apiUtils';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import CountdownTimer from './CountDownTimer';

const EventList = ({ nameGame, next, searchText }) => {
  const [eventData, setEventData] = useState(null);
  const navigation = useNavigation();
  const { token, userId, eventInfo } = useAuth();
  const [indexEvenementActuel, setIndexEvenementActuel] = useState(0);
  const [foundEvent, setFoundEvent] = useState(false);




  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedData;

        if (nameGame != null) {
          fetchedData = await callApi(`http://localhost:8000/event/search-event_by-game/${nameGame}/`, 'GET', null, token);
        } else if (next) {
          fetchedData = await callApi(`http://localhost:8000/event/event-history/list/${userId}/`, 'GET', null, token);
          if (next && fetchedData) {
            let closestFutureEventIndex = null; // Initialiser l'index à null
        
            for (let i = 0; i < fetchedData.length; i++) {
                const now = new Date().getTime();
                const targetTime = new Date(fetchedData[i]?.event?.date_start).getTime();
        
                if (targetTime > now) {
        
                    if (closestFutureEventIndex === null || targetTime < new Date(fetchedData[closestFutureEventIndex]?.event?.date_start).getTime()) {
                        closestFutureEventIndex = i; // Mettez à jour l'index si c'est le plus proche
                    }
                }
            }
        
            if (closestFutureEventIndex !== null) {
                console.log("L'index de l'événement le plus proche est :", closestFutureEventIndex);
                setIndexEvenementActuel(closestFutureEventIndex);
                setFoundEvent(true);
            } else {
                console.log("Aucun événement futur trouvé");
                setFoundEvent(false);
            }
        }
        } else if (searchText != null) {
          fetchedData = await callApi(`http://localhost:8000/event/search-event_by-name/${searchText}/`, 'GET', null, token);

        } else if(eventInfo=="MyEvent"){
          fetchedData = await callApi(`http://localhost:8000/event/search-event_by-host/${userId}/`, 'GET', null, token);

        }else if(eventInfo=="NextEvent"){
          fetchedData = await callApi(`http://localhost:8000/event/event-history/list/${userId}/`, 'GET', null, token);

        }else if(eventInfo=="NowEvent"){
          fetchedData = await callApi(`http://localhost:8000/event/user_event_in_progress/${userId}/`, 'GET', null, token);
        }else{
          fetchedData = await callApi('http://localhost:8000/event/list/', 'GET', null, token);
        }

        setEventData(fetchedData);

        

      } catch (error) {
        console.error('Erreur lors de la récupération des données d\'événement :', error);
      }


    };

    fetchData();

    const intervalId = setInterval(fetchData, 5000);

    return () => clearInterval(intervalId);
  }, [nameGame, next, userId, token, eventInfo, indexEvenementActuel]);



  function formatEventDate(dateString) {
    const eventDate = new Date(dateString);
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = eventDate.toLocaleDateString('fr-FR', options);
    let [day, month] = formattedDate.split(' ');
    month = month.replace(/\./g, '');

    const minCardDateWidth = Math.max(month.length, 3) * 16;

    return (
      <View style={[styles.cardDate, { width: minCardDateWidth }]}>
        <Text style={styles.day}>{day}</Text>
        <Text style={styles.month}>{month.toUpperCase()}</Text>
      </View>
    );
  }

  const redirectDetailEvent = (eventId, eventImage) => {
    navigation.navigate('DetailsEvent', { eventId, eventImage });
  };

  return (
    <View>
      {next && eventData && eventData.length > 0 && eventInfo == undefined && foundEvent == true && (
    <View>

        <View>
          <Text style={[styles.title, { fontSize: 24, marginTop: 40 }]}>Prochain événement</Text>
          <CountdownTimer targetDate={eventData[indexEvenementActuel]?.event?.date_start} style={{ zIndex: 5 }} />
          
        </View>
      

        <TouchableOpacity
          key={eventData[indexEvenementActuel]?.event?.id}
          onPress={() => redirectDetailEvent(eventData[indexEvenementActuel]?.event?.id, eventData[indexEvenementActuel]?.event?.avatar?.substring(eventData[indexEvenementActuel]?.event?.avatar.lastIndexOf('/') + 1))}
          style={styles.cardEvent}
        >
          <Image style={styles.imgGame} source={require(`../assets/${eventData[indexEvenementActuel]?.event?.avatar?.substring(eventData[indexEvenementActuel]?.event?.avatar.lastIndexOf('/') + 1)}`)} />
          {formatEventDate(eventData[indexEvenementActuel]?.event?.date_start)}
          <View style={styles.containerInfo}>
            <Text style={styles.titleEvent}>{eventData[indexEvenementActuel]?.event?.title}</Text>
            <View style={styles.containerLoc}>
              <Image style={styles.imgLoc} source={require(`../assets/pinPurple.png`)} />
              <Text style={styles.location}>{eventData[indexEvenementActuel]?.event?.location}</Text>
            </View>
          </View>
          <View style={styles.arrowRedirect}>
            <Image style={{ height: 14, width: 14 }} source={require(`../assets/arrowRightWhite.png`)} />
          </View>
        </TouchableOpacity>
        </View>

      )}

      {!next && eventData && eventData.length > 0 && eventData.map(event => {

        var key = ""
        var title = ""
        var location = ""
        var date =""
        var imageUrl =""
        var image =""

        
        if(eventInfo=="NextEvent"){

          key = event.id;
          if(key==undefined){
            key = event.event.id;
            title = event.event.title;
            location = event.event.location;
            date = event.event.date_start;
            imageUrl = event.event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }else{
            title = event.title;
            location = event.location;
            date = event.date_start;
            imageUrl = event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }

        }else if(eventInfo=="MyEvent"){


          key = event.id;
          if(key==undefined){
            key = event.event.id;
            title = event.event.title;
            location = event.event.location;
            date = event.event.date_start;
            imageUrl = event.event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }else{
            title = event.title;
            location = event.location;
            date = event.date_start;
            imageUrl = event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }
        }else if(eventInfo=="NowEvent"){


          key = event.id;
          if(key==undefined){
            key = event.event.id;
            title = event.event.title;
            location = event.event.location;
            date = event.event.date_start;
            imageUrl = event.event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }else{
            title = event.title;
            location = event.location;
            date = event.date_start;
            imageUrl = event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }

        }else{

          key = event.id;
          if(key==undefined){
            key = event.event.id;
            title = event.event.title;
            location = event.event.location;
            date = event.event.date_start;
            imageUrl = event.event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }else{
            title = event.title;
            location = event.location;
            date = event.date_start;
            imageUrl = event.avatar;
            image = imageUrl.substring(imageUrl.lastIndexOf('/') + 1);
          }
        }


        // const imageUrl = event.avatar;
// si 00h00m00s passer a l'event next suivant


        return (
          <TouchableOpacity
            key={key}
            onPress={() => redirectDetailEvent(key, image)}
            style={styles.cardEvent}
          >
            <Image style={styles.imgGame} source={require(`../assets/${image}`)} />
            {formatEventDate(date)}

            <View style={styles.containerInfo}>
              <Text style={styles.titleEvent}>{title}</Text>
              <View style={styles.containerLoc}>
                <Image style={styles.imgLoc} source={require(`../assets/pinPurple.png`)} />
                <Text style={styles.location}>{location}</Text>
              </View>
            </View>
            <View style={styles.arrowRedirect}>
              <Image style={{ height: 14, width: 14 }} source={require(`../assets/arrowRightWhite.png`)} />
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  
  
  title:{
    marginTop: 5,
    fontFamily:"Outfit Bold",
    fontSize: 21,
    marginLeft:"8%",
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
    width : "84%",
    marginLeft : "8%",
    shadowColor: "#000",
    shadowOffset: {
    width: 0,
    height: 3,
    },
    shadowOpacity: 0.40,
    shadowRadius: 5,
    elevation: 10, // Pour Android
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
