import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState } from 'react';
import { useEffect } from 'react';

const AdminDashLinks = () => {
    const [active, setActive] = useState('')

    const router = useRouter()
    useEffect(() => {
        setActive(router.pathname.split('admin')[1])

    }, [])

    return (
        <div className={`h-screen bg-[#060404] w-full  xl:w-1/4 lg:w-1/2 lg:border-r flex-col space-y-20  overflow-hidden`}>
            <div className=" w-full space-y-5">
                <div className="my-6 mb-16">
                    <h1 className="text-xl text-center lg:text-left lg:text-2xl font-light text-white">ADMIN DASHBOARD</h1>
                </div>
                <ul>

                    <li className={`${active === '/products' ? "lg:!bg-gray-900" : "bg-none"} flex justify-between items-center mb-2  hover:border-b-0 hover:shadow hover:bg-gray-800 `}>
                        <Link href="/admin/products">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white no-underline">
                                Products
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:hidden text-sm" />
                    </li>
                    <li className={`${active === '/users' ? "lg:!bg-gray-900" : "bg-none"}  flex justify-between items-center mb-2  hover:shadow hover:bg-gray-800 `}>
                        <Link href="/admin/users">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Users
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:hidden text-sm" />
                    </li>
                    <li className={` ${active === '/orders' ? "lg:!bg-gray-900" : "bg-none"} flex justify-between items-center mb-2  hover:shadow hover:bg-gray-800`}>
                        <Link href="/admin/orders">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Orders
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:hidden text-sm" />
                    </li>
                    <li className="flex justify-between items-center mb-2 hover:shadow hover:bg-gray-800">
                        <Link href="/admin/reviews">
                            <a className="inline-block w-full h-full text-lg tracking-wide px-3 py-2 font-light text-white">
                                Reviews
                            </a>
                        </Link>
                        <ArrowForwardIosIcon className="lg:hidden text-sm" />
                    </li>

                </ul>


            </div>
        </div>
    )
}

export default AdminDashLinks
