import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./sections/Banner/Banner";
import ContactSection from "./sections/contact/ContactSection";

const LandingPage = () => {
  return (
    <div className="bg-slate-100 max-h-screen">
      <Helmet>
        <title>TuitionNetwork</title>
      </Helmet>
      <ContactSection></ContactSection>
      <Banner></Banner>
    </div>
  );
};

export default LandingPage;
