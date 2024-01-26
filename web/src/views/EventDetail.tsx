import React from "react";

import { FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import { Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useLocation } from "react-router-dom";

const EventDetail = () => {
  const loc = useLocation();
  const { title, location } = loc.state;
  return (
    <div className="w-sm bg-sidebar_bg mx-auto m-12 p-4 items-center p-4 shadow-lg rounded-2xl">
      <h1 className="text-2xl font-bold mb-4">{title}</h1>
      <p className="text-gray-600 mb-4">
        Amateur competition limited to 200 participants. Arcade screen provided.
      </p>
      <div className="flex flex-col">
        <div className="flex items-center mb-4">
          <div className="flex items-center justify-center w-12 h-12 bg-blue-500 text-white rounded-full mr-2">
            <span className="text-lg font-bold">127/200</span>
          </div>
          <span className="text-gray-600">Participants</span>
        </div>
        <Progress value={48} color="blue" className="mb-4" />
        <div className="flex items-center mb-4">
          <FaCalendarAlt className="text-gray-600 mr-2" />
          <span className="text-gray-600">Date</span>
        </div>
        <p className="text-gray-600 mb-4">Tuesday, February 9, 2024</p>
        <div className="flex items-center mb-4">
          <Clock className="text-gray-600 mr-2" />
          <p className="text-gray-600 mb-4">4:00 PM - 9:00 PM</p>
        </div>
        <div className="flex items-center mb-4">
          <FaMapMarkerAlt className="text-gray-600 mr-2" />
          <span className="text-gray-600">{location}</span>
        </div>
        <p className="text-gray-600 mb-4">
          14 place des colonnes, Cergy | Axe Majeur Batiment 14
        </p>
        <Button
          variant="outline"
          className="bg-theme text-white rounded-2xl hover:opacity-60"
        >
          Join Event
        </Button>
      </div>
    </div>
  );
};

export default EventDetail;
