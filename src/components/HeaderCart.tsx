import React, { useEffect } from "react";
import styles from "../styles/Header.module.css";
import Image from "next/image";
import { api } from "~/utils/api";
import { Session } from "next-auth";

type HeaderCartProps = {
  isDesktop: boolean;
  sessionData: Session;
};
export default function HeaderCart({
  isDesktop,
  sessionData,
}: HeaderCartProps) {
  const { data: cartData, refetch: refetchCart } =
    api.cart.getUserCart.useQuery({
      userId: sessionData.user.id,
    });

  const createCart = api.cart.createUserCart.useMutation({
    onSuccess: () => {
      void refetchCart();
    },
  });

  console.log(cartData);

  if (cartData === null) createCart.mutate({ userId: sessionData.user.id });

  return (
    <>
      {isDesktop ? (
        <Image
          src="/assets/add-to-basket.png"
          alt="Basket"
          className={`${styles.iconClass} ${styles.basketIcon}`}
          height={30}
          width={30}
        />
      ) : (
        <div className={styles.LinkClass}>Cart</div>
      )}
    </>
  );
}
