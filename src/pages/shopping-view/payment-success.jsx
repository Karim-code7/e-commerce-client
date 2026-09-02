import React from "react";

const PaymentSuccess = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold">Payment Processed Successfully!</h1>
      <p className="mt-4 text-gray-600">
        Your payment has been captured successfully.
      </p>
      <p className="mt-2 text-gray-600">
        You will be redirected to the home page shortly...
      </p>
    </div>
  );
};

export default PaymentSuccess;
