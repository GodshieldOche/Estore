import StarOutlineIcon from '@mui/icons-material/StarOutline';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';

const Rating = ({value}) => {
    return (
        <div className="flex text-[#FFA801] md:space-x-1 items-center ">
            {
                value >= 1
                    ? < StarIcon className="!text-xl md:!text-3xl" />
                    : value >= 0.5
                    ? <StarHalfIcon className="!text-xl md:!text-3xl" />
                    : <StarOutlineIcon className="!text-xl md:!text-3xl" />
                
            }
            {
                value >= 2
                    ? < StarIcon className="!text-xl md:!text-3xl" />
                    : value >= 1.5
                    ? <StarHalfIcon className="!text-xl md:!text-3xl" />
                    : <StarOutlineIcon className="!text-xl md:!text-3xl" />
                
            }
            {
                value >= 3
                    ? < StarIcon className="!text-xl md:!text-3xl" />
                    : value >= 2.5
                    ? <StarHalfIcon className="!text-xl md:!text-3xl" />
                    : <StarOutlineIcon className="!text-xl md:!text-3xl" />
                
            }
            {
                value >= 4
                    ? < StarIcon className="!text-xl md:!text-3xl" />
                    : value >= 3.5
                    ? <StarHalfIcon className="!text-xl md:!text-3xl" />
                    : <StarOutlineIcon className="!text-xl md:!text-3xl" />
                
            }
            {
                value >= 5
                    ? < StarIcon className="!text-xl md:!text-3xl" />
                    : value >= 4.5
                    ? <StarHalfIcon className="!text-xl md:!text-3xl" />
                    : <StarOutlineIcon className="!text-xl md:!text-3xl" />
                
            }

           
            
            
            
        </div>
    )
}

Rating.defaultProps = {
    value: 0,
    size: 12
}

export default Rating
