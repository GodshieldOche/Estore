import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllProducts } from "../redux/features/products"
import ProductsList from "./products/ProductsList"
import { TailSpin } from 'react-loader-spinner'
import FilterListIcon from '@mui/icons-material/FilterList';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Image from "next/image"



const Products = () => {

    const dispatch = useDispatch()
    const router =  useRouter()
    const { loading, products, message } = useSelector(state => state.products)
    
    const {keyword} = router.query
    

    return (
        <div>
            <section className="text-white bg-black !h-screen !mt-20 ">

                <div className="container h-full items-center pt-5 pb-20 space-y-8 ">
                    {
                        !keyword && <>
                            <div id="carouselExampleCaptions" className="carousel slide relative bg-gray-900 lg:!p-1 !h-[200px] sm:!h-[250px] md:!h-[300px] lg:!h-[400px] !max-w-screen-lg mx-auto" data-bs-ride="carousel">
                                <div className="carousel-indicators absolute right-0 bottom-0 left-0 flex justify-center p-0 mb-4">
                                    <button
                                        type="button"
                                        data-bs-target="#carouselDarkVariant"
                                        data-bs-slide-to="0"
                                        className="active bg-gray-900"
                                        aria-current="true"
                                        aria-label="Slide 1"
                                    ></button>
                                    <button
                                        type="button"
                                        className="bg-gray-900"
                                        data-bs-target="#carouselDarkVariant"
                                        data-bs-slide-to="1"
                                        aria-label="Slide 2"
                                    ></button>
                                    
                                    <button
                                        type="button"
                                        data-bs-target="#carouselDarkVariant"
                                        data-bs-slide-to="2"
                                        aria-label="Slide 3"
                                        className="bg-gray-900"
                                    ></button>
                                </div>
                                <div className="carousel-inner relative !h-full max-w-xl mx-auto overflow-hidden">
                                    <div className="carousel-item active relative float-left h-full w-full">
                                        <Image
                                            src={"https://res.cloudinary.com/drck33djn/image/upload/v1644626770/estore/products/xanwqnmm52fw36rrngtb.jpg"}
                                            className="block object-cover h-full w-full"
                                            alt="slide1"
                                            layout="fill"
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                        <div className="carousel-caption hidden md:block absolute text-center">
                                            <h5 className="text-xl !text-gray-900 uppercase font-semibold ">Bluethooth Head Phone</h5>
                                            <button className="text-sm text-gray-900 border rounded-full hover:bg-gray-900 hover:text-white  border-gray-900 py-1 px-4">SHOP NOW</button>
                                        </div>
                                    </div>
                                    <div className="carousel-item relative float-left h-full w-full ">
                                        <Image
                                            src={"https://res.cloudinary.com/drck33djn/image/upload/v1644829707/estore/products/e3refnkysmuf3kakjbmt.jpg"}
                                            className="block  object-cover h-full w-full"
                                            alt="slide2"
                                            layout="fill"
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                        <div className="carousel-caption hidden md:block absolute text-center">
                                            <h5 className="text-xl !text-gray-900 uppercase font-semibold ">Bluethooth Head Phone</h5>
                                            <button className="text-sm text-gray-900 border rounded-full hover:bg-gray-900 hover:text-white  border-gray-900 py-1 px-4">SHOP NOW</button>
                                        </div>
                                    </div>
                                    <div className="carousel-item relative float-left h-full w-full">
                                        <Image
                                            src={"https://res.cloudinary.com/drck33djn/image/upload/v1645023571/estore/products/jea4y2qpmq8j4xb5hkmy.jpg"}
                                            className="block  object-cover h-full w-full"
                                            alt="slide3"
                                            layout="fill"
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                        <div className="carousel-caption hidden md:block absolute text-center">
                                            <h5 className="text-xl !text-gray-900 uppercase font-semibold ">Bluethooth Head Phone</h5>
                                            <button className="text-sm text-gray-900 border rounded-full hover:bg-gray-900 hover:text-white  border-gray-900 py-1 px-4">SHOP NOW</button>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className="carousel-control-prev absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline left-0"
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide="prev"
                                >
                                    <span className="carousel-control-prev-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                    <span className="visually-hidden">Previous</span>
                                </button>
                                <button
                                    className="carousel-control-next absolute top-0 bottom-0 flex items-center justify-center p-0 text-center border-0 hover:outline-none hover:no-underline focus:outline-none focus:no-underline right-0"
                                    type="button"
                                    data-bs-target="#carouselExampleCaptions"
                                    data-bs-slide="next"
                                >
                                    <span className="carousel-control-next-icon inline-block bg-no-repeat" aria-hidden="true"></span>
                                    <span className="visually-hidden">Next</span>
                                </button>
                            </div>
                        </>

                    }
                    
                    
{/* <!-- small screens --> */}

                    <h1 className="text-center text-[20px] lg:hidden ">ALL PRODUCTS</h1>
                    <div className="flex items-center justify-between lg:hidden ">
                        <div className="cursor-pointer">
                            <div className=" flex space-x-2 border border-white/60 rounded-lg items-center px-2 py-1">
                                <FilterListIcon />
                                <h3 className="text-[12px] ">FILTER</h3>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className=" flex space-x-2 border border-white/60 rounded-lg items-center px-2 py-1">
                                <h3 className="text-[12px]">TRENDING</h3>
                                <KeyboardArrowDownIcon />
                            </div>
                        </div>
                    </div>

{/*  <!-- large Screens --> */}
                    <div className="hidden lg:flex items-center justify-between">
                        <h1 className="font-semibold text-xl cursor-pointer">ALL PRODUCTS</h1>
                        <div className="cursor-pointer">
                            <div className=" flex space-x-2 border border-white/60 rounded-lg items-center  !px-2 !py-1">
                                <FilterListIcon />
                                <h3 className="text-[15px]">FILTER</h3>
                            </div>
                        </div>
                        <div className="cursor-pointer">
                            <div className=" flex space-x-2 border border-white/60 rounded-lg items-center  !px-2 !py-1">
                                <h3 className="text-[15px]">TRENDING</h3>
                                <KeyboardArrowDownIcon />
                            </div>
                        </div>
                    </div>

{/* <!-- Products grid --> */}
                    {loading ?
                        <div className="flex flex-col items-center justify-center">
                            <TailSpin color="#00BFFF" height={80} width={80} />
                        </div>
                        : products && products.length >= 0 ?
                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4 p-2  max-w-screen-lg mx-auto ">
                        {
                             products.map(product => (
                                 <ProductsList key={product._id} product={product} />
                            ))
                        }
                  
                    </div>
                        :
                    <h1>No Products For now</h1>}
                </div>
            </section>
        </div>
    )
}

export default Products
