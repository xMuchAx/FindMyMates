import food from "@/assets/food.png";
import EventCard from "@/components/EventCard";
import RecCard from "@/components/RecCard";
import { useContext } from "react";
import fortnite from "@/assets/fortnite.jpeg";
import music from "@/assets/music.png";
import { AuthContext, AuthContextType } from "../AuthContext"; // Assurez-vous que le chemin est correct
import fifa from "@/assets/fifa.png";

const list = [
  {
    title: "SSL 2024 Smash Bros",
    location: "14 place des colonnes, Cergy",
    imgSrc: music, // Replace with actual image path
  },
  {
    title: "My birthday fortnite contest",
    location: "quai de grenelle , 75015 paris",
    imgSrc: fortnite, // Replace with actual image path
  },
  {
    title: "Fifa session party ",
    location: "La défense",
    imgSrc: fifa, // Replace with actual image path
  },
  {
    title: "Birthday rocket league session",
    location: "Neuilly",
    imgSrc: food, // Replace with actual image path
  },
];

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
      <h1 className="text-2xl  mx-8 mb-2 font-semibold tracking-tight">
        Your Events
      </h1>

      <div className="flex flex-col space-y-2">
        <div className="flex space-x-4  mb-8 justify-around ">
          <EventCard
            className="mx-4 mt-3  w-full "
            title={list[2].title}
            location={list[2].location}
            imgSrc={list[2].imgSrc}
          />
          <EventCard
            className="mx-4 mt-3 w-full "
            title={list[1].title}
            location={list[1].location}
            imgSrc={list[1].imgSrc}
          />
        </div>
        <h2 className="text-2xl m-4  p-2.5 font-semibold tracking-tight">
          Some events recommandations near you
        </h2>
        <div className="flex flex-col space-y-4 ">
          <RecCard
            eventTitle="Fortnite tournoi pro"
            eventLocation="proche de vous"
            imgSrc={list[3].imgSrc}
          />
          <RecCard
            eventTitle="Fifa contest pro"
            eventLocation="proche de vous"
            imgSrc={list[0].imgSrc}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
