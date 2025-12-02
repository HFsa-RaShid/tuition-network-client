import React from "react";
import { Link } from "react-router-dom";
import { categoryCatalog } from "../../../utils/categoryCatalog";


const spotlightCategory = categoryCatalog[0];
const spotlightClass = spotlightCategory?.classes?.find(
  (cls) => cls.id === "class-9"
);

const CategorySpotlight = () => {
  if (!spotlightCategory || !spotlightClass) {
    return null;
  }

  return (
    <section className="bg-gray-100/90 py-16">
      <div className="container mx-auto px-4 md:px-16">
        <div className="flex items-center justify-between mb-10 flex-wrap gap-4">
          <div>
            <p className="text-sm tracking-wide uppercase text-[#DAA520] font-bold">
              Category Spotlight
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Class 9 Tuition Terminal Experience
            </h2>
            <p className="text-gray-600 mt-2 max-w-3xl">
              বিজ্ঞান, বাণিজ্য কিংবা মানবিক—যে কোন গ্রুপের শিক্ষার্থী/অভিভাবক এখানে
              এসে verified tutor ব্রাউজ ও ফিল্টার করতে পারেন। Class details এবং
              Suggested Tutors সেকশন থেকে পছন্দের শিক্ষক নির্বাচন করুন।
            </p>
          </div>
          <Link
            to="/categories"
            className="btn-primary"
          >
            See More
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch">
          <div className="relative rounded-xl overflow-hidden min-h-[360px]">
            <img
              src={spotlightClass.heroImage}
              alt={spotlightClass.name}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"></div>
            <div className="relative z-10 text-white p-10 h-full flex flex-col justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.3em]">Class 9</p>
                <h3 className="text-4xl font-extrabold mt-3">
                  What you will learn
                </h3>
                <ul className="mt-6 space-y-2 text-lg leading-relaxed">
                  {spotlightClass.subjects.slice(0, 6).map((subject) => (
                    <li key={subject} className="flex items-center gap-2">
                      <span>✓</span>
                      {subject}
                    </li>
                  ))}
                  <li className="text-sm text-white/70">
                    + Economics, Accounting, History of A Nation, Geography &
                    more
                  </li>
                </ul>
              </div>
              <div className="flex flex-wrap gap-4 mt-3">
                <Link
                  to={`/categories/${spotlightCategory.id}/${spotlightClass.id}`}
                  className="btn-primary"
                >
                  Hire A Tutor
                </Link>
                <Link
                  to="/tutors"
                  state={{ className: spotlightClass.name }}
                  className="px-6 py-1 border border-white rounded-xl font-semibold hover:bg-white/10 transition"
                >
                  See Tutors
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-lg flex flex-col gap-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">
                About This Category
              </h3>
              <p className="text-gray-600 mt-3 leading-relaxed">
                নবম ও দশম শ্রেণির জন্য ক্লাস তথ্য, বিষয়ের তালিকা ও টিউটর কার্ড এক জায়গায় দেখা যায়।
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-2xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  কেন Tuition Terminal?
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  verified tutor প্রোফাইল, ফিল্টার এবং Hire বোতাম একই জায়গায় থাকায় সিদ্ধান্ত নেওয়া সহজ।
                </p>
                <div className="mt-4 text-sm font-semibold text-[#5c6ac4]">
                  সর্বোচ্চ ৯৮% সন্তুষ্টি
                </div>
              </div>
              <div className="border border-gray-200 rounded-2xl p-5">
                <h4 className="font-semibold text-gray-900 mb-2">
                  সাপোর্ট যা পাবেন
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  {[
                    "Verified tutor badge",
                    "Class/City filter",
                    "Suggested Tutors slider",
                    "See ও Hire বোতাম",
                  ].map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="text-green-500">▣</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="px-4 py-2 bg-[#f6f8ff] rounded-full">
                Science & Commerce batch ready
              </div>
              <div className="px-4 py-2 bg-[#f6f8ff] rounded-full">
                Verified tutor profiles
              </div>
              <div className="px-4 py-2 bg-[#f6f8ff] rounded-full">
                Suggested Tutors Slider
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySpotlight;

