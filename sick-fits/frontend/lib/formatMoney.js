import React from 'react';

// built into node and js for formating money. Intl is a library that allows us to format money.
export default function formatMoney(amount = 0) {
  const options = {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  };
  // check if clean dollar amount like $34.00...we want to hide the zeros
  if (amount % 100 === 0) options.minimumFractionDigits = 0;
  const formatter = Intl.NumberFormat('en-US', options);
  return formatter.format(amount / 100);
}
