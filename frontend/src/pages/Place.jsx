import {
  ListBulletIcon,
  MapPinIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PriceWidget from "../components/PriceWidget";

const Place = () => {
  const { id } = useParams();
  const [place, setPlace] = useState(null);
  const [showPhotos, setShowPhotos] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/place/t/${id}`)
        .then((res) => {
          setPlace(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  if (showPhotos) {
    return (
      <div className="bg-black absolute w-full py-6">
        <button
          className="flex items-center  bg-gray-300 px-3 py-2 rounded-lg fixed top-5 right-6 z-50 cursor-pointer"
          onClick={() => setShowPhotos(false)}
        >
          <XMarkIcon className="w-4 h-4" /> Close photos
        </button>
        <div className="flex flex-col gap-5 container mx-auto">
          {place.photos.map((photo, idx) => {
            return (
              <img
                src={photo}
                key={idx}
                alt=""
                className="w-full rounded-2xl"
              />
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className="bg-gray-200 py-3 px-5">
      {place && (
        <>
          <h1 className="text-2xl font-semibold">{place.title}</h1>
          <a
            href={"https://www.google.com/maps/?q=" + place.address}
            target="_blank"
            rel="noopener noreferrer"
            className="w-fit text-sm text-gray-500 underline flex items-center gap-1"
          >
            <MapPinIcon className="h-4 w-4" />
            {place.address}
          </a>
          <div className="relative grid grid-cols-[2fr_1fr] gap-2 overflow-hidden rounded-2xl mt-3 min-h-[35rem]">
            <div className="flex">
              <img src={place.photos[0]} alt="" className="object-cover" />
            </div>
            <div className="flex gap-2 flex-col">
              <img src={place.photos[1]} alt="" className="object-cover grow" />
              <img src={place.photos[2]} alt="" className="object-cover grow" />
            </div>
            <button
              onClick={() => setShowPhotos(true)}
              className="absolute flex items-center gap-1 bg-gray-300 opacity-80 cursor-pointer bottom-3 right-3 hover:scale-105 duration-500 p-3 rounded-2xl"
            >
              <ListBulletIcon className="h-4 w-4" /> Show more
            </button>
          </div>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-[2fr_1fr] mt-4">
            <div>
              <h2 className="font-semibold text-2xl">Description :</h2>
              <p>{place.desc}</p>
              <div className="mt-4">
                Check in: {place.checkIn} <br />
                Check out: {place.checkOut} <br />
                Max number of guests: {place.maxQuests}
              </div>
            </div>
            <PriceWidget place={place} />
          </div>
        </>
      )}
    </div>
  );
};

export default Place;
