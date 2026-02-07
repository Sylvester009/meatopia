/* eslint-disable @typescript-eslint/no-explicit-any */
// app/admin/dashboard/page.tsx
"use client";

import AddProductModal from '@/components/admin/AddProductModal';
import EditProductModal from '@/components/admin/EditProductModal';
import DeleteProductModal from '@/components/admin/DeleteProductModal';
import Image from "next/image";


import { useState } from 'react';

const products = [
    {
      id: 1,
      name: 'Ribeye Wagyu Steak',
      sku: 'MEA-001-BEEF',
      category: 'Beef',
      price: 25500,
      stock: 85,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBNNHgBvtJtqRIIMeDkACNBIOd3L83OuJyFV5oJOC3jt1Xr82aOMUBuo2sevQtV7e_orP2H-c0WIwrC5wgRWkQzm4g_tH9FLOarlO2qYz709zK_9Gm613kDsKgPWgs892k-r03GUjhcCwKWTAex7Rwqku_PqRt7U-hOYefKfnZY0ph_XeahSN7ZwnzJggvjeMBRaS1v3cUvEzSVhMymE524RmGPG9aNWQH-xcqAFplpS05Di5-aefdpttp5gTbu3surNE7ikqCQAkU'
    },
    {
      id: 2,
      name: 'Organic Whole Chicken',
      sku: 'MEA-042-POUL',
      category: 'Poultry',
      price: 8200,
      stock: 12,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdqFDiLNEace7qYoykp5FM5h8qhgTf0ASj5trfWUl55mvMxrw-3Htf0r98e712UvSa6w4T96XG8LJI5AnY5UPPeu1X8IJPXgMORtYpSYkZ4HGdgVX8qJonVK6Zbkkpe8XQk7Cka-YhGu_BYGpxiBOTDkhVgpSaCMguUyNP33wNsUvDypguIGPtTLQWpIos_bZ8y1vMRnmcjEH8CWhYk0QIjnU9XjUrb-UkgG84_hDw1FoqA2lG6eDa5gXRHgCxfYncUvGBsMdBEnw'
    },
    {
      id: 3,
      name: 'New Zealand Lamb Chops',
      sku: 'MEA-108-LAMB',
      category: 'Lamb',
      price: 18900,
      stock: 45,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB-zzmi262WNLEM1NpghGHA16_RVW2vnGGv-zPnwvMayMXVQ-GV9UuRrC0BuM6R0BjtpoTGJlVoeMiyvQSnf5rHqMVZ21oBcUY0hTA3rGTVDy2np-uLKIw0TsMXWDaNULjHkwVC6ybbJ_JJPBUgEs9z8wzopi6fk8e_IwArV4rmcnfW4dwt3O8e5MdMr1plaugqb1GroZJRknuqhktjzgfrqU_9VCtDXAhUOphJp54peqbqHGx7FsmNMh7O-H6fxnc5d8rbN-12pXE'
    },
    {
      id: 4,
      name: 'Applewood Smoked Pork',
      sku: 'MEA-221-PORK',
      category: 'Pork',
      price: 12400,
      stock: 68,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdfDW5CAEipfdfkugP2u7aeIr8ZFduRhM6FXzRuujI--zGuw0y7-v6K_a_ZOXtHF2lCtq2Q10cCbrnHEvpS8mgI-mcoREfJeCOQmUehjMZf4LdkrQaPP3aKvBGt_CXZdRV05FCUYkOSTAGiaDmf6WIXLyJFPUJFlS2wagn4rYoFhdcMZQH28HOL6-8UvfHbQ1Y5kM9HpdmfsY4U2yiHntWzZthNofTiBQYlu1SsFsggYL8H0k1uzzCFYVtOkmLFMyuzY1mNErqkeo'
    }
  ];

export default function InventoryDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [product, setProduct] = useState([...products]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);

  const handleAddProduct = (newProduct: any) => {
    // Add the new product to your products list
    setProduct(prev => [newProduct, ...prev]);
    
    // In a real app, you would send this to your backend API
    console.log('New product added:', newProduct);
    
    // Show success message
    alert('Product added successfully!');
  };

   const handleEditClick = (product: any) => {
    setSelectedProduct(product);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (updatedProduct: any) => {
    setProduct(prev => prev.map(p => 
      p.id === updatedProduct.id ? updatedProduct : p
    ));
    alert('Product updated successfully!');
  };

  const handleDeleteClick = (product: any) => {
    setSelectedProduct(product);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setProduct(prev => prev.filter(p => p.id !== selectedProduct.id));
    alert('Product deleted successfully!');
  };


  const categories = ['All', 'Beef', 'Poultry', 'Lamb', 'Pork', 'More'];

  

  const stats = {
    totalProducts: 1240,
    ordersPending: 48,
    ordersCompleted: 856,
    lowStock: 12
  };

  const getStockColor = (stock: number) => {
    if (stock < 20) return 'bg-amber-400';
    if (stock < 50) return 'bg-yellow-400';
    return 'bg-primary';
  };

  const getStockTextColor = (stock: number) => {
    if (stock < 20) return 'text-amber-600';
    if (stock < 50) return 'text-yellow-600';
    return 'text-gray-700';
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6]">
         <AddProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      <EditProductModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        product={selectedProduct}
      />
      
      <DeleteProductModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        product={product}
      />
        <header className="flex items-center justify-between border-b border-[#dfe6db] px-6 py-4 bg-white">
        <div className="flex items-center gap-3">
          <div className="size-6 bg-primary/70 rounded-lg flex items-center justify-center">
                        <Image 
                        src="https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg"
                        alt="logo"
                        width={100}
                        height={100}
                        className="rounded-lg"
                        />
                      </div>
          <h2 className="text-lg font-bold text-gray-800">Meatopia Admin</h2>
        </div>
        <button className="px-4 py-2 bg-primary text-[#162210] text-sm font-bold rounded-lg hover:opacity-90 transition-opacity">
          Support
        </button>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Header */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex-1 min-w-60 bg-white rounded-xl p-6 border border-[#dfe6db] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[#6f8961] text-sm font-medium mb-1">Total Products</p>
              <p className="text-[#131811] text-3xl font-bold">{stats.totalProducts.toLocaleString()}</p>
            </div>
            <div className="bg-primary/20 p-3 rounded-xl text-primary">
              <span className="material-symbols-outlined text-3xl">inventory_2</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-60 bg-white rounded-xl p-6 border border-[#dfe6db] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[#6f8961] text-sm font-medium mb-1">Orders Pending</p>
              <p className="text-[#131811] text-3xl font-bold">{stats.ordersPending}</p>
            </div>
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <span className="material-symbols-outlined text-3xl">pending_actions</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-60 bg-white rounded-xl p-6 border border-[#dfe6db] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[#6f8961] text-sm font-medium mb-1">Orders Completed</p>
              <p className="text-[#131811] text-3xl font-bold">{stats.ordersCompleted}</p>
            </div>
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <span className="material-symbols-outlined text-3xl">task_alt</span>
            </div>
          </div>
          
          <div className="flex-1 min-w-60 bg-white rounded-xl p-6 border border-[#dfe6db] flex items-center justify-between shadow-sm">
            <div>
              <p className="text-[#6f8961] text-sm font-medium mb-1">Low Stock Items</p>
              <p className="text-[#131811] text-3xl font-bold">{stats.lowStock}</p>
            </div>
            <div className="bg-red-100 p-3 rounded-xl text-red-600">
              <span className="material-symbols-outlined text-3xl">warning</span>
            </div>
          </div>
        </div>

        {/* Product Management Section */}
        <div className="bg-white rounded-xl border border-[#dfe6db] shadow-sm overflow-hidden">
          {/* Toolbar */}
          <div className="px-6 py-6 border-b border-[#dfe6db]">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-[#131811]">Product Inventory</h2>
              <button
              onClick={() => setIsModalOpen(true)}
               className="flex items-center justify-center gap-2 bg-primary hover:opacity-90 text-[#162210] px-6 py-3 rounded-lg font-bold transition-all shadow-md active:scale-95">
                <span className="material-symbols-outlined font-bold">add</span>
                Add New Product
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-75">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#6f8961]">search</span>
                <input 
                  className="w-full pl-10 pr-4 py-3 bg-[#f2f4f0] border-none rounded-lg text-sm focus:ring-2 focus:ring-primary/50 text-[#131811]"
                  placeholder="Search product name, SKU..."
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              {/* Categories Chips/Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-xs font-bold rounded-full uppercase tracking-wider transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary text-[#162210]'
                        : 'bg-[#f2f4f0] text-[#6f8961] hover:bg-[#e2e8e2]'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-[#f2f4f0] border-b border-[#dfe6db]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#6f8961] uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6f8961] uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6f8961] uppercase tracking-wider text-right">Price</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6f8961] uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#6f8961] uppercase tracking-wider text-center">Actions</th>
                </tr>
              </thead>
              
              <tbody className="divide-y divide-[#f2f4f0]">
                {product.map((prod) => (
                  <tr key={prod.id} className="hover:bg-[#fafbfa] transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div 
                          className="h-14 w-14 rounded-lg bg-[#f2f4f0] bg-cover bg-center"
                          style={{ backgroundImage: `url('${prod.image}')` }}
                        ></div>
                        <div>
                          <p className="font-semibold text-[#131811]">{prod.name}</p>
                          <p className="text-xs text-[#6f8961] uppercase">SKU: {prod.sku}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 bg-[#f2f4f0] text-[#6f8961] text-xs font-semibold rounded-md">
                        {prod.category}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-right font-bold text-[#131811]">
                      ₦{prod.price.toLocaleString()}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-[#f2f4f0] rounded-full overflow-hidden max-w-25">
                          <div 
                            className={`h-full ${getStockColor(prod.stock)}`}
                            style={{ width: `${Math.min(prod.stock, 100)}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm font-medium ${getStockTextColor(prod.stock)}`}>
                          {prod.stock} units
                        </span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                        onClick={() => handleEditClick(product)}
                        className="p-2 text-[#6f8961] hover:text-primary transition-colors">
                          <span className="material-symbols-outlined text-xl">edit</span>
                        </button>
                        <button
                        onClick={() => handleDeleteClick(product)}
                        className="p-2 text-[#6f8961] hover:text-red-500 transition-colors">
                          <span className="material-symbols-outlined text-xl">delete</span>
                        </button>
                        
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-[#dfe6db]">
            <p className="text-sm text-[#6f8961]">Showing 1 to 10 of {stats.totalProducts.toLocaleString()} results</p>
            <div className="flex items-center gap-2">
              <button 
                className="p-2 bg-[#f2f4f0] text-[#6f8961] rounded-lg hover:text-[#131811] disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              
              {[1, 2, 3].map(page => (
                <button
                  key={page}
                  className={`px-4 py-2 text-sm font-bold rounded-lg ${
                    currentPage === page
                      ? 'bg-primary text-[#162210]'
                      : 'text-[#6f8961] hover:bg-[#f2f4f0]'
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              ))}
              
              <span className="text-[#6f8961] px-2">...</span>
              
              <button
                className="px-4 py-2 text-sm text-[#6f8961] hover:bg-[#f2f4f0] rounded-lg"
                onClick={() => setCurrentPage(124)}
              >
                124
              </button>
              
              <button 
                className="p-2 bg-[#f2f4f0] text-[#6f8961] rounded-lg hover:text-[#131811]"
                onClick={() => setCurrentPage(prev => prev + 1)}
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Stats Footer */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl border border-[#dfe6db] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#131811]">Stock Status</h3>
              <span className="material-symbols-outlined text-primary">trending_up</span>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6f8961]">In Stock</span>
                <span className="font-bold text-[#131811]">1,128 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6f8961]">Low Stock</span>
                <span className="font-bold text-amber-600">12 items</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#6f8961]">Out of Stock</span>
                <span className="font-bold text-red-600">0 items</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-[#dfe6db] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#131811]">Recent Activity</h3>
              <span className="material-symbols-outlined text-primary">history</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="size-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-primary text-sm">add</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#131811]">New product added</p>
                  <p className="text-xs text-[#6f8961]">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="size-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <span className="material-symbols-outlined text-emerald-600 text-sm">inventory</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-[#131811]">Stock updated</p>
                  <p className="text-xs text-[#6f8961]">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl border border-[#dfe6db] p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[#131811]">Quick Actions</h3>
              <span className="material-symbols-outlined text-primary">bolt</span>
            </div>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#6f8961] hover:bg-[#f2f4f0] rounded-lg transition-colors">
                <span className="material-symbols-outlined">download</span>
                Export Inventory
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#6f8961] hover:bg-[#f2f4f0] rounded-lg transition-colors">
                <span className="material-symbols-outlined">print</span>
                Print Report
              </button>
              <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#6f8961] hover:bg-[#f2f4f0] rounded-lg transition-colors">
                <span className="material-symbols-outlined">notifications</span>
                Set Stock Alerts
              </button>
            </div>
          </div>
        </div>
      </div>
      <footer className="py-6 px-10 border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <span className="material-symbols-outlined text-base">
              verified_user
            </span>
            Secure Enterprise Environment
          </div>
          <div className="text-gray-500 text-sm">
            © 2024 Meatopia Admin. Version 2.4.0-stable
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              Help Center
            </a>
            <a
              href="#"
              className="text-gray-600 hover:text-primary transition-colors"
            >
              System Status
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}