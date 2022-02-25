import BackDrop from "../../BackDrop"
import CloseIcon from '@mui/icons-material/Close';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import { useEffect, useState } from "react";
import { toast } from 'react-toastify';

const ReviewModal = ({ handleClose, handleSubmit, item }) => {
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    const [id, setId] = useState('')
    const [orderId, setOrderId] = useState('')
    const [product, setProduct] = useState('')

    useEffect(() => {
        setId(item?.item?.productId?._id)
        setOrderId(item?.orderId)
        setProduct(item?.item?.productId?.name)
    })

    const submitHandler = () => {
        if (rating === 0) {
            toast.error('Please submit rating')
        } else {
            handleSubmit(rating, comment, id, orderId)
            handleClose()
        }
        
    }

    return (
        <BackDrop onClick={handleClose} >
            <div className="  bg-gray-300 text-black space-y-4 h-fit w-full max-w-[350px] md:max-w-lg p-3 rounded-lg"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center w-full border-b border-black/30 pb-2 ">
                    <h1 className="uppercase text-sm md:text-base font-medium">Submit Review</h1>
                    <CloseIcon className="!text-base md:text-lg cursor-pointer" onClick={handleClose} />
                </div>
                <div className="flex w-full max-w-[250px] md:max-w-xs mx-auto items-center justify-between text-[#FFA801]">
                    {rating >= 1
                        ? < StarIcon className="text-[50px] "
                            onClick={() => { setRating(0) }}
                        />
                        : < StarOutlineIcon className="text-[50px]"
                            onClick={() => { setRating(1)}}
                        />
                    }
                    {rating >= 2
                        ? < StarIcon className="text-[50px] "
                            onClick={() => { setRating(1) }}
                        />
                        : < StarOutlineIcon className="text-[50px]"
                            onClick={() => { setRating(2)}}
                        />
                    }
                    {rating >= 3
                        ? < StarIcon className="text-[50px] "
                            onClick={() => { setRating(2) }}
                        />
                        : < StarOutlineIcon className="text-[50px]"
                            onClick={() => { setRating(3)}}
                        />
                    }
                    {rating >= 4
                        ? < StarIcon className="text-[50px] "
                            onClick={() => { setRating(3) }}
                        />
                        : < StarOutlineIcon className="text-[50px]"
                            onClick={() => { setRating(4)}}
                        />
                    }
                    {rating >= 5
                        ? < StarIcon className="text-[50px] "
                            onClick={() => { setRating(4) }}
                        />
                        : < StarOutlineIcon className="text-[50px]"
                            onClick={() => { setRating(5)}}
                        />
                    }
                    
                    
                    
                </div>
                <div className="flex flex-col md:!mt-10 justify-end h-full">

                    <h1 className="text-xs text-center md:text-sm">{ product }</h1>
                    <h1 className="text-sm md:text-base">Comment</h1>
                    <textarea
                        className="w-full text-sm bg-gray-300 rounded-lg  border border-black/30 focus:outline-none focus:ring-1 focus:ring-blue-600"
                        name="comment"
                        rows="3"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    >
                    </textarea>
                </div>
                <div className="flex justify-center ">
                    <button className="uppercase rounded-2xl text-sm md:text-base text-white py-2 px-4 bg-blue-900"
                        onClick={submitHandler}
                    >
                        Submit
                    </button>
                </div>
               
            </div>
        </BackDrop>
    )
}

export default ReviewModal
