import React, { useState } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Animated, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const NavBar = ({ bubblePositionInit, route }) => {
  const navigation = useNavigation();
  const [bubblePosition, setBubblePosition] = useState(new Animated.Value(bubblePositionInit));

  const [isGameClicked, setGameClicked] = useState(false);
  const [isHomeClicked, setHomeClicked] = useState(false);
  const [isEventClicked, setEventClicked] = useState(false);
  const [isProfilClicked, setProfilClicked] = useState(false);

  const [areTextsVisibleHome, setAreTextsVisibleHome] = useState(true);
  const [areTextsVisibleGame, setAreTextsVisibleGame] = useState(true);
  const [areTextsVisibleProfil, setAreTextsVisibleProfil] = useState(true);
  const [areTextsVisibleEvent, setAreTextsVisibleEvent] = useState(true);




  const handleNavigation = (screenName, index) => {
    
      if(route=="Home"){
      setAreTextsVisibleHome(false);
      }else if(route=="Game"){
        setAreTextsVisibleGame(false)
      }else if(route=="Profil"){
        setAreTextsVisibleProfil(false)
      }else if(route=="Event"){
        setAreTextsVisibleEvent(false)
      }

      Animated.spring(bubblePosition, {
        toValue: index,
        useNativeDriver: false,
        speed: 25, // Ajustez cette valeur selon votre préférence, par exemple, 2 pour doubler la vitesse

      }).start(() => {
        setHomeClicked(false);
        setGameClicked(false);
        setEventClicked(false);
        setProfilClicked(false);
      
        if (route === "Home") {
          setAreTextsVisibleHome(true);
        } else if (route === "Game") {
          setAreTextsVisibleGame(true);
        } else if (route === "Profil") {
          setAreTextsVisibleProfil(true);
        }else if (route === "Event"){
          setAreTextsVisibleEvent(true);
        }
      
        bubblePosition.setValue(bubblePositionInit);
        navigation.navigate(screenName);
      });
    }      


  return (
    <View style={styles.navBar}>
      {/* <Text>${route}</Text> */}
      <Animated.View
        style={[
          styles.colorBubble,
          {
            left: bubblePosition.interpolate({
              inputRange: [0, 1, 2, 3],
              outputRange: ['5%', '26%', '50%', '71.5%'],
            }),
          },
        ]}
      />

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          

          setHomeClicked(true);
          handleNavigation('Home', 0);
        }}
      >
        <Image style={styles.icon} source={require("../assets/home.png")} />
        {(isHomeClicked || route === "Home") && areTextsVisibleHome && <Text style={styles.textNav}>Home</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          

          setGameClicked(true);
          handleNavigation('Game', 1);
        }}
      >
        <Image style={styles.icon} source={require("../assets/manette.png")} />
        {(isGameClicked || route === "Game")  &&  areTextsVisibleGame &&<Text style={styles.textNav}>Game</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          setEventClicked(true);
          handleNavigation('Event', 2);
        }}
      >
        <Image style={styles.icon} source={require("../assets/signet.png")} />
        {(isEventClicked || route === "Event") &&  areTextsVisibleEvent &&<Text style={styles.textNav}>Event</Text>}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonNav}
        onPress={() => {
          

          setProfilClicked(true);
          handleNavigation('Profil', 3);
        }}
      >
        <Image style={styles.icon} source={require("../assets/profil.png")} />
        {(isProfilClicked || route === "Profil") && areTextsVisibleProfil &&  <Text style={styles.textNav}>Profil</Text>}
      </TouchableOpacity>

     
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 22,
    paddingHorizontal: "5%",
    backgroundColor: '#FDFDFD',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  buttonNav: {
    alignItems: 'center',
    padding: 10,
    display: "flex",
    flexDirection: "row"
  },
  icon: {
    height: 26,
    width: 26,
  },
  colorBubble: {
    position: 'absolute',
    width: '25%',
    height: 40,
    backgroundColor: 'rgba(110, 74, 181, 0.21)',
    zIndex: -1,
    borderRadius: 50
  },
  textNav: {
    fontFamily: "Outfit Medium",
    marginLeft: 10,
    color: "#6E4AB5"
  },
  hideTextsButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  hideTextsButtonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default NavBar;
