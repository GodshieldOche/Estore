const BackDrop = ({onClick, children}) => {
    return (
        <div className="absolute top-0 left-0 h-full  w-full !overflow-hidden  bg-black/60 flex !mt-20 justify-center z-50"
            onClick={onClick}
        >
            {children}
        </div>
    )
}

export default BackDrop
