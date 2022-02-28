import React from 'react';
import Link from 'next/link';
import Item from './styles/ItemStyles';
import Title from './styles/Title';
import PriceTage from './styles/PriceTag';
import formatMoney from '../lib/formatMoney';

function Product({ product }) {
  return (
    <Item>
      <img
        src={product?.photo?.image?.publicUrlTransformed}
        alt={product.name}
      />
      <Title>
        <Link href={`/product/${product.id}`}>{product.name}</Link>
      </Title>
      <PriceTage>{formatMoney(product.price)}</PriceTage>
      <p>{product.description}</p>
    </Item>
  );
}

export default Product;
