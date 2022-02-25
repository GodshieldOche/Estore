import Link from "next/link"
import CheckOutSteps from "../cart/CheckOutSteps"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { postOrder, postUpdatePaid } from "../../redux/features/order";
import { useRouter } from "next/router";
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'
import { postPayStack, verifyPayment } from "../../redux/features/pay";

const Pay = () => {

    const { loading, order, message } = useSelector(state => state.order)
    const dispatch = useDispatch()
    const router = useRouter()

   
    const reference = router.query.reference
    console.log(reference)

    useEffect(() => {
        if (reference) {
            dispatch(verifyPayment({ reference })).then(result => {
                
                const orderId = order._id
                const id = result.payload.data.id
                const status = result.payload.data.status
                const updateTime = result.payload.data.createdAt
                const emailAddress = result.payload.data.customer.email

                
                dispatch(postUpdatePaid({ orderId, id, status, updateTime, emailAddress })).then(result => {
                    toast.success("Payment Successful")
                })
            })
        } 
      


    }, [])

    const truncate = (name) => {
        if (name?.length > 19) {
            return name.substr(0, 8) + ".."
        } else {
            return name
        }
    }

    const handlePay = () => {
        const email = order?.user?.email
        const amount = (order?.totalPrice * 100).toFixed(0)
        const callback_url = `http://localhost:3000/order/${order?._id}`

        dispatch(postPayStack({email, amount, callback_url })).then(result => {
            if (!result.error) {
                const url = result.payload.data.authorization_url
                router.push(url)
            }
        })
    }

    return (
        <div className="mt-28">
            <section className="container mt-10  sm:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-8 flex flex-col space-y-7">
                        {loading ?
                            <div className="flex justify-center">
                                <TailSpin color="#00BFFF" height={80} width={80} />
                            </div>
                            :
                            <>
                                <div className="flex flex-col space-y-5 ">
                                    <h1 className="lg:text-2xl md:text-lg uppercase tracking-wide">{ order?._id }</h1>
                                    <h1 className="lg:text-xl text-sm md:text-base uppercase">SHIPPING ADDRESS</h1>
                                    <div className="flex space-x-3">
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/90">Name :</h1>
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/60">
                                            {order?.user?.name}
                                        </h1>
                                    </div>
                                    <div className="flex space-x-3">
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/90">Email :</h1>
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/60">
                                            {order?.user?.email}
                                        </h1>
                                    </div>
                                    <div className="flex flex-wrap space-x-3 items-center">
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/90">Address :</h1>
                                        <p className="font-light text-[10px] md:text-xs lg:text-sm tracking-wide text-white/60">
                                            {`${truncate(order?.shippingAddress?.address)} ${order?.shippingAddress?.city} ${order?.shippingAddress?.country}`}
                                        </p>
                                    </div>
                                    <div className={`flex p-2  ${order?.isDelivered ? "bg-green-600" : "bg-red-500/60"}`}>
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white">
                                            {order?.isDelivered ? "Delivered" : "Not Delivered"}
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-5 ">
                                    <h1 className="lg:text-xl text-sm md:text-base uppercase">PAYMENT METHOD</h1>
                                    <div className="flex items-center space-x-3">
                                        <h1 className="font-light text-white/60">{order?.paymentMethod}</h1>
                                        <CreditCardIcon className="text-yellow-500 text-sm" />
                                    </div>
                                    <div className={`${order?.isPaid ? "bg-green-600" : "bg-red-500/60"} flex p-2`}>
                                        <h1 className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white">
                                            {order?.isPaid ? "Paid" : "Not Paid"}
                                        </h1>
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-5 ">
                                    <h1 className="lg:text-xl text-sm  md:text-base  uppercase">ORDER ITEMS</h1>
                                    {order?.orderItems?.map((item, index) => {
                                            return (
                                                <div key={item._id} className="grid grid-cols-12 gap-1 justify-center items-center px-1 py-2 md:px-3">
                                                    <div className=" col-span-2 w-[50px] h-[30px] md:w-[100px] md:h-[60px]  ">
                                                        <img
                                                            src={item.productId?.images[0]?.url}
                                                            alt={item.productId?.name}
                                                            className="rounded-lg object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    <div className="col-span-7">
                                                        <Link href={`/products/${item.productId?._id}`}>
                                                            <a>
                                                                <h1 className="text-xs sm:text-sm md:text-base">{item.productId?.name}</h1>
                                                            </a>
                                                        </Link>
                                                    </div>
                                                    <h1 className="text-[10px] sm:text-xs md:text-sm col-span-2">{`$${(item.productId?.price * item.quantity).toFixed(2)}`}</h1>

                                                    <h1 className="text-xs sm:text-sm md:text-base text-white/90 col-span-1 ">{item.quantity}</h1>

                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </>
                            }
                    </div>

                    <div className="lg:col-span-4 flex">
                        <div className="w-full">
                            <div className="flex flex-col border border-white/30 w-full">
                                <div className="flex justify-center items-center border-b border-white/30 p-2">
                                    <h1 className="text-sm md:text-base">ORDER SUMMARY</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Items Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${order?.itemsPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Shipping Fee:</h1>
                                    <h1 className="text-sm md:text-base">{`$${order?.shippingFee.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Tax Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${order?.taxPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Total Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${order?.totalPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className={`${order?.isPaid ? "hidden" : "flex" } justify-center cursor-pointer items-center bg-[#FFA801] border-b border-white/30 py-2 lg:p-4`}
                                    onClick={handlePay}
                                >
                                    <h1 className="text-sm md:text-base uppercase font-medium">PAY NOW</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Pay
