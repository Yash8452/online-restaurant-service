"use client";
import { useOrderContext } from "@/contexts/OrderContext";
import { useProductContext } from "@/contexts/ProductContext";
import ProductUpdateForm from "./ProductUpdateForm";


export default function ProductCard({ product }) {
    const { deleteProduct } = useProductContext()
    const { addOrder } = useOrderContext()
    return (
        <>
        {product ? (<>
        
        
            <div className="w-[300px] rounded-md border border shadow-2xl">
                <div className="p-4">
                    <h1 className="text-lg font-semibold">{product.name}</h1>
                    <p className="mt-3 text-sm text-gray-600">
                        Price : ₹ {product.price}
                    </p>
                    <div className="flex flex-wrap  justify-end gap-1 items-center">
                        <button
                            onClick={() => deleteProduct(product._id)}
                            className="m-2 mt-4 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            DELETE
                        </button>
                        <ProductUpdateForm id={product._id} />
                        <button
                            onClick={() => addOrder(product._id)}
                            className="m-2 mt-4 rounded-full bg-black px-2.5 py-1 text-[10px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                        >
                            Buy
                        </button>

                    </div>
                </div>
            </div>
        </>) : null}
            
        </>
    )
}