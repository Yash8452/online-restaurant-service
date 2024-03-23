"use client";
import { useProductContext } from "@/contexts/ProductContext";
import { useState } from "react";

export default function ProductForm() {
    const { addProduct } = useProductContext()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productData, setProductData] = useState({
        name: "",
        price: ""
    })
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevProductData => ({
            ...prevProductData,
            [name]: value
        }));
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        try {
            addProduct(productData)
            setProductData({
                name: "",
                price: ""
            })
        } catch (error) {
            console.log("Error added product", error)
        } finally {
            setProductData({
                name: "",
                price: ""
            })
        }
    }




    return (
        <div>
            {/* Modal toggle */}
            <button className="m-2 mt-4 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={toggleModal}>
                Add a product
            </button>
            {/* Main modal */}
            {isModalOpen && (
                <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative p-4 w-full max-w-2xl">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    Add a product
                                </h3>
                                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5 space-y-4">
                                <form >
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="name" className="text-base font-medium text-gray-900">
                                                Product Name
                                            </label>
                                            <div className="mt-2">
                                                <input name="name" value={productData.name} onChange={handleOnChange} className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="text" placeholder="Product name..." />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="space-y-5">
                                        <div>
                                            <label htmlFor="price" className="text-base font-medium text-gray-900">

                                                Product Price
                                            </label>
                                            <div className="mt-2">
                                                <input name="price" value={productData.price} onChange={handleOnChange} className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50" type="number" placeholder="Product price..." />
                                            </div>
                                        </div>
                                    </div>


                                </form>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={handleAddProduct} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    ADD
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
