import type { Metadata } from 'next';
import './globals.css';
import { Work_Sans } from 'next/font/google';

export const metadata: Metadata = {
	title: 'Meatopia',
	description: "Nigeria's premium meat hub",
};

const workSans = Work_Sans({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className="light">
			<body className={workSans.className}>
				<header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-solid border-[#e2e8e2] px-4 lg:px-20 py-4">
					<div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
						<div className="flex items-center gap-8 flex-1">
							<div className="flex items-center gap-3 shrink-0">
								<div className="size-10 bg-primary rounded-lg flex items-center justify-center text-[#162210]">
									<span className="material-symbols-outlined font-bold text-2xl">restaurant</span>
								</div>
								<h2 className="text-[#131811] text-2xl font-bold leading-tight tracking-tight">
									Meatopia
								</h2>
							</div>
							<div className="hidden md:flex flex-1 max-w-md">
								<label className="flex flex-col w-full h-10">
									<div className="flex w-full flex-1 items-stretch rounded-lg h-full bg-[#eef2ee]">
										<div className="text-[#6f8961] flex items-center justify-center pl-4">
											<span className="material-symbols-outlined text-[20px]">search</span>
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
								<button className="flex items-center justify-center rounded-lg h-10 w-10 bg-[#eef2ee] hover:bg-primary transition-all group">
									<span className="material-symbols-outlined text-[#131811] group-hover:text-black">
										shopping_cart
									</span>
								</button>
								
							</div>
						</div>
					</div>
				</header>
				{children}
			</body>
		</html>
	);
}
