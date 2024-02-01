import React from 'react';
import NavBar from '../components/NavBar';
import DetailsEvent from '../components/DetailsEvent';
import { View } from 'react-native';
import UpdateForm from '../components/UpdateForm';
import { useAuth } from '../AuthContext';


export function UpdateProfilScreen() {

    const { isLoggedIn } = useAuth();

  

    const userIsLoggedIn = isLoggedIn();

    if (!userIsLoggedIn) {
        navigation.navigate('Login');
    }


  return (
    <View style={{ flex: 1 }}>
        <UpdateForm/>
    </View>
  );
}

