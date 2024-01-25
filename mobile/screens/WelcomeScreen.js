import React from 'react';
import AuthentificationForm from '../components/AuthentificationForm';
import { StyleSheet } from 'react-native';
import { View, TouchableOpacity, Image, Text } from 'react-native';


export function WelcomeScreen({ navigation }) {
  
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

        <Text style={styles.text}>Join ours community, find yours mate, join or create IRL events with people from around the world</Text>      


        <View style={styles.containerChoiceForm}>

            <View style={styles.containerChoice}>
                <TouchableOpacity style={styles.btnSignIn} onPress={() => navigation.navigate('Login')} >
                    <Text style={{color:"white", fontFamily : "Outfit Medium"}}>Sign In</Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.btnSignUp} onPress={() => navigation.navigate('Login')}>
                    <Text style={{color:"#6E4AB5", fontFamily : "Outfit Medium"}}>Sign Up</Text>            
                </TouchableOpacity>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.containerRedirection}>


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
    borderWidth: 1,
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
    borderWidth: 1,
    borderColor: 'black',
    position:"absolute",
    bottom: 30
  },
  btnSignIn:{
    height:"100%",
    width:"50%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
    backgroundColor:"#6E4AB5",
    borderRadius: 50, 

  },
  btnSignUp:{
    height:"100%",
    width:"50%",
    display:"flex",
    alignItems:"center",
    justifyContent:"center",
  }
    
});
