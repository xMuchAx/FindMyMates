import food from "@/assets/food.png";
import EventCard from "@/components/EventCard";
import RecCard from "@/components/RecCard";
import { useContext } from 'react';
import {AuthContext, AuthContextType} from '../AuthContext'; // Assurez-vous que le chemin est correct

const eventData = {
  title: "SSL 2024 Smash Bros",
  location: "14 place des colonnes, Cergy",
  imgSrc: food, // Replace with actual image path
};

const Home = () => {
  const authContext = useContext(AuthContext);

  if (!authContext === null) {
    // Gérer le cas où AuthContext est null
    return null;
  }

  const { auth } = authContext as AuthContextType;
  const { userId, token } = auth;

  console.log("info: ", userId, token);

  return (
    <div className="mx-4 mb-3 ">
      <h1 className="text-2xl  mx-4 mb-2 font-semibold tracking-tight">
        Events
      </h1>

      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4  mb-8 justify-around ">
          <EventCard
            className="mx-4 mt-3  w-full "
            title={eventData.title}
            location={eventData.location}
            imgSrc={eventData.imgSrc}
          />
          <EventCard
            className="mx-4 mt-3 w-full "
            title={eventData.title}
            location={eventData.location}
            imgSrc={eventData.imgSrc}
          />
        </div>
        <h2 className="text-2xl m-4  p-2.5 font-semibold tracking-tight">
          Some events recommandations near you
        </h2>
        <div className="flex flex-col space-y-4 ">
          <RecCard
            eventTitle="Fortnite tournoi pro"
            eventLocation="proche de vous"
            imgSrc={eventData.imgSrc}
          />
          <RecCard
            eventTitle="Fortnite fifa pro"
            eventLocation="proche de vous"
            imgSrc={eventData.imgSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
