import DasboardLinks from "../DasboardLinks"
import Reviews from "./Reviews"

const ReviewBoard = () => {
    return (
        <div className=" mt-20 font-Poppins  bg-[#060404] text-white">
            <section className="container">
                <div className="flex lg:space-x-5 bg-[#060404]">
                    {/* dashboard links */}
                    <DasboardLinks />
                    {/* dashboard item */}
                    <Reviews />
                </div>

            </section>
        </div>
    )
}

export default ReviewBoard
