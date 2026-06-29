// app/admin/dashboard/page.tsx
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {useState, useMemo, useEffect} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {supabase} from '@/lib/supabase';
import {
  getAllProducts,
  deleteProduct,
  Product,
  createProduct,
  updateProduct,
} from '@/services/productService';
import {
  Package,
  ShoppingBag,
  Calendar,
  Plus,
  Search,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  LogOut,
} from 'lucide-react';
import AddProductModal from '@/components/admin/AddProductModal';
import EditProductModal from '@/components/admin/EditProductModal';
import DeleteProductModal from '@/components/admin/DeleteProductModal';

// Types
interface Order {
  id: string;
  customer: string;
  items: number;
  total: number;
  status: 'pending' | 'completed' | 'cancelled';
  date: string;
}

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  status: 'active' | 'upcoming' | 'ended';
}

// Sample data
const sampleOrders: Order[] = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    items: 3,
    total: 45600,
    status: 'pending',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    items: 2,
    total: 28900,
    status: 'completed',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Mike Johnson',
    items: 5,
    total: 72300,
    status: 'pending',
    date: '2024-01-14',
  },
  {
    id: 'ORD-004',
    customer: 'Sarah Williams',
    items: 1,
    total: 12500,
    status: 'completed',
    date: '2024-01-13',
  },
  {
    id: 'ORD-005',
    customer: 'David Brown',
    items: 4,
    total: 56700,
    status: 'pending',
    date: '2024-01-13',
  },
];

const sampleEvents: Event[] = [
  {
    id: 'EVT-001',
    title: 'Holiday Meat Bundle',
    description: 'Get 20% off on premium holiday meat selection',
    date: '2024-12-01',
    status: 'active',
  },
  {
    id: 'EVT-002',
    title: 'Weekend BBQ Special',
    description: 'Free delivery on all BBQ meat packs',
    date: '2024-01-20',
    status: 'upcoming',
  },
  {
    id: 'EVT-003',
    title: 'New Year Feast',
    description: 'Exclusive discounts on party platters',
    date: '2024-01-01',
    status: 'ended',
  },
];

export default function AdminDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isEditProductModalOpen, setIsEditProductModalOpen] = useState(false);
  const [isDeleteProductModalOpen, setIsDeleteProductModalOpen] =
    useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  // Initialize productList as empty array
  const [productList, setProductList] = useState<Product[]>([]);
  const [orderList] = useState<Order[]>(sampleOrders);
  const [eventList] = useState<Event[]>(sampleEvents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);

  const itemsPerPage = 5;

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: {session},
      } = await supabase.auth.getSession();
      if (!session) {
        router.push('/admin/login');
        return;
      }
      setUser(session.user);
    } catch (error) {
      console.error('Auth check error:', error);
      router.push('/admin/login');
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Use getAllProducts to get the array directly
      const products = await getAllProducts();
      console.log(products);
      // Ensure products is always an array
      setProductList(Array.isArray(products) ? products : []);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('Failed to load products');
      setProductList([]); // Reset to empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminUser');
      document.cookie =
        'adminLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      document.cookie =
        'adminEmail=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
      router.push('/admin/login');
      router.refresh();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get unique categories - with safety check
  const categories = useMemo(() => {
    // Ensure productList is an array before using map
    if (!Array.isArray(productList)) {
      return ['All'];
    }
    const cats = ['All', ...new Set(productList.map(p => p.category))];
    return cats;
  }, [productList]);

  // Filter products - with safety check
  const filteredProducts = useMemo(() => {
    // Ensure productList is an array
    if (!Array.isArray(productList)) {
      return [];
    }
    return productList.filter(product => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.id.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === 'All' || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [productList, searchTerm, selectedCategory]);

  // Paginate products
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredProducts.slice(start, end);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Stats - with safety check
  const stats = useMemo(
    () => ({
      totalProducts: Array.isArray(productList) ? productList.length : 0,
      pendingOrders: orderList.filter(o => o.status === 'pending').length,
      completedOrders: orderList.filter(o => o.status === 'completed').length,
      activeEvents: eventList.filter(e => e.status === 'active').length,
    }),
    [productList, orderList, eventList],
  );

  // Handlers
  const handleAddProduct = async (newProduct: any) => {
  try {
    setLoading(true);
    
    // Create the product in Supabase
    const createdProduct = await createProduct(newProduct);
    
    if (createdProduct) {
      // Refresh the product list
      await fetchProducts();
      setIsAddProductModalOpen(false);
      // Optional: Show success message
      console.log('Product created successfully:', createdProduct);
    } else {
      setError('Failed to create product');
    }
  } catch (err) {
    console.error('Error creating product:', err);
    setError('Failed to create product. Please try again.');
  } finally {
    setLoading(false);
  }
};

const handleEditProduct = async (updatedProduct: any) => {
  try {
    setLoading(true);
    
    // Update the product in Supabase
    const updated = await updateProduct(updatedProduct.id, updatedProduct);
    
    if (updated) {
      // Refresh the product list
      await fetchProducts();
      setIsEditProductModalOpen(false);
      setSelectedProduct(null);
      // Optional: Show success message
      console.log('Product updated successfully:', updated);
    } else {
      setError('Failed to update product');
    }
  } catch (err) {
    console.error('Error updating product:', err);
    setError('Failed to update product. Please try again.');
  } finally {
    setLoading(false);
  }
};

const handleDeleteProduct = async () => {
  if (!selectedProduct) return;
  
  try {
    setLoading(true);
    
    // Delete the product from Supabase
    await deleteProduct(selectedProduct.id);
    
    // Refresh the product list
    await fetchProducts();
    setIsDeleteProductModalOpen(false);
    setSelectedProduct(null);
    // Optional: Show success message
    console.log('Product deleted successfully');
  } catch (err) {
    console.error('Error deleting product:', err);
    alert('Failed to delete product');
  } finally {
    setLoading(false);
  }
};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'ended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchProducts}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Logout */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <Image
                src="https://res.cloudinary.com/dvvnb3ig1/image/upload/v1770144656/ut6qrgi4jlsndsflxddf.jpg"
                alt="Meatopia"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                Meatopia Admin
              </h1>
              <p className="text-xs text-gray-500">Dashboard v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-600 hover:text-primary transition-colors"
            >
              View Store
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm text-red-600 hover:text-red-700 transition-colors px-3 py-2 rounded-lg hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">
              {user?.email?.charAt(0).toUpperCase() || 'A'}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">Products</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">
                  {stats.totalProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>Live inventory</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Pending Orders
                </p>
                <p className="text-3xl font-bold text-yellow-600 mt-1">
                  {stats.pendingOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-50 rounded-xl flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-yellow-600">
              <AlertCircle className="w-4 h-4" />
              <span>Needs attention</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Completed Orders
                </p>
                <p className="text-3xl font-bold text-green-600 mt-1">
                  {stats.completedOrders}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-green-600">
              <TrendingUp className="w-4 h-4" />
              <span>+8% this week</span>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  Active Events
                </p>
                <p className="text-3xl font-bold text-blue-600 mt-1">
                  {stats.activeEvents}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs text-blue-600">
              <span>Promotions running</span>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
          <div className="p-6 border-b border-gray-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-gray-900">Products</h2>
                <p className="text-sm text-gray-500">
                  Manage your product inventory
                </p>
              </div>
              <button
                onClick={() => setIsAddProductModalOpen(true)}
                className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#162210] px-5 py-2.5 rounded-xl font-semibold transition-all shadow-sm hover:shadow-md active:scale-95"
              >
                <Plus className="w-5 h-5" />
                Add Product
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-6 py-4 border-b border-gray-100 bg-gray-50/50">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-full transition-all ${
                      selectedCategory === category
                        ? 'bg-primary text-[#162210]'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Weight Options
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {paginatedProducts.map(product => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 shrink-0 overflow-hidden">
                          <Image
                            src={product.image || '/images/placeholder.png'}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                            onError={e => {
                              (e.target as HTMLImageElement).src =
                                '/images/placeholder.png';
                            }}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {product.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            ID: {product.id}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-full">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-gray-900">
                      ₦{product.price.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="text-sm text-gray-600">
                        {product.weightOptions?.length || 0} variants
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsEditProductModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedProduct(product);
                            setIsDeleteProductModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
              {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{' '}
              {filteredProducts.length} products
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1 || totalPages === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              {totalPages > 0 &&
                Array.from({length: Math.min(3, totalPages)}, (_, i) => {
                  const page = currentPage + i - 1;
                  if (page < 1 || page > totalPages) return null;
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-4 py-2 text-sm font-medium rounded-lg transition-all ${
                        currentPage === page
                          ? 'bg-primary text-[#162210]'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages || totalPages === 0}
                className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Orders and Events - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Orders</h2>
                  <p className="text-sm text-gray-500">Recent order status</p>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {orderList.slice(0, 4).map(order => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <span className="text-sm font-medium text-gray-900">
                          {order.id}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {order.customer}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-gray-900">
                        ₦{order.total.toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Events Table */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Events</h2>
                  <p className="text-sm text-gray-500">Manage special events</p>
                </div>
                <button
                  onClick={() => setIsAddProductModalOpen(true)}
                  className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-[#162210] px-4 py-2 rounded-xl font-semibold text-sm transition-all shadow-sm hover:shadow-md active:scale-95"
                >
                  <Plus className="w-4 h-4" />
                  Add Event
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Event
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {eventList.slice(0, 4).map(event => (
                    <tr
                      key={event.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {event.title}
                          </p>
                          <p className="text-xs text-gray-500 truncate max-w-[120px]">
                            {event.description}
                          </p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm text-gray-600">
                          {new Date(event.date).toLocaleDateString()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex justify-center">
                          <span
                            className={`px-3 py-1 text-xs font-medium rounded-full ${getEventStatusColor(event.status)}`}
                          >
                            {event.status.charAt(0).toUpperCase() +
                              event.status.slice(1)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-1">
                          <button className="p-1.5 text-gray-400 hover:text-primary transition-colors rounded-lg hover:bg-primary/10">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
        onAddProduct={handleAddProduct}
      />
      <EditProductModal
        isOpen={isEditProductModalOpen}
        onClose={() => {
          setIsEditProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onSave={handleEditProduct}
        product={selectedProduct}
      />
      <DeleteProductModal
        isOpen={isDeleteProductModalOpen}
        onClose={() => {
          setIsDeleteProductModalOpen(false);
          setSelectedProduct(null);
        }}
        onConfirm={handleDeleteProduct}
        product={selectedProduct}
      />
    </div>
  );
}
