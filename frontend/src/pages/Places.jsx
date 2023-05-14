import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PlusIcon } from "@heroicons/react/24/outline";
import Links from "../components/Links";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useGlobalCtx } from "../context/context";

const Places = () => {
  const { ready, mainPhoto } = useGlobalCtx();
  const [cookie, _] = useCookies();
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`/place/user/${cookie.token}`).then((res) => {
        setPlaces(res.data);
      });
    };
    fetchData();
  }, []);
  if (!ready) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }
  return (
    <div>
      <Links />
      <Link
        to="/account/places/new"
        className="cursor-pointer active:scale-95 flex bg-primary rounded-full py-2 px-3 items-center text-white w-fit mx-auto"
      >
        <PlusIcon className="h-5 w-5" />
        Add New Place
      </Link>
      <div className="mt-4">
        {places &&
          places.map((place) => {
            return (
              <Link
                key={place._id}
                to={"/account/places/" + place._id}
                className="flex gap-4 mb-3 bg-gray-200 p-4 rounded-xl mx-4 cursor-pointer"
              >
                <div className="w-36 h-36 grow shrink-0">
                  {place.photos.length > 0 && (
                    <img
                      className="h-full w-full object-cover"
                      src={place.photos[mainPhoto]}
                      alt=""
                    />
                  )}
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-lg">{place.title}</h2>
                  <p className="text-sm mt-4">{place.desc}</p>
                </div>
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Places;
