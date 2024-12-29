import React from "react";
import faq from "../../../../assets/faq.png";
const FAQ = () => {
  return (
      <div className="flex justify-between container mx-auto pt-20 pb-4 gap-20 px-20">
        <div className="w-[50%]">
          <img src={faq} className="h-[550px]"></img>
        </div>
        <div className="w-[50%]">
          <div className=" mb-6">
            <h1 className="text-4xl font-bold">Frequently Asked Questions</h1>
            <p className="text-gray-500 font-semibold pt-4">
              You might be having these questions too. These FAQs will get rid
              of your confusion.
            </p>
          </div>
          <div className="join join-vertical w-full">
            <div className="collapse collapse-arrow col join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" defaultChecked />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            <div className="collapse collapse-arrow join-item border-base-300 border">
              <input type="radio" name="my-accordion-4" />
              <div className="collapse-title text-xl font-medium">
                Click to open this one and close others
              </div>
              <div className="collapse-content">
                <p>hello</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>
  );
};

export default FAQ;
