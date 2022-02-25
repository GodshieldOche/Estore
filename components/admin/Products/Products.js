import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAdminProducts } from "../../../redux/features/adminProducts"
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from 'react-toastify';
import { fabClasses } from "@mui/material";


const Products = () => {

    const dispatch = useDispatch()

    const { loading, products, message } = useSelector(state => state.adminProducts)

    useEffect(() => {
        dispatch(getAdminProducts()).then(result => {
            if (!result.error) {
                toast.success('working')
            }
        })
    }, []) 



    


    return (
        <div className="px-4 py-2 bg-[#060404] h-screen lg:w-full z-10">
            <div className="container flex-col m-5 z-40 space-y-10">

                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl"> {`${products.length} Products` } </h1>
                    </div>
                    <div className="flex items-center bg-blue-900 justify-center py-2 px-3 cursor-pointer rounded-lg">
                        <Link href="/admin/products/new">
                            <a>CREATE PRODUCT</a>
                        </Link>
                    </div>
                </div>


                <div className="flex flex-col">
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="bg-black text-white border border-white/30">
                                        <tr className="">
                                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left border-r border-white/30">
                                                Product ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left border-r border-white/30">
                                                Name
                                            </th>
                                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left border-r border-white/30">
                                                Price
                                            </th>
                                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left border-r border-white/30">
                                                Category
                                            </th>
                                            <th scope="col" className="text-sm font-medium px-6 py-4 text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-black text-white">
                                        {
                                            products && products.map((product, index) => {
                                                let even;
                                                    if (index % 2 == 0) {
                                                        even = true
                                                    } else {
                                                        even = false
                                                    }

                                                return (
                                                    <tr key={product._id} className={` border border-white/30 transition duration-300 ease-in-out hover:bg-gray-700
                                                        ${ even && "bg-gray-900"}`}
                                                    >

                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium  border-r border-white/30">
                                                            {product._id}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {product.name}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {`$${product.price}`}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap border-r border-white/30">
                                                            {product.category}
                                                        </td>
                                                        <td className="text-sm  font-light px-6 py-4 whitespace-nowrap">
                                                            <div className="flex justify-between">
                                                                <Link href={`/admin/products/${product._id}`}>
                                                                    <a >
                                                                        <EditIcon className="text-blue-600" />
                                                                    </a>
                                                                </Link>

                                                                <button
                                                                    className=""
                                                                // onClick={() => deleteproductHandler(product._id, index)}
                                                                >
                                                                    <DeleteIcon className="text-red-600" />
                                                                </button>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>


                
            </div>


            {/* <MDBDataTable
                data={setProducts()}
                className=''
                bordered
                striped
                hover
            /> */}

            
        </div>
    )
}

export default Products
