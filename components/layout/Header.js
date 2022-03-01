import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { loadUser } from '../../redux/features/currentUser';
import Search from '../Search';
import { setModalState } from '../../redux/features/modal';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Header = () => {
    const [keyword, setKeyword] = useState('')
    const [user, setUser] = useState(null)

    const dispatch = useDispatch()

    

    // const { loading, user } = useSelector(state => state.currentUser)
    const router = useRouter()

    useEffect(() => {
        dispatch(loadUser()).then(result => {
            if (!result.error) {
                setUser(result.payload.user)
            } else {
                console.log(result)
            }
        })
    }, [dispatch])


    const submitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            router.push(`/products?keyword=${keyword}`)
        } else {
            router.push(`/products`)
        }
        console.log(keyword)
    }

 

    return (
        <header className="bg-[#060404] fixed top-0 left-0 right-0 z-50">

            <nav className="hidden  md:flex container items-center  mt-4 mb-2 justify-between">

                <div className="flex cursor-pointer ">
                    <Link href="/"><a><h1 className="text-[#9ee9e9] font-Quintessential text-[30px] ">EStore</h1></a></Link>
                </div>

                <Link href="/products">
                    <a>
                        <div className="flex space-x-3 cursor-pointer text-white/70 hover:text-white">
                            <h1 className=" text-lg hidden lg:block">Products </h1>
                            <div><FormatListBulletedIcon className="text-2xl" /></div>
                        </div>
                    </a>
                </Link>
                
  
                <div className=" w-[35%] flex  cursor-pointer"
                    // onClick={() => { dispatch(setModalState(true)) }}
                >
                    <form className="relative flex flex-col justify-center w-full"
                        onSubmit={submitHandler}
                    >
                        <input
                            className="py-2 pl-12 pr-2 border bg-black text-white  rounded-md outline-none  focus:border-blue-500"
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


              


                <div className="flex items-center space-x-10 font-light ">
                    <Link href="/cart">
                        <a>
                            <div className="flex space-x-3 cursor-pointer text-white/70 hover:text-white">
                                <h1 className="text-lg hidden lg:block ">Cart</h1>
                                <ShoppingCartIcon className="text-2xl text-[#FFA801]" />
                            </div>
                        </a>
                    </Link>
                    
                    {
                        user && user.role === 'admin' && <div>
                            <Link href="/admin/dashboard">
                                <a><h1>ADMIN</h1></a>
                            </Link>
                        </div>
                    }
                    { user ?
                        (<Link href="/user/dashboard">
                            <a>
                                <div className="flex items-center space-x-3 cursor-pointer">
                                    <div
                                        className=" w-[35px] h-[35px] bg-[#060404] rounded-full "
                                    >
                                        <img src={user.imageUrl} className="h-full w-full object-cover rounded-full" alt="profile" />
                                    </div>
                                    <h1 className="text-lg hidden lg:block text-white/70 hover:text-white">{ user.name }</h1>
                                </div>
                            </a>
                        </Link>) :
                        (<div>
                            <div className="flex items-center border border-white rounded-full py-1 px-4 cursor-pointer">
                                <h1 className="text-lg"><Link href="/auth/signin"><a>SignIn</a></Link></h1>
                            </div>
                        </div>)
                    }
                   
                </div>
            </nav>

            <nav className="md:hidden  container flex items-center mb-1  mt-2 justify-between">
                <div className=" cursor-pointer ">
                    <Link href="/"><a><h1 className="text-[#9ee9e9] !font-Quintessential !text-2xl ">EStore</h1></a></Link>
                </div>

                <div className="flex items-center space-x-6 sm:space-x-10">
                    <div>
                        <Link href="/products">
                            <a>
                                <FormatListBulletedIcon className="text-2xl text-white/70 hover:text-white cursor-pointer" />
                            </a>
                        </Link>
                    </div>
                    <div>
                        <SearchIcon className="text-2xl text-white/70 hover:text-white cursor-pointer" />
                    </div>
                    <div>
                        <Link href="/cart">
                            <a>
                                <ShoppingCartIcon className="text-2xl text-[#FFA801]/90 hover:text-[#FFA801] cursor-pointer" />
                            </a>
                        </Link>
                    </div>
                    <div>
                        { user ?
                            (<Link href="/user/dashboard">
                               <a>
                                    <div className=" w-[35px] h-[35px] bg-[#060404] rounded-full ">
                                        <img src={user.imageUrl} className="h-full w-full object-cover rounded-full" alt="profile" />
                                    </div>
                                </a>
                            </Link>) :
                            (
                                <div className="flex items-center border border-white rounded-full py-[2px] px-2">
                                    <h1 className="text-sm"><Link href="/auth/signin"><a>SignIn</a></Link></h1>
                                </div>
                            )}
                    </div>
                </div>
            </nav>
    </header>

    )
}

export default Header
