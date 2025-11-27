import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Header/Navbar";
import Footer from "./components/Layout/Footer/Footer";
import FooterOld from "./components/Layout/Footer/Footerold";

import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import AddCase from "./pages/AddCase";
import CaseDetails from "./pages/CaseDetails";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";

import "./App.css";
import { Toaster } from 'react-hot-toast';
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import ContactUS from "./pages/ContactUs";


function App() {

  useEffect(() => {
    // animation extension
    AOS.init({ duration: 800 });
  }, []);


  return (
    <Theme>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-case" element={<AddCase />} />
          <Route path="/case/:id" element={<CaseDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile-edit" element={<EditProfile />} />
          <Route path="/contact" element={<ContactUS />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
        {/* <FooterOld /> */}
        <Footer />
        {/* notification animation extension */}
        <Toaster 
          position="bottom-center" 
          closeOnClick
          containerClassName="toast"
        />
        <ScrollToTop />
      </Router>
    </Theme>
  );
}

export default App;
