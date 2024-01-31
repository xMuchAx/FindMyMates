import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Text, Animated } from 'react-native';

export function WelcomeScreen({ navigation }) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [isSignInClicked, setIsSignInClicked] = useState(true);
  const [redirect, setRedirect] = useState("connexion");


  const moveBubbleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsSignInClicked(false);
      setRedirect('inscription');

    });
  };

  const resetBubbleAnimation = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      setIsSignInClicked(true);
      setRedirect('connexion');

    });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.imageBackground}
        source={require("../assets/welcomeImage.jpg")}
      />

      <View style={styles.containerWelcome}>
        <Text style={styles.title}>
          Hey, <Text style={{ color: '#6E4AB5' }}>Welcome</Text> to{' '}
          <Text style={{ color: '#6E4AB5' }}>F</Text>
          <Text>ind</Text>
          <Text style={{ color: '#6E4AB5' }}>M</Text>
          <Text>y</Text>
          <Text style={{ color: '#6E4AB5' }}>M</Text>
          <Text>ates</Text>
        </Text>

        <Text style={styles.text}>
          Join ours community, find yours mate, join or create IRL events with people from around the world
        </Text>

        <View style={styles.containerChoiceForm}>
          <View style={styles.containerChoice}>
            <Animated.View
              style={[
                styles.bubble,
                {
                  transform: [
                    {
                      translateX: animatedValue.interpolate({
                        inputRange: [0, 1],
                        outputRange: ['0%', '100%'],
                      }),
                    },
                  ],
                },
              ]}
            />

            <TouchableOpacity
              style={[ styles.btnSignIn]} onPress={() => resetBubbleAnimation()}>
              <Text
                style={[ styles.textSignIn,
                  { color: isSignInClicked ? 'white' : '#6E4AB5' },
                ]}
              >
                Sign In
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.btnSignUp              ]}
              onPress={() => moveBubbleAnimation()}
            >
              <Text
                style={[
                  styles.textSignUp,
                  { color: isSignInClicked ? '#6E4AB5' : 'white' },
                ]}
              >
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.round}
            onPress={() =>{ if(redirect == "connexion"){navigation.navigate('Login')}else{navigation.navigate('Registration')}}}
          >
            <Image style={styles.arrow} source={require(`../assets/arrow.png`)} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    height: '100%',
  },
  imageBackground: {
    position: 'absolute',
    top: -87,
    height: '82%',
    width: '100%',
  },
  containerWelcome: {
    height: "42%",
    width: "100%",
    backgroundColor: "white",
    position: "absolute",
    bottom: 0,
    borderTopLeftRadius: 30, // Ajoutez le rayon au coin supérieur gauche
    borderTopRightRadius: 30, // Ajoutez le rayon au coin supérieur droit
    display:"flex",
    alignItems:"center",
    paddingTop:40

  },
  title: {
    width:"85%",
    fontFamily : "Outfit ExtraBold",
    fontSize: 36,
  },
  text:{
    width:"85%",
    fontFamily : "Outfit Medium",
    fontSize: 15,
    marginTop:20,
    color:"#8C8C8C"
  },
  containerChoice: {
    borderWidth: 1.4,
    borderColor: '#6E4AB5',
    borderRadius: 50, 
    width : "77%",
    height : 65,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  containerChoiceForm:{
    width:"85%",
    position:"absolute",
    bottom: 30,
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  },
  btnSignIn:{
    height:"100%",
    width:"50%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",

  },
  btnSignUp:{
    height:"100%",
    width:"50%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  },
  bubble:{
    height:"100%",
    width:"50%",
    backgroundColor:"#6E4AB5",
    borderRadius:50,
    position:"absolute",

  },
  round:{
    height: 45,
    borderWidth: 1.4,
    borderColor: 'black',
    width : 45,
    borderRadius : 50,
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    borderColor:"#6E4AB5",
    position:"absolute",
    right:0
  },
  arrow:{
    height:20,
    width:20,
  },
  textSignIn:{
    fontFamily : "Outfit Medium"
  },
  textSignUp:{
   fontFamily : "Outfit Medium"
  }

    
});
