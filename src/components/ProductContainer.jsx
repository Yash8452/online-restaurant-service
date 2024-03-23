import { useProductContext } from "@/contexts/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
    const { products } = useProductContext();

    return (
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
    );
}
