import Rating from '../Rating'

const Comments = ({ reviews, value }) => {
    return (
        <div className="!mb-8">
            <section>
                <div className="container items-center">
                    <div className="grid grid-cols-1 gap-20 space-y-5 lg:grid-cols-2">
                        <div className="space-y-5">
                            {/* <!-- header --> */}
                            <div className="flex justify-between items-center border-b border-white/60 pb-2 mb-8">
                                <h1 className="text-lg md:text-2xl text-white/90 tracking-widest">REVIEWS</h1>
                                <div className="flex !items-center  space-x-1  md:space-x-2">
                                    <Rating value={value} />
                                    <h3 className="text-[10px] md:text-sm lg:text-base ">{`(${reviews.length})`}</h3>
                                </div>
                                
                            </div>

                            {/* <!-- reviews --> */}
                            <div>
                                {reviews?.map(review => (
                                    <div key={review._id} className="relative space-y-3">
                                        <div className=" w-[60px] h-[60px] md:w-[70px] md:h-[70px] p-2 bg-[#060404] rounded-full absolute">
                                            <img src={review.user.imageUrl} className="h-full w-full object-cover rounded-full" alt="profile" />
                                        </div>

                                        <div className="ml-8 md:ml-9  pl-[28px] md:pl-10 border-l space-y-2 text-white/80">
                                            <div className="flex flex-row justify-between !items-center ">
                                                <div className="flex flex-col mt-3">
                                                    <h1 className="text-sm md:text-lg font-light">{ review.name }</h1>
                                                    <h3 className="text-xs md:text-sm font-light">{review.createdAt.substr(0, 10)}</h3>
                                                </div>
                                                <div className="flex space-x-1  md:space-x-2 ">
                                                    <Rating value={review.rating} />
                                                </div>
                                            </div>
                                            <div>
                                                {
                                                    review.rating === 1 && <h2 className="text-sm md:text-lg font-light">Poor</h2>
                                                }
                                                {
                                                    review.rating === 2 && <h2 className="text-sm md:text-lg font-light">Fair</h2>
                                                }
                                                {
                                                    review.rating === 3 && <h2 className="text-sm md:text-lg font-light">Good</h2>
                                                }
                                                {
                                                    review.rating === 4 && <h2 className="text-sm md:text-lg font-light">Very Good</h2>
                                                }
                                                {
                                                    review.rating === 5 && <h2 className="text-sm md:text-lg font-light">Excellent</h2>
                                                }
                                                
                                            </div>
                                            <p className="text-xs md:text-base font-light">{ review.comment }</p>
                                        </div>
                                    </div>
                                ))}
                                
                                
                                {reviews.length > 4 && 
                                    <div className="flex items-center justify-center">
                                        <div className=" items-center py-1 px-2 rounded-2xl cursor-pointer bg-white/90 text-black">
                                            <h1 className="text-xs font-medium">see more</h1>
                                        </div>
                                    </div>
                                }
                                
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Comments





    