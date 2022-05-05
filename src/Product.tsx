import React from "react";
import styled, { css } from "styled-components";
import {
  Header,
  ProductTitle,
  ProductPrice,
  ProductDescription,
  ProductActionButton,
  ProductCharacteristics,
  ProductDescriptionProps
} from "@sberdevices/plasma-temple";
import { Col, Row, Image } from "@sberdevices/plasma-ui";
import { mediaQuery } from "@sberdevices/plasma-ui/utils";
import { white } from "@sberdevices/plasma-tokens";

import { PageProps } from "./types";
import { getProduct } from "./api";

export const getInitialProps = async ({ params }) => {
  return getProduct(params.id);
};

const StyledProductPrice = styled(ProductPrice)`
  margin-top: 16px;
  margin-bottom: 80px;

  ${mediaQuery(
    "M",
    2
  )(
    css`
      margin-bottom: 28px;
    `
  )}
`;

const StyledProductActionButton = styled(ProductActionButton)`
  margin-bottom: 80px;

  ${mediaQuery(
    "M",
    2
  )(
    css`
      margin-bottom: 64px;
    `
  )}
`;

const ImageContainer = styled(Row)`
  border-radius: 16px;
  background-color: ${white};
  padding: 74px;
  max-width: 608px;
  margin-left: auto;

  ${mediaQuery(
    "M",
    2
  )(
    css`
      max-width: 330px;
    `
  )}
`;

const StyledProductCharacteristics = styled(ProductCharacteristics)`
  padding-top: 40px;

  ${mediaQuery(
    "M",
    2
  )(
    css`
      padding-top: 28px;
    `
  )}
`;

export const Product: React.FC<PageProps<"product">> = ({ state, header }) => {
  const {
    name = "",
    price = { value: 0 },
    manufacturer = "",
    complexity = "",
    material = "",
    description,
    picture = ""
  } = state ?? {};

  const [quantity, _setQuantity] = React.useState(1);
  const onChangeQuantity = React.useCallback(() => {}, []);
  const handleClickAddToCart = React.useCallback(() => {}, []);

  const items = React.useMemo<ProductDescriptionProps["items"]>(
    () => [
      {
        title: "Характеристики",
        content: (
          <StyledProductCharacteristics
            characteristics={[
              {
                title: "Производитель",
                content: manufacturer
              },
              {
                title: "Сложность",
                content: complexity
              },
              {
                title: "Материал",
                content: material
              }
            ]}
          />
        )
      },
      {
        title: "Описание",
        content: description
      }
    ],
    [complexity, description, manufacturer, material]
  );

  return (
    <>
      <Header {...header} title="" logo="" />
      <Row>
        <Col sizeXL={7} sizeM={4}>
          <ProductTitle title={name} />
          <StyledProductPrice price={price.value} />
          <StyledProductActionButton
            quantity={quantity}
            autoFocus
            withQuantity
            actionButtonText="Добавить в корзину"
            onChangeQuantity={onChangeQuantity}
            onClick={handleClickAddToCart}
          />
          <ProductDescription layout="column" items={items} />
        </Col>
        <Col sizeXL={5} sizeM={2}>
          <ImageContainer>
            <Image base="div" src={picture} ratio="1 / 1" />
          </ImageContainer>
        </Col>
      </Row>
    </>
  );
};

export default Product;
