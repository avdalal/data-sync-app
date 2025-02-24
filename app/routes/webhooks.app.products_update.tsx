import type { ActionFunctionArgs } from "@remix-run/node";
import { authenticate } from "../shopify.server";

export const action = async ({ request }: ActionFunctionArgs) => {
    const { payload, topic, shop } = await authenticate.webhook(request);
    console.log(`Received ${topic} webhook for ${shop}`);

    if (topic === "PRODUCTS_UPDATE") {
        const { id, title, vendor, variants } = payload;
        console.log(`Product ${id} updated: ${title} by ${vendor}`);
        for (const variant of variants) {
            console.log(`- ${variant.title} for ${variant.price}`);
        }
    }

    return new Response();
};
