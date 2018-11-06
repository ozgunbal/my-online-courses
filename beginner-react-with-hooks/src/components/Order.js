import React from 'react';
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Order = ({ fishes, order, deleteOrder }) => {
  const renderOrder = ([key, count]) => {
    const fish = fishes[key];
    if (!fish) return null;
    const isAvailable = fish && fish.status === 'available';
    const transitionOptions = {
      classNames: "order",
      key,
      timeout: { enter: 500, exit: 500 }
    }
    if (isAvailable) {
      return (
        <CSSTransition {...transitionOptions}>
          <li key={key}>
            <span>
              <TransitionGroup component="span" className="count">
                <CSSTransition classNames="count" key={count} timeout={{ enter: 500, exit: 500 }}>
                  <span>{count}</span>
                </CSSTransition>
              </TransitionGroup>
              lbs {fish.name} {formatPrice(fish.price)}<button onClick={() => deleteOrder(key)}>&times;</button>
            </span>
          </li>
        </CSSTransition>
      );
    }
    return (
      <CSSTransition {...transitionOptions}>
        <li key={key}>Sorry {fish ? fish.name : 'fish'} is no longer available</li>
      </CSSTransition>
    );
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
      <TransitionGroup component="ul" className="order">
        {orderPairs.map(renderOrder)}
      </TransitionGroup>
      <div className="total">
        Total: <strong>{formatPrice(total)}</strong>
      </div>
    </div>
  )
}

export default Order;