"use client";
import OrderList from "@/components/OrderList";
import ProductContainer from "@/components/ProductContainer";
import ProductForm from "@/components/ProductForm";
import { useOrderContext } from "@/contexts/OrderContext";
import { useProductContext } from "@/contexts/ProductContext";

export default function Home() {
  const { addProduct } = useProductContext()

  return (
    <>
      <header className=" border-b flex h-[10vh] justify-around items-center">
        <span className="font-bold">SYSTEM</span>
        <div className=" flex gap-2">

          <ProductForm handle={addProduct} btntext={`Add a product`} />
          <OrderList />
        </div>
      </header>
      <main className="flex h-[90vh] flex-col items-center justify-between p-14">
        <ProductContainer />
      </main>
    </>
  );
}
