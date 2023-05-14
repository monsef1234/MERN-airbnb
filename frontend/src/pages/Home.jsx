import React, { useEffect, useState } from "react";
import Helmet from "../components/Helmet";
import axios from "axios";
import { useGlobalCtx } from "../context/context";
import { Link } from "react-router-dom";
const Home = () => {
  const { mainPhoto } = useGlobalCtx();
  const [places, setPlaces] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get("/place")
        .then((res) => {
          setPlaces(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  return (
    <Helmet title={"home"}>
      <div className="grid gap-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-3 px-4">
        {places &&
          places.map((place) => {
            return (
              <Link to={"/place/" + place._id} key={place._id}>
                <div className="flex bg-gray-500 rounded-2xl overflow-hidden mb-2">
                  <img
                    className="aspect-square object-cover"
                    src={place.photos[mainPhoto]}
                    alt={place.title}
                  />
                </div>
                <h2 className="text-sm truncate leading-4 font-bold tracking-wide">
                  {place.title}
                </h2>
                <h2 className="text-gray-400 leading-4">{place.address}</h2>
                <div className="mt-2">
                  <span className=" font-bold">$ {place.price}</span> per night
                </div>
              </Link>
            );
          })}
      </div>
    </Helmet>
  );
};

export default Home;
