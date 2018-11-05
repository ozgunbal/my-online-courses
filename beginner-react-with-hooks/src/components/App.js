import React, { useState, useEffect } from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import Fish from './Fish';
import sampleFishes from '../sample-fishes';
import base from '../base';

const App = ({ match: { params: { storeId } } }) => {
  const [fishes, setFishes] = useState({ fishes: {} });
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

  const addOrder = key => {
    setOrder({
      ...order,
      [key]: order[key] + 1 || 1
    })
  }

  const loadSampleFishes = () => {
    setFishes({ ...fishes, ...sampleFishes });
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
      <Order fishes={fishes} order={order} />
      <Inventory addFish={addFish} loadSampleFishes={loadSampleFishes} fishes={fishes} updateFish={updateFish} />
    </div>
  )
}

export default App;