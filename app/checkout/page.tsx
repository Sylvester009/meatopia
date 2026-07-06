'use client';

import {useEffect, useState} from 'react';
import Link from 'next/link';
import {useCart} from '@/context/CartContext';
import PayButton from '@/components/PaystackButton';
import {toast} from 'sonner';
import {
  CheckCircle,
  Package,
  Truck,
  Store,
  CreditCard,
  Shield,
  ChevronLeft,
  Plus,
  Minus,
  Trash2,
  MapPin,
  Mail,
  Phone,
  User,
  Home,
  Building,
  Info,
  ArrowRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

const deliveryLocations = [
  {label: 'Oluyole/Ringroad', fee: 3500},
  {label: 'Sango/Ashi', fee: 2000},
  {label: 'Bodija/Oshuntokun/Awolowo', fee: 2500},
  {label: 'Akobo (₦2,500)', fee: 2500},
  {label: 'Akobo (₦3,000)', fee: 3000},
  {label: 'Akobo Ojuirin', fee: 3200},
  {label: 'Ojoo', fee: 2000},
  {label: 'Elebu/Challenge', fee: 3800},
  {label: 'Agbowo/UI/Orogun', fee: 1000},
  {label: 'Jericho/Aleshinloye', fee: 3000},
  {label: 'Eleyele', fee: 2500},
  {label: 'Ologuneru', fee: 3000},
];

type PaystackSuccessResponse = {
  reference: string;
  status: string;
  trans?: string;
  transaction?: string;
  message?: string;
};

export default function CheckoutPage() {
  const paystackKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!;
  const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'home'>(
    'home',
  );
  const [selectedLocation, setSelectedLocation] = useState(
    deliveryLocations[0],
  );
  const [verifying, setVerifying] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>(
    'pending',
  );
  const [activeStep, setActiveStep] = useState(1);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(true);

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

  const subtotal = totalPrice;
  const deliveryFee =
    cart.length === 0
      ? 0
      : deliveryMethod === 'home'
        ? selectedLocation.fee
        : 0;
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

  const handlePaymentSuccess = async (ref: PaystackSuccessResponse) => {
    setVerifying(true);
    try {
      const res = await fetch('/api/paystack/verify', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          cart,
          formData,
          deliveryMethod,
          deliveryLocation:
            deliveryMethod === 'home' ? selectedLocation.label : 'Store Pickup',
          deliveryFee,
          total,
          reference: ref.reference,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setPaymentStatus('success');
        toast.success('Order placed successfully! 🎉');
        clearCart();
      } else {
        console.error('Verification failed:', data);
        toast.error('Payment verification failed');
      }
    } finally {
      setVerifying(false);
    }
  };

  const getStepStatus = (step: number) => {
    if (step < activeStep) return 'completed';
    if (step === activeStep) return 'active';
    return 'upcoming';
  };

  // Auto-advance steps based on form completion
  useEffect(() => {
    if (isFormValid && activeStep === 1) setActiveStep(2);
  }, [isFormValid, activeStep]);

  useEffect(() => {
    if (deliveryMethod && activeStep === 2) setActiveStep(3);
  }, [deliveryMethod, activeStep]);

  // Order Summary Component (reused for both mobile and desktop)
  const OrderSummary = ({isMobile = false}) => (
    <div
      className={`bg-white rounded-2xl shadow-lg border border-[#dfe6db] overflow-hidden ${isMobile ? 'w-full' : ''}`}
    >
      <div
        className={`p-4 bg-linear-to-r from-[#6f8961] to-[#4a6741] flex items-center justify-between ${isMobile ? 'cursor-pointer' : ''}`}
        onClick={() => isMobile && setIsOrderSummaryOpen(!isOrderSummaryOpen)}
      >
        <h3 className="text-white font-bold text-lg flex items-center gap-2">
          <Package className="w-5 h-5" />
          Order Summary
          {isMobile && (
            <span className="text-white/80 text-sm font-normal ml-2">
              ({cart.length} items)
            </span>
          )}
        </h3>
        {isMobile && (
          <button className="text-white">
            {isOrderSummaryOpen ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {(isMobile ? isOrderSummaryOpen : true) && (
        <>
          <div className="p-4 max-h-[300px] overflow-y-auto">
            {cart.map(item => (
              <div
                key={item.id}
                className="flex gap-3 mb-3 pb-3 border-b border-[#f2f4f0] last:border-0"
              >
                <div
                  className="w-14 h-14 rounded-lg bg-cover bg-center shrink-0 border border-[#f2f4f0]"
                  style={{backgroundImage: `url("${item.image}")`}}
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-sm truncate">{item.name}</h4>
                  <p className="text-xs text-[#6f8961]">
                    Weight: {item.weight}
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <div className="flex items-center gap-1 bg-[#f2f4f0] rounded-lg">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-[#dfe6db] rounded-lg transition-colors"
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-medium min-w-[20px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="w-6 h-6 flex items-center justify-center hover:bg-[#dfe6db] rounded-lg transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-bold text-sm">
                      ₦{(item.unitPrice * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {cart.length === 0 && (
              <div className="text-center py-6">
                <Package className="w-12 h-12 text-[#dfe6db] mx-auto mb-2" />
                <p className="text-[#6f8961] text-sm">Your cart is empty</p>
              </div>
            )}
          </div>

          <div className="p-4 bg-[#f8faf8] border-t border-[#dfe6db]">
            <div className="space-y-2 mb-3">
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
              <div className="flex justify-between text-base font-black pt-3 border-t border-[#dfe6db]">
                <span>Total</span>
                <span className="text-[#6f8961]">
                  ₦{total.toLocaleString()}
                </span>
              </div>
            </div>

            {!isMobile && (
              <Link
                href="/"
                className="flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-[#dfe6db] rounded-xl text-[#6f8961] hover:border-[#6f8961] hover:text-[#6f8961] transition-colors text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                Add More Items
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-linear-to-br from-[#f6f8f6] to-[#eef2ee]">
      <div className="max-w-7xl mx-auto px-4 py-6 md:py-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 md:mb-8 text-sm">
          <Link
            href="/"
            className="text-[#6f8961] hover:text-[#4a6741] transition-colors flex items-center gap-1"
          >
            <ChevronLeft className="w-4 h-4" />
            Shop
          </Link>
          <span className="text-[#6f8961]">/</span>
          <Link
            href="/cart"
            className="text-[#6f8961] hover:text-[#4a6741] transition-colors"
          >
            Cart
          </Link>
          <span className="text-[#6f8961]">/</span>
          <span className="font-semibold text-[#131811]">Checkout</span>
        </nav>

        {/* Header */}
        <div className="mb-6 md:mb-10">
          <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-2 md:mb-3 text-[#131811]">
            Secure Checkout
          </h1>
          <p className="text-[#6f8961] text-base md:text-lg">
            Complete your order with confidence
          </p>
        </div>

        {/* Mobile Order Summary - Always on top */}
        <div className="lg:hidden mb-6">
          <OrderSummary isMobile={true} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Steps */}
            <div className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-[#dfe6db]">
              <div className="flex justify-between items-center relative">
                {/* Progress line */}
                <div className="absolute top-4 left-[10%] right-[10%] h-0.5 bg-[#dfe6db] z-0">
                  <div
                    className="h-full bg-[#6f8961] transition-all duration-500"
                    style={{width: `${((activeStep - 1) / 2) * 100}%`}}
                  />
                </div>

                {[
                  {step: 1, icon: User, label: 'Details'},
                  {step: 2, icon: Truck, label: 'Delivery'},
                  {step: 3, icon: CreditCard, label: 'Payment'},
                ].map(({step, icon: Icon, label}) => {
                  const status = getStepStatus(step);
                  return (
                    <div
                      key={step}
                      className="flex flex-col items-center gap-1.5 z-10"
                    >
                      <div
                        className={`
                        w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center border-2 transition-all text-xs md:text-base
                        ${
                          status === 'completed'
                            ? 'bg-[#6f8961] border-[#6f8961] text-white'
                            : status === 'active'
                              ? 'bg-white border-[#6f8961] text-[#6f8961] shadow-lg'
                              : 'bg-white border-[#dfe6db] text-[#6f8961]'
                        }
                      `}
                      >
                        {status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                        ) : (
                          <Icon className="w-4 h-4 md:w-5 md:h-5" />
                        )}
                      </div>
                      <span
                        className={`text-[10px] md:text-xs font-semibold ${status === 'active' ? 'text-[#131811]' : 'text-[#6f8961]'}`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-[#dfe6db]">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-8 bg-[#6f8961]/10 rounded-lg flex items-center justify-center">
                  <User className="w-4 h-4 text-[#6f8961]" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#131811]">
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    First Name *
                  </label>
                  <input
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    Last Name *
                  </label>
                  <input
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    <Phone className="w-3 h-3 inline mr-1" />
                    Phone Number *
                  </label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    type="tel"
                    placeholder="08012345678"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    <Mail className="w-3 h-3 inline mr-1" />
                    Email Address *
                  </label>
                  <input
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    type="email"
                    placeholder="john@example.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    <Home className="w-3 h-3 inline mr-1" />
                    Delivery Address *
                  </label>
                  <input
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    placeholder="123 Main Street, GRA"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    <Building className="w-3 h-3 inline mr-1" />
                    City *
                  </label>
                  <input
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    placeholder="Lagos"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    State *
                  </label>
                  <input
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all text-sm md:text-base"
                    placeholder="Lagos State"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs font-bold text-[#6f8961] block mb-1.5">
                    <Info className="w-3 h-3 inline mr-1" />
                    Additional Information
                  </label>
                  <textarea
                    name="additionalInfo"
                    value={formData.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full bg-[#f2f4f0] border-2 border-transparent rounded-xl px-4 py-3 md:py-3.5 focus:border-[#6f8961] focus:bg-white transition-all resize-none text-sm md:text-base"
                    rows={3}
                    placeholder="Delivery instructions, gate code, etc."
                  />
                </div>
              </div>
            </div>

            {/* Delivery Method */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-[#dfe6db]">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-8 bg-[#6f8961]/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-4 h-4 text-[#6f8961]" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#131811]">
                  Delivery Method
                </h2>
              </div>

              <div className="space-y-4">
                {/* Home Delivery */}
                <button
                  onClick={() => handleDeliverySelect('home')}
                  className={`
                    w-full text-left rounded-2xl border-2 p-4 md:p-5 transition-all
                    ${
                      deliveryMethod === 'home'
                        ? 'border-[#6f8961] bg-[#6f8961]/5 shadow-md'
                        : 'border-[#dfe6db] hover:border-[#6f8961]/30'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`
                        w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                        ${deliveryMethod === 'home' ? 'border-[#6f8961] bg-[#6f8961]' : 'border-[#dfe6db]'}
                      `}
                      >
                        {deliveryMethod === 'home' && (
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#131811] text-sm md:text-base">
                          Home Delivery
                        </h3>
                        <p className="text-xs md:text-sm text-[#6f8961]">
                          1–3 Business Days
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-[#131811] text-sm md:text-base">
                        ₦{selectedLocation.fee.toLocaleString()}
                      </span>
                      <p className="text-xs text-[#6f8961]">Delivery fee</p>
                    </div>
                  </div>

                  {deliveryMethod === 'home' && (
                    <div className="mt-4 ml-8 md:ml-10">
                      <select
                        value={selectedLocation.label}
                        onChange={e => {
                          const location = deliveryLocations.find(
                            loc => loc.label === e.target.value,
                          );
                          if (location) setSelectedLocation(location);
                        }}
                        className="w-full bg-white border border-[#dfe6db] rounded-xl px-4 py-2.5 md:py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#6f8961]"
                      >
                        {deliveryLocations.map(location => (
                          <option key={location.label} value={location.label}>
                            {location.label} - ₦{location.fee.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </button>

                {/* Store Pickup */}
                <button
                  onClick={() => handleDeliverySelect('pickup')}
                  className={`
                    w-full text-left rounded-2xl border-2 p-4 md:p-5 transition-all
                    ${
                      deliveryMethod === 'pickup'
                        ? 'border-[#6f8961] bg-[#6f8961]/5 shadow-md'
                        : 'border-[#dfe6db] hover:border-[#6f8961]/30'
                    }
                  `}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div
                        className={`
                        w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center shrink-0 mt-0.5
                        ${deliveryMethod === 'pickup' ? 'border-[#6f8961] bg-[#6f8961]' : 'border-[#dfe6db]'}
                      `}
                      >
                        {deliveryMethod === 'pickup' && (
                          <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-[#131811] text-sm md:text-base">
                          Store Pickup
                        </h3>
                        <p className="text-xs md:text-sm text-[#6f8961]">
                          Pick up from our nearest store
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-green-600 text-sm md:text-base">
                        FREE
                      </span>
                      <p className="text-xs text-[#6f8961]">No delivery fee</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Payment */}
            <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-[#dfe6db]">
              <div className="flex items-center gap-3 mb-5 md:mb-6">
                <div className="w-8 h-8 bg-[#6f8961]/10 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-[#6f8961]" />
                </div>
                <h2 className="text-lg md:text-xl font-bold text-[#131811]">
                  Payment
                </h2>
              </div>

              {paymentStatus === 'success' ? (
                <div className="text-center py-8 bg-green-50 border-2 border-green-200 rounded-2xl">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-green-700 mb-2">
                    Payment Successful!
                  </h3>
                  <p className="text-green-600">
                    Your order has been placed successfully.
                  </p>
                  <Link
                    href="/"
                    className="inline-block mt-6 px-8 py-3 bg-[#6f8961] text-white font-bold rounded-xl hover:bg-[#4a6741] transition-colors"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <div>
                  <div className="bg-[#f8faf8] rounded-xl p-4 md:p-5 mb-5 md:mb-6 border border-[#dfe6db]">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[#6f8961]">
                        Total Amount
                      </span>
                      <span className="text-xl md:text-2xl font-black text-[#131811]">
                        ₦{total.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[#6f8961]">
                      <Shield className="w-4 h-4" />
                      <span>
                        Secured by Paystack • Your payment is protected
                      </span>
                    </div>
                  </div>

                  <PayButton
                    paystackKey={paystackKey}
                    email={customerEmail}
                    amount={totalAmount}
                    disabled={!isFormValid || cart.length === 0 || verifying}
                    metadata={{
                      custom_fields: [
                        {
                          display_name: 'Customer Name',
                          value: `${formData.firstName} ${formData.lastName}`,
                        },
                        {display_name: 'Phone', value: formData.phone},
                      ],
                    }}
                    onSuccess={handlePaymentSuccess}
                  />

                  <p className="text-center text-xs text-[#6f8961] mt-4">
                    By clicking pay, you agree to our Terms & Conditions
                  </p>
                </div>
              )}
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6 opacity-60 pb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-bold uppercase">
                  SSL Secure
                </span>
              </div>
              <div className="w-px h-6 bg-[#dfe6db] hidden sm:block" />
              <div className="flex items-center gap-2">
                <Package className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-bold uppercase">
                  Fresh Guaranteed
                </span>
              </div>
              <div className="w-px h-6 bg-[#dfe6db] hidden sm:block" />
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                <span className="text-[10px] md:text-xs font-bold uppercase">
                  Quality Assured
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Order Summary - 1/3 width (hidden on mobile) */}
          <div className="hidden lg:block lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary isMobile={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
