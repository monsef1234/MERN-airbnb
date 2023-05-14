import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useCookies } from "react-cookie";
import ProfilePage from "./pages/ProfilePage";
import PlacesForm from "./pages/PlacesForm";
import Places from "./pages/Places";
import Place from "./pages/Place";
import Bookings from "./pages/Bookings";
import Booking from "./pages/Booking";
const App = () => {
  const [cookie, _] = useCookies();
  const ProtectedLayout = () => {
    return cookie.token ? <Outlet /> : <Navigate to="login" />;
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/*" element={<ProtectedLayout />}>
            <Route index element={<Home />} />
            <Route path="account" element={<ProfilePage />} />
            <Route path="account/places" element={<Places />} />
            <Route path="account/places/new" element={<PlacesForm />} />
            <Route path="account/places/:id" element={<PlacesForm />} />
            <Route path="place/:id" element={<Place />} />
            <Route path="account/bookings" element={<Bookings />} />
            <Route path="account/booking/:id" element={<Booking />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
