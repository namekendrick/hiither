import { NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { currentUser } from "@/lib/auth";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/account");

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { id: userId, email } = await currentUser();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const subscription = await prisma.subscription.findUnique({
      where: { userId },
    });

    if (
      subscription &&
      subscription.stripeCustomerId &&
      subscription.status === "active"
    ) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: subscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }

    if (subscription) {
      const stripeSession = await stripe.checkout.sessions.create({
        customer: subscription.stripeCustomerId,
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Hiither",
                description: "Embeddable panels",
              },
              unit_amount: 1900,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    } else {
      const stripeSession = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: email,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Hiither",
                description: "Embeddable panels",
              },
              unit_amount: 1900,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: {
          userId,
        },
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }));
    }
  } catch (err) {
    console.log("[STRIPE_ERROR]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
}
