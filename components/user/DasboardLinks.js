import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link  from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useEffect } from 'react';
import { signOut } from "next-auth/react"

const DasboardLinks = () => {
    const [hide, setHide] = useState(false)
    const [active, setActive] = useState('')

    const router = useRouter()
    let page
    useEffect(() => {
        setActive(router.pathname.split('user')[1])
        if (router.pathname.split('user')[1] !== '/dashboard') {
            setHide(true)
        }
        
    }, [])

    const logOutHandler = () => {
        signOut()
    }
    
    return (
        <div className={` ${hide && " hidden lg:block"} bg-black/90  w-full  lg:w-[35%] pb-10  lg:border-r flex-col space-y-20  px-2 overflow-hidden`}>
            <div className=" w-full space-y-5">
                <div className="my-6 mb-16">
                    <h1 className="text-xl text-center lg:text-left lg:text-2xl font-light text-white">USER DASHBOARD</h1>
                </div>
                <ul>

                    <li className={`${active === '/profile' ? "lg:!bg-gray-900" : "bg-none"} ${active === '/dashboard' ? "lg:!bg-gray-900" : "bg-none"  } flex justify-between items-center mb-2 hover:border-b lg:hover:border-b-0 border-b-white/30 hover:shadow lg:hover:bg-gray-800`}>
                        <Link href="/user/profile">
                            <a  className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white no-underline">
                                Profile
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:!hidden text-sm" />
                    </li>

                    <li className={`${active === '/orders' ? "lg:!bg-gray-900" : "bg-none" } flex justify-between items-center mb-2 hover:border-b lg:hover:border-b-0 border-b-white/30 hover:shadow lg:hover:bg-gray-800 `}>
                        <Link href="/user/orders">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Orders
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:!hidden text-sm" />
                    </li>
                    <li className="flex justify-between items-center mb-2 hover:border-b lg:hover:border-b-0 border-b-white/30 hover:shadow lg:hover:bg-gray-800">
                        <Link href="/user/inbox">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Inbox
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:!hidden text-sm" />
                    </li>
                    <li className={` ${active === '/reviews' ? "lg:!bg-gray-900" : "bg-none" } flex justify-between items-center mb-2 hover:border-b lg:hover:border-b-0 border-b-white/30 hover:shadow lg:hover:bg-gray-800`}>
                        <Link href="/user/reviews">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Pending Reviews
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:!hidden text-sm" />
                    </li>
                   
                </ul>

               
            </div>
            <div
                onClick={logOutHandler}
                className="px-[95.5px] py-2 bg-red-900 cursor-pointer"
            >
                <h1 className="text-center" >LogOut</h1>
            </div>
        </div>
    )
}

export default DasboardLinks
