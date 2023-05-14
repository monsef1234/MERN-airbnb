import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const Booking = () => {
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(`/booking/${id}`)
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchData();
  }, []);
  console.log(id);
  return <div>BookingSingle</div>;
};

export default Booking;
