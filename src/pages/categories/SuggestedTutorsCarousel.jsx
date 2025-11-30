import React, { useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdLocationOn,
  MdOutlineNavigateBefore,
  MdOutlineNavigateNext,
  MdVerified,
} from "react-icons/md";

// Hooks
import useAllTutors from "../../hooks/useAllTutors";

const SuggestedTutorsCarousel = ({ targetClass, categoryName }) => {
  const { allTutors, isLoading } = useAllTutors();
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const filteredTutors = useMemo(() => {
    if (!allTutors || allTutors.length === 0) return [];
    const classToken = targetClass?.toLowerCase();
    const categoryToken = categoryName?.toLowerCase();

    return allTutors
      .filter((tutor) => {
        const classes = tutor.preferredClass
          ? tutor.preferredClass
              .toLowerCase()
              .split(",")
              .map((item) => item.trim())
          : [];

        const categories = tutor.preferredCategories
          ? tutor.preferredCategories
              .toLowerCase()
              .split(",")
              .map((item) => item.trim())
          : [];

        const classMatch = classToken
          ? classes.some((cls) => cls.includes(classToken))
          : false;
        const categoryMatch = categoryToken
          ? categories.some((cat) => cat.includes(categoryToken))
          : true;

        return classMatch && categoryMatch;
      })
      .sort((a, b) => (b.averageRating || 0) - (a.averageRating || 0))
      .slice(0, 12);
  }, [allTutors, targetClass, categoryName]);

  const handleScroll = (direction) => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({
      left: direction * 320,
      behavior: "smooth",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="w-10 h-10 border-4 border-dashed border-[#5c6ac4] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (filteredTutors.length === 0) {
    return (
      <section className="bg-white rounded-[32px] p-8 mt-10 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Suggested Tutors For This Category
            </h3>
            <p className="text-gray-600">
              আপাতত এই ক্লাসের verified tutor লিস্ট খালি আছে। নতুন tutor onboard
              হলে আপনি notification পাবেন।
            </p>
          </div>
          <button
            onClick={() =>
              navigate("/tutors", {
                state: { className: targetClass },
              })
            }
            className="btn-primary"
          >
            See All Tutors
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white rounded-[32px] p-8 mt-10 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-gray-400">
            Suggested Tutors
          </p>
          <h3 className="text-2xl font-semibold text-gray-900">
            Suggested Tutors For This Category
          </h3>
          <p className="text-gray-600">
            বিশেষজ্ঞ শিক্ষক যারা {targetClass} পড়াতে আগ্রহী ও verified badge
            পেয়েছেন।
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => handleScroll(-1)}
            className="p-3 rounded-full border border-gray-200 hover:border-[#5c6ac4] text-gray-600"
          >
            <MdOutlineNavigateBefore />
          </button>
          <button
            onClick={() => handleScroll(1)}
            className="p-3 rounded-full border border-gray-200 hover:border-[#5c6ac4] text-gray-600"
          >
            <MdOutlineNavigateNext />
          </button>
          <button
            onClick={() =>
              navigate("/tutors", {
                state: { className: targetClass },
              })
            }
            className="btn-primary"
          >
            See All
          </button>
        </div>
      </div>

      <div
        className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory"
        ref={sliderRef}
      >
        {filteredTutors.map((tutor) => {
          const profileId = tutor?.customId;
          return (
            <article
              key={tutor._id}
              className="min-w-[260px] max-w-[260px] bg-gray-100/90 border border-white rounded-3xl p-5 flex flex-col gap-3 snap-start"
            >
              <div className="flex items-center gap-3">
                <img
                  src={
                    tutor.photoURL ||
                    "https://i.ibb.co/7n4R8Rt/default-avatar.png"
                  }
                  alt={tutor.name}
                  className="w-14 h-14 rounded-2xl object-cover bg-white"
                  loading="lazy"
                />
                <div>
                  <h4 className="font-semibold text-gray-900 flex items-center gap-1">
                    {tutor.name}
                    {tutor.verificationStatus === "approved" && (
                      <MdVerified className="text-blue-500" />
                    )}
                  </h4>
                  <p className="text-xs text-gray-500">
                    {tutor.institute || tutor.education || "Experienced tutor"}
                  </p>
                </div>
              </div>
              <div className="flex items-center text-xs text-gray-600 gap-1">
                <MdLocationOn className="text-[#5c6ac4]" />
                {tutor.city || "Anywhere"}
              </div>
              <div className="flex flex-wrap gap-2 text-[11px] text-gray-600">
                {(tutor.preferredClass || "")
                  .split(",")
                  .slice(0, 3)
                  .map((cls) => (
                    <span
                      key={cls}
                      className="px-2 py-1 bg-white rounded-full border border-gray-200"
                    >
                      {cls.trim()}
                    </span>
                  ))}
              </div>
              {profileId ? (
                <button
                  onClick={() => navigate(`/tutors/tutor-profile/${profileId}`)}
                  className="mt-2 w-full btn-primary"
                >
                  See
                </button>
              ) : (
                <span className="mt-2 text-xs text-gray-400 text-center">
                  Profile unavailable
                </span>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default SuggestedTutorsCarousel;
