import { useProductContext } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductContainer() {
    const { products } = useProductContext();

    return (
        <>
            <a className="p-2 m-2 rounded-full bg-red-500 text-white" href="https://github.com/Yash8452/online-restaurant-service" target="_blank" >Click to visit  source code</a>
            <div>
                {products && products.length > 0 ? (
                    <div className="flex flex-wrap gap-4">
                        {products.map((product, index) => (
                            <div className="" key={index}>
                                <ProductCard product={product} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <p>please wait...</p>
                )}
            </div>
        </>
    );
}
