import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { supabase } from "~/utils/supabase";

export const cartRouter = createTRPCRouter({
  getCartAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.cart.findMany();
  }),
  getItemAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.itemsInCart.findMany();
  }),

  getUserCart: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.cart.findUnique({
        where: {
          userId: input.userId,
        },
      });
    }),

  createUserCart: protectedProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.cart.create({
        data: {
          userId: input.userId,
        },
      });
    }),

  addItemToCart: protectedProcedure
    .input(z.object({ cartId: z.string(), itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      let item = await ctx.prisma.itemsInCart.findMany({
        where: { itemId: input.itemId, cartId: input.cartId },
      });
      if (item.length < 1 || !item[0]) {
        return await ctx.prisma.itemsInCart.create({
          data: {
            itemId: input.itemId,
            cartId: input.cartId,
          },
        });
      }

      return ctx.prisma.itemsInCart.update({
        where: {
          id: item[0].id,
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    }),

  getUserItemsInCart: publicProcedure
    .input(z.object({ cartId: z.string() }))
    .query(async ({ ctx, input }) => {
      let rawItems = await ctx.prisma.itemsInCart.findMany({
        where: {
          cartId: input.cartId,
        },
        orderBy: { datetime: "asc" },
      });

      let newProducts = rawItems.map(async (obj) => {
        let item = await ctx.prisma.product.findUnique({
          where: { id: obj.itemId },
        });

        if (!item) return;
        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(item.imageURL);
        return {
          ...obj,
          imageURL: data.publicUrl,
          itemName: item.name,
          itemBrand: item.brandName,
        };
      });
      return await Promise.all(newProducts);
    }),

  decreaseQuantityOfItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.itemsInCart.update({
        where: {
          id: input.itemId,
        },
        data: {
          quantity: { decrement: 1 },
        },
      });
    }),

  increaseQuantityOfItem: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.itemsInCart.update({
        where: {
          id: input.itemId,
        },
        data: {
          quantity: { increment: 1 },
        },
      });
    }),

  removeItemFromCart: protectedProcedure
    .input(z.object({ itemId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return ctx.prisma.itemsInCart.delete({
        where: {
          id: input.itemId,
        },
      });
    }),
});
