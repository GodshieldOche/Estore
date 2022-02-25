import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import EditIcon from '@mui/icons-material/Edit';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getCurrentUserOrders } from '../../../redux/features/userOrders';


const Order = () => {

    const dispatch = useDispatch()

    const { loading, orders, message } = useSelector(state => state.userOrders)

    useEffect(() => {
        dispatch(getCurrentUserOrders())
    }, [dispatch])


    return (
        <div className=" bg-black rounded-lg w-full mb-10 z-10">
            <div className="space-y-3 z-40">
                <div className="lg:hidden ">
                    <Link href="/user/dashboard">
                        <a><KeyboardBackspaceIcon /></a>
                    </Link>
                </div>


                <div>
                    {orders.length === 1 ?
                        <h1 className="font-light  text-base md:text-lg tracking-wide mb-3">{`${orders.length} Order`}</h1> :
                        <h1 className="font-light  text-base md:text-lg tracking-wide mb-3">{`${orders.length} Orders`}</h1>
                        }
                    <div className="flex flex-col justify-center  space-y-5">

                        {loading ? <h1>Loading...</h1> : 
                            orders?.length ? orders?.map(order => (
                                <div key={order._id} className="grid grid-cols-12 bg-gray-900 items-start gap-1 p-2 border border-white/20">
                                    <div className="col-span-10">
                                        <div className="flex flex-col justify-items-stretch space-y-2 md:space-y-3">
                                            <h1 className="font-light text-xs md:text-base tracking-wide text-white/80">{`OrderID: ${order._id}`}</h1>
                                            <div className="flex space-x-5 items-center">
                                                <h1 className="font-light  text-xs md:text-base tracking-wide text-white/80">Paid:</h1>
                                                {order?.isPaid ? 
                                                    <h1 className="font-light text-[10px] md:text-xs rounded-full px-2 bg-green-500 tracking-wide ">
                                                        {order?.paidAt.substr(0, 10)}
                                                    </h1> :
                                                    <h1 className="font-light text-[10px] md:text-xs rounded-full  px-2 bg-red-500 tracking-wide ">false</h1>
                                                }
                                                
                                            </div>
                                            <div className="flex space-x-5 items-center">
                                                <h1 className="font-light  text-sm md:text-base tracking-wide text-white/80">Delivered:</h1>
                                                {order?.isDelivered ?
                                                    <h1 className="font-light text-[10px] md:text-xs rounded-full px-2 bg-green-500 tracking-wide ">
                                                        {order?.deliveredAt.substr(0, 10)}
                                                    </h1> :
                                                    <h1 className="font-light text-[10px] md:text-xs rounded-full  px-2 bg-red-500 tracking-wide ">false</h1>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-span-2">
                                        <Link href={`/order/${order._id}`}>
                                            <a>
                                                <h1 className="font-light text-xs !text-right  md:text-sm text-white/80 cursor-pointer">Details</h1>
                                            </a>
                                        </Link>
                                        
                                    </div>
                                </div>
                            )) :
                                <h1>No Order Yet</h1>
                        }

                        



                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default Order
