import Link from 'next/link'

const CheckOutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <div >
            <nav className="container pt-10 md:pt-20 sm:px-20 flex justify-between items-center">
                <div >
                    {step1 ? (
                        <Link href='/auth/signin'>
                            <a>
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5   rounded-full bg-blue-900">
                                        <h3 className="text-[10px] sm:text-xs ">1</h3>
                                    </div>
                                    <h1 className="text-[10px] sm:text-sm text-white/60 font-light">Sign In</h1>
                                </div>
                            </a>
                        </Link>
                    ) : <a disabled>
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-blue-300 rounded-full bg-blue-900">
                                    <h3 className="text-[10px] sm:text-xs  ">1</h3>
                                </div>
                                <h1 className="sm:text-sm text-[10px] text-gray-600">Sign In</h1>
                            </div>
                    </a>}
                </div>
                <div>
                    {step2 ? (
                        <Link href='/order/shipping'>
                            <a>
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-900">
                                        <h3 className="text-[10px] sm:text-xs  ">2</h3>
                                    </div>
                                    <h1 className="sm:text-sm text-[10px] text-white/60 font-light">Shipping</h1>
                                </div>
                            </a>
                        </Link>
                    ) : <a disabled>
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-blue-300 rounded-full bg-blue-900">
                                    <h3 className="text-[10px] sm:text-xs  ">2</h3>
                                </div>
                                <h1 className="sm:text-sm text-[10px] text-gray-600">Shipping</h1>
                            </div>
                    </a>}
                </div>
                <div>
                    {step3 ? (
                        <Link href="/order/payment">
                            <a>
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-900">
                                        <h3 className="text-[10px] sm:text-xs  ">3</h3>
                                    </div>
                                    <h1 className="sm:text-sm text-[10px] text-white/60 font-light">Payment</h1>
                                </div>
                            </a>
                        </Link>
                    ) : <a disabled>
                            <div className="flex items-center space-x-1">
                                <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-blue-300 rounded-full bg-blue-900">
                                    <h3 className="text-[10px] sm:text-xs  ">3</h3>
                                </div>
                                <h1 className="sm:text-sm text-[10px] text-gray-600">Payment</h1>
                            </div>
                    </a>}
                </div>
                <div>
                    {step4 ? (
                        <Link href="/order">
                            <a>
                                <div className="flex items-center space-x-1">
                                    <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-blue-900">
                                        <h3 className="text-[10px] sm:text-xs ">4</h3>
                                    </div>
                                    <h1 className="sm:text-sm text-[10px] text-white/60 font-light">Place Order</h1>
                                </div>
                            </a>
                        </Link>
                    ) : <a disabled>
                        <div className="flex items-center space-x-1">
                            <div className="flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 text-blue-300   rounded-full bg-blue-900">
                                    <h3 className="text-[10px] sm:text-xs ">4</h3>
                            </div>
                                <h1 className="sm:text-sm text-[10px] text-gray-600">Place Order</h1>
                        </div>
                    </a>}
                </div>
            </nav>
        </div>
    )
}

export default CheckOutSteps
