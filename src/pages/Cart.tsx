import { useSession } from "next-auth/react";
import React from "react";
import { RouterOutputs, api } from "~/utils/api";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import Button from "~/components/Button";

type ItemInCart = RouterOutputs["cart"]["getItemAll"][0];
type ItemInCartProps = {
  item:
    | {
        id: string;
        itemId: string;
        cartId: string;
        quantity: number;
        imageURL: string;
        itemName: string;
        itemBrand: string;
      }
    | undefined;
  refetchData: any;
};

const IMAGE_HEIGHT = 100;
const IMAGE_WIDTH = 120;

function ItemInCart({ item, refetchData }: ItemInCartProps) {
  if (!item) return <>No Item</>;

  const decreaseQuantity = api.cart.decreaseQuantityOfItem.useMutation({
    onSuccess: () => {
      void refetchData();
    },
  });
  const increaseQuantity = api.cart.increaseQuantityOfItem.useMutation({
    onSuccess: () => {
      void refetchData();
    },
  });
  const removeItem = api.cart.removeItemFromCart.useMutation({
    onSuccess: () => {
      void refetchData();
    },
  });

  function handleIncrease() {
    if (!item) return;
    increaseQuantity.mutate({ itemId: item.id });
  }

  function handleDecrease() {
    if (!item) return;
    if (item.quantity === 1) removeItem.mutate({ itemId: item.id });
    else decreaseQuantity.mutate({ itemId: item.id });
  }
  function handleRemove() {
    if (!item) return;
    removeItem.mutate({ itemId: item.id });
  }
  return (
    <div
      className={`w-fill mb-3 flex flex-wrap justify-between px-10 py-6 ${styles.ItemCard}`}
    >
      <section
        className={`flex w-80 justify-between ${styles.ItemDataSection}`}
      >
        <Image
          className={styles.ItemImage}
          src={item.imageURL}
          alt={"item"}
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
        <div className={styles.ItemInfo}>
          <p className={`text-2xl font-bold ${styles.ItemBrand}`}>
            {item.itemBrand}
          </p>
          <p className={`text-lg ${styles.ItemName}`}>{item.itemName}</p>
        </div>
      </section>
      <section
        className={`flex w-48 items-center justify-between ${styles.ItemQuantitySection}`}
      >
        <Button onClick={() => handleDecrease()} content="-" />
        <span className={`align-middle ${styles.ItemQuantity}`}>
          {item.quantity}
        </span>
        <Button onClick={() => handleIncrease()} content="+" />
        <Button onClick={() => handleRemove()} content="Remove" />
      </section>
    </div>
  );
}

function Cart() {
  const { data: sessionData } = useSession();

  const { data: cartData } = api.cart.getUserCart.useQuery({
    userId: sessionData ? sessionData.user.id : "",
  });

  const { data: itemsInCart, refetch: refetchData } =
    api.cart.getUserItemsInCart.useQuery({
      cartId: cartData ? cartData.id : "",
    });

  if (!itemsInCart) return <>...Loading</>;

  console.log(itemsInCart);
  return (
    <div className="cart-body container mt-5 flex flex-wrap justify-center">
      {itemsInCart.length > 0 ? (
        <>
          {itemsInCart.map((item) => (
            <ItemInCart item={item} refetchData={refetchData} />
          ))}
        </>
      ) : (
        <h1>No Items In Your Cart</h1>
      )}
    </div>
  );
}

export default Cart;
