import { useState } from "react";
import request from "../request";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { baseServerUrl } from "../config";

const AddEvent = () => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [dateTime, setDateTime] = useState<string>("");
  const [image, setImage] = useState<string>("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const eventData = {
      title,
      description,
      location,
      dateTime,
      image,
    };
    var data: any;

    try {
      data = await request(
        `${baseServerUrl}/user/register/`,
        "POST",
        eventData
      );
    } catch (error) {
      alert("An error occured: " + error);
      return;
    }

    // addEvent(eventData);
  };

  return (
    <div className="w-1/2 mx-auto rounded-lg shadow-xl p-4 space-y-4 items-center ">
      <h1 className="text-xl tracking-tight font-semibold">
        Create your event
      </h1>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Title">Title</Label>
        <Input
          type="text"
          id="Title"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Title">Title</Label>
        <Input
          type="text"
          id="Description"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Location">Location</Label>
        <Input
          type="text"
          id="Location"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Location">Location</Label>
        <Input
          type="text"
          id="vacant_place"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Date and Time">Date and Time</Label>
        <Input
          id="Date and Time"
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
        />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor="Image">Image</Label>
        <Input
          id="Image"
          type="file"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <Button onClick={handleSubmit} className="bg-theme items-center">
        Submit
      </Button>
    </div>
  );
};

export default AddEvent;
