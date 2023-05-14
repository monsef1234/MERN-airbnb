import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalCtx } from "../context/context";

const PriceWidget = ({ place }) => {
  const { member } = useGlobalCtx();
  const [checkIn, setCheckIn] = useState(new Date().toJSON().slice(0, 10));
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();
  const dateHandler = () => {
    return new Date(new Date(checkIn).setDate(new Date(checkIn).getDate() + 1))
      .toJSON()
      .slice(0, 10);
  };
  let diffrence = 0;
  if (checkIn && checkOut) {
    diffrence = new Date(checkOut).getTime() - new Date(checkIn).getTime();
    diffrence = Math.floor(diffrence / (24 * 60 * 60 * 1000));
  }
  const submitHandler = async (e) => {
    e.preventDefault();
    await axios
      .post("/booking/new", {
        name,
        checkIn,
        checkOut,
        guests,
        phone,
        price: place.price * diffrence,
        place: place._id,
        owner: member._id,
      })
      .then((res) => {
        navigate("/account/booking/" + res.data._id);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div className="gap bg-white rounded-md shadow-md p-4">
      <h2 className="text-2xl text-center font-bold">
        Price: ${place.price} / per night
      </h2>
      <div className="mt-4 border rounded-md p-3">
        <div className="flex">
          <div className="py-5 px-4">
            <label htmlFor="checkIn">Check In:</label>
            <input
              className="w-full"
              type="date"
              value={checkIn}
              min={new Date().toJSON().slice(0, 10)}
              onChange={(e) => setCheckIn(e.target.value)}
              name="checkIn"
              id="checkIn"
            />
          </div>
          <div className="border-l py-5 px-4">
            <label htmlFor="checkOut">Check Out:</label>
            <input
              className="w-full"
              type="date"
              value={checkOut}
              min={dateHandler()}
              onChange={(e) => setCheckOut(e.target.value)}
              name="checkOut"
              id="checkOut"
            />
          </div>
        </div>
        <div className="border-t py-5 px-4">
          <label htmlFor="checkOut">Number of Guests:</label>
          <input
            className="w-full"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            type="number"
            name="guests"
            id="guests"
          />
        </div>
        {diffrence > 0 && (
          <>
            <div className="border-t py-5 px-4">
              <label htmlFor="name">Your Full Name</label>
              <input
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="border-t py-5 px-4">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="w-full"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                type="tel"
                name="phone"
                id="phone"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="bg-primary rounded-2xl py-2 w-full text-white"
          onClick={submitHandler}
        >
          Book this Place{" "}
          {diffrence > 0 && (
            <>
              <span>${diffrence * place.price}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default PriceWidget;
