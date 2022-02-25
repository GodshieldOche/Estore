import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { getAdminOrders, postDeleteOrder } from "../../../redux/features/adminOrders";


const Orders = () => {

    const [reload, setReload] = useState(false)

    const dispatch = useDispatch()

    const { loading, orders, message } = useSelector(state => state.adminOrders)

    useEffect(() => {
        dispatch(getAdminOrders()).then(result => {
            if (!result.error) {
                // toast.success('working')
            }
        })
    }, [reload])

    const deleteOrderHandler = (id, index) => {
        dispatch(postDeleteOrder({ id, index })).then(result => {
            if (!result.error) {
                setReload(!reload)
                toast.success('Order Deleted')
            }
        })
    }


    return (
        <div className="px-4 py-2 bg-[#060404] h-screen lg:w-full z-10">
            <div className="container flex-col m-5 z-40 space-y-10">

                <div className="flex justify-between items-center">
                    <div>
                        {orders.length === 1 ?
                            <h1 className="text-2xl"> {`${orders.length} Product`} </h1> :
                            <h1 className="text-2xl"> {`${orders.length} Products`} </h1>
                        }
                        
                    </div>
                </div>

                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-black text-white border border-white/30">
                                        <tr className="">
                                            <th scope="col" className="text-sm  font-medium px-6 py-4 text-left border-r border-white/30">
                                                Order ID
                                            </th>
                                            <th scope="col" className="text-sm text-center font-medium px-6 py-4 border-r border-white/30">
                                                No. Of Products
                                            </th>
                                            <th scope="col" className="text-sm  font-medium px-6 py-4 text-left border-r border-white/30">
                                                Paid
                                            </th>
                                            <th scope="col" className="text-sm  font-medium px-6 py-4 text-left border-r border-white/30">
                                                Delivered
                                            </th>
                                            <th scope="col" className="text-sm  font-medium px-6 py-4 text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-black text-white">
                                        {
                                            orders?.map((order, index) => {
                                                return (
                                                    <tr key={order._id} className={` border even:bg-black odd:bg-gray-900 border-white/30 transition duration-300 ease-in-out hover:bg-gray-700
                                            `}>

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r border-white/30">
                                                            {order._id}
                                                        </td>
                                                        <td className="text-sm text-center  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {order?.orderItems?.length}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {order?.isPaid ? "True" : "false"}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {order?.isDelivered ? "True" : "false"}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex justify-between">
                                                                <Link href={`/admin/orders/${order._id}`}>
                                                                    <a >
                                                                        <EditIcon className="text-blue-600" />
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    className=""
                                                                    onClick={() => deleteOrderHandler(order?._id, index)}
                                                                >
                                                                    <DeleteIcon className="text-red-600" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>



            </div>

        </div>
    )
}

export default Orders
