import React from "react";
import { Helmet } from "react-helmet-async";
import Banner from "./sections/Banner/Banner";
import ContactSection from "./sections/contact/ContactSection";
import CountDown from "./sections/countDown/CountDown";
import FAQ from "./sections/FAQ/FAQ";
import TutoringWithUs from "./sections/TutoringWithUs/TutoringWithUs";
import WhyChooseUs from "./sections/whyChooseUs/WhyChooseUs";
import TuitionTypes from "./sections/tuitionTypes/TuitionTypes";
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

const LandingPage = () => {
  return (
    <div className="bg-base-100 min-h-screen font-serif">
      <Helmet>
        <title>TuitionNetwork</title>
      </Helmet>
      <Navbar></Navbar>
      {/* <ContactSection></ContactSection> */}
      <Banner></Banner>
      <CountDown></CountDown>
      <WhyChooseUs></WhyChooseUs>
      <TuitionTypes></TuitionTypes>
      <TutoringWithUs></TutoringWithUs>
      <FAQ></FAQ>
      <Footer></Footer>
    </div>
  );
};

export default LandingPage;
