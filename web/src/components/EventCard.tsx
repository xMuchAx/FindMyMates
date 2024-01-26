import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import food from "@/assets/food.png";

import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface EventCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  location: string;
  imgSrc: string;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  location,
  imgSrc,
  className,
  ...props
}) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/event-detail", { state: { title, location, imgSrc } });
  };
  return (
    <Card
      className={cn(
        "max-w-sm bg-white border border-gray-200 rounded-lg shadow-xl",
        className
      )}
      {...props}
    >
      <img
        className="rounded-t-lg w-full max-h-52 object-cover"
        src={imgSrc}
        alt="Event"
      />

      <div className="mx-3 px-2">
        <h3 className="mb-2 mx-3 text-xl font-bold tracking-tight text-gray-900">
          {title}
        </h3>
        <p className="mb-2 font-normal text-gray-700">{location}</p>
      </div>
      <div>
        <div className="flex justify-between px-5 py-3 mx-2.5  ">
          <div className="flex justify-start -space-x-4">
            <Avatar className="mix-blend-multiply">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="mix-blend-multiply">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="mix-blend-multiply">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <Button
            variant="outline"
            size="icon"
            className="bg-theme justify-end mx-2.5 rounded-2xl hover:bg-theme"
            onClick={handleButtonClick}
          >
            <svg
              className="rtl:rotate-180 w-5 h-5 ms-2 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default EventCard;
