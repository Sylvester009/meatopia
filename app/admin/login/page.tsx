// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // app/admin/login/page.tsx - Updated handleSubmit function
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  // Simple validation
  if (!formData.email || !formData.password) {
    setError('Please fill in all fields');
    setLoading(false);
    return;
  }

  // Demo credentials
  const validEmail = 'meatopia.ng@gmail.com';
  const validPassword = 'admin123';

  // Simulate API call
  setTimeout(() => {
    if (formData.email === validEmail && formData.password === validPassword) {
      // Set localStorage for client-side checks
      localStorage.setItem('adminLoggedIn', 'true');
      
      // Set cookie for middleware/server-side checks
      document.cookie = "adminLoggedIn=true; path=/; max-age=86400; samesite=strict";
      
      // Redirect to dashboard
      router.push('/admin/dashboard');
      router.refresh(); // Refresh to trigger middleware
    } else {
      setError('Invalid email or password');
      setLoading(false);
    }
  }, 1000);
};

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Top Navigation */}
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

      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-120 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Hero Header */}
          <div className="relative h-40 bg-linear-to-r from-primary/20 to-emerald-400/20 overflow-hidden">
            <div className="absolute inset-0 bg-grid-gray-100/50"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="size-16 mx-auto mb-3 bg-white/90 rounded-full flex items-center justify-center shadow-lg">
                  <span className="material-symbols-outlined text-3xl text-primary">
                    admin_panel_settings
                  </span>
                </div>
                <h1 className="text-gray-800 text-2xl font-bold">
                  Admin Portal
                </h1>
                <p className="text-gray-600 text-sm mt-1">
                  Secure access to your dashboard
                </p>
              </div>
            </div>
          </div>

          <div className="px-10 pb-12 pt-8">
            {error && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2 text-red-700">
                  <span className="material-symbols-outlined">error</span>
                  <span className="text-sm font-medium">{error}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <label className="text-gray-700 text-sm font-semibold">
                  Email Address
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined">mail</span>
                  </span>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="admin@meatopia.com"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <label className="text-gray-700 text-sm font-semibold">
                    Password
                  </label>
                </div>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <span className="material-symbols-outlined">lock</span>
                  </span>
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/30 focus:border-primary outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center gap-3">
                <input
                  name="rememberMe"
                  type="checkbox"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  className="size-5 rounded border-gray-300 text-primary focus:ring-primary/30"
                  id="remember"
                />
                <label htmlFor="remember" className="text-sm text-gray-600">
                  Remember me for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-3 py-4 bg-linear-to-r from-primary to-emerald-400 text-[#162210] text-base font-bold rounded-lg hover:opacity-90 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#162210]"></div>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">login</span>
                    Login to Dashboard
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </main>

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
