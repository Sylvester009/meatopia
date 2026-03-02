'use client';

import Script from 'next/script';

type PaystackSuccessResponse = {
  reference: string;
  status: string;
  trans?: string;
  transaction?: string;
  message?: string;
};

type PaystackPopType = {
  setup: (options: {
    key: string;
    email: string;
    amount: number;
    currency: string;
    metadata?: Record<string, unknown>;
    callback: (response: PaystackSuccessResponse) => void;
    onClose: () => void;
  }) => {
    openIframe: () => void;
  };
};

declare global {
  interface Window {
    PaystackPop?: PaystackPopType;
  }
}

type Props = {
  paystackKey: string;
  email: string;
  amount: number;
  onSuccess: (ref: PaystackSuccessResponse) => void;
  disabled?: boolean;
  metadata?: Record<string, unknown>;
};

export default function PayButton({
  paystackKey,
  email,
  amount,
  onSuccess,
  disabled,
  metadata,
}: Props) {
  const payWithPaystack = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    if (!window.PaystackPop) {
      alert('Payment system not ready. Refresh page.');
      return;
    }

    const handler = window.PaystackPop.setup({
      key: paystackKey,
      email,
      amount,
      currency: 'NGN',
      metadata,

      callback: function (response) {
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