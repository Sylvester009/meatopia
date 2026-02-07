import Image from "next/image";

export default function Footer (){
    return(
        <footer className="mt-20 border-t border-[#e2e8e2] bg-white py-12 px-4 lg:px-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="size-6
                             bg-primary/70 rounded-lg flex items-center justify-center">
                              <Image 
                              src="https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg"
                              alt="logo"
                              width={100}
                              height={100}
                              className="rounded-lg"
                              />
                            </div>
                <h2 className="text-[#131811] text-xl font-bold">Meatopia</h2>
              </div>
              <p className="text-[#6f8961] text-sm leading-relaxed">
                Nigeria&apos;s premium meat hub. Quality, ethics, and
                transparency in every cut.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">
                Explore
              </h4>
              <ul className="flex flex-col gap-2 text-sm text-[#6f8961]">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Beef &amp; Goat
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Poultry Selections
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Meat Sharing Bundles
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Wholesale Inquiries
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">
                Support
              </h4>
              <ul className="flex flex-col gap-2 text-sm text-[#6f8961]">
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Delivery Coverage
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Refund Policy
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="hover:text-primary transition-colors" href="#">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">
                Newsletter
              </h4>
              <div className="flex gap-2">
                <input
                  className="bg-[#f2f4f0] py-2 px-1 border-none rounded-lg text-sm flex-1 focus:ring-primary"
                  placeholder="Enter email"
                  type="email"
                />
                <button className="bg-primary text-[#162210] font-bold px-4 rounded-lg text-sm">
                  Join
                </button>
              </div>
              <div className="flex gap-4 mt-6">
                <span className="material-symbols-outlined text-[#6f8961] hover:text-primary cursor-pointer">
                  social_leaderboard
                </span>
                <span className="material-symbols-outlined text-[#6f8961] hover:text-primary cursor-pointer">
                  camera
                </span>
                <span className="material-symbols-outlined text-[#6f8961] hover:text-primary cursor-pointer">
                  play_circle
                </span>
              </div>
            </div>
          </div>
          <div className="max-w-7xl mx-auto pt-12 mt-12 border-t border-[#f2f4f0] text-center">
            <p className="text-xs text-[#6f8961]">
              © 2024 Meatopia Premium Meats. All prices in Nigerian Naira (₦).
              Sourced ethically from local farms.
            </p>
          </div>
        </footer>
    )
}