import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

const App = ({ match: { params: { storeId } } }) => {
  const [fishes, setFishes] = useState({});
  const [order, setOrder] = useState(JSON.parse(localStorage.getItem(storeId)) || {});

  const addFish = (fish) => {
    setFishes({ ...fishes, [`fish${Date.now()}`]: fish });
  }

  const updateFish = (key, updatedFish) => {
    const updatedFishes = { ...fishes, [key]: updatedFish };
    setFishes(updatedFishes);
    base.post(`${storeId}/fishes`, {
      data: updatedFishes
    });
  }
  const deleteFish = (key) => {
    const updatedFishes = { ...fishes, [key]: null }
    setFishes(updatedFishes);
    base.post(`${storeId}/fishes`, {
      data: updatedFishes
    });
  }

  const addOrder = key => {
    setOrder({
      ...order,
      [key]: order[key] + 1 || 1
    })
  }

  const deleteOrder = key => {
    const orders = { ...order };
    delete orders[key]
    setOrder(orders);
  }

  const loadSampleFishes = () => {
    setFishes({ ...fishes, ...sampleFishes });
    base.post(`${storeId}/fishes`, {
      data: { ...fishes, ...sampleFishes }
    });
  }

  useEffect(() => {
    const ref = base.syncState(`${storeId}/fishes`, {
      context: {
        setState: ({ fishes }) => setFishes({ ...fishes }),
        state: { fishes },
      },
      state: 'fishes'
    })

    return () => {
      base.removeBinding(ref);
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(storeId, JSON.stringify(order));
  }, [order])

  return (
    <div className="catch-of-the-day">
      <div className="menu">
        <Header tagline="Fresh Seafood Market" />
        <ul className="fishes">
          {Object.entries(fishes).map(([key, fish]) => <Fish key={key} details={fish} addOrder={() => addOrder(key)} />)}
        </ul>
      </div>
      <Order fishes={fishes} order={order} deleteOrder={deleteOrder} />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} fishes={fishes} updateFish={updateFish} deleteFish={deleteFish} />
    </div>
  )
}

App.propTypes = {
  match: PropTypes.object
}

export default App;