import React, { useMemo } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIosNew, MdVerified } from "react-icons/md";

// Components
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";
import SuggestedTutorsCarousel from "./SuggestedTutorsCarousel";

// Utils
import {
  categoryCatalog,
  getCategoryById,
  getClassById,
  getClassDetail,
} from "../utils/categoryCatalog";

const ClassDetails = () => {
  const { categoryId, classId } = useParams();
  const navigate = useNavigate();

  const category = getCategoryById(categoryId) || categoryCatalog[0];
  const classMeta = getClassById(category, classId) || category?.classes?.[0];
  const detail = getClassDetail(classId, classMeta);

  const heroImage = classMeta?.heroImage || detail.heroImage;
  const guardianHighlights = useMemo(
    () => [
      {
        title: "Filter & Browse",
        body: "জেলা, মাধ্যম, ক্লাস ও টিউশন টাইপ ফিল্টার ব্যবহার করে পছন্দের তালিকা তৈরি করুন।",
      },
      {
        title: "Verified Tutor Profiles",
        body: "প্রতিটি প্রোফাইলে badge, institute, preferred class ও লোকেশন দেখা যায়।",
      },
      {
        title: "Suggested Tutors Slider",
        body: "এই ক্লাসের জন্য প্রাসঙ্গিক টিউটর কার্ড সরাসরি এই পেজ থেকেই দেখা যায়।",
      },
    ],
    []
  );

  return (
    <div className="bg-[#f6f8ff] font-serif min-h-screen">
      <Helmet>
        <title>{classMeta?.name || "Class"} | TuToria</title>
      </Helmet>
      <Navbar />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 md:px-12">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6"
          >
            <MdOutlineArrowBackIosNew /> Go Back
          </button>
        </div>

        <div className="container mx-auto px-0 md:px-12">
          <section className="relative rounded-[32px] overflow-hidden mx-4 md:mx-0 min-h-[420px]">
            <img
              src={heroImage}
              alt={classMeta?.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>
            <div className="relative z-10 text-white p-8 lg:p-14 flex flex-col gap-6 h-full justify-between">
              <div className="space-y-4 max-w-3xl">
                <p className="text-xs uppercase tracking-[0.4em]">
                  {category?.name}
                </p>
                <h1 className="text-4xl lg:text-5xl font-bold">
                  {classMeta?.name} Tuition Program
                </h1>
                <p className="text-lg text-white/80">{category?.description}</p>
                <ul className="grid sm:grid-cols-2 gap-3 mt-4">
                  {detail.learningList.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm lg:text-base"
                    >
                      <span className="text-[#90ffb2] mt-1">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex gap-4 flex-wrap">
                <button
                  onClick={() =>
                    navigate("/tutors", {
                      state: { className: classMeta?.name, district: "" },
                    })
                  }
                  className="btn-primary"
                >
                  Hire A Tutor
                </button>
                <button className="px-6 py-3 rounded-full border border-white text-white font-semibold hover:bg-white/10 transition">
                  Share
                </button>
              </div>
            </div>
          </section>

              <section className="mt-10 grid lg:grid-cols-3 gap-6">
                <article className="lg:col-span-2 bg-white rounded-[28px] p-8 shadow-sm animate-slide-up">
              <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
                About This Category
              </p>
              <h2 className="text-3xl font-semibold text-gray-900 mt-3">
                {detail.aboutBlocks[0].title}
              </h2>
              <p className="text-gray-600 mt-4 leading-relaxed">
                {detail.aboutBlocks[0].description}
              </p>
              <p className="text-gray-700 mt-4 font-medium">
                {detail.aboutBlocks[0].footer}
              </p>
              <div className="grid md:grid-cols-3 gap-4 mt-8">
                {guardianHighlights.map((highlight) => (
                  <div
                    key={highlight.title}
                    className="border border-gray-100 rounded-2xl p-4 bg-gray-100/90"
                  >
                    <h4 className="font-semibold text-gray-900">
                      {highlight.title}
                    </h4>
                    <p className="text-sm text-gray-600 mt-2">
                      {highlight.body}
                    </p>
                  </div>
                ))}
              </div>
            </article>
                <article className="bg-white rounded-[28px] p-8 shadow-sm animate-scale-in">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {detail.aboutBlocks[1].title}
                  </h3>
              <ul className="space-y-3 mt-4">
                {detail.aboutBlocks[1].checklist.map((single) => (
                  <li key={single} className="flex items-start gap-3">
                    <span className="text-green-500 mt-1">▣</span>
                    <p className="text-gray-700">{single}</p>
                  </li>
                ))}
              </ul>
              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p>
                  📍 Dhaka, Chattogram, Sylhet, Rajshahi & nationwide online
                </p>
                <p>⏱️ 60-90 মিনিট লাইভ সেশন ও অন-ডিমান্ড doubt clearing</p>
              </div>
            </article>
          </section>

          <section className="mt-10">
            <div className="grid md:grid-cols-2 gap-6">
              {detail.supportSummary.map((paragraph, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-[28px] p-8 shadow-sm text-gray-700 leading-relaxed"
                >
                  {paragraph}
                </div>
              ))}
            </div>
            <div className="mt-6 bg-[#111827] text-white rounded-[28px] p-8">
              <h3 className="text-2xl font-semibold">
                Why parents love this stream
              </h3>
              <ul className="grid sm:grid-cols-3 gap-4 mt-4 text-sm">
                {detail.opportunityList.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <MdVerified className="text-blue-400 mt-1" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </div>

        <div className="container mx-auto px-4 md:px-12">
          <SuggestedTutorsCarousel
            targetClass={classMeta?.name}
            categoryName={category?.name}
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ClassDetails;
