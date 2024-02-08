import React, { useState } from 'react';
import { TouchableOpacity, View, Text, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import EventList from '../components/EventList';
import { Dimensions } from 'react-native';
import NavBar from '../components/NavBar';

export function EventScreen() {
  const navigation = useNavigation();
  const { isLoggedIn } = useAuth();

  const userIsLoggedIn = isLoggedIn();

  // Si l'utilisateur n'est pas connecté, redirigez-le vers la page de connexion
  if (!userIsLoggedIn) {
    navigation.navigate('Login');
  }

  const [eventInfo, setEventInfo] = useState('MyEvent');
  console.log("testttttttttt" + eventInfo)

  const handlePressNextEvent = () => {
    setEventInfo('NextEvent');
  };

  const handlePressMyEvent = () => {
    
    setEventInfo('MyEvent');
  };

  const handlePressNowEvent = () => {
  
    setEventInfo('NowEvent');
  };

  return (
    <View style={styles.containerAll}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.containerPurple}>
          <TouchableOpacity onPress={handlePressNextEvent} style={styles.touchable}>
            <Text>Touchable 1</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressMyEvent} style={styles.touchable}>
            <Text>Touchable 2</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handlePressNowEvent} style={styles.touchable}>
            <Text>Touchable 3</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.container}>
          <EventList eventInfo={eventInfo}/>
        </View>
      </ScrollView>
      <NavBar bubblePositionInit={2} route="Event" />
    </View>
  );
}

const styles = StyleSheet.create({
  containerAll: {
    flex: 1,
    backgroundColor: "white",
    overflow: "hidden",
  },
  containerPurple:{
    backgroundColor: "#6E4AB5",
    width:"100%",
    height:`${(Dimensions.get('window').height)*40/100}px`,
    position:"absolute",
    top:0,
    borderBottomLeftRadius:50,
    borderBottomRightRadius:50
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    marginTop: `${(Dimensions.get('window').height)*25/100}px`,
    backgroundColor: "white",
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    minHeight: `${(Dimensions.get('window').height)*65/100}px`,
    
  },
  touchable: {
    backgroundColor: 'lightblue',
    marginVertical: 5,
    padding: 10,
  },
});

export default EventScreen;
