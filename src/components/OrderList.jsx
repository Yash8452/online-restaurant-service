"use client";
import { useOrderContext } from "@/contexts/OrderContext";
import { ShoppingCart } from "lucide";
import { useState } from "react";

export default function () {
    const { orders } = useOrderContext()
    const [isModalOpen, setIsModalOpen] = useState(false);

    console.log(orders)
    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Function to calculate the total price of all products
    const getTotalPrice = () => {
        let totalPrice = 0;
        orders.forEach(order => {
            totalPrice += order.product_id.price;
        });
        return totalPrice;
    };

    return (
        <div>
            {/* Modal toggle */}
            <button className="flex m-2 mt-4 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                onClick={toggleModal} type="button">
                    Orders : 
                <strong className="bg-yellow-500 rounded-full pl-1 pr-1"> {orders.length}</strong>
            </button>
            {/* Main modal */}
            {isModalOpen && (
                <div id="default-modal" tabIndex={-1} aria-hidden="true" className="fixed inset-0 z-50 overflow-y-auto bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative  p-4 w-full max-w-2xl">
                        {/* Modal content */}
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            {/* Modal header */}
                            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                    List of order
                                </h3>
                                <button type="button" onClick={toggleModal} className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                    </svg>
                                    <span className="sr-only">Close modal</span>
                                </button>
                            </div>
                            {/* Modal body */}
                            <div className="p-4 md:p-5  space-y-4">

                                <ul className="divide-y divide-gray-200">
                                    {orders && orders.length === 0 ? (
                                        <li className="p-4 text-center text-gray-500">No orders placed yet</li>
                                    ) : (
                                        orders.map((order) => (
                                            <li key={order._id} className="flex items-center justify-between p-4">
                                                <span className="text-sm font-medium">{order.product_id.name}</span>
                                                <span className="text-sm font-medium">₹{order.product_id.price}</span>
                                            </li>
                                        ))
                                    )}
                                </ul>


                            </div>
                            <div className="p-4 font-semibold">
                                <h2 className="text-right">Total Price: ₹ {getTotalPrice().toFixed(2)}</h2>
                            </div>
                            {/* Modal footer */}
                            <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                                <button onClick={toggleModal} className="text-white bg-yellow-700 hover:bg-yellow-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-yellow-600 dark:hover:bg-yellow-700 dark:focus:ring-yellow-800">
                                    Proceed to Pay
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
