// app/checkout/page.tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [step, setStep] = useState(2); // Step 2 of 3 as shown
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'home'>('home');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'verifying' | 'success'>('pending');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    additionalInfo: ''
  });

  const cartItems = [
    {
      id: 1,
      name: "Boneless Beef",
      quantity: 2,
      price: 8500,
      weight: "1kg",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDgSguGN5u2MJHKag0-m2eQ6no0slgVgieQOATM2gTgonh0_1xd5991fMYZdkkw7bmrLYTTuRX9g_HB-HOtdth1-Mm-uIGBp6YD8Qcl6ZoyEEDJFoLL_uxFLZjzLj9-nh4vDVC_zJBi6Io5yH3vgzYUVbDUaoqayhpJxd4LICTpgF_xrmMxVbfkRqvnHKa5YhUHgW9US70RNSbxf45DFEGMKdQZdmClPkS6zIu0og-iqxpn-TEl65fADWLcbCDsQ4ti77KoSR6TB1k"
    },
    {
      id: 2,
      name: "Chicken Laps",
      quantity: 1,
      price: 6000,
      weight: "1kg",
      image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBSUatB_FetJiR6_wW-ZpKxvO1OQbofHSJJCjpjhcEFF5V4dwUGEsCdhwXpdNdiJuP6wt9k7Q1rlK2dLuV-7jVIrS4g94KeClTy-EJ3zv1pxL1RTIUI_YXs6Z61yltdcQj5Jo7f5qCs3CsdeGZXwHve5e1tNeWtQ6LRzvy5O4SxmodFZnVddah0PAYG24vOzWRKCcBw6HDi8xCrqRFzOoc9x3QZZWAPySCB-ihDmnK1itU0c626UEP26dTTCZ4Yy7i3oeNkZR1QvOU"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = deliveryMethod === 'home' ? 1500 : 0; // ₦1500 for home delivery
  const total = subtotal + deliveryFee;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (paymentStatus === 'pending') {
      setPaymentStatus('verifying');
    }
  };

  const handlePaymentVerification = () => {
    setPaymentStatus('success');
    // In a real app, you would verify with backend
    setTimeout(() => {
      setPaymentStatus('success');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      
      <main className="max-w-300 mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-[#6f8961] text-sm font-medium hover:underline">
            Shop
          </Link>
          <span className="text-[#6f8961] text-sm">/</span>
          <div className="text-[#6f8961] text-sm font-medium hover:underline">
            Cart
          </div>
          <span className="text-[#6f8961] text-sm">/</span>
          <span className="text-sm font-semibold">Checkout</span>
        </nav>

        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-4xl font-black tracking-tight mb-2">Secure Checkout</h2>
          <p className="text-[#6f8961]">Review your order and complete payment for your premium selection.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-28 bg-white border border-[#dfe6db] rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">shopping_bag</span>
                Order Summary
              </h3>

              {/* Item List */}
              <div className="space-y-4 mb-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 items-center">
                    <div className="size-20 bg-zinc-100 rounded-lg overflow-hidden shrink">
                      <div 
                        className="w-full h-full bg-cover bg-center"
                        style={{ backgroundImage: `url("${item.image}")` }}
                      ></div>
                    </div>
                    <div className="grow">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-xs text-[#6f8961]">Qty: {item.quantity} • {item.weight}</p>
                    </div>
                    <p className="font-bold">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              {/* Add More Products Button */}
              <div className="mb-8">
                <Link 
                  href="/"
                  className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#dfe6db] rounded-lg text-[#6f8961] hover:border-primary hover:text-primary transition-colors"
                >
                  <span className="material-symbols-outlined">add</span>
                  Add More Products
                </Link>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 border-t border-dashed border-[#dfe6db] pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f8961]">Subtotal</span>
                  <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f8961]">Delivery Fee</span>
                  <span className="font-medium">{deliveryFee === 0 ? 'FREE' : `₦${deliveryFee.toLocaleString()}`}</span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t border-[#dfe6db]">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 justify-center py-3 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">verified_user</span>
                <span className="text-xs font-semibold text-[#131811]">100% Secure Checkout Guaranteed</span>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Checkout Process */}
          <div className="lg:col-span-7 order-1 lg:order-2 space-y-8">
            {/* Progress Bar */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-6">
              <div className="flex gap-6 justify-between items-end mb-3">
                <div>
                  <p className="text-primary text-xs font-bold uppercase tracking-wider mb-1">
                    Current Step
                  </p>
                  <p className="text-[#131811] text-base font-bold">Step {step} of 3: Delivery & Payment</p>
                </div>
                <p className="text-[#131811] text-sm font-bold">66%</p>
              </div>
              <div className="h-2 rounded-full bg-[#dfe6db] overflow-hidden">
                <div className="h-full bg-primary" style={{ width: '66%' }}></div>
              </div>
            </div>

            {/* Form Section: Customer Information */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">person</span>
                1. Customer Information
              </h3>
              
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">First Name *</label>
                    <input
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">Last Name *</label>
                    <input
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">Phone Number *</label>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="tel"
                      placeholder="08012345678"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">Email Address *</label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#6f8961]">Delivery Address *</label>
                  <input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                    type="text"
                    placeholder="123 Main Street, GRA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">City *</label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="text"
                      placeholder="Lagos"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">State *</label>
                    <input
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3"
                      type="text"
                      placeholder="Lagos State"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#6f8961]">Additional Information (Optional)</label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 resize-none"
                    rows={3}
                    placeholder="Delivery instructions, gate code, etc."
                  />
                </div>
              </form>
            </div>

            {/* Form Section: Delivery Method */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-8">
              <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                <span className="material-symbols-outlined">local_shipping</span>
                2. Delivery Method
              </h3>
              <p className="text-sm text-[#6f8961] mb-6">Choose your preferred delivery option</p>
              
              <div className="space-y-4">
                <label className={`relative flex cursor-pointer rounded-xl border-2 ${deliveryMethod === 'home' ? 'border-primary bg-primary/5' : 'border-[#dfe6db]'} p-4 transition-colors`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked={deliveryMethod === 'home'}
                    onChange={() => setDeliveryMethod('home')}
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">home</span>
                      <div>
                        <p className="font-bold text-[#131811]">Home Delivery</p>
                        <p className="text-xs text-[#6f8961]">1-3 Business Days • ₦1,500 fee</p>
                      </div>
                    </div>
                    <div className="font-black text-sm">₦1,500</div>
                  </div>
                </label>

                <label className={`relative flex cursor-pointer rounded-xl border-2 ${deliveryMethod === 'pickup' ? 'border-primary bg-primary/5' : 'border-[#dfe6db]'} p-4 transition-colors`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => setDeliveryMethod('pickup')}
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">store</span>
                      <div>
                        <p className="font-bold text-[#131811]">Store Pickup</p>
                        <p className="text-xs text-[#6f8961]">Pick up from our nearest store • FREE</p>
                      </div>
                    </div>
                    <div className="font-black text-sm">FREE</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Section: Payment */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-8">
              <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined">payments</span>
                3. Payment
              </h3>

              {/* Bank Transfer Information */}
              <div className="mb-6 p-4 bg-[#f2f4f0] rounded-lg">
                <p className="font-bold text-sm mb-2">Bank Transfer Details:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#6f8961]">Bank Name:</span>
                    <span className="font-bold">GTBank</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6f8961]">Account Name:</span>
                    <span className="font-bold">Meatopia Premium Meats Ltd</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6f8961]">Account Number:</span>
                    <span className="font-bold">0123456789</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#6f8961]">Amount:</span>
                    <span className="font-bold text-primary">₦{total.toLocaleString()}</span>
                  </div>
                </div>
                <p className="text-xs text-[#6f8961] mt-3">
                  Please use your order number as payment reference
                </p>
              </div>

              {/* Payment Status */}
              {paymentStatus === 'success' ? (
                <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                  <span className="material-symbols-outlined text-green-500 text-4xl mb-2">
                    check_circle
                  </span>
                  <h4 className="font-bold text-lg text-green-700">Payment Successful!</h4>
                  <p className="text-sm text-green-600 mt-2">
                    Thank you for your order. We&apos;ll send a confirmation email shortly.
                  </p>
                  <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-[#162210] font-bold rounded-lg hover:opacity-90 transition-opacity"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : paymentStatus === 'verifying' ? (
                <div className="text-center p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                  <h4 className="font-bold text-lg text-blue-700">Verifying Payment...</h4>
                  <p className="text-sm text-blue-600 mt-2">
                    Please wait while we confirm your payment.
                  </p>
                </div>
              ) : (
                <>
                  <button
                    onClick={handleSubmit}
                    className="w-full bg-primary hover:opacity-90 text-[#131811] py-4 rounded-xl text-lg font-black tracking-tight transition-all shadow-lg flex items-center justify-center gap-3"
                  >
                    <span className="material-symbols-outlined">lock</span>
                    PLACE ORDER — ₦{total.toLocaleString()}
                  </button>

                  <div className="mt-6 border-t border-[#dfe6db] pt-6">
                    <p className="text-sm text-[#6f8961] mb-4">
                      After making the bank transfer, click the button below to confirm payment:
                    </p>
                    <button
                      onClick={handlePaymentVerification}
                      className="w-full bg-[#131811] hover:opacity-90 text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2"
                    >
                      <span className="material-symbols-outlined">verified</span>
                      I Have Made the Transfer
                    </button>
                  </div>
                </>
              )}

              <p className="text-center text-[10px] text-[#6f8961] mt-4 uppercase tracking-widest font-bold">
                By clicking, you agree to our Terms & Conditions
              </p>
            </div>

            {/* Secure Badges */}
            <div className="flex justify-center items-center gap-8 opacity-60 pb-12">
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">verified</span>
                <span className="text-[10px] font-black leading-none">SECURE<br/>SSL</span>
              </div>
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">workspace_premium</span>
                <span className="text-[10px] font-black leading-none">USDA<br/>CERTIFIED</span>
              </div>
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">eco</span>
                <span className="text-[10px] font-black leading-none">FARM<br/>FRESH</span>
              </div>
            </div>
          </div>
        </div>
      </main>

    </div>
  );
}