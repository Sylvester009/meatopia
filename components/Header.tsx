"use client";

import Link from "next/link";

import { useCart } from "@/context/CartContext";
import { useSearch } from "@/context/SearchContext";
import Image from "next/image";

export default function Header() {
  const { totalItems } = useCart();
  const { searchTerm, setSearchTerm } = useSearch();
  console.log("Header searchTerm:", searchTerm);

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-solid border-[#e2e8e2] px-4 lg:px-20 py-4">
      <div className="max-w-8xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-8 flex-1">
          <div className="flex items-center gap-3 shrink-0">
            <div className="size-7
             bg-primary/70 rounded-lg flex items-center justify-center">
              <Image 
              src="https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg"
              alt="logo"
              width={120}
              height={120}
              className="rounded-lg"
              />
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
                <input className="form-input flex w-full min-w-0 flex-1 bg-transparent border-none outline-none focus:outline-none focus:ring-0 
                text-md font-medium placeholder:text-[#6f8961] text-[#131811]"
                placeholder="Search Beef, Goat, Poultry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />

              </div>
            </label>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3">
            <Link href="/checkout" className="relative">
              <button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#f2f4f0] text-[#131811] cursor-pointer">
                <span className="material-symbols-outlined">shopping_cart</span>
              </button>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-[#162210] text-xs font-bold px-1.5 py-0.5 rounded-full">
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
