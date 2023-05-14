import React from "react";
import {
  WifiIcon,
  TvIcon,
  HandThumbUpIcon,
  RadioIcon,
} from "@heroicons/react/24/outline";
const Perks = ({ perks, setPerks }) => {
  const data = [
    { perk: "Wifi", icon: <WifiIcon /> },
    { perk: "Parking", icon: <WifiIcon /> },
    { perk: "TV", icon: <TvIcon /> },
    { perk: "Radio", icon: <RadioIcon /> },
    { perk: "Pets", icon: <HandThumbUpIcon /> },
    { perk: "Private Entrance", icon: <WifiIcon /> },
  ];
  const changeHandler = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPerks([...perks, name]);
    } else {
      setPerks(perks.filter((perk) => perk !== name));
    }
  };
  return (
    <>
      {data.map((i, idx) => {
        return (
          <div className="border flex items-center py-3 px-4 gap-2" key={idx}>
            <input
              type="checkbox"
              name={i.perk.toLowerCase()}
              id={i.perk.toLowerCase()}
              onChange={changeHandler}
              checked={perks.includes(i.perk.toLowerCase())}
            />
            <label
              htmlFor={i.perk.toLowerCase()}
              className="flex items-center gap-1 grow"
            >
              <div className="w-5 h-5">{i.icon}</div>
              {i.perk}
            </label>
          </div>
        );
      })}
    </>
  );
};

export default Perks;
