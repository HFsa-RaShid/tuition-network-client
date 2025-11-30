import React, { useContext, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";
import { FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// Context & Hooks
import { AuthContext } from "../../../../provider/AuthProvider";
import useCurrentUser from "../../../../hooks/useCurrentUser";
import useReviews from "../../../../hooks/useReviews";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Reviews = () => {
  const { user } = useContext(AuthContext);
  const { currentUser } = useCurrentUser(user?.email);
  const { reviews, refetch } = useReviews();
  const axiosSecure = useAxiosSecure();

  const [modalOpen, setModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");

  // Limit review to 200 words
  const handleMessageChange = (e) => {
    const words = e.target.value.split(/\s+/);
    if (words.length <= 200) setMessage(e.target.value);
    else toast.error("Maximum 200 words allowed!");
  };

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
      console.log(err);
      toast.error("Failed to submit review");
    }
  };

  const handleDelete = (reviewId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axiosSecure.delete(`/reviews/${reviewId}`);
          toast.success("Review deleted successfully");
          refetch();
        } catch (err) {
          Swal.fire("Error", "Server error. Try again.", "error");
        }
      }
    });
  };

  // Render rating stars
  const renderStars = (num) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-xl ${
            i <= num ? "text-yellow-400" : "text-gray-300"
          }`}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="bg-white py-16 px-4 md:px-20 ">
      <div className="container mx-auto">
        {/* Header + Button */}
        <div className="flex justify-between items-center mb-12 max-w-3xl mx-auto">
          <div className="text-center flex-1">
            <h4 className="text-[#DAA520] font-bold">REVIEWS</h4>
            <h2 className="text-3xl md:text-4xl font-bold text-black">
              What Students & Tutors Say
            </h2>
          </div>
          <button
            className="btn-primary ml-4"
            onClick={() => setModalOpen(true)}
          >
            Give Review
          </button>
        </div>

        {/* Swiper Slider */}
        {reviews.length > 0 && (
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 2.5,
            }}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[EffectCoverflow, Pagination, Autoplay]}
            className="mySwiper"
          >
            {reviews.map((review, idx) => (
              <SwiperSlide key={idx} className="w-72 md:w-80 relative">
                <div className="p-6 bg-gradient-to-br from-[#FFF3CD] to-[#FBE9A6] rounded-3xl shadow-xl h-80 flex flex-col justify-between relative">
                  {/* Admin delete button */}
                  {currentUser?.role === "admin" && (
                    <div
                      className="absolute top-2 right-2 cursor-pointer text-red-500"
                      onClick={() => handleDelete(review._id)}
                    >
                      <FaTrash />
                    </div>
                  )}

                  {/* User Image */}
                  {review.image && (
                    <div className="flex justify-center ">
                      <img
                        src={review.image}
                        alt={review.name}
                        className="w-16 h-16 rounded-full border-2 border-[#DAA520] object-cover"
                      />
                    </div>
                  )}

                  {/* Review Text */}
                  <p
                    className="text-gray-800 italic mb-4 break-words overflow-hidden text-sm"
                    style={{
                      display: "-webkit-box",
                      WebkitLineClamp: 10,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    “{review.review}”
                  </p>

                  {/* Name + Role + Stars */}
                  <div className="text-center">
                    <h3 className="font-bold text-md text-gray-900">
                      {review.name}
                    </h3>
                    <p className="text-gray-600 text-sm">{review.role}</p>
                    <div className="mt-1">{renderStars(review.rating)}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Review Modal */}
        <dialog className={`modal ${modalOpen ? "modal-open" : ""}`}>
          <div className="modal-box">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>

            <label className="font-semibold">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="select select-bordered w-full mb-4"
            >
              {[1, 2, 3, 4, 5].map((r) => (
                <option key={r} value={r}>
                  {r} ⭐
                </option>
              ))}
            </select>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write your experience..."
              value={message}
              onChange={handleMessageChange}
            ></textarea>

            <div className="modal-action">
              <button className="btn" onClick={() => setModalOpen(false)}>
                Close
              </button>
              <button className="btn btn-primary" onClick={handleSubmit}>
                Submit
              </button>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default Reviews;
