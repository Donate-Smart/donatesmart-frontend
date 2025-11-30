import React from 'react'
import Hero from '../components/Home/Hero/Hero'
import NamesList from '../components/Home/Cases/FeatruedCases'
import Testimonial from '../components/Home/Testimonial/Testimonial'
import { WhyChooseUs } from '../components/Home/WhyChooseUs';
import { FeaturedCases } from '../components/Home/FeaturedCases';
import { HowItWorks } from '../components/Home/HowItWorks';

export default function LandingPage() {
  


  return (
    <main>
      <Hero />
      <WhyChooseUs />
      <FeaturedCases />
      <HowItWorks />
      {/* <NamesList />
          <Testimonial /> 
          <ContactForm /> */}
    </main>
    );
}