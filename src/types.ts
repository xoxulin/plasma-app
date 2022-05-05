import {
  PageComponent,
  Page,
  Entity,
  ShopLandingPageState
} from "@sberdevices/plasma-temple";

export interface AppState {
  main: ShopLandingPageState<Product>;
  product: Product;
}

interface Price {
  value: number;
  currency: "RUB";
}

export type Category = Entity<string>;

export interface Product extends Entity<string> {
  picture: string;
  manufacturer: string;
  complexity: "высокая" | "средняя" | "низкая";
  material: string;
  price: Price;
  description: string;
  category: Entity<string>;
}

export interface AppParams {
  main: void;
  product: { id: string };
}

export type PageProps<K extends keyof AppState> = React.ComponentProps<
  PageComponent<AppState, K, AppParams>
>;
type Lazy = typeof Page["lazy"];
type LazyResult = ReturnType<Parameters<Lazy>[0]>;
type InferredModule = LazyResult extends Promise<infer M> ? M : void;
export type GetInitialProps = InferredModule["getInitialProps"];
