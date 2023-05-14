import React from "react";

const Helmet = ({ children, title }) => {
  document.title = "airbnb - " + title;
  return <>{children}</>;
};

export default Helmet;
