import { useState } from "react"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getShippingAddress, postUpdateAddress } from "../../redux/features/shipping"
import CheckOutSteps from "../cart/CheckOutSteps"
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from "next/link"
import { useRouter } from "next/router"

const Shipping = () => {
    
    const [address, setAddress ] = useState('')
    const [city, setCity ] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [country, setCountry] = useState('')


    const { loading, shippingAddress, message } = useSelector(state => state.shipping)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(() => {
        dispatch(getShippingAddress()).then(result => {
            if (!result.error) {
                const {shippingAddress} = result.payload
                setAddress(shippingAddress.address)
                setCity(shippingAddress.city)
                setPostalCode(shippingAddress.postalCode)
                setCountry(shippingAddress.country)
            }
        })

        
    }, [dispatch])


    const handleSubmit = async (e) => {
        e.preventDefault()
        const shippingData = {
            address,
            city,
            postalCode,
            country,
        }

        dispatch(postUpdateAddress(shippingData)).then(result => {
            if (!result.error) {
                router.push('/order/payment')
            }
        })
    }




    return (
        <div className="mt-10">
            <CheckOutSteps step1 step2/>

            <section className="container">
                <div className="flex flex-col justify-center  space-y-2 max-w-xl mx-auto mt-8 md:mt-10">
                    <h1 className="lg:text-xl sm:text-base text-sm text-center uppercase">Shipping Address</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-3 lg:p-3 ">
                            <div>
                                <label htmlFor="address" className="block text-xs mb-2 ">Address</label>
                                <input
                                    type="text"
                                    name="text"
                                    className="w-full px-3 py-2  text-xs bg-black  border  border-white/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={address}
                                    onChange={(e) => { setAddress(e.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-xs mb-2 ">City</label>
                                <input
                                    type="text"
                                    name="text"
                                    className="w-full px-3 py-2  text-xs bg-black  border  border-white/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={city}
                                    onChange={(e) => { setCity(e.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-xs mb-2 ">Postal Code</label>
                                <input
                                    type="text"
                                    name="text"
                                    className="w-full px-3 py-2  text-xs bg-black  border  border-white/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={postalCode}
                                    onChange={(e) => { setPostalCode(e.target.value) }}
                                />
                            </div>
                            <div>
                                <label htmlFor="address" className="block text-xs mb-2 ">Country</label>
                                <input
                                    type="text"
                                    name="text"
                                    className="w-full px-3 py-2  text-xs bg-black  border  border-white/60 rounded-sm focus:outline-none focus:ring-1 focus:ring-black"
                                    value={country}
                                    onChange={(e) => { setCountry(e.target.value) }}
                                />
                            </div>
                         
                        </div>
                        <div className="flex justify-center items-center mt-3 space-x-3">
                            <button id="signup" type='submit'
                                className=" text-sm border border-blue-900 bg-blue-900 text-white my-2 py-2  px-10 rounded-full cursor-pointer 
                                hover:bg-blue-700 text-center">
                                {loading ? "loading.." : "UPDATE"}
                            </button>
                            <Link href="/order/payment">
                                <a>
                                    <div className="flex justify-between items-center space-x-2 text-sm text-white my-2 py-2  px-10 cursor-pointer
                                    hover:text-base">
                                        <h1>Continue</h1>
                                        <ArrowRightAltIcon />
                                    </div>
                                </a>
                            </Link>
                        </div>

                    </form>
                </div>
            </section>
        </div>
    )
}

export default Shipping
