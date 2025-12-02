import { NavLink } from "react-router-dom";
import { FaFacebookF, FaTwitter, FaYoutube } from "react-icons/fa";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <footer
      className="bg-white text-gray-700 px-4 sm:px-8 md:px-10 pt-10 pb-6 
                   rounded-t-2xl border-t-2 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]"
    >
      <div className="container mx-auto">
        {/* GRID LAYOUT */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-6 text-center sm:text-left">
          {/* Logo Section */}
          <div className="flex flex-col items-center sm:items-start space-y-4">
            <img src={logo} alt="logo" className="h-14" />
            <h1 className="text-3xl font-bold">
              Tu
              <span className="bg-gradient-to-r from-blue-300 to-blue-800 bg-clip-text text-transparent">
                T
              </span>
              oria
            </h1>
          </div>

          {/* Company Links */}
          <nav className="flex flex-col space-y-2 items-center sm:items-start">
            <h6 className="footer-title font-semibold text-lg mb-2">Company</h6>
            <NavLink to="/about-us" className="hover:text-blue-600">
              About us
            </NavLink>
            <NavLink to="/contact-us" className="hover:text-blue-600">
              Contact us
            </NavLink>
            <NavLink to="/press-kit" className="hover:text-blue-600">
              Press kit
            </NavLink>
            
          </nav>

          {/* Legal Links */}
          <nav className="flex flex-col space-y-2 items-center sm:items-start">
            <h6 className="footer-title font-semibold text-lg mb-2">Legal</h6>
            <NavLink to="/terms-of-use" className="hover:text-blue-600">
              Terms of use
            </NavLink>
            <NavLink to="/privacy-policy" className="hover:text-blue-600">
              Privacy policy
            </NavLink>
            <NavLink to="/cookie-policy" className="hover:text-blue-600">
              Cookie policy
            </NavLink>
          </nav>

          {/* Newsletter */}
          <form className="flex flex-col items-center sm:items-start">
            <h6 className="footer-title font-semibold text-lg mb-3">
              Newsletter
            </h6>

            <fieldset className="form-control w-full">
              <div className="flex flex-col sm:flex-row w-full">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="border w-full rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button className="bg-blue-300 px-4 py-2 font-semibold rounded-r-md hover:bg-blue-400">
                  Subscribe
                </button>
              </div>
            </fieldset>

            {/* Icons */}
            <div className="mt-5 flex space-x-5 justify-center sm:justify-start">
              <a
                href="#"
                className="text-[#123d7e] text-2xl hover:text-blue-600 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-[#1DA1F2] text-2xl hover:text-blue-400 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-red-500 text-2xl hover:text-red-600 transition"
              >
                <FaYoutube />
              </a>
            </div>
          </form>
        </div>

        <hr />

        {/* Bottom */}
        <div className="text-center pt-6 text-gray-500 text-sm">
          <p>
            Copyright © {new Date().getFullYear()} - All rights reserved by
            <span className="font-semibold"> TuToria Ltd</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
