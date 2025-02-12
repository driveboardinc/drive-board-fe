"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import type React from "react";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  formData: {
    name: string;
    email: string;
    companyName: string;
    role: string;
  };
  onClose: () => void;
}

function StripePaymentForm({ formData, onClose }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/payment-success`,
        payment_method_data: {
          billing_details: {
            name: formData.name,
            email: formData.email,
          },
        },
      },
    });

    if (error) {
      setPaymentError(error.message ?? "An unknown error occurred");
      setIsProcessing(false);
    } else {
      onClose();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement />
      {paymentError && <div className="text-red-500">{paymentError}</div>}
      <Button type="submit" disabled={isProcessing || !stripe} className="w-full">
        {isProcessing ? "Processing..." : "Pay Now"}
      </Button>
    </form>
  );
}

// export function PaymentForm(props: PaymentFormProps) {
//   const [clientSecret, setClientSecret] = useState<string | null>(null);

//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         items: [{ id: "waiting-list-fee", amount: 1599 }], // $15.99 minimum
//         name: props.formData.name,
//         email: props.formData.email,
//         companyName: props.formData.companyName,
//         role: props.formData.role,
//       }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           console.error("Failed to get client secret:", data);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching client secret:", error);
//       });
//   }, [props.formData]);

//   if (!clientSecret) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Elements stripe={stripePromise} options={{ clientSecret }}>
//       <StripePaymentForm {...props} />
//     </Elements>
//   );
// }

export function PaymentForm(props: PaymentFormProps) {
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: [{ id: "waiting-list-fee", amount: 1599 }], // $15.99 minimum
        name: props.formData.name,
        email: props.formData.email,
        companyName: props.formData.companyName,
        role: props.formData.role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setError("Failed to get a valid payment session. Please try again.");
        }
      })
      .catch((error) => {
        setError("Error fetching client secret: " + error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [props.formData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  if (!clientSecret) {
    return <div className="text-red-500">Invalid payment session. Please refresh and try again.</div>;
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <StripePaymentForm {...props} />
    </Elements>
  );
}
