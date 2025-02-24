import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const { payload, topic, shop } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (topic === "ORDERS_CREATE") {
        const { id, email, total_price, line_items } = payload;
        console.log(`Order ${id} for ${email} with total price of ${total_price}`);
        for (const item of line_items) {
            console.log(`- ${item.title} x ${item.quantity}`);
        }
    }
    return new Response();
};
