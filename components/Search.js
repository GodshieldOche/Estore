import SearchIcon from '@mui/icons-material/Search';

const Search = ({ handleClose, submitHandler, keyword, setKeyword }) => {
    return (
        <div className="absolute !top-0 !left-0 !h-screen  w-full !overflow-hidden pt-2  bg-black flex justify-center z-50"
            onClick={handleClose}
        >
            <div className="w-full p-3"
                onClick={(e) => e.stopPropagation()}
            >
                <form className="relative flex flex-col justify-center w-full"
                    onSubmit={submitHandler}
                >
                    <input
                        className="py-2 pl-12 pr-2 !w-full border bg-black text-white  rounded-md outline-none  focus:border-blue-500"
                        type="text"
                        name="keyword"
                        placeholder="Seach for Products"
                        value={keyword}
                        onChange={(e) => { setKeyword(e.target.value) }}

                    />
                    <div className="absolute bottom-0 left-0 -mb-0.5 transform translate-x-1/2 -translate-y-1/2 text-gray-500 h-6 w-6 ">
                        <SearchIcon className="text-2xl " />
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Search
