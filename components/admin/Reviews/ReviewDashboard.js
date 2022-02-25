import AdminDashLinks from "../AdminDashLinks"
import Reviews from "./Reviews"

const ReviewDashboard = () => {
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
                    <Reviews />
                </div>

            </section>
        </div>
    )
}

export default ReviewDashboard
