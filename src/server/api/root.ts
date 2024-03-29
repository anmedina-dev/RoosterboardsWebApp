import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { productsRouter } from "./routers/products";
import { cartRouter } from "./routers/cart";
import { productTypeRouter } from "./routers/productType";
import { brandRouter } from "./routers/brand";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  products: productsRouter,
  cart: cartRouter,
  productTypes: productTypeRouter,
  brand: brandRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
