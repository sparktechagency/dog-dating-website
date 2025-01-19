"use client";
import CheckoutPage from "@/components/CheckOutPage/CheckoutPage";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { selectUser } from "@/redux/slices/authSlice";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

const DonatePayment = ({
  donationAmount,
  setDonationAmount,
  setPaymentDonationOpen,
  setOpen,
}) => {
  const userData = useSelector(selectUser);

  return (
    <div
      //   ref={containerRef}
      className=" xl:w-[60vw] w-[90vw] lg:h-[90vh] bg-white/30 backdrop-blur-xl rounded-[50px] border-2 border-white  p-5 flex justify-center items-center flex-col "
    >
      <button
        className="absolute  top-5 md:right-10 right-8 font-bold text-2xl text-white "
        onClick={() => {
          setDonationAmount(0);
          setPaymentDonationOpen(false);
        }}
      >
        X
      </button>
      <main className="overflow-y-auto overflow-x-hidden w-full text-white text-center">
        <div className="mb-10">
          <h1 className="text-4xl font-extrabold mb-2">{userData?.fullName}</h1>
          <h2 className="text-2xl">
            has requested
            <span className="font-bold"> ${donationAmount}</span>
          </h2>
        </div>

        <Elements
          stripe={stripePromise}
          options={{
            mode: "payment",
            amount: convertToSubcurrency(donationAmount),
            currency: "usd",
          }}
        >
          <CheckoutPage
            amount={donationAmount}
            setPaymentDonationOpen={setPaymentDonationOpen}
            setDonationAmount={setDonationAmount}
            setOpen={setOpen}
            userData={userData}
          />
        </Elements>
      </main>
    </div>
  );
};

export default DonatePayment;
