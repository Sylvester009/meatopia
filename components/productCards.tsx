// components/ProductCard.tsx
import { Product } from "@/data/product";
import Link from "next/link";
import { useCart } from "@/context/CartContext";


interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
      <Link href={`/product/${product.id}`}>
      <div className="relative w-full aspect-4/3 overflow-hidden">
        {product.tag && (
          <div className={`absolute top-3 ${product.tag === "Best Value" ? "right-3" : "left-3"} z-10`}>
            <span 
              className={`text-[10px] font-black uppercase px-2 py-1 rounded ${
                product.tagColor === "primary" 
                  ? "bg-primary text-[#162210]" 
                  : product.tagColor === "gold"
                  ? "bg-yellow-500 text-white"
                  : "bg-[#131811] text-white"
              }`}
            >
              {product.tag}
            </span>
          </div>
        )}
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
          style={{
            backgroundImage: `url("${product.image}")`,
          }}
        ></div>
      </div>
      </Link>
      <div className="p-5 flex flex-col gap-1">
        <p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
          {product.category}
        </p>
        <h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
          {product.name}
        </h3>
        <p className="text-[#6f8961] text-sm font-normal mb-3">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
          <span className="text-[#131811] text-xl font-black">₦{product.price.toLocaleString()}</span>
          <button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors cursor-pointer"
          onClick={() => addToCart(product)}>
            <span className="material-symbols-outlined">add_shopping_cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}