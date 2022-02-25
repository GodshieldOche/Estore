import DasboardLinks from '../DasboardLinks';
import Profile from './Profile';


const ProfileBoard = () => {
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

export default ProfileBoard