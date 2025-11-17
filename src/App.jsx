import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Layout/Header/Navbar";
import Footer from "./components/Layout/Footer/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import AddCase from "./pages/AddCase";
import CaseDetails from "./pages/CaseDetails";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import "./App.css";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/add-case" element={<AddCase />} />
        <Route path="/case/:id" element={<CaseDetails />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Footer />
      {/* <ScrollToTop /> */}
    </Router>
  );
}

export default App;
