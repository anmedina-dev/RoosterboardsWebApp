import React, { useEffect, useState } from "react";
import styles from "../styles/Catalog.module.css";
import { RouterOutputs, api } from "~/utils/api";
import useWindowSize from "~/hooks/WindowHook";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Product = RouterOutputs["products"]["getAll"][0];

type CatalogCardSectionProps = {
  products: Product[];
  isDesktop: boolean;
};

type CatalogCardProps = {
  product: Product;
  cartId: string;
};
const IMAGE_WIDTH = 400;
const IMAGE_HEIGHT = 100;

function CatalogCard({ product, cartId }: CatalogCardProps) {
  const addItemToCart = api.cart.addItemToCart.useMutation();
  function handleAddItem() {
    addItemToCart.mutate({
      cartId: cartId,
      itemId: product.id,
    });
  }
  return (
    <div
      className={`w-3/10 card card-bordered card-compact mb-3 bg-base-100 shadow-xl ${styles.catalogCard}`}
      key={product.name}
    >
      <figure>
        <Image
          src={product.imageURL}
          alt="Shoes"
          width={IMAGE_WIDTH}
          height={IMAGE_HEIGHT}
        />
      </figure>
      <div className="card-body">
        <h1 className="card-title">{product.brandName}</h1>
        <h2 className="card-title">{product.name}</h2>
        <p>{product.description}</p>
        <p>Product Color: {product.color}</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary" onClick={() => handleAddItem()}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

function CatalogCardSection({ products, isDesktop }: CatalogCardSectionProps) {
  const { data: sessionData } = useSession();
  if (!sessionData) return <>Loading Session</>;

  const { data: userCart } = api.cart.getUserCart.useQuery({
    userId: sessionData.user.id,
  });
  if (!userCart) return <>Waiting for Cart</>;
  let cartId = userCart.id;
  return (
    <section
      className={isDesktop ? `flex flex-1 justify-center pr-64` : `flex w-full`}
    >
      <div className={`container mx-0 ${styles.productMap}`}>
        {products.length > 0 ? (
          <>
            {products?.map((product) => (
              <CatalogCard product={product} cartId={cartId} />
            ))}
          </>
        ) : (
          <>No products</>
        )}
      </div>
    </section>
  );
}

function Catalog() {
  const size = useWindowSize();
  const isDesktop = size.width !== undefined ? size.width > 990 : false;

  const [filterObject, setFilterObject] = useState({});
  const [chosenProductType, setChosenProductType] = useState<
    string | undefined
  >();
  const [chosenBrand, setChosenBrand] = useState<string | undefined>();
  const [chosenColor, setChosenColor] = useState<string | undefined>();

  useEffect(() => {
    let newFilterObj = {
      ...(chosenBrand && { brandName: chosenBrand }),
      ...(chosenColor && { color: chosenColor }),
      ...(chosenProductType && { productTypeId: chosenProductType }),
    };
    setFilterObject(newFilterObj);
  }, [chosenBrand, chosenColor, chosenProductType]);

  function handleChosenProductType(productType: string | null) {
    if (!productType) return;
    if (chosenProductType === productType) {
      setChosenProductType(undefined);
      return;
    }
    setChosenProductType(productType);
    return;
  }

  function handleChosenBrand(brand: string | null) {
    if (!brand) return;
    if (chosenBrand === brand) {
      setChosenBrand(undefined);
      return;
    }
    setChosenBrand(brand);
    return;
  }

  function handleChosenColor(color: string | null) {
    if (!color) return;
    if (chosenColor === color) {
      setChosenColor(undefined);
      return;
    }
    setChosenColor(color);
    return;
  }

  const { data: products } = api.products.getFilteredData.useQuery({
    filteredObject: filterObject,
  });
  const { data: productTypes } = api.productTypes.getAll.useQuery();
  const { data: colors } = api.products.getColors.useQuery();
  const { data: brands } = api.brand.getAll.useQuery();

  return (
    <article className={`mt-5 flex flex-wrap`}>
      <section
        className={
          isDesktop
            ? `sticky top-10 h-fit w-60 px-5 py-20 sm:ml-10 md:ml-8 lg:ml-10 xl:ml-5 ${styles.catalogDesktopMenuSection}`
            : `form-control mb-2 h-fit ${styles.catalogMobileMenuSection}`
        }
      >
        <h2 className="mb-4">Menu</h2>
        <div className={styles.menuCategories}>
          <h5 className={styles.categoryTitle}>Product Type</h5>
          {productTypes &&
            productTypes.map((productType) => (
              <label className="label cursor-pointer" key={productType.name}>
                <span className="label-text">{productType.name}</span>
                <input
                  key={productType.name}
                  type="checkbox"
                  checked={chosenProductType === productType.name}
                  className="checkbox"
                  onClick={() => handleChosenProductType(productType.name)}
                />
              </label>
            ))}
        </div>
        <div className={styles.menuCategories}>
          <h5 className={styles.categoryTitle}>Brand</h5>
          {brands &&
            brands.map((brand) => (
              <label className="label cursor-pointer" key={brand.name}>
                <span className="label-text">{brand.name}</span>
                <input
                  key={brand.name}
                  type="checkbox"
                  checked={chosenBrand === brand.name}
                  className="checkbox"
                  onClick={() => handleChosenBrand(brand.name)}
                />
              </label>
            ))}
        </div>
        <div className={styles.menuCategories}>
          <h5 className={styles.categoryTitle}>Color</h5>
          {colors &&
            colors.map((color) => (
              <label className="label cursor-pointer" key={color.color}>
                <span className="label-text">{color.color}</span>
                <input
                  key={color.color}
                  type="checkbox"
                  checked={chosenColor === color.color}
                  className="checkbox"
                  onClick={() => handleChosenColor(color.color)}
                />
              </label>
            ))}
        </div>
      </section>
      {products && (
        <CatalogCardSection products={products} isDesktop={isDesktop} />
      )}
    </article>
  );
}

export default Catalog;
