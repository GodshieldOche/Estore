import Image from "next/image"
import Link from "next/link"
import { useSelector } from "react-redux"
import ProductsList from "./products/ProductsList"

const Home = () => {

    const { loading, products, message } = useSelector(state => state.latestProducts)
    return (
        <div className="!mt-28 md:mt-20">
            <section>
{/* hero */}
                <div className="container flex flex-col flex-1 lg:flex-row items-center lg:space-x-20 lg:space-y-0 space-y-5 overflow-hidden ">
                    <div className=" flex flex-1 flex-col space-y-8">
                        <h3 className=" text-center text-[12px] sm:text-[18px] lg:text-base text-[#9EE9E9] tracking-custom lg:text-left leading-3"> RELIABILITY AND QUICK DELIVERY </h3>
                        <h1 className=" text-center text-[15px] sm:text-[25px] md:text-[30px] lg:text-[35px] xl:text-[40px] tracking-custom lg:text-left">
                            WE OFFER HIGH QUALITY AND DURABLE PRODUCTS ACROSS THE WORLD, FROM THE BEST SELLERS.
                        </h1>
                        <h4 className="text-[#9EE9E9] text-[11px] sm:text-base ml-5 tracking-custom">Scroll down</h4>
                    </div>
                    <div className="flex flex-1 mx-w-[50px] md:!mt-14">
                        <img src="/img//hero.svg" className="w-fit" alt="hero"/>
                    </div>
                </div>
            </section>

            <section className="text-white bg-black mt-20 ">
                    <div className="container items-center pt-5 pb-20 space-y-8 border-y border-white/30 ">
{/* <!-- small screens --> */}
                        <h1 className="text-center text-[20px] lg:hidden font-semibold">LATEST ARRIVALS </h1>
                        <div className="flex items-center justify-between lg:hidden ">
                            <div className="cursor-pointer">
                                <div className=" flex space-x-2 border border-white/60 rounded-lg items-center px-2 py-1">
                                    <ion-icon name="filter" className=" text-sm md:text-lg "></ion-icon>
                                    <h3 className="text-[12px] ">FILTER</h3>
                                </div>
                            </div>
                            <div className="cursor-pointer">
                                <h2 className="text-sm">see all</h2>
                            </div>
                        </div>

{/* <!-- large Screens --> */}
                        <div className="hidden lg:flex items-center justify-between">
                            <h1 className="font-semibold text-xl cursor-pointer">LATEST ARRIVALS </h1>
                            <div className="cursor-pointer">
                                <div className=" flex space-x-2 border border-white/60 rounded-lg items-center  !px-2 !py-1">
                                    <ion-icon name="filter" className="text-xl "></ion-icon>
                                    <h3 className="text-[15px]">FILTER</h3>
                                </div>
                            </div>
                            <Link href="/products">
                                <a>
                                    <div className="cursor-pointer">
                                        <h2 className="text-[15px]">see all</h2>
                                    </div>
                                </a>
                            </Link>
                        </div>

{/* <!-- Products grid --> */}
                    {
                        products && products.length >= 0 ?
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2  max-w-screen-lg mx-auto ">
                            {
                                products.map(product => (
                                    <ProductsList key={product._id} product={product} />
                                ))
                            }

                        </div>
                        :
                        <h1>No Products For now</h1>
                    }

                    
                        </div>
                    </section>

                    <section className="bg-black h-[300px]">

                    </section>
        </div>
    )
}

export default Home
