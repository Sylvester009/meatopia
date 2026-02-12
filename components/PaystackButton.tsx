"use client"

type PayButtonProps = {
  email: string
  amount: number
  disabled?: boolean
  metadata?: any
  onSuccess: (ref: any) => void
}

export default function PayButton({
  email,
  amount,
  disabled,
  metadata,
  onSuccess
}: PayButtonProps) {

  const handlePayment = () => {
    if (!(window as any).PaystackPop) {
      alert("Paystack not loaded")
      return
    }

    const handler = (window as any).PaystackPop.setup({
      key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
      email,
      amount,
      currency: "NGN",
      metadata,
      callback: function (response: any) {
        onSuccess(response)
      },
      onClose: function () {
        alert("Payment cancelled")
      }
    })

    handler.openIframe()
  }

  return (
    <button
      onClick={handlePayment}
      disabled={disabled}
      className="w-full bg-primary py-4 rounded-lg text-[#162210] font-black hover:opacity-90 disabled:opacity-40"
    >
      Pay ₦{(amount / 100).toLocaleString()}
    </button>
  )
}
