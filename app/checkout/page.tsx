// app/checkout/page.tsx
'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';
import PayButton from '@/components/PaystackButton';
import {toast} from 'sonner';

export default function CheckoutPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'home'>(
    'home',
  );
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>(
    'pending',
  );

  const {cart, totalPrice, updateQuantity, removeItem, clearCart} = useCart();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    additionalInfo: '',
  });

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.phone &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.address &&
    formData.city &&
    formData.state;

  useEffect(() => {
    if (!isFormValid) {
      toast.error('Please complete your delivery information');
    }
  }, [isFormValid]);

  const subtotal = totalPrice;

  const deliveryFee =
    cart.length === 0 ? 0 : deliveryMethod === 'home' ? 1500 : 0;
  const total = totalPrice + deliveryFee;
  const totalAmount = total * 100;
  const customerEmail = formData.email || 'customer@email.com';

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData(prev => ({...prev, [name]: value}));
  };

  const handleDeliverySelect = (method: 'pickup' | 'home') => {
    setDeliveryMethod(method);
  };

  return (
    <div className="min-h-screen bg-[#f6f8f6]">
      <main className="max-w-300 mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6">
          <Link
            href="/"
            className="text-[#6f8961] text-sm font-medium hover:underline"
          >
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
          <h2 className="text-4xl font-black tracking-tight mb-2">
            Secure Checkout
          </h2>
          <p className="text-[#6f8961]">
            Review your order and complete payment for your premium selection.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* LEFT COLUMN: Order Summary (Sticky) */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="sticky top-28 bg-white border border-[#dfe6db] rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary">
                  shopping_bag
                </span>
                Order Summary
              </h3>

              {/* Item List */}
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 items-start p-4 bg-white rounded-lg border border-zinc-100"
                  >
                    {/* Image */}
                    <div className="size-20 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{backgroundImage: `url("${item.image}")`}}
                      ></div>
                    </div>

                    {/* Content area */}
                    <div className="grow flex flex-col gap-3">
                      {/* Top section: Name, size, price, and remove */}
                      <div className="flex justify-between items-start">
                        <div className="min-w-0 pr-4">
                          <h4 className="font-bold text-sm">{item.name}</h4>
                          <p className="text-xs text-gray-500">
                            Weight: {item.weight}
                          </p>
                        </div>

                        <div className="shrink-0 text-right">
                          <p className="font-bold text-sm md:text-base">
                            ₦{(item.unitPrice * item.quantity).toLocaleString() ?? '0'}
                          </p>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 text-sm mt-1 hover:text-red-700 hover:underline transition"
                          >
                            Remove
                          </button>
                        </div>
                      </div>

                      {/* Bottom section: Quantity controls */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-zinc-600">
                            Quantity:
                          </span>
                          <div className="flex items-center bg-gray-100 rounded-lg">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                              disabled={item.quantity <= 1}
                            >
                              <span className="text-lg">−</span>
                            </button>
                            <span className="min-w-[32px] text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="w-8 h-8 flex items-center justify-center hover:bg-gray-200 transition"
                            >
                              <span className="text-lg">+</span>
                            </button>
                          </div>
                        </div>

                        <p className="text-sm text-zinc-500">
                          ₦{item.unitPrice.toLocaleString() ?? '0'} each
                        </p>
                      </div>
                    </div>
                  </div>
                ))}

                {cart.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-[#6f8961] text-lg mb-2">
                      Your cart is empty
                    </p>
                    <p className="text-sm text-zinc-500">
                      Add items to get started
                    </p>
                  </div>
                )}
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
                  <span className="font-medium">
                    ₦{subtotal.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[#6f8961]">Delivery Fee</span>
                  <span className="font-medium">
                    {deliveryFee === 0
                      ? 'FREE'
                      : `₦${deliveryFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="flex justify-between text-xl font-black pt-4 border-t border-[#dfe6db]">
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 justify-center py-3 bg-primary/10 rounded-lg">
                <span className="material-symbols-outlined text-primary text-sm">
                  verified_user
                </span>
                <span className="text-xs font-semibold text-[#131811]">
                  100% Secure Checkout Guaranteed
                </span>
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
                    Kindly fill all fields below *Important*
                  </p>
                </div>
                {/* <p className="text-[#131811] text-sm font-bold">{Math.round((step / 3) * 100)}%</p> */}
              </div>
              {/* <div className="h-2 rounded-full bg-[#dfe6db] overflow-hidden">
      <div className="h-full bg-primary" style={{ width: `${(step / 3) * 100}%` }}></div>
    </div> */}
            </div>

            {/* Form Section: Customer Information */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-8">
              {/* <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <span className={`material-symbols-outlined ${formCompleted ? 'text-green-500' : ''}`}>
          {formCompleted ? 'check_circle' : 'person'}
        </span>
        1. Customer Information
      </h3>
      {formCompleted && (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          ✓ Completed
        </span>
      )}
    </div> */}

              <form className="space-y-4">
                {/* Your existing form fields remain exactly the same */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      First Name *
                    </label>
                    <input
                      required
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.firstName ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="text"
                      placeholder="John"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      Last Name *
                    </label>
                    <input
                      required
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.lastName ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="text"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      Phone Number *
                    </label>
                    <input
                      required
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.phone ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="tel"
                      placeholder="08012345678"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      Email Address *
                    </label>
                    <input
                      required
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.email ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="email"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#6f8961]">
                    Delivery Address *
                  </label>
                  <input
                    required
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                      formData.address ? 'ring-1 ring-primary/30' : ''
                    }`}
                    type="text"
                    placeholder="123 Main Street, GRA"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      City *
                    </label>
                    <input
                      required
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.city ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="text"
                      placeholder="Lagos"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#6f8961]">
                      State *
                    </label>
                    <input
                      required
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className={`bg-[#f2f4f0] border-none rounded-lg focus:ring-primary px-4 py-3 ${
                        formData.state ? 'ring-1 ring-primary/30' : ''
                      }`}
                      type="text"
                      placeholder="Lagos State"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs font-bold text-[#6f8961]">
                    Additional Information (Optional)
                  </label>
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
              {/* <div className="flex justify-between items-center mb-2">
      <div>
        <h3 className="text-lg font-bold flex items-center gap-2">
          <span className={`material-symbols-outlined ${deliveryCompleted ? 'text-green-500' : ''}`}>
            {deliveryCompleted ? 'check_circle' : 'local_shipping'}
          </span>
          2. Delivery Method
        </h3>
        <p className="text-sm text-[#6f8961] mb-6">Choose your preferred delivery option</p>
      </div>
      {deliveryCompleted && (
        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
          ✓ Selected
        </span>
      )}
    </div> */}

              <div className="space-y-4">
                <label
                  className={`relative flex cursor-pointer rounded-xl border-2 ${deliveryMethod === 'home' ? 'border-primary bg-primary/5' : 'border-[#dfe6db]'} p-4 transition-colors`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="home"
                    checked={deliveryMethod === 'home'}
                    onChange={() => handleDeliverySelect('home')}
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">
                        home
                      </span>
                      <div>
                        <p className="font-bold text-[#131811]">
                          Home Delivery
                        </p>
                        <p className="text-xs text-[#6f8961]">
                          1-3 Business Days • ₦1,500 fee
                        </p>
                      </div>
                    </div>
                    <div className="font-black text-sm">₦1,500</div>
                  </div>
                </label>

                <label
                  className={`relative flex cursor-pointer rounded-xl border-2 ${deliveryMethod === 'pickup' ? 'border-primary bg-primary/5' : 'border-[#dfe6db]'} p-4 transition-colors`}
                >
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryMethod === 'pickup'}
                    onChange={() => handleDeliverySelect('pickup')}
                    className="sr-only"
                  />
                  <div className="flex w-full items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-primary">
                        store
                      </span>
                      <div>
                        <p className="font-bold text-[#131811]">Store Pickup</p>
                        <p className="text-xs text-[#6f8961]">
                          Pick up from our nearest store • FREE
                        </p>
                      </div>
                    </div>
                    <div className="font-black text-sm">FREE</div>
                  </div>
                </label>
              </div>
            </div>

            {/* Form Section: Payment */}
            <div className="bg-white border border-[#dfe6db] rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined">payments</span>
                  3. Payment
                </h3>
                {paymentStatus === 'success' && (
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                    ✓ Completed
                  </span>
                )}
              </div>

              {/* Payment Status */}
              {paymentStatus === 'success' ? (
                <div className="text-center p-6 bg-green-50 border border-green-200 rounded-lg">
                  <span className="material-symbols-outlined text-green-500 text-4xl mb-2">
                    check_circle
                  </span>
                  <h4 className="font-bold text-lg text-green-700">
                    Payment Successful!
                  </h4>
                  <p className="text-sm text-green-600 mt-2">
                    Your order has been placed successfully.
                  </p>

                  <Link
                    href="/"
                    className="inline-block mt-4 px-6 py-2 bg-primary text-[#162210] font-bold rounded-lg hover:opacity-90"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <PayButton
                  email={customerEmail}
                  amount={totalAmount}
                  disabled={!isFormValid || cart.length === 0}
                  metadata={{
                    custom_fields: [
                      {
                        display_name: 'Customer Name',
                        value: `${formData.firstName} ${formData.lastName}`,
                      },
                      {display_name: 'Phone', value: formData.phone},
                    ],
                  }}
                  onSuccess={async ref => {
                    toast.success('Payment successful 🎉');

                    setPaymentStatus('success');

                    await fetch('/api/send-order-email', {
                      method: 'POST',
                      headers: {'Content-Type': 'application/json'},
                      body: JSON.stringify({
                        cart,
                        formData,
                        deliveryMethod,
                        total,
                        reference: ref.reference,
                      }),
                    });

                    clearCart();
                  }}
                />
              )}

              <p className="text-center text-[10px] text-[#6f8961] mt-4 uppercase tracking-widest font-bold">
                By clicking, you agree to our Terms & Conditions
              </p>
            </div>

            {/* Secure Badges */}
            <div className="flex justify-center items-center gap-8 opacity-60 pb-12">
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">
                  verified
                </span>
                <span className="text-[10px] font-black leading-none">
                  SECURE
                  <br />
                  SSL
                </span>
              </div>
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">
                  workspace_premium
                </span>
                <span className="text-[10px] font-black leading-none">
                  USDA
                  <br />
                  CERTIFIED
                </span>
              </div>
              <div className="flex items-center gap-1 grayscale">
                <span className="material-symbols-outlined text-3xl">eco</span>
                <span className="text-[10px] font-black leading-none">
                  FARM
                  <br />
                  FRESH
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
