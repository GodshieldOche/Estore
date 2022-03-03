import Image from "next/image"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { postAudio, postProduct } from "../../../redux/features/createProduct"
import { useRouter } from 'next/router'

const NewProduct = () => {
    const [name, setName ] = useState('')
    const [price, setPrice ] = useState(0)
    const [description, setDescription ] = useState('')
    const [category, setCategory ] = useState('')
    const [brand, setBrand ] = useState('')
    const [countInStock, setCountInStock ] = useState('')


    const [audio, setAudio ] = useState(null)


    const [images, setImages ] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch()
    const router = useRouter()
    const { loading } = useSelector(state => state.createProduct)
    

    const handleSubmit = (e) => {
        e.preventDefault()

        const productData = {
            name, price, description, category, brand, countInStock, images
        }

        dispatch(postProduct(productData)).then(result => {
            if (!result.error) {
                router.push('/admin/dashboard')
            } else {
                console.log(result.error)
            }
        })

    }
    

    const onChange = (e) => {
        const files = Array.from(e.target.files)

        setImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file)

            
        })
    }


    const handleAudio = (e) => {
        e.preventDefault()
        dispatch(postAudio({ audio })).then(result => {
            console.log(result)
        })
    }

    

    return (
        <div className="container mt-32 ">
            <div className=" lg:hidden flex justify-center ">
                <h1> USE DESKTOP TO OPERATE AS AN ADMIN</h1>
            </div>
            <div className="hidden lg:block max-w-screen-md mx-auto p-10 border border-white/60  bg-black ">
                <div className="flex flex-col ">
                    <h1 className="!text-center text-2xl">NEW ROOM</h1>
                    <form action="" className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <label htmlFor="name" className=" ">Name</label>
                                <input
                                    type="name"
                                    name="name"
                                    className="w-full px-3 py-2 text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    value={name}
                                    onChange={(e) => { setName(e.target.value) }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="name" className=" ">Price</label>
                                <input
                                    type="number"
                                    name="price"
                                    className="w-full px-3 py-2 text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    value={price}
                                    onChange={(e) => { setPrice(e.target.value) }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="email" className="  ">Description</label>
                                <textarea
                                    className="w-full text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    rows="8"
                                    value={description}
                                    onChange={(e) => { setDescription(e.target.value) }}
                                >
                                </textarea>
                            </div>
                            <div className="space-y-2 flex flex-col">
                                <label htmlFor="category_field">Category</label>
                                <select
                                    className="w-full px-3 py-2 text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    id="room_type_field"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    {
                                        ['supermarket', 'health', 'beauty', 'home', 'office', 'phones', 'tablets',
                                            'computing', 'electronics', 'fashion', 'baby', 'gaming', 'sporting', 'automobile'
                                        ].map(category => (
                                            <option key={category} value={category}>{ category }</option>
                                        ))
                                    }
                                </select>
                            </div>
                            
                            <div className="space-y-2">
                                <label htmlFor="brand" className=" ">Brand</label>
                                <input
                                    type="Brand"
                                    name="Brand"
                                    className="w-full px-3 py-2 text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    value={brand}
                                    onChange={(e) => { setBrand(e.target.value) }}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="countinstock" className=" ">Count In Stock</label>
                                <input
                                    type="number"
                                    name="countinstock"
                                    className="w-full px-3 py-2 text-sm bg-black  border border-white/60 focus:outline-none focus:ring-1 focus:ring-white"
                                    value={countInStock}
                                    onChange={(e) => { setCountInStock(e.target.value) }}
                                />
                            </div>
                            <div className=" flex flex-col space-y-3">
                                <label htmlFor="formFileMultiple" className="form-label inline-block mb-2">Multiple files input example</label>
                                <input className="form-control
                                    block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-black bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0
                                    focus:text-gray-700 focus:border-blue-600 focus:outline-none"
                                    type="file"
                                    id="formFileMultiple"
                                    onChange={onChange}
                                    multiple
                                />
                                <div className="flex !space-x-3 p-2 bg-blue-600">
                                    {imagesPreview.map(img => (


                                        <Image
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}
                                </div>
                              
                            </div>
                        </div>


                        <div className="flex justify-center items-center">
                            <button id="create-product" type='submit'
                                className=" flex items-center bg-blue-900 justify-center py-2 px-10 cursor-pointer rounded-lg text-center">
                                {loading ? "loading..." : "CREATE"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>

{/* test */}
            {/* <form onSubmit={handleAudio} className='custom-file' encType="multipart/form-data">
                <input
                    type='file'
                    name='avatar'
                    className='custom-file-input'
                    id='customFile'
                    onChange={(e) => {
                        setAudio(e.target.files[0])

                       
                    }}
                />
                <label className='custom-file-label' htmlFor='customFile'>
                    Choose Music
                </label>
                <button id="create-audio" type='submit'
                    className=" flex items-center bg-blue-900 justify-center py-2 px-10 cursor-pointer rounded-lg text-center">
                    SUBMIT
                </button>
            </form> */}

        </div> 
    )
}

export default NewProduct
