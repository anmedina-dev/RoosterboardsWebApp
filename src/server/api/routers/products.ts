import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { supabase } from "~/utils/supabase";

export const productsRouter = createTRPCRouter({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany();
  }),

  getFilteredData: publicProcedure
    .input(z.object({ filteredObject: z.any() }))
    .query(async ({ ctx, input }) => {
      let rawProducts = await ctx.prisma.product.findMany({
        where: input.filteredObject,
      });

      let newProducts = rawProducts.map((obj) => {
        const { data } = supabase.storage
          .from("product-images")
          .getPublicUrl(obj.imageURL);
        return { ...obj, imageURL: data.publicUrl };
      });

      return newProducts;
    }),

  getColors: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.product.findMany({
      distinct: ["color"],
      select: {
        color: true,
      },
    });
  }),
});
