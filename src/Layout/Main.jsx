import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer/Footer";
import Navbar from "../pages/Shared/Navbar/Navbar";

const Main = () => {
    const location = useLocation();
    const noHeaderFooter = location.pathname.includes('login');
    const noHeaderFooterSignUp = location.pathname.includes('signup')
    return (
        <div>
            { noHeaderFooter || noHeaderFooterSignUp || <Navbar></Navbar>}
            <Outlet></Outlet>
            { noHeaderFooter || noHeaderFooterSignUp || <Footer></Footer>}
            
        </div>
    );
};

export default Main;