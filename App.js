import React from 'react';
import { NavigationContainer } from '@react-navigation/native';  // Importez useRoute
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider } from './AuthContext';
import { useFonts } from 'expo-font';
import NavBar from './components/NavBar';

// Importez vos écrans
import { LoginScreen } from './screens/LoginScreen';
import { HomeScreen } from './screens/HomeScreen';
import { RegistrationScreen } from './screens/RegistrationScreen';
import { CreateEventScreen } from './screens/CreateEventScreen';
import { DetailsEventScreen } from './screens/DetailsEventScreen';
import { ProfilScreen } from './screens/ProfilScreen';
import { GameScreen } from './screens/GameScreen';
import { EventByGameScreen } from './screens/EventByGameScreen';
import { WelcomeScreen } from './screens/WelcomeScreen';
import { SearchEventScreen } from './screens/SearchEventScreen';
import { EventScreen } from './screens/EventScreen';


const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    'Outfit Bold': require('./assets/fonts/Outfit-Bold.ttf'),
    'Outfit ExtraBold': require('./assets/fonts/Outfit-ExtraBold.ttf'),
    'Outfit Medium': require('./assets/fonts/Outfit-Medium.ttf'),
  });

  if (fontsLoaded) {
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
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            {/* ... Vos écrans actuels sans NavBar */}
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CreateEvent" component={CreateEventScreen} />
            <Stack.Screen name="DetailsEvent" component={DetailsEventScreen} />
            <Stack.Screen name="Registration" component={RegistrationScreen} />
            <Stack.Screen name="Profil" component={ProfilScreen} />
            <Stack.Screen name="SearchEvent" component={SearchEventScreen} />
            <Stack.Screen name="Event" component={EventScreen} />
            <Stack.Screen name="Game" component={GameScreen} />
            <Stack.Screen name="EventByGame" component={EventByGameScreen} />
          </Stack.Navigator>

            
        </AuthProvider>
      </NavigationContainer>
    );
  }
}

export default App;
