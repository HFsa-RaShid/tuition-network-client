import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";

// Components
import Navbar from "../Shared/Navbar/Navbar";
import Footer from "../Shared/Footer/Footer";

// Utils
import { categoryCatalog } from "../utils/categoryCatalog";

const CategoryExplorer = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(
    categoryCatalog[0]?.id || ""
  );

  const selectedCategory =
    categoryCatalog.find((cat) => cat.id === activeCategory) ||
    categoryCatalog[0];

  return (
    <div className="bg-[#f6f8ff] min-h-screen font-serif">
      <Helmet>
        <title>Categories | TuToria</title>
      </Helmet>
      <Navbar />
      <div className="container mx-auto px-4 md:px-12 pt-28 pb-16 mt-10">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-sm uppercase tracking-widest text-[#5c6ac4]">
            Explore Categories
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">
            Pick a category & dive into the classes
          </h1>
          <p className="text-gray-600 mt-3">
            এক জায়গাতেই দেখুন Bangla Medium, English Version, English Medium ও
            Madrasah সেকশনের পুরো class lineup। আপনার পছন্দের ক্লাস সিলেক্ট করলেই
            বিস্তারিত instruction ও suggested tutor দেখতে পারবেন।
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4 justify-center">
          {categoryCatalog.map((category) => {
            const isActive = category.id === selectedCategory?.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={` transition font-semibold ${
                  isActive
                    ? `btn-primary`
                    : "bg-white px-4 py-1 rounded-lg shadow-md border hover:border-[#5c6ac4]"
                }`}
              >
                {category.name}
                <span className="ml-2 text-sm font-normal opacity-75">
                  ({category.classes.length})
                </span>
              </button>
            );
          })}
        </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {selectedCategory?.classes?.map((cls, idx) => (
                <article
                  key={cls.id}
                  className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden flex flex-col animate-fade-in animate-card-hover"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
              <div className="relative h-48">
                <img
                  src={cls.heroImage}
                  alt={cls.name}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-white/90 text-xs font-semibold px-3 py-1 rounded-full text-gray-700">
                  {selectedCategory?.name}
                </span>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {cls.name}
                  </h3>
                  <div className="text-xs uppercase tracking-wide text-[#5c6ac4] bg-[#eef0ff] px-3 py-1 rounded-full">
                    {cls.subjects.length} Subjects
                  </div>
                </div>
                <p className="text-gray-600 mt-3 flex-1 leading-relaxed">
                  {cls.shortDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {cls.subjects.slice(0, 4).map((subject) => (
                    <span
                      key={subject}
                      className="text-xs font-medium px-3 py-1 bg-[#f6f8ff] rounded-full text-gray-600"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() =>
                    navigate(`/categories/${selectedCategory.id}/${cls.id}`)
                  }
                  className="mt-6 inline-flex items-center justify-center btn-primary"
                >
                  Explore {cls.name}
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CategoryExplorer;

