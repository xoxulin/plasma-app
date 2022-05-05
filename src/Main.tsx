import React from "react";
import {
  GalleryCardParams,
  ShopLandingPage,
  ShopLandingPageState
} from "@sberdevices/plasma-temple";

import { GalleryCard } from "./Card";
import { PageProps, Product } from "./types";
import { getPopularProducts } from "./api";

const defaultState: ShopLandingPageState<Product> = {
  items: [],
  catalogImage: "/images/placeholder.png",
  activeCardIndex: 0
};

export const getInitialProps = async () => {
  return getPopularProducts().then((products) => ({
    ...defaultState,
    items: products.map(
      (item: Product, index: number): GalleryCardParams<Product> => {
        return {
          ...item,
          label: item.name,
          position: index + 1,
          image: {
            src: item.picture,
            ratio: "1 / 1"
          }
        };
      }
    )
  }));
};

export const Main: React.FC<PageProps<"main">> = (props) => {
  const { header, state, changeState } = props;
  const pageState = !state ? defaultState : state;

  const openCatalogs = React.useCallback(() => {}, []);

  const openItem = React.useCallback((val) => {
    props.pushScreen("product", { id: val.id });
  }, []);

  return (
    <ShopLandingPage<Product>
      header={header}
      galleryCard={GalleryCard}
      state={pageState}
      onCatalogOpen={openCatalogs}
      onStoreInfoClick={() => {}}
      onItemClick={openItem}
      changeState={changeState}
    />
  );
};

export default Main;
