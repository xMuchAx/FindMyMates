import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { callApi } from '../apiUtils';

const CreateEventForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState('');
  const [location, setLocation] = useState('');
  const [vacant_places, setVacant_places] = useState('');
  const [host, setHost] = useState('');




  const handleSubmit = async () => {

    const data = {
      title: title,
      description: description,
      date: date,
      time: time,
      duration: duration,
      location: location,
      vacant_places: vacant_places,
      host: host,
    };  

    try {

      await callApi('http://localhost:8000/event/create-event/','POST',data);

    } catch (error) {
      console.error('Erreur lors de l ajout de l evenement :', error);
    }
  
  };

  return (
    <View style={styles.container}>
      <View>
        <Text>Title:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter title"
          value={title}
          onChangeText={(text) => setTitle(text)}

          maxLength={32}
          minLength={1}
          required
        />
      </View>
      <View>
        <Text>Description:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter description"
          value={description}
          onChangeText={(text) => setDescription(text)}

          maxLength={255}
          minLength={1}
          required
        />
      </View>
      <View>
        <Text>Date:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter date"
          value={date}
          onChangeText={(text) => setDate(text)}

          required
        />
      </View>
      <View>
        <Text>Time:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter time"
          value={time}
          onChangeText={(text) => setTime(text)}

          required
        />
      </View>
      <View>
        <Text>Duration:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter duration"
          value={duration}
          onChangeText={(text) => setDuration(text)}

          required
        />
      </View>
      <View>
        <Text>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={(text) => setLocation(text)}

          maxLength={255}
          minLength={1}
          required
        />
      </View>
      <View>
        <Text>Vacant Places:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter vacant places"
          value={vacant_places}
          onChangeText={(text) => setVacant_places(text)}

          keyboardType="numeric"
          required
        />
      </View>
      <View>
        <Text>Host:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter host"
          onChangeText={(text) => setHost(text)}

          value={host}
          required
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CreateEventForm;
