import CheckOutSteps from "../cart/CheckOutSteps"
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import Link from "next/link"

const PaymentMethod = () => {
    return (
        <div className="mt-10">
            <CheckOutSteps step1 step2 step3/>
            <div className="container mt-16 md:mt-20 space-y-2 max-w-xl mx-auto">
                <h1 className="lg:text-xl sm:text-base text-sm text-center uppercase">Choose Payment Method</h1>
                <div className="flex justify-center !mt-10">
                    <div className="space-y-3">
                        <div className="form-check">
                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault1"
                                checked
                            />
                            <label className="form-check-label inline-block " htmlFor="flexRadioDefault1">
                                <div className="flex justify-center items-center space-x-3">
                                    <h1 className="font-light">Pay with PayStack</h1>
                                    <CreditCardIcon className="text-yellow-500" />
                                </div>
                            </label>
                        </div>
                        <div className="form-check">
                            <input className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                                type="radio"
                                name="flexRadioDefault"
                                id="flexRadioDefault2"
                                 />
                            <label className="form-check-label inline-block" htmlFor="flexRadioDefault2">
                                <div className="flex justify-between items-center space-x-3">
                                    <h1 className="font-light">Pay with PayPal</h1>
                                    <ion-icon name="logo-paypal" class="text-blue-700"></ion-icon>
                                </div>
                                
                            </label>
                        </div>
                        <div className="!mt-10">
                            <Link href="/order/">
                                <a>
                                    <div className="flex justify-between items-center border rounded-full space-x-2 text-sm text-white my-2 py-2   px-5 cursor-pointer
                                    hover:text-black hover:bg-white"
                                    >
                                        <h1>Continue</h1>
                                        <ArrowRightAltIcon />
                                    </div>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                
            </div>
        </div>
    )
}

export default PaymentMethod
