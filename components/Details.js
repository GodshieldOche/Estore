import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import { getCartItems, postToCart } from '../redux/features/cart'
import { toast } from 'react-toastify';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Comments from './products/Comments'
import { getProductReviews } from '../redux/features/reviews'




const Details = () => {
    const [quantity, setQuantity] = useState(1)
    const [showCart, setShowCart] = useState(false)

    const [displayImage, setDisplayImage] = useState(null)

    const router = useRouter()
    const dispatch = useDispatch()

    const {prodId} = router.query

    const { loading, product, message } = useSelector(state => state.product)
    const { loading: cartLoading, success, cartItems, message: cartMessage } = useSelector(state => state.cart)
    const { loading: reviewLoading, reviews, message: reviewMessage } = useSelector(state => state.reviews)

    useEffect(() => {
        setDisplayImage(product?.images[0].url)
        dispatch(getCartItems())
        dispatch(getProductReviews(prodId))
    }, [dispatch, showCart])

    
    const inCart = cartItems.find(item => item.productId._id === prodId)
   
    const handleAddToCart = () => {
        dispatch(postToCart({ prodId, quantity })).then(result => {
            if (!result.error) {
                const message = result.payload.message
                toast.success(message)
                setShowCart(!showCart)
            } else {
                console.log(result)
            }
        })
    }


    return (
        <div className="space-y-10 mt-20">
            <section className="">
                <div className="container items-center !mt-[100px] lg:!mt-[50px] space-y-5">
                    <div className="grid grid-cols-1 md:gap-10 gap-5 xl:grid-cols-12">
{/* <!-- 1col 6 --> */}
                        <div className="xl:col-span-7 grid grid-cols-1 md:grid-cols-4  space-y-3 items-center ">
{/* <!-- large screen -->
<!-- preview --> */}
                            <div className="hidden md:flex flex-col space-y-3">
                                {
                                    product && product.images && product.images.map((image, index) => (
                                        <div className={`w-[120px] h-[120px] cursor-pointer rounded-full flex items-center justify-center border  ${displayImage === image.url ? "border-[#FFA801] border-2" : "border-white/60"}`} key={image.public_id}>
                                            <div className={`w-[110px] h-[110px] relative cursor-pointer rounded-full`} 
                                                onClick={()=> {setDisplayImage(image.url)}}
                                            >
                                                <Image src={image.url}
                                                    className="h-full w-full object-cover rounded-full"
                                                    alt={image.public_id}
                                                    layout="fill"
                                                    blurDataURL="data:..."
                                                    placeholder="blur"
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
{/* <!-- main --> */}
                            <div className="hidden md:block col-span-3">
                                <div className="relative w-full h-[600px] border border-white/60">
                                    {displayImage && 
                                        <Image src={displayImage}
                                            className=" h-full object-cover  w-full"
                                            alt="display Image"
                                            layout="fill"
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                    }
                                    
                                </div>
                            </div>
{/* <!-- small screen --> */}
{/* <!-- main --> */}
                            <div className="md:hidden ">
                                <div className="relative h-[250px]  w-full ">
                                    {displayImage && 
                                        <Image src={displayImage}
                                            className=" h-full  w-full object-cover"
                                            alt="dsiplay Image"
                                            layout="fill"
                                            blurDataURL="data:..."
                                            placeholder="blur"
                                        />
                                    }
                                   
                                </div>
                            </div>
{/* <!-- preview --> */}
                            <div className="md:hidden flex flex-row items-center  space-x-3 justify-center">
                                {
                                    product && product.images && product.images.map((image, index) => (
                                        <div key={image.public_id} className={`w-[60px] h-[60px] rounded-full flex items-center justify-center  border ${displayImage === image.url ? " border-[#FFA801] border-2" : "border - white / 60"}`}>
                                            <div className={`w-[50px] h-[50px] relative rounded-full `} 
                                                onClick={() => { setDisplayImage(image.url) }}
                                            >
                                                <Image src={image.url}
                                                    className="h-full w-full object-cover rounded-full  "
                                                    alt={image.public_id}
                                                    layout="fill"
                                                    blurDataURL="data:..."
                                                    placeholder="blur"
                                                />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

{/* <!-- 2col 6 --> */}
                        <div className="xl:col-span-5 space-y-5 md:!mt-[50px] md:space-y-8">
                            <div>
                                <h1 className="text-base md:text-xl text-white/90 tracking-widest uppercase">{ product?.name }</h1>
                            </div>
                            <div>
                                <h1 className="text-[14px] md:text-lg text-white/90 tracking-widest">{`PRICE: $${product?.price}`}</h1>
                            </div>
                            <div>
                                <h1 className="text-[14px] md:text-lg text-white/90 tracking-widest uppercase">{`Brand: ${product?.brand}`}</h1>
                            </div>
                            <div>
                                <h1 className="text-[14px] md:text-lg text-white/90 tracking-widest uppercase">{`Category: ${product?.category}`}</h1>
                            </div>
                            {/* <div className="flex flex-row items-center md:items-start md:flex-col space-x-2 md:space-x-0 md:space-y-3">
                                <h1 className="text-[15px] md:text-xl text-white/90 tracking-widest">COLORS:</h1>
                                <div className="flex flex-row space-x-2 items-center">
                                    <div className="h-5 w-5 rounded-full bg-[#FFA801] "></div>
                                    <div className="h-5 w-5 rounded-full bg-black border "></div>
                                    <div className="h-5 w-5 rounded-full bg-[#00D8D6] "></div>
                                </div>
                            </div> */}
                            <div className="flex flex-row lg:max-w-[500px] justify-between">
                                <div className="flex items-center space-x-2 text-white/90 cursor-pointer">
                                    <h1 className="text-sm md:text-lg ">CUSTOMIZE</h1>
                                    <div className="flex flex-col space-y-0 ">
                                        <ion-icon name="chevron-up" className="text-sm "></ion-icon>
                                        <ion-icon name="chevron-down" className="text-sm "></ion-icon>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3 md:space-x-5 text-white/90">
                                    <div>
                                        <button
                                            onClick={() => { quantity >= 2 ? setQuantity(quantity - 1) : setQuantity(quantity) }}
                                        >
                                            <RemoveCircleIcon className="text-lg md:text-xl cursor-pointer " />
                                        </button>
                                    </div>
                                    <h1 className="text-lg md:text-xl ">{ quantity }</h1>
                                    <div className="">
                                        <button
                                            onClick={() => {quantity < product?.countInStock ? setQuantity(quantity + 1) : setQuantity(quantity)}}
                                        >
                                            <AddCircleIcon className="text-lg md:text-xl cursor-pointer " />
                                        </button>
                                    </div>
                                </div>
                                <div className={`${!inCart ? "flex" : "hidden"} items-center cursor-pointer text-black bg-white !px-4 md:px-6 !py-2 !md:py-4 rounded-3xl border hover:bg-black hover:text-white font-semibold `}>
                                    <h2 className=" text-[13px] md:text-lg "
                                        onClick={handleAddToCart}
                                    >{cartLoading ? "loadin.." : "ADD TO CART"}</h2>
                                </div>
                                
                                {inCart && <div className="flex items-center cursor-pointer text-black bg-white !px-4 md:px-6 !py-2 !md:py-4 rounded-3xl border hover:bg-black hover:text-white font-semibold ">
                                    <Link href="/cart">
                                        <a>
                                            <h2 className=" text-[13px] md:text-lg ">GO TO CART</h2>
                                        </a>
                                    </Link>
                                </div>}
                                
                                
                            </div>
                            {/* <!-- description --> */}
                            <div className="flex flex-col space-y-2 md:space-y-3">
                                <h1 className="text-base md:text-xl text-white/90 tracking-widest">Description</h1>
                                <p className="font-thin text-[13px] md:text-sm text-justify text-white/80">{product?.description}</p>
                            </div>
                        </div>

                    </div>

                </div>
            </section>
            {reviewLoading
                ? <h1>loading..</h1>
                : <Comments reviews={reviews} value={product.rating} />}
           
    
    </div>
    )
}

export default Details
