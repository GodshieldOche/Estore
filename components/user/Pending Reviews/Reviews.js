import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalState } from '../../../redux/features/modal';
import { getPendingReviews, postReview, postupdateIsReviewed } from '../../../redux/features/reviews';
import ReviewModal from './ReviewModal';
import { toast } from 'react-toastify';
import { TailSpin } from 'react-loader-spinner'
import { useState } from 'react';
import Image from "next/image"


const Reviews = () => {

    const [reload, setReload] = useState(false)
    const [modalItem, setModalItem] = useState()
  

    const dispatch = useDispatch()

    const {modalState} = useSelector(state => state.modal)
    const { loading, reviewItems, message } = useSelector(state => state.reviews)
    const { user } = useSelector(state => state.currentUser)

    const name = user?.name

    useEffect(() => {
        dispatch(getPendingReviews()).then(result => {
            console.log(result)
        })
    }, [dispatch, reload])


    const handleReview = (item) => {
        setModalItem(item)
        dispatch(setModalState(true))
    }

    const handleSubmit = (rating, comment, id, orderId) => {
        console.log(rating, comment, id, orderId, name)

        dispatch(postReview({ id, name, rating, comment }))
        dispatch(postupdateIsReviewed({ id, orderId })).then(result => {
            if (!result.error) {
                dispatch(getPendingReviews())
                toast.success('Review Submitted')
            }
        })
       
       
    }

    return (
        <div className=" w-full space-y-3  ">
            <div className="lg:hidden ">
                <Link href="/user/dashboard">
                    <a><KeyboardBackspaceIcon /></a>
                </Link>
            </div>

            {reviewItems.length <= 1 ?
                <h1 className="font-light  text-xs sm:text-sm md:text-base tracking-wide mb-3">{`${reviewItems.length} Pending Review`}</h1> :
                <h1 className="font-light  text-xs sm:text-sm md:text-base tracking-wide mb-3">{`${reviewItems.length} Pending Reviews`}</h1>
            }

            <div className="flex flex-col space-y-5">

                {
                    loading ?
                        <div className="flex justify-center">
                            <TailSpin color="#00BFFF" height={80} width={80} />
                        </div>
                        :
                        reviewItems?.length ? reviewItems.map(item => {
                            return (
                                <div key={item?.item._id} className="grid grid-cols-12 items-start gap-2 p-1 sm:p-2 border border-white/20">
                                    <div className="col-span-2">
                                        <div className="relative border border-white/20 h-[50px] lg:h-[80px]">
                                            <Image
                                                src={item?.item?.productId?.images[0].url}
                                                className=" object-cover w-full h-full"
                                                layout="fill"
                                                blurDataURL="data:..."
                                                placeholder="blur"
                                            />
                                        </div>

                                    </div>
                                    {
                                        modalState && <ReviewModal
                                            handleClose={() => { dispatch(setModalState(false)) }}
                                            handleSubmit={handleSubmit}
                                            item={modalItem}
                                        />
                                    }

                                    <div className="col-span-6">
                                        <div className="flex flex-col justify-items-stretch space-y-2">
                                            <h1 className="font-light text-[11px] sm:text-sm lg:text-base text-white/80">{item?.item?.productId?.name}</h1>
                                            <h1 className="font-light text-[9px] sm:text-sm text-white/60">{`Ordered At: ${item?.item?.orderedAt.substr(0, 10)}`}</h1>

                                        </div>
                                    </div>
                                    <div className="col-span-4 flex justify-center items-center h-full">
                                        <h1 className="font-light rounded-full bg-blue-900 py-1 md:py-2 px-3 md:px-4 text-[10px] sm:text-sm lg:text-base tracking-wide text-white cursor-pointer"
                                            onClick={() => { handleReview(item) }}>Review</h1>
                                    </div>

                                </div>
                            )   
                        })
                            :
                            <h1>No Pending Reviews</h1>
                }

               
                
            </div>
            
        </div>
    )
}

export default Reviews
