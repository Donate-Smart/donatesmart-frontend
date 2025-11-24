import React from 'react'
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import Hero from '../components/Home/Hero/Hero'
import NamesList from '../components/Home/Cases/FeatruedCases'
import Testimonial from '../components/Home/Testimonial/Testimonial'
import ContactForm from '../components/Home/Contact/Contact'

export default function LandingPage() {
  const navigate = useNavigate();
  const [cases, setCases] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  useEffect(() => {
    if (currentUser?.role === "admin") {
      navigate("/admin");
    } else if (currentUser?.role === "user") {
      navigate("/home");
    }

    // TODO: Move this to namelist
    const fetchCases = async () => {
      try {
        const res = await axios.get("/api/cases");
        setCases(res.data);
      } catch (err) {
        console.error("Error fetching cases:", err.response?.data || err.message);
      }
    };

    fetchCases();
  }, []);


  return (
    <main>
      <Hero />
      <NamesList />
      <Testimonial />
      <ContactForm />
    </main>
    );
}