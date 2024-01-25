import React from 'react';
import NavBar from '../components/NavBar';
import DetailsEvent from '../components/DetailsEvent';
import { View } from 'react-native';

export function DetailsEventScreen() {


  return (
    <View style={{ flex: 1 }}>
        <DetailsEvent/>
        <NavBar/>
    </View>
  );
}

