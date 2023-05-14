import React, { useEffect, useState } from "react";
import Links from "../components/Links";
import axios from "axios";
import { useCookies } from "react-cookie";
import Place from "./Place";
import PlaceImg from "../components/PlaceImg";
import { differenceInCalendarDays } from "date-fns";

const Bookings = () => {
  const [bookings, setBookings] = useState(null);
  const [cookie, _] = useCookies();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/booking/all/${cookie.token}`)
        .then((res) => {
          setBookings(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  return (
    <div>
      <Links />
      <div>
        {bookings &&
          bookings.map((booking) => {
            return (
              <div
                key={booking._id}
                className="flex gap-4 h-28 bg-gray-300 rounded-2xl overflow-hidden max-w-7xl mx-auto my-3"
              >
                <div className="w-48">
                  <PlaceImg
                    place={booking.place}
                    className={"object-cover h-full w-full"}
                  />
                </div>
                <div className="py-3 grow">
                  <h2 className="text-xl">{booking.place.title}</h2>
                  {booking.checkIn} -&gt; {booking.checkOut}
                  <div>
                    nights:{" "}
                    {differenceInCalendarDays(
                      new Date(booking.checkOut),
                      new Date(booking.checkIn)
                    )}{" "}
                    | Total Price: ${booking.price}
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Bookings;
