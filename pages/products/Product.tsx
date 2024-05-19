import { FC, ReactNode, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "../../hooks/useMutation";
import { IItem } from "../../db/models/item";

const Product: FC = (): ReactNode => {
  const { productName, productID } = useParams();

  const { fn: findProduct } = useMutation({
    url: "/api/products/find",
    method: "POST",
    credentials: "same-origin"
  });

  const [foundProduct, setFoundProduct] = useState<IItem>();

  const findProducts = async () => {
    const queryFoundProducts = await findProduct({
      productName,
      productID,
      currentURL: window.location.href
    });
    if (queryFoundProducts?.item) setFoundProduct(queryFoundProducts.item);
  };

  useEffect(() => {
    findProducts();
  }, [window.location.href]);

  return (
    <div className="flex h-[100vh] w-[100vw] flex-col items-center justify-center">
      {foundProduct && (
        <>
          {foundProduct.imageLinks && foundProduct.imageLinks.length > 0 && (
            <div
              style={{
                backgroundImage: `${foundProduct.imageLinks ? `url(/${foundProduct.imageLinks[0]})` : ""}`
              }}
              className={`h-[30vh] w-[30vw] bg-cover bg-center`}
            ></div>
          )}
        </>
      )}
    </div>
  );
};

export default Product;
