import React from "react";
import faq from "../../../../assets/faq.png";

const FAQ = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-center container mx-auto pt-16 md:pt-20 pb-10 gap-10 md:gap-16 lg:gap-20 px-6 md:px-10 lg:px-20">
      {/* Left Side Image */}
      <div className="w-full lg:w-1/2 flex justify-center mb-8 lg:mb-0">
        <img src={faq} alt="FAQ illustration" className="h-48 sm:h-72 md:h-[420px] lg:h-[480px] object-contain" />
      </div>

      {/* Right Side FAQ */}
      <div className="w-full lg:w-1/2">
        {/* Heading */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-[#1E293B]">Frequently Asked Questions</h1>
          <p className="text-gray-500 font-medium pt-4">
            Here are some common questions students and tutors ask about Tutoria.  
            Hopefully these will clear your confusion!
          </p>
        </div>

        {/* Accordion */}
        <div className="join join-vertical w-full">
          {/* Q1 */}
          <div className="collapse collapse-arrow join-item border border-t-[#DAA520]">
            <input type="radio" name="faq-accordion" defaultChecked />
            <div className="collapse-title text-lg font-semibold">
              How does Tutoria connect students with tutors?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Students can post their learning requirements and tutors can apply for those requests. 
                Once a student confirms, the tutor is connected instantly.  
              </p>
            </div>
          </div>

          {/* Q2 */}
          <div className="collapse collapse-arrow join-item border border-t-[#DAA520]">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              Is Tutoria free to use?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Yes! Creating an account and browsing tutors/students is completely free. 
                Some premium features may require a subscription.  
              </p>
            </div>
          </div>

          {/* Q3 */}
          <div className="collapse collapse-arrow join-item border border-t-[#DAA520]">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              How do I become a tutor on Tutoria?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Simply sign up as a tutor, complete your profile with details like education, expertise, and availability, 
                and apply or wait for student requests.  
              </p>
            </div>
          </div>

          {/* Q4 */}
          <div className="collapse collapse-arrow join-item border border-t-[#DAA520]">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              Can I schedule classes through Tutoria?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Absolutely! Tutors and students can mutually decide on timing, 
                and even set recurring schedules to make learning consistent.  
              </p>
            </div>
          </div>

          {/* Q5 */}
          <div className="collapse collapse-arrow join-item border border-t-[#DAA520] border-b-[#DAA520]">
            <input type="radio" name="faq-accordion" />
            <div className="collapse-title text-lg font-semibold">
              What subjects are available on Tutoria?
            </div>
            <div className="collapse-content">
              <p className="text-gray-600">
                Tutoria covers a wide range of subjects including school-level courses, 
                university subjects, test preparation, and even skill-based learning like coding, music, and languages.  
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
