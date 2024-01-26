import React from "react";
import { Badge } from "./ui/badge";

interface CardProps {
  eventTitle: string;
  eventLocation: string;
  imgSrc: string;
}

const RecCard: React.FC<CardProps> = ({
  eventTitle,
  eventLocation,
  imgSrc,
}) => {
  return (
    <a
      href="#"
      className="flex flex-col items-center w-full bg-white border border-gray-200 rounded-lg no-underline shadow mx-8 my-2 space-x-4 md:flex-row md:max-w-xl hover:bg-gray-100"
    >
      <img
        className="object-cover w-full rounded-t-lg h-72 space-x-4 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
        src={imgSrc}
        alt=""
      />
      <div className="flex flex-col justify-between p-2 leading-normal">
        <h5 className="mb-3 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {eventTitle}
        </h5>
        <p className="mb-2 flex justify-between font-normal text-gray-700 dark:text-gray-400">
          {eventLocation}
          <Badge className="justify-end bg-white hover:bg-orange-300 hover:text-white rounded-sm shadow-lg text-orange-300">
            $30.00
          </Badge>
        </p>
      </div>
    </a>
  );
};

export default RecCard;
