import DasboardLinks from "../DasboardLinks"
import Order from "./Order"

const OrderBaord = () => {
    return (
        <div className=" mt-20 font-Poppins  bg-[#060404] text-white">
            <section className="container">
                <div className="flex lg:space-x-5 bg-[#060404]">
                    {/* dashboard links */}
                    <DasboardLinks />
                    {/* dashboard item */}
                    <Order />
                </div>

            </section>
        </div>
    )
}

export default OrderBaord
