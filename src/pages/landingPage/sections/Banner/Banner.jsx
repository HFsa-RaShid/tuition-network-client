import React from "react";
import { NavLink } from "react-router-dom";

const Banner = () => {
  return (
    <div className="h-[480px] bg-white py-16">
      <div className="container mx-auto">
        <div className="flex gap-10 justify-between">
          <div className="w-[45%]">
            <p className="text-[#f3c03e] font-bold">
              100% SATISFACTION GUARANTEE
            </p>
            <div className="my-4 font-bold">
              <h1 className="text-5xl">Find Your</h1>
              <h1 className="text-5xl py-4">
                Perfect{" "}
                <span className="inline-flex items-center relative">
                  Tutor
                  <span className="absolute bottom-0 top-6 left-0 w-full">
                    <svg
                      width="120"
                      height="57"
                      viewBox="0 0 513 57"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                    <path
                      d="M8 49C85.2556 24.5985 292.813 -14.4606 505 24.5152"
                      stroke="#F9D045"
                      stroke-width="16"
                      stroke-linecap="round"
                    />
                  </svg>
                  </span>
                </span>
              </h1>
            </div>

            <p className="text-[#4a4a4a] font-semibold">
              Personalized one-on-one instruction tailored to your needs,
              delivered by a highly qualified instructor of your choice.
              Sessions can be conducted online or in person.
            </p>
            <div className="mt-8 font-semibold">
              <NavLink>
                <button className="bg-[#f9d045] py-3 px-6 rounded-3xl">
                  Get Started
                </button>
              </NavLink>
            </div>
          </div>
          <div className="w-[55%]">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quae
              quos nobis sed aliquid aperiam dolores saepe magnam ex et
              perspiciatis modi commodi nulla vel cupiditate ducimus vero velit
              dolorem molestias, adipisci reprehenderit! Adipisci ipsum, unde
              voluptatem at cupiditate expedita in pariatur illum ex
              voluptatibus, iusto laboriosam ut minus veritatis aliquid dolore
              reiciendis architecto nemo, nisi amet? Odio exercitationem rem
              corporis itaque ipsam, perspiciatis temporibus, nam adipisci
              numquam, iste quis laudantium tenetur nisi vitae. Molestiae
              suscipit temporibus non itaque quo optio dolore ut velit ipsam
              officiis animi id omnis error, tempora sint. Consectetur,
              aspernatur quod aut dolorum delectus blanditiis et optio.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
