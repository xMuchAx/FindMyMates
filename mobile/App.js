
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { CreateEventScreen } from './screens/CreateEventScreen';
import { DetailsEventScreen } from './screens/DetailsEventScreen';
import { AuthProvider } from './AuthContext';
import {ProfilScreen} from './screens/ProfilScreen';
import { GameScreen } from './screens/GameScreen';
import { EventByGameScreen } from './screens/EventByGameScreen';

import { WelcomeScreen } from './screens/WelcomeScreen';
import { useFonts } from 'expo-font';


// import { HomeScreen } from './screens/HomeScreen';
// import { SearchScreen } from './screens/SearchScreen';
// import {FavorisScreen} from './screens/FavorisScreen';
// import { ProfilScreen } from './screens/ProfilScreen';
// import LoadScreen from './screens/LoadScreen';


const Stack = createNativeStackNavigator();

function App() {

  const [fontsLoaded] = useFonts({
    'Outfit Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit ExtraBold': require('./assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit Medium': require('./assets/fonts/Outfit-Medium.ttf'),


  });

  if(fontsLoaded){
  return (
    <NavigationContainer>
      <AuthProvider>

      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{
          headerShown: false,
          contentStyle: { flex: 1 },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
        <Stack.Screen name="DetailsEvent" component={DetailsEventScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Profil" component={ProfilScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="EventByGame" component={EventByGameScreen} />




        {/* <Stack.Screen name="Favoris" component={FavorisScreen} />

        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Load" component={LoadScreen} /> */}



        
      </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  );
}
}
export default App;
