import { NextResponse } from "next/server";
import Stripe from "stripe";
import { z } from "zod";

const stripe = new Stripe(
  process.env.NODE_ENV === "production"
    ? process.env.STRIPE_SECRET_KEY!
    : "sk_test_51QmSDaBCjAMiyMQqWW9jAzNQUGJvBqs1WlCXO03VrkF7JdoWJwBuBoBW5sSDlKxerx2kKnh4SAffHUdY6SjNcsAD005Iy35WPt",
  {
    apiVersion: "2025-01-27.acacia",
  }
);

const createPaymentIntentSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      amount: z.number().min(0),
    })
  ),
  email: z.string().email(),
  name: z.string(),
});

const MINIMUM_AMOUNT = 1599; // $15.99 in cents

// export async function POST(req: Request) {
//   try {
//     const body = await req.json();
//     const validatedData = createPaymentIntentSchema.parse(body);

//     const amount = calculateOrderAmount(validatedData.items);

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       automatic_payment_methods: {
//         enabled: true,
//       },
//       metadata: {
//         email: validatedData.email,
//         name: validatedData.name,
//       },
//     });

//     return NextResponse.json({
//       clientSecret: paymentIntent.client_secret,
//     });
//   } catch (error) {
//     if (error instanceof z.ZodError) {
//       return NextResponse.json({ error: error.errors }, { status: 400 });
//     }
//     return NextResponse.json({ error: "Internal server error" }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = createPaymentIntentSchema.parse(body);

    // Sa development mode, huwag magbigay ng invalid clientSecret
    if (process.env.NODE_ENV !== "production") {
      return NextResponse.json({
        clientSecret: null, // Huwag ibigay ang dummy secret para hindi mag-error sa frontend
        message: "Test mode: Payment simulated successfully!",
      });
    }

    const amount = calculateOrderAmount(validatedData.items);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email: validatedData.email,
        name: validatedData.name,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

function calculateOrderAmount(items: { id: string; amount: number }[]): number {
  const totalAmount = items.reduce((sum, item) => sum + item.amount, 0);
  return Math.max(totalAmount, MINIMUM_AMOUNT);
}
