import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getCartItems, postDeleteItem, postToCart } from '../../redux/features/cart';
import Link from 'next/link'
import { TailSpin } from 'react-loader-spinner'
import { toast } from 'react-toastify';


const Cart = () => {
    const [reload, setReload] = useState(false)


    const { loading, cartItems, message } = useSelector(state => state.cart)
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartItems())
    }, [ reload])

    const truncate = (name) => {
        if (name.length > 18) {
            return name.substr(0, 18) + "..."
        } else {
            return name
        }
    }

    const handleIncrement = (item) => {

        const prodId = item?.productId._id
        const quantity= item?.quantity < item.productId.countInStock ? item.quantity + 1 : item.quantity

        dispatch(postToCart({ prodId, quantity })).then(result => {
            if (!result.error) {
                setReload(!reload)
            } else {
                console.log(result)
            }
        })
    }

    const handleDecrement = (item) => {

        const prodId = item?.productId._id
        const quantity= item?.quantity >= 2 ? item.quantity - 1 : item.quantity

        
        dispatch(postToCart({ prodId, quantity })).then(result => {
            if (!result.error) {
                setReload(!reload)
            } else {
                console.log(result)
            }
            
        })
    }

    const handleDelete = (id, index) => {
        dispatch(postDeleteItem({ id, index })).then(result => {
            if (!result.error) {
                toast.success(result.payload.message)
            } else {
                console.log(result)
            }
        })
    }

    const itemsTotal = cartItems.reduce((acc, item) => acc + (item.quantity * item.productId.price), 0)
    const shippingFee = 8
    const taxPrice = 0
    const totalPrice = itemsTotal + shippingFee + taxPrice

    return (
        <div className="mt-24">
            <section className="container">
                <h1 className="md:text-2xl text-base sm:text-lg  my-8">SHOPPING CART</h1>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
{/* col 1 */}
                    <div className="lg:col-span-8 flex flex-col space-y-2">
                        {loading ?
                            <div className="flex justify-center items-center h-full">
                                <TailSpin color="#00BFFF" height={80} width={80} />
                            </div>
                            :
                            cartItems.length ? cartItems?.map((item, index) => {

                                return (
                                    <div key={item._id} className="grid grid-cols-12 gap-2 bg-gray-900 items-center border border-white/30 px-1 py-2 md:px-3">
                                        <div className=" col-span-2 w-[50px] h-[30px] md:w-[100px] md:h-[60px]  ">
                                            <img
                                                src={item.productId?.images[0]?.url}
                                                alt={item.productId?.name}
                                                className="rounded-lg object-cover w-full h-full"
                                            />
                                        </div>
                                        <div className="col-span-5">
                                            <Link href={`/products/${item.productId?._id}`}>
                                                <a>
                                                    <h1 className="text-xs sm:text-sm md:text-base">{truncate(item.productId?.name)}</h1>
                                                </a>
                                            </Link>
                                        </div>
                                        <h1 className="text-[10px] sm:text-xs md:text-sm col-span-2">{`$${(item.productId.price * item.quantity).toFixed(2)}`}</h1>
                                        <div className="flex items-center  text-white/90 col-span-2">
                                            <button
                                                disabled={item.quantity === 1}
                                                className="disabled:text-gray-500 mr-1 md:mr-2"
                                            >
                                                <RemoveCircleIcon
                                                    className="text-xs sm:text-sm md:text-base"
                                                    onClick={() => { handleDecrement(item) }}
                                                />
                                            </button>

                                            <div className="mx-1">
                                                <h1 className="text-xs sm:text-sm md:text-base ">{item.quantity}</h1>
                                            </div>

                                            <button
                                                disabled={item.quantity === item.productId.countInStock}
                                                className="disabled:text-gray-500 ml-1 md:ml-2"
                                            >
                                                <AddCircleIcon
                                                    className="text-xs sm:text-sm md:text-base"
                                                    onClick={() => { handleIncrement(item) }}
                                                />
                                            </button>
                                        </div>
                                        <button
                                            className="col-span-1"
                                            onClick={() => handleDelete(item._id, index)}
                                        >
                                            <DeleteIcon className="text-red-600 text-[17px] md:text-2xl" />
                                        </button>
                                    </div>
                                )
                            }) :
                                <div className="flex justify-center items-center">
                                    <h1 className=" w-[400px] h-[400px]">
                                        <img src='\img\undraw_empty_cart_co35.svg' className="w-full h-full text-center" />
                                    </h1>
                                </div>
                                
                           }
                       

                        
                        

                    </div>
{/* col 2 */}
                    <div className="lg:col-span-4 flex">
                        <div className="w-full">
                            <div className="flex flex-col border border-white/30 w-full">
                                <div className="flex justify-center items-center border-b border-white/30 p-2">
                                    <h1 className="text-sm md:text-base">{`${cartItems.reduce((acc, item) => acc + item.quantity, 0 ) } CART ITEMS`}</h1>
                                </div>
                                <div className="flex justify-between items-center border-b border-white/30 p-2 lg:p-4">
                                    <h1 className="text-sm md:text-base uppercase font-light">Items Price:</h1>
                                    <h1 className="text-sm md:text-base font-light">{`$${itemsTotal.toFixed(2)}`}</h1>
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
                                {
                                    cartItems.length ?
                                        <Link href="/order/shipping">
                                            <a>
                                                <div className="flex justify-center cursor-pointer items-center bg-[#FFA801] border-b border-white/30 py-2 lg:p-4">
                                                    <h1 className="text-sm md:text-base uppercase font-medium">Proceed to checkout</h1>
                                                </div>
                                            </a>
                                        </Link>
                                        :
                                        <a>
                                            <div className="flex justify-center items-center bg-white/30 border-b border-white/30 py-2 lg:p-4">
                                                <h1 className="text-sm md:text-base uppercase font-medium">Proceed to checkout</h1>
                                            </div>
                                        </a>
                                }
                                
                            </div>
                       </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Cart
