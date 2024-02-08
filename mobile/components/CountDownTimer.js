import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(calculateTimeRemaining());

  useEffect(() => {
    const timerId = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);

      if (remaining.total <= 0) {
        clearInterval(timerId); // Arrête le minuteur lorsque le temps est écoulé
      }
    }, 1000); // Met à jour toutes les secondes

    return () => clearInterval(timerId); // Nettoie le minuteur lorsqu'il est démonté

  }, []); // Vide le tableau de dépendances pour s'assurer qu'il n'y a qu'un seul intervalle actif

  function calculateTimeRemaining() {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds, total: difference };
  }

  return (
    <Text style={{marginLeft: "8%", fontFamily : "Outfit Medium", fontSize: 20, marginBottom:-20}}>{timeRemaining.days}J   {timeRemaining.hours} : {timeRemaining.minutes} : {timeRemaining.seconds} secondes</Text>
  );
};

export default CountdownTimer;
