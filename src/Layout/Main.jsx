import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('signIn');
    const noHeaderFooterSignUp = location.pathname.includes('signUp')
    return (
        <div>
       
            <Outlet></Outlet>
 
            
            
        </div>
    );
};

export default Main;


