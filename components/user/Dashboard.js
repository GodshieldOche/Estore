import Profile from './Profile/Profile'
import DasboardLinks from './DasboardLinks';

const Dashboard = () => {
    return (
        <div className=" mt-20 font-Poppins  bg-[#060404] text-white">
            <section className="container">
                <div className="flex bg-[#060404]">
                    {/* dashboard links */}
                    <DasboardLinks />
                    {/* dashboard item */}
                    <Profile />
                </div>

            </section>
        </div>
    )
}

export default Dashboard