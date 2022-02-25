import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import EditIcon from '@mui/icons-material/Edit';

const Profile = () => {
    const [active, setActive] = useState(false)
    const router = useRouter()
    let page;

    const { loading, user, message } = useSelector(state => state.currentUser)

    useEffect(() => {
        page = router.pathname.split('user')[1]
        if (page === '/dashboard') {
            setActive(true)
        }
    }, [])



    return (
        <div className={`${ active && "hidden lg:block"} px-4 py-2 bg-[#060404] w-full z-10`}>
            <div className="lg:ml-5 mt-5 space-y-3 z-40">
                <div className="lg:hidden ">
                    <Link href="/user/dashboard">
                        <a><KeyboardBackspaceIcon /></a>
                    </Link>
                </div>
                <div className="flex flex-col items-center lg:items-start  ">
                    <div className="flex flex-col space-y-3 lg:space-y-0 lg:flex-row lg:items-center lg:space-x-4">
                        <div className=" w-[80px] h-[80px] md:w-[100px] md:h-[100px] relative  rounded-full border-2">
                            <img src={user && user.imageUrl} className="object-cover w-full h-full rounded-full" alt="profile-img" />
                            <div className="absolute bottom-0 flex items-center justify-center right-0 w-[30px] h-[30px] bg-black border py-1 text-sm rounded-full">
                                <EditIcon className="text-sm md:text-base text-center" />
                            </div>
                        </div>
                        <h1 className="uppercase text-sm md:text-base">{user && user.role}</h1>
                    </div>
                </div>
                <div className="!mt-12 max-w-sm mx-auto lg:mx-0 space-y-4 md:space-y-6">
                    <div className="flex justify-between items-center">
                        <div className=" uppercase flex space-x-5 items-center text-base md:text-lg ">
                            <h1>NAME:</h1>
                            <h1>{ user && user.name }</h1>
                        </div>
                        <div className="flex items-center justify-center w-[30px] h-[30px] bg-black border py-1 text-sm rounded-full">
                            <EditIcon className="text-sm md:text-base text-center" />
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <div className="  flex space-x-5 items-center ">
                            <h1 className="uppercase">Email:</h1>
                            <h1>{user && user.email }</h1>
                        </div>
                        <div className="flex items-center justify-center w-[30px] h-[30px] bg-black border py-1 text-sm rounded-full">
                            <EditIcon className="text-sm md:text-base text-center" />
                        </div>
                    </div>
                </div>
                <h1 className=" !mt-12  uppercase text-center">Change Password</h1>
                <div className="!mt-12 flex flex-col md:flex-row md:justify-between md:items-center space-y-3">
                    <div className="flex space-x-2 items-center">
                        <h1 className="hidden sm:block md:text-base">OLD  :</h1>
                        <h1 className="sm:hidden">OLD :</h1>
                        <input type="password" className="!ml-[14px] px-3 py-1 bg-black/60 focus:bg-blue-900 text-white  border border-white focus:outline-none focus:ring-1 focus:ring-white" />
                    </div>
                    <div className="flex space-x-2 items-center">
                        <h1 className="hidden sm:block md:text-base">NEW :</h1>
                        <h1 className="sm:hidden">NEW :</h1>
                        <input type="password" className="!ml-3 px-3 py-1 bg-black/60 focus:bg-blue-900 text-white  border border-white focus:outline-none focus:ring-1 focus:ring-white" />
                    </div>
                </div>

                <div className="flex justify-center !my-12">
                    <button
                        className="text-center text-sm md:text-base font-medium   bg-blue-900 flex items-center justify-center  py-2 px-4 rounded-full">
                    UPDATE PROFILE
                </button>
                </div>
                
            </div>
        </div>
    )
}

export default Profile
