"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { toast } from "sonner";
import { useCreatePaymentMutation } from "@/redux/api/features/paymentApi";

const CheckoutPage = ({
  amount,
  setDonationAmount,
  setPaymentDonationOpen,
  setOpen,
  userData,
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  const [createPayment] = useCreatePaymentMutation();

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    // Submit the PaymentElement if applicable
    const { error: submitError } = await elements.submit();

    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    // Confirm the payment without automatic redirection
    const { paymentIntent, error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/payment-success?amount=${amount}`,
      },
      handleActions: false, // Prevent automatic redirection
    });
    const toastId = toast.loading("Payment processing...");
    if (error) {
      // Handle any errors that occurred during payment confirmation
      setErrorMessage(error.message);
      setLoading(false);
      toast.error(error.message, { id: toastId, duration: 2000 });
    } else if (paymentIntent) {
      // Payment succeeded! Extract the transaction ID

      const transactionId = paymentIntent.id;
      const data = {
        userId: userData?.userId,
        transactionId,
        amount: parseInt(amount),
      };

      try {
        const res = await createPayment(data).unwrap();

        toast.success("Payment successful!", { id: toastId, duration: 2000 });
        setDonationAmount(0);
        setPaymentDonationOpen(false);
        setOpen(true);
      } catch (error) {
        toast.error(error?.data?.message || "Failed to create payment", {
          id: toastId,
          duration: 2000,
        });
      }

      // Perform manual redirection after logging the transaction ID
      //   window.location.href = `http://www.localhost:3000/payment-success?amount=${amount}&transactionId=${transactionId}`;
    }

    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {clientSecret && <PaymentElement />}

      {errorMessage && <div>{errorMessage}</div>}

      <button
        disabled={!stripe || loading}
        className="text-white w-full p-5 bg-[#F88D58] mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!loading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
};

export default CheckoutPage;
