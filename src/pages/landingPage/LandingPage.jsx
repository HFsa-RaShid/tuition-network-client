import React from "react";
import { Helmet } from "react-helmet-async";

// Layout Components
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

// Landing Page Sections
import Banner from "./sections/Banner/Banner";
import CountDown from "./sections/countDown/CountDown";
import WhyChooseUs from "./sections/whyChooseUs/WhyChooseUs";
import CategorySpotlight from "./sections/categorySpotlight/CategorySpotlight";
import TuitionTypes from "./sections/tuitionTypes/TuitionTypes";
import ParentConnection from "./sections/parentConnection/ParentConnection";
import TutorConnection from "./sections/TutorConnection/TutorConnection";
import TutoringWithUs from "./sections/TutoringWithUs/TutoringWithUs";
import Reviews from "./sections/reviews/Reviews";
import FAQ from "./sections/FAQ/FAQ";

const LandingPage = () => {
  return (
    <div className="min-h-screen font-serif">
      <Helmet>
        <title>TuToria</title>
      </Helmet>
      <Navbar />
      <Banner />
      <CountDown />
      <WhyChooseUs />
      <CategorySpotlight />
      <TuitionTypes />
      <ParentConnection />
      <TutorConnection />
      <TutoringWithUs />
      <Reviews />
      <FAQ />
      <Footer />
    </div>
  );
};

export default LandingPage;
