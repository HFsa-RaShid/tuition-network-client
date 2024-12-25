import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./sections/Banner/Banner";
import ContactSection from "./sections/contact/ContactSection";
import CountDown from "./sections/countDown/CountDown";
import FAQ from "./sections/FAQ/FAQ";

const LandingPage = () => {
  return (
    <div className="bg-slate-100 min-h-screen">
      <Helmet>
        <title>TuitionNetwork</title>
      </Helmet>
      <ContactSection></ContactSection>
      <Banner></Banner>
      <CountDown></CountDown>
      <FAQ></FAQ>
    </div>
  );
};

export default LandingPage;
