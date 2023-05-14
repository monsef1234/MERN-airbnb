import React from "react";

const PreInput = ({ header, desc }) => {
  return (
    <>
      <h2 className="text-2xl font-bold">{header}</h2>
      <p className="text-sm text-gray-500">{desc}</p>
    </>
  );
};

export default PreInput;
