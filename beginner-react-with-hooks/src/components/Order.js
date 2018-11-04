import React from 'react';
import { formatPrice } from '../helpers';

const Order = ({ fishes, order }) => {
  const renderOrder = ([key, count]) => {
    const fish = fishes[key];
    if (!fish) return null;
    const isAvailable = fish && fish.status === 'available';
    return (
      <li key={key}>
        {
          isAvailable ?
            `${count} lbs ${fish.name} ${formatPrice(fish.price)}`
            :
            `Sorry ${fish ? fish.name : 'fish'} is no longer available`
        }
      </li>
    )
  }

  const orderPairs = Object.entries(order)
  const total = orderPairs.reduce((total, [key, count]) => {
    const fish = fishes[key];
    const isAvailable = fish && fish.status === 'available';
    return isAvailable ? total + count * fish.price : total;
  }, 0);

  return (
    <div className="order-wrap">
      <h2>Order</h2>
      <ul className="order">
        {orderPairs.map(renderOrder)}
      </ul>
      <div className="total">
        Total: <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order;