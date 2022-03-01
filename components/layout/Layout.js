import Head from "next/head"
import Footer from "./Footer"
import Header from "./Header"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import Search from "../Search";
import { setModalState } from "../../redux/features/modal";

const Layout = ({ children, title = "The best Ecommerce platform" }) => {


    return (
        <div className="">
            <Head>
                <title>{title}</title>
                <meta charSet='utf-8' />
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" />
                <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tw-elements/dist/css/index.min.css" />
                <link rel="stylesheet" href="https://unpkg.com/flowbite@1.3.4/dist/flowbite.min.css" />
                {/* <script src="https://cdn.tailwindcss.com"></script> */}
                
            </Head>
            <div className="font-Poppins bg-[#060404] text-white ">
                <Header />
                <ToastContainer position="bottom-right" />
                {children}
                
            </div>
            
        </div>
    )
}

export default Layout
