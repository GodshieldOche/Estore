import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShippingAddress } from "../../redux/features/shipping";
import { getCartItems, postDeleteItems } from "../../redux/features/cart";
import { postOrder } from "../../redux/features/order";
import { useRouter } from 'next/router'
import Link from "next/link"
import CheckOutSteps from "../cart/CheckOutSteps"
import CreditCardIcon from '@mui/icons-material/CreditCard';

const Order = () => {
    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')

    const { loading, cartItems, message } = useSelector(state => state.cart)
    const {shippingAddress} = useSelector(state => state.shipping)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {

        dispatch(getCartItems())

        dispatch(getShippingAddress()).then(result => {
            if (!result.error) {
                const { shippingAddress } = result.payload
                setAddress(shippingAddress.address)
                setCity(shippingAddress.city)
                setPostalCode(shippingAddress.postalCode)
                setCountry(shippingAddress.country)
            } else {
                console.log(result)
            }
        })


    }, [dispatch])



    const orderItems = cartItems
    const itemsPrice = cartItems.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0)
    const shippingFee = 8
    const taxPrice = 0
    const totalPrice = itemsPrice + shippingFee + taxPrice
    const paymentMethod = "paystack"


    const handleOrder = () => {
        dispatch(postOrder({
            orderItems, itemsPrice,
            shippingAddress, paymentMethod,
            shippingFee, taxPrice, totalPrice
        })).then(result => {
            if (!result.error) {
                dispatch(postDeleteItems())
                router.push(`/order/${result.payload.orderId}`)

            }
        })
    }


    return (
        <div className="mt-10">
            <CheckOutSteps step1 step2 step3 step4 />
            <section className="container mt-10  sm:mt-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                    <div className="lg:col-span-8 flex flex-col space-y-7">
                        <div className="flex flex-col space-y-3 ">
                            <h1 className="lg:text-xl text-sm md:text-base uppercase">SHIPPING ADDRESS</h1>
                            <p className="font-light text-xs md:text-sm lg:text-base tracking-wide text-white/60">
                                {`${address} ${city} ${country}`}
                            </p>
                        </div>
                        <div className="flex flex-col space-y-3 ">
                            <h1 className="lg:text-xl text-sm md:text-base uppercase">PAYMENT METHOD</h1>
                            <div className="flex items-center space-x-3">
                                <h1 className="font-light text-white/60">PayStack</h1>
                                <CreditCardIcon className="text-yellow-500 text-sm" />
                            </div>
                        </div>
                        <div className="flex flex-col space-y-5 ">
                            <h1 className="lg:text-xl text-sm  md:text-base  uppercase">ORDER ITEMS</h1>
                            {loading ?
                                <div className="flex justify-center">
                                    loading
                                </div>
                                :
                                cartItems?.map((item, index) => {

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
                                            <h1 className="text-[10px] sm:text-xs md:text-sm col-span-2">{`$${(item.productId.price * item.quantity).toFixed(2)}`}</h1>

                                            <h1 className="text-xs sm:text-sm md:text-base text-white/90 col-span-1 ">{item.quantity}</h1>

                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="lg:col-span-4 flex">
                        <div className="w-full">
                            <div className="flex flex-col border border-white/30 w-full">
                                <div className="flex justify-center items-center border-b border-white/30 p-2">
                                    <h1 className="text-sm md:text-base">ORDER SUMMARY</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Items Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${itemsPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Shipping Fee:</h1>
                                    <h1 className="text-sm md:text-base">{`$${shippingFee.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Tax Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${taxPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Total Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${totalPrice.toFixed(2)}`}</h1>
                                </div>
                                <div className="flex justify-center cursor-pointer items-center bg-[#FFA801] border-b border-white/30 py-2 lg:p-4"
                                    onClick={handleOrder}
                                >
                                    <h1 className="text-sm md:text-base uppercase font-medium">Place order</h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Order
