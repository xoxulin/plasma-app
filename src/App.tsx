import React from "react";
import {
  PlasmaApp,
  Page,
  OnStartFn,
  CartButton,
  CartState,
  CartProvider
} from "@sberdevices/plasma-temple";
import { AppParams, AppState } from "./types";

const assistantParams = {
  initPhrase: "запусти проверочку"
};

const headerProps = {
  title: "Галерея фильмов",
  logo: "/images/logo.png",
  children: <CartButton screen="cart" />
};

// После того как ассистент готов к работе открываем экран галереи
const onStart: OnStartFn<AppState, AppParams> = async ({ pushScreen }) => {
  pushScreen("main");
};

const initialCartState: CartState = {
  items: [],
  quantity: 0,
  quantityLimit: 100,
  currency: "rub",
  amount: 0
};

const Main = Page.lazy(() => import("./Main"));
const Product = Page.lazy(() => import("./Product"));

export const App: React.FC = () => {
  return (
    <CartProvider initialState={initialCartState}>
      <PlasmaApp
        onStart={onStart}
        assistantParams={assistantParams}
        header={headerProps}
      >
        <Page name="main" component={Main} />
        <Page name="product" component={Product} />
      </PlasmaApp>
    </CartProvider>
  );
};

export default App;
