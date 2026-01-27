"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";

export default function Header() {
  const { totalItems } = useCart();
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-solid border-[#e2e8e2] px-4 lg:px-20 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-3 shrink-0">
            <div className="size-10 bg-primary rounded-lg flex items-center justify-center text-[#162210]">
              <span className="material-symbols-outlined font-bold text-2xl">
                restaurant
              </span>
            </div>
            <h2 className="text-[#131811] text-2xl font-bold leading-tight tracking-tight">
              Meatopia
            </h2>
          </div>
          <div className="hidden md:flex flex-1 max-w-md">
            <label className="flex flex-col w-full h-10">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#eef2ee]">
                <div className="text-[#6f8961] flex items-center justify-center pl-4">
                  <span className="material-symbols-outlined text-[20px]">
                    search
                  </span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 border-none bg-transparent focus:ring-0 text-sm font-normal placeholder:text-[#6f8961]"
                  placeholder="Search Beef, Goat, Poultry..."
                  value=""
                />
              </div>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/checkout" className="relative">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f2f4f0] text-[#131811]">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[#162210] text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
