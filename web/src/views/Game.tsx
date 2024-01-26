import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import food from "@/assets/food.png";
import music from "@/assets/music.png";
import EventCard from "@/components/EventCard";

const eventData = {
  title: "SSL 2024 Smash Bros",
  location: "14 place des colonnes, Cergy",
  imgSrc: food, // Replace with actual image path
};
const list = [
  {
    title: "SSL 2024 Smash Bros",
    location: "14 place des colonnes, Cergy",
    imgSrc: food, // Replace with actual image path
  },
  {
    title: "test",
    location: "14 rue de paris,  Cergy",
    imgSrc: music, // Replace with actual image path
  },
  {
    title: "test",
    location: "14 rue de paris,  Cergy",
    imgSrc: music, // Replace with actual image path
  },
  {
    title: "test",
    location: "14 rue de paris,  Cergy",
    imgSrc: food, // Replace with actual image path
  },
];
const Game = () => {
  return (
    <div className="mx-4 mb-3 ">
      <h1 className="text-3xl  mx-8 mb-2 font-bold tracking-tight">Games</h1>

      <div className="flex flex-col space-y-4 mx-3">
        <div className="grid grid-cols-2 gap-4">
          {list.map((item) => (
            <EventCard
              className="mx-4 mt-3  w-full "
              title={item.title}
              location={item.location}
              imgSrc={item.imgSrc}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Game;
