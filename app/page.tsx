export default function Home() {
	return (
		<div className="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
			<div className="layout-container flex h-full grow flex-col">
				
				<main className="px-4 lg:px-20 py-8 mx-auto w-full">
					<div className="mb-8 mt-4">
						<div className="flex items-center gap-2 text-xs text-[#6f8961] mb-2 uppercase tracking-widest font-bold">
							<span>Shop</span>
							<span className="material-symbols-outlined text-[12px]">chevron_right</span>
							<span className="text-primary">Catalog</span>
						</div>
						<h1 className="text-[#131811] tracking-tight text-4xl font-extrabold">
							Meatopia Premium Catalog
						</h1>
						<p className="text-[#6f8961] mt-2 max-w-xl">
							Fresh, premium quality meats sourced locally. Ethically processed and delivered to your
							doorstep across Nigeria.
						</p>
					</div>
					<div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-white p-2 rounded-xl border border-[#e2e8e2]">
						<div className="flex gap-2 flex-wrap">
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-[#162210] font-bold text-sm shadow-sm">
								<span>All Meats</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Beef</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Goat Meat</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Chicken</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Turkey</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Rabbit</span>
							</button>
							<button className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#eef2ee] px-4 text-[#131811] font-medium text-sm hover:bg-[#e2e8e2] transition-colors">
								<span>Meat Sharing</span>
							</button>
						</div>
						<div className="items-center gap-2 px-2 border-l border-[#e2e8e2] hidden md:flex">
							
						</div>
					</div>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div className="absolute top-3 left-3 z-10">
									<span className="bg-primary text-[#162210] text-[10px] font-black uppercase px-2 py-1 rounded">
										Popular
									</span>
								</div>
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k")',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">Beef</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									Boneless Beef
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Freshly cut | Per Kilogram
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦8,500</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div className="absolute top-3 left-3 z-10">
									<span className="bg-[#131811] text-white text-[10px] font-black uppercase px-2 py-1 rounded">
										Nigerian Breed
									</span>
								</div>
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuChJIkEqLxquKnKL72P3ytDdGwCZzlGptR7pjVVW0ciTgT5zJccPz-XRr1YJ_SugCWDJmWgg6QA1JZCy-wrqCQ5CmPQYftsS47uJ-j5LmtsPJOLnhbQpX8zLsiRxL78OUeQq7eJaRvLV53g20M4UiOQ6EdYln8zXmRjlQQcEXVFXGLWFecD5e4FYu9ZrhrC2gt8dDqvoOgCU3FbzsHmNuzKmmeEIbDNflvRuspaa3rVqnI4LNjSrTHvPbFz9mQxSTRIS1vp2SOZxY0");',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
									Goat Meat
								</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									Goat Meat Ogunfe
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Tender | Smoked option available
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦9,500</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU");',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
									Chicken
								</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									Chicken Laps
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Soft &amp; Juicy | Per Kilogram
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦6,000</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAqSbUvChYiM27CmzrVXqE1GKnxhGgLmRJB3PmnLvFufNcECvgJyDyVcajmPx1oYyNKsvhVuZ_AG58t8H68Mcfwlzpu1PFyd7oEF2SnhRu_EjkcPnoILDnPHJWk2WMSTFieOTZSHTUm7FPkK_v1uC6lHbSmzJbgn1ve9d8r9NVjtte2lCG4P9Ai10quosOLBQx3U_5L9YrLW6gTstOo0XRdMSbmpTg3TyOgaJYOV58KLvTy6j89bguBa_dykuGWOAKXRfsb2pEfMS8");',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">Turkey</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									Turkey
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Premium Imported Cuts | Per kg
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦8,400</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDO1aevUSMhttu9j6Ao75m_cUwx3HJ7FRmk3jPGRTICSMzN_gSd4cPecZnLO6oIvQQljQBINYraE3mUd7mpNr1kldJVzh7afGbRcBKBX6FEVEpCStvTuu1Mx-uOve1ePYgjth_9D3WTDJVfvkswMKBDnLVt0PULVL8pl1hqksXNcglCGyLw5nyQ2CS6Qq4Q_E5zB8PHSYVkeF11ulap6alh9nwShjLeA3cLVS2xxXJCZujO8xs9_e1-ijmusyTrGhfy1N5cMwY9tJs");',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
									Rabbit Meat
								</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									Rabbit Meat
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Lean Protein | Farm Raised
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦12,000</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-0 bg-white rounded-xl border border-[#e2e8e2] overflow-hidden group hover:shadow-xl transition-all hover:-translate-y-1">
							<div className="relative w-full aspect-4/3 overflow-hidden">
								<div className="absolute top-3 right-3 z-10">
									<span className="bg-primary text-[#162210] text-[10px] font-black uppercase px-2 py-1 rounded">
										Best Value
									</span>
								</div>
								<div
									className="w-full h-full bg-center bg-no-repeat bg-cover transition-transform duration-500 group-hover:scale-110"
									style={{
										backgroundImage:
											'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDC71WQ3k-TkwGQ0RxevEm70Ggr-OaBsIXaagDSPzO5brxzVJ89kECOcMF4lalabAHsnWVR9h-BEs508Cudh6CUGrpRUX_5OnUqoXCs9TgKA2w77_ouop3kMmCL1bikqPa2vRjm0FcLe0XN5bIe910Fh17QUKsv9B_9ENiwLKfgI7A1_mURzzIK2YGrRaL_6MMAZQN2TJ0Yl9acRaNflQyQ11WNNSkESSmdrXi3WA94pNpx754yjIc3Et0Tx9yafdb9QbNHcGqooOY");',
									}}
								></div>
							</div>
							<div className="p-5 flex flex-col gap-1">
								<p className="text-[#6f8961] text-[10px] font-bold uppercase tracking-widest">
									Meat Sharing
								</p>
								<h3 className="text-[#131811] text-lg font-bold leading-tight group-hover:text-primary transition-colors">
									1/16 Cow Sharing
								</h3>
								<p className="text-[#6f8961] text-sm font-normal mb-3">
									Assorted Cuts | Communal Sharing
								</p>
								<div className="flex items-center justify-between mt-auto pt-4 border-t border-[#f2f4f0]">
									<span className="text-[#131811] text-xl font-black">₦62,500</span>
									<button className="flex items-center justify-center bg-primary hover:bg-primary/80 text-[#162210] p-2 rounded-lg transition-colors">
										<span className="material-symbols-outlined">add_shopping_cart</span>
									</button>
								</div>
							</div>
						</div>
					</div>
					
				</main>
				<footer className="mt-20 border-t border-[#e2e8e2] bg-white py-12 px-4 lg:px-20">
					<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
						<div className="flex flex-col gap-4">
							<div className="flex items-center gap-3">
								<div className="size-8 bg-primary rounded flex items-center justify-center text-[#162210]">
									<span className="material-symbols-outlined text-lg font-bold">restaurant</span>
								</div>
								<h2 className="text-[#131811] text-xl font-bold">Meatopia</h2>
							</div>
							<p className="text-[#6f8961] text-sm leading-relaxed">
								Nigeria&apos;s premium meat hub. Quality, ethics, and transparency in every cut.
							</p>
						</div>
						<div>
							<h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Explore</h4>
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
							<h4 className="font-bold mb-4 uppercase text-xs tracking-widest text-primary">Support</h4>
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
							© 2024 Meatopia Premium Meats. All prices in Nigerian Naira (₦). Sourced ethically from
							local farms.
						</p>
					</div>
				</footer>
			</div>
		</div>
	);
}
