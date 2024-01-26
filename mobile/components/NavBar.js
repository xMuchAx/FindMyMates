// components/NavBar.js

import React, { useState } from 'react';

import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';


const NavBar = ({ title }) => {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={{ flexDirection: 'row', justifyContent: "space-between", alignItems: 'center', padding: 18, backgroundColor: '#FDFDFD' ,position:'absolute', bottom:0, width: "100%"}}>
      <TouchableOpacity  onPress={() => navigation.navigate('Login')}>
        <Image style={{height:40, width: 40}} source={require("../assets/signet.png")} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('CreateEvent')}>
        <Image style={{height:40, width: 40}} source={require("../assets/signet.png")} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Game')}>
        <Image style={{height:40, width: 40}} source={require("../assets/signet.png")} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Profil')}>
        <Image style={{height:40, width: 40, marginLeft:7}} source={require("../assets/signet.png")} />
      </TouchableOpacity>
    </View>
  );
};



export default NavBar;
