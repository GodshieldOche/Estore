
import AdminDashLinks from "../AdminDashLinks"
import Products from "./Products"

const ProductDashboard = () => {
    return (
        <div className=" mt-20 font-Poppins  bg-[#060404] text-white">

            <section className="container">
                <div className=" lg:hidden flex justify-center  mt-44 ">
                    <h1> USE DESKTOP TO OPERATE AS AN ADMIN</h1>
                </div>
                <div className="hidden lg:flex bg-[#060404]">
                    {/* AdminDashBoard links */}
                    <AdminDashLinks />
                    {/* dashboard item */}
                    <Products />
                </div>

            </section>
        </div>
    )
}

export default ProductDashboard
