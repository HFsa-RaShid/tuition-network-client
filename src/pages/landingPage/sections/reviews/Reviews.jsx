import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

import toast from "react-hot-toast";
import Swal from "sweetalert2";
import { FaTrash } from "react-icons/fa";
import bgPic from "../../../../assets/bgImage.png";

import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useReviews from "../../../../hooks/useReviews";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";

const Reviews = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { reviews = [], refetch } = useReviews();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  // Limit 200 words
  const handleMessageChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= 200) setMessage(e.target.value);
    else toast.error("Maximum 200 words allowed!");
  };

  // Add review
  const handleSubmit = async () => {
    if (!message.trim()) return toast.error("Write a review!");

    try {
      await axiosSecure.post("/reviews", {
        name: currentUser?.name,
        email: currentUser?.email,
        role: currentUser?.role,
        rating,
        review: message,
        image: currentUser?.photoURL || "https://i.ibb.co/SXLvbnWL/manpp.png",
      });

      toast.success("Review added!");
      setModalOpen(false);
      setMessage("");
      setRating(5);
      refetch();
    } catch (err) {
      toast.error("Failed to submit review");
    }
  };

  // Delete review
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert!",
      icon: "warning",
      showCancelButton: true,
    }).then(async (res) => {
      if (res.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${id}`);
          toast.success("Review deleted");
          refetch();
        } catch (err) {
          toast.error("Server error");
        }
      }
    });
  };

  return (
    <div
      className="py-10 px-4 md:px-10"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.6)),url(${bgPic})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* HEADER */}
      <div className="max-w-4xl mx-auto flex justify-between items-center mb-12">
        <div className="text-center flex-1">
          <h4 className="text-[#DAA520] font-bold">REVIEWS</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            What Students & Tutors Say
          </h2>
        </div>

        <button
          className="btn-primary border-white"
          onClick={() => {
            if (!user) {
              toast.error("Please sign in first!");
              navigate("/signIn");
              return;
            }
            setModalOpen(true);
          }}
        >
          Give Review
        </button>
      </div>

      {/* SWIPER */}
      <Swiper
        effect={"coverflow"}
        grabCursor
        centeredSlides
        loop
        slidesPerView={"auto"}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 180,
          modifier: 2.2,
          slideShadows: false,
        }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="w-full max-w-5xl mx-auto"
      >
        {reviews?.length > 0 &&
          reviews.map((r, i) => (
            <SwiperSlide key={i} className="!w-72 md:!w-80">
              <div
                className="backdrop-blur-md bg-white/30 border border-white/30
               p-6 rounded-3xl shadow-lg h-96 flex flex-col justify-between relative
               transition-transform duration-300 hover:scale-105"
                style={{
                  boxShadow:
                    "0 8px 25px rgba(0,0,0,0.1), inset 0 0 25px rgba(255,255,255,0.15)",
                }}
              >
                {/* ADMIN DELETE */}
                {currentUser?.role === "admin" && (
                  <div
                    className="absolute top-2 right-2 cursor-pointer text-red-500"
                    onClick={() => handleDelete(r._id)}
                  >
                    <FaTrash />
                  </div>
                )}

                {/* IMAGE */}
                <div className="flex justify-center">
                  <img
                    src={r.image}
                    alt={r.name}
                    className="w-20 h-20 rounded-full border-4 border-white shadow-md object-cover"
                  />
                </div>

                {/* TEXT */}
                <p className="text-center text-black italic text-sm px-2 line-clamp-6">
                  “{r.review}”
                </p>

                {/* NAME / ROLE / STARS */}
                <div className="text-center">
                  <h3 className="font-bold text-lg text-white">{r.name}</h3>
                  <p className="text-white">{r.role}</p>

                  <div className="mt-2 text-yellow-400 text-xl">
                    {"★".repeat(r.rating)}
                    <span className="text-gray-800">
                      {"★".repeat(5 - r.rating)}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
      </Swiper>

      {/* MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
            <h3 className="text-xl font-bold mb-3">Write a Review</h3>

            <label className="font-semibold">Rating</label>
            <select
              className="w-full border p-2 rounded mb-4"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
            >
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>
                  {s} ⭐
                </option>
              ))}
            </select>

            <textarea
              className="w-full border p-3 rounded h-28"
              placeholder="Write your experience..."
              value={message}
              onChange={handleMessageChange}
            ></textarea>

            <div className="flex justify-end gap-3 mt-4">
              <button
                className="px-4 py-2 border rounded"
                onClick={() => setModalOpen(false)}
              >
                Close
              </button>
              <button className="btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Reviews;
