import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./sections/Banner/Banner";
import ContactSection from "./sections/contact/ContactSection";
import CountDown from "./sections/countDown/CountDown";
import FAQ from "./sections/FAQ/FAQ";
import TutoringWithUs from "./sections/TutoringWithUs/TutoringWithUs";
import WhyChooseUs from "./sections/whyChooseUs/WhyChooseUs";
import TuitionTypes from "./sections/tuitionTypes/TuitionTypes";

const LandingPage = () => {
  return (
    <div className="bg-base-100 min-h-screen">
      <Helmet>
        <title>TuitionNetwork</title>
      </Helmet>
      <ContactSection></ContactSection>
      <Banner></Banner>
      <CountDown></CountDown>
      <WhyChooseUs></WhyChooseUs>
      <TuitionTypes></TuitionTypes>
      <TutoringWithUs></TutoringWithUs>
      <FAQ></FAQ>
    </div>
  );
};

export default LandingPage;
