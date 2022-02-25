import Link from "next/link"
import { useState } from "react"
import {useDispatch, useSelector} from "react-redux"
import { postRegister } from "../../redux/features/register"
import { useRouter } from 'next/router'
import GoogleIcon from '@mui/icons-material/Google';
import { signIn } from "next-auth/react";


const SignUp = ({providers}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [imageUrl, setImageUrl] = useState('')
    const [password, setPassword] = useState('')

    console.log(providers)

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading } = useSelector(state => state.register)
    
    const handleSubmit = (e) => {
        e.preventDefault()

        dispatch(postRegister({ name, email, password, imageUrl })).then(result => {
            if (!result.error) {
                router.push('/auth/signin')
            }
        })
    }





    return (
        <div className="font-Poppins relative bg-[#060404] text-white w-screen h-screen !overflow-x-hidden ">

            <section className=" bg-white  w-full h-[1000px] !z-30">
                <div className=" absolute left-8 md:left-20 right-8 md:right-20 md: !z-40  pt-16 !overflow-hidden">
                    <div className="flex flex-col-reverse md:grid md:grid-cols-1 lg:grid-cols-2 md:gap-20 ">
                        <div className="text-white flex flex-col mt-10 md:mt-0 items-end md:items-start xl:items-center md:pl-20 md:pr-56 lg:p-5 xl:p-8 space-y-3">
                            <h1 className="xl:text-xl lg:text-lg sm:text-base text-sm tracking-widest font-light">Already a User?</h1>
                            <p className=" tracking-wide sm:text-xs text-[10px] max-w-[250px] md:max-w-full lg:text-sm font-light text-right md:text-left xl:text-center">Login to have access to hundreds of products across the world, from the best sellers</p>
                            <div className="border border-white text-white py-2 px-3 lg:px-4 xl:px-5 rounded-full cursor-pointer">
                                <Link href="/auth/signin"><a><h1 className="text-center sm:text-xs text-[10px] lg:text-sm">LOGIN</h1></a></Link>
                            </div>
                        </div>
                        <div className="text-black flex flex-col justify-center lg:p-5 xl:p-8  lg:space-y-3 xl:space-y-3 
                                        md:grid md:grid-cols-3 lg:flex md:pl-20 lg:pl-5 md:items-center lg:items-stretch">

                            <div className="col-span-2">
                                <h1 className="lg:text-2xl xl:text-3xl md:text-xl font-medium text-center ">Register</h1>
                                <form onSubmit={handleSubmit}>
                                    <div className="space-y-5 lg:p-3 ">
                                        <div>
                                            <label htmlFor="name" className="block md:text-sm xl:text-[15px] mb-2 ">Name</label>
                                            <input
                                                type="name"
                                                name="name"
                                                placeholder="name"
                                                className="w-full px-3 py-2 md:text-xs xl:text-sm  border border-black/60 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                                value={name}
                                                onChange={(e) => {setName(e.target.value)}}
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block md:text-sm xl:text-[15px] mb-2 ">Email address</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="email"
                                                className="w-full px-3 py-2 md:text-xs xl:text-sm  border border-black/60 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                                value={email}
                                                onChange={(e) => { setEmail(e.target.value) }} />
                                        </div>
                                        <div>
                                            <label htmlFor="imageUrl" className="md:text-sm text-[15px] ">ImageUrl</label>
                                            <input
                                                type="url"
                                                name="url"
                                                placeholder="url"
                                                className="w-full px-3 py-2 md:text-xs xl:text-sm border border-black/60 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                                value={imageUrl}
                                                onChange={(e) => { setImageUrl(e.target.value) }} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between mb-2">
                                                <label htmlFor="password" className="md:text-sm text-[15px] ">Confrim Password</label>
                                            </div>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="password"
                                                className="w-full px-3 py-2 md:text-xs xl:text-sm border border-black/60 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
                                                value={password}
                                                onChange={(e) => { setPassword(e.target.value) }} />
                                        </div>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <button id="signup" type='submit'
                                            className=" text-sm border border-black bg-black text-white my-2 py-2  px-4 rounded-full cursor-pointer text-center">
                                            {loading ? "loading..." : "SIGN UP"}
                                        </button>
                                    </div>
                                    
                                </form>
                            </div>

                            <div className="flex flex-col space-y-5">
                                <h1 className="text-center md:text-xl lg:text-base  ">Or <span className="md:hidden lg:block ml-2"> Sign in with social platforms</span> </h1>
                                <div className="flex items-center justify-center space-x-2
                                    md:flex-col md:space-y-2 lg:flex-row lg:space-y-0">
                                    <div
                                        className="flex items-center justify-center border border-black/70 rounded-full p-2 cursor-pointer "
                                        onClick={() => signIn(providers.google.id, { callbackUrl: "/" })}
                                    >
                                        <GoogleIcon className="text-xl" />
                                    </div>
                                    <div className="flex items-center justify-center border border-black/70 rounded-full p-2 cursor-pointer">
                                        <ion-icon name="logo-facebook" className="text-xl"></ion-icon>
                                    </div>
                                    <div className="flex items-center justify-center border border-black/70 rounded-full p-2 cursor-pointer">
                                        <ion-icon name="logo-twitter" className="text-xl"></ion-icon>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="hidden lg:block absolute !z-40 bottom-[400px] lg:left-[300px] xl:left-[400px] !overflow-hidden">
                    <img src="../img/log.svg" className="
                    xl:w-[350px] xl:h-[350px] 
                    lg:w-[350px] lg:h-[350px] " alt="log" />
                </div> */}
            </section>



            <div
                className="!z-0 absolute bg-[#060404] !overflow-hidden w-[1800px] h-[1800px] lg:w-[1500px] lg:h-[1500px] rounded-[50%] 
                        lg:top-[-600px] 
                        md:top-[-1500px]
                        bottom-[-1250px]
                        left-[-400px]

                        md:left-[-550px] lg:left-[-930px] xl:left-[-800px] ">
            </div>
        </div>
    )
}

export default SignUp


