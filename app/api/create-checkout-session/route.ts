import { NextRequest, NextResponse } from "next/server";
import { headers, cookies } from 'next/headers';
import { createRouteHandlerSupabaseClient } from '@supabase/auth-helpers-nextjs';

import { stripe } from '@/utils/stripe';
import { createOrRetrieveCustomer } from '@/utils/supabase-admin';
import { getURL } from '@/utils/helpers';

export async function POST(req: NextRequest) {
    const { price, quantity = 1, metadata = {} } = await req.json();

    try {
			const supabase = createRouteHandlerSupabaseClient({ headers, cookies });
      const {
        data: { user }
      } = await supabase.auth.getUser();

      const customer = await createOrRetrieveCustomer({
        uuid: user?.id || '',
        email: user?.email || ''
      });

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        billing_address_collection: 'required',
        customer,
        line_items: [
          {
            price: price.id,
            quantity
          }
        ],
        mode: 'subscription',
        allow_promotion_codes: true,
        subscription_data: {
          trial_from_plan: true,
          metadata
        },
        success_url: `${getURL()}/account`,
        cancel_url: `${getURL()}/`
      });

      return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
					{ error: { statusCode: 500, message: err.message } },
					{ status: 500 },
				);
    }
};

