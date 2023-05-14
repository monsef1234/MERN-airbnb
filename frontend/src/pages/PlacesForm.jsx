import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PreInput from "../components/PreInput";
import Perks from "../components/Perks";
import {
  ArrowUpTrayIcon,
  MinusCircleIcon,
  StarIcon,
} from "@heroicons/react/24/outline";
import { StarIcon as SolidStartIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { useGlobalCtx } from "../context/context";
import axios from "axios";
import Links from "../components/Links";
import { useCookies } from "react-cookie";

const PlacesForm = () => {
  const { member, ready, setMainPhoto, mainPhoto } = useGlobalCtx();
  const navigate = useNavigate();
  const [perks, setPerks] = useState([]);
  const [cookie, _] = useCookies();
  const [errorImage, setErrorImage] = useState(false);
  const [image, setImage] = useState(null);
  const [uploadImage, setUploadImage] = useState(false);
  const [place, setPlace] = useState({
    photos: [],
    title: "",
    address: "",
    desc: "",
    extraInfo: "",
    checkIn: "",
    checkOut: "",
    maxQuests: "",
    price: "",
  });
  const [photo, setPhoto] = useState("");
  const { id } = useParams();
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setPlace({ ...place, [name]: value });
  };
  const photosHandler = async () => {
    if (photo.trim() == "") return;
    setPlace({
      ...place,
      photos: [...place.photos, photo.trim()],
    });
    setErrorImage(false);
  };
  const uploadImageHandler = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "ml_default");
    try {
      setUploadImage(true);
      await axios
        .post("https://api.cloudinary.com/v1_1/del1r2rok/image/upload", data)
        .then((res) => {
          setPlace({ ...place, photos: [...place.photos, res.data.url] });
        });
      setUploadImage(false);
      setImage(null);
    } catch (error) {
      console.log(error.message);
      setUploadImage(false);
      setImage(null);
    }
  };
  const deleteImage = (idx) => {
    if (idx === mainPhoto) {
      setMainPhoto(0);
    }
    setPlace({
      ...place,
      photos: place.photos.filter((_, index) => idx !== index),
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();
    if (id) {
      const { token } = cookie;
      await axios.put("/place", { id, token, place, perks }).then((res) => {
        navigate("/account/places");
      });
    } else {
      try {
        await axios
          .post("/place/new", { owner: member._id, place })
          .then((res) => {
            navigate("/account/places");
          });
      } catch (error) {
        console.log(error.message);
      }
    }
  };
  useEffect(() => {
    image && uploadImageHandler();
  }, [image]);
  useEffect(() => {
    if (id) {
      const fetchPlace = async () => {
        try {
          await axios.get("/place/t/" + id).then((res) => {
            const { data } = res;
            setPlace({
              photos: data.photos,
              title: data.title,
              address: data.address,
              desc: data.desc,
              extraInfo: data.extraInfo,
              checkIn: data.checkIn,
              checkOut: data.checkOut,
              maxQuests: data.maxQuests,
              price: data.price,
            });
            setPerks(data.perks);
          });
        } catch (error) {
          console.log(error.massage);
        }
      };
      fetchPlace();
    }
  }, [id]);
  if (!ready) {
    return <h1 className="text-center text-2xl">Loading...</h1>;
  }
  return (
    <div>
      <Links />
      <form className="flexd flex-col px-3" onSubmit={submitHandler}>
        <PreInput
          header={"Title"}
          desc={
            "Title for your place should ne short and catchy as in advertisement"
          }
        />
        <input
          type="text"
          name="title"
          placeholder="Title for exemple: My lovely apt"
          className="mb-3 w-full"
          value={place.title}
          onChange={changeHandler}
        />
        <PreInput header={"Address"} desc={"Address to this place"} />
        <input
          type="text"
          name="address"
          placeholder="address"
          className="mb-3 w-full"
          value={place.address}
          onChange={changeHandler}
        />
        <PreInput header={"Photos"} desc={"more > better"} />
        <div className={!errorImage ? "flex gap-2 mb-3" : "flex gap-2"}>
          <input
            type="text"
            name="photo"
            placeholder="Add using a link ... jpg"
            className="grow"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
          />
          <button
            onClick={photosHandler}
            className="bg-gray-500 rounded-2xl text-white px-2 cursor-pointer active:scale-95"
            type="button"
            disabled={uploadImage}
          >
            {uploadImage ? "Uploading..." : "Add Photo"}
          </button>
        </div>
        {errorImage && (
          <small className="mb-3 text-red-500 tracking-wide">
            Image Not found Try Upload Option
          </small>
        )}
        {place.photos.length > 0 && (
          <small className="block mb-1">
            Double click on image to make it the main image
          </small>
        )}
        <div className="grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 mb-3 ">
          {place.photos.map((photo, idx) => {
            return (
              <div className="relative flex" key={idx}>
                {idx === mainPhoto ? (
                  <span className=" absolute left-3 top-2 z-50 text-white bg-black p-1 bg-opacity-70 rounded-sm">
                    <SolidStartIcon className="w-5 h-5" />
                  </span>
                ) : (
                  <span className=" absolute left-3 top-2 z-50 text-white bg-black p-1 bg-opacity-70 rounded-sm">
                    <StarIcon className="w-5 h-5" />
                  </span>
                )}
                <span className=" absolute right-3 top-2 z-50 text-white bg-black p-1 bg-opacity-70 rounded-sm cursor-pointer">
                  <MinusCircleIcon
                    onClick={() => deleteImage(idx)}
                    className="w-5 h-5"
                  />
                </span>
                <img
                  className="object-cover"
                  src={photo}
                  onError={(e) => {
                    setErrorImage(true);
                    setPlace({
                      ...place,
                      photos: place.photos.filter((i) => i !== photo),
                    });
                    setPhoto("");
                  }}
                  onLoad={() => {
                    setPhoto("");
                  }}
                  onDoubleClick={() => {
                    setMainPhoto(idx);
                    alert("Done!");
                  }}
                  key={idx}
                />
              </div>
            );
          })}
          <label
            htmlFor="image"
            className="border text-center flex items-center justify-center"
          >
            <ArrowUpTrayIcon className="w-5 h-5" />
            <span className="font-bold">
              {uploadImage ? "Uploading..." : "Upload"}
            </span>
          </label>
        </div>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          accept="image/*"
          disabled={uploadImage}
          onChange={(e) => setImage(e.target.files[0])}
        />

        <PreInput header={"Description"} desc={"description of the place"} />
        <textarea
          name="desc"
          id="desc"
          className="mb-3 border p-2 w-full"
          value={place.desc}
          onChange={changeHandler}
        ></textarea>
        <PreInput
          header={"Perks"}
          desc={"select all the perks of your place"}
        />
        <div className="mb-3 grid gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          <Perks perks={perks} setPerks={setPerks} />
        </div>
        <PreInput header={"Extra Info"} desc={"house rules..etc"} />
        <textarea
          name="extraInfo"
          id="extraInfo"
          className="w-full border mb-3"
          value={place.extraInfo}
          onChange={changeHandler}
        ></textarea>
        <PreInput
          header={"Check in&out times"}
          desc={
            "add check in and out times, remember to have some time window for cleaning the room betwee,"
          }
        />
        <div className="flex flex-wrap my-3 gap-2">
          <div className="flex flex-col grow">
            <label htmlFor="checkIn">Check In</label>
            <input
              type="text"
              name="checkIn"
              id="checkIn"
              placeholder="14:00"
              value={place.checkIn}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col grow">
            <label htmlFor="checkOut">Check Out</label>
            <input
              type="text"
              name="checkOut"
              id="checkOut"
              placeholder="11"
              value={place.checkOut}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col grow">
            <label htmlFor="maxQuests">Max Quests</label>
            <input
              type="text"
              name="maxQuests"
              id="maxQuests"
              value={place.maxQuests}
              onChange={changeHandler}
            />
          </div>
          <div className="flex flex-col grow">
            <label htmlFor="maxQuests">Price ($)</label>
            <input
              type="text"
              name="price"
              id="price"
              value={place.price}
              onChange={changeHandler}
            />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-primary text-white rounded-xl mb-3 py-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PlacesForm;
