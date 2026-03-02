'use client';

import Script from 'next/script';

declare global {
  interface Window {
    PaystackPop: any;
  }
}

type Props = {
  paystackKey: string;
  email: string;
  amount: number;
  onSuccess: (ref: any) => void;
  disabled?: boolean;
  metadata?: any;
};
export default function PayButton({
  paystackKey,
  email,
  amount,
  onSuccess,
  disabled,
  metadata,
}: Props) {
  const payWithPaystack = () => {
    console.log(paystackKey);
    if (!window.PaystackPop) {
      alert('Payment system not ready. Refresh page.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey, // ✅ PUBLIC KEY ONLY
      email: email,
      amount: amount,
      currency: 'NGN',

      metadata,

      callback: function (response: any) {
        onSuccess(response);
      },

      onClose: function () {
        alert('Transaction was not completed');
      },
    });

    handler.openIframe();
  };

  return (
    <>
      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />
      <button
        type="button"
        onClick={payWithPaystack}
        disabled={disabled}
        className="w-full bg-primary py-4 rounded-lg text-[#162210] font-black hover:opacity-90 disabled:opacity-40"
      >
        Pay ₦{(amount / 100).toLocaleString()}
      </button>
    </>
  );
}
