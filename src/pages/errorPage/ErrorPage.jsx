import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";



const ErrorPage = () => {
    
    return (
        
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <Helmet>
                <title>Error_Page | EduConnect</title>
            </Helmet>
            <img src="https://i.ibb.co/ZBHNt5B/2658093.webp"  />
            <p className="text-lg text-gray-600 mb-6 ">
                The page you are looking for does not exist.
            </p>
            <Link to="/" className="btn btn-outline border-0 border-b-4 border-t-2 border-black  px-8  font-bold my-4">
                Go Back to Home
            </Link>
        </div>

    );
};

export default ErrorPage;