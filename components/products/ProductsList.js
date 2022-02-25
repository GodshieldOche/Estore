import Link from 'next/link'
import Rating from "../Rating"

const ProductsList = ({ product }) => {

    const truncate = (name) => {
        if (name.length > 18) {
            return name.substr(0, 17) + "..."
        } else {
            return name
        }
    }

    return (
        <div className="space-y-3  md:space-y-5 border border-white/30 rounded-lg p-[8px] sm:p-[10px] md:p-[12px]">
            <div className=" relative w-full h-[95px] md:h-[150px]   ">
                <img
                    src={product.images[0].url}
                    alt={product.name}
                    className="rounded-lg object-cover w-full h-full"
                />
            </div>
            <h1 className="tracking-wide text-[10px] sm:text-[14px]  md:text-[15px]">
                <Link href={`/products/${product._id}`}>
                    <a>{truncate(product.name)}</a>
                </Link>
            </h1>
            <div className="flex !items-center  space-x-1  md:space-x-2">
                <Rating value={product.rating} />
                <h3 className="text-[10px] md:text-sm lg:text-base ">{`(${product.numReviews})`}</h3>
            </div>
            <div className="flex justify-between items-center">
                <div className="flex flex-col space-y-1">
                    <h4 className=" text-[10px] md:text-sm text-white/70">Price</h4>
                    <h1 className=" text-xs md:text-xl">{`$${product.price.toFixed(2)}`}</h1>
                </div>
                <div
                    className="border hover:bg-white hover:text-black hover:font-medium items-center border-white/70 flex rounded-3xl px-2 py-1 md:py-2 cursor-pointer ">
                    <Link href={`/products/${product._id}`}>
                        <a>
                            <h1 className="text-[8px] text-center md:text-[13px] uppercase">View Details</h1>
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default ProductsList
