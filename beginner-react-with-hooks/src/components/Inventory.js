import React from 'react';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = ({ fishes, addFish, updateFish, loadSampleFishes }) => (
  <div className="inventory">
    <h2>Inventory</h2>
    {Object.entries(fishes).map(([key, fish]) => <EditFishForm key={key} fish={fish} updateFish={(updatedFish) => updateFish(key, updatedFish)} />)}
    <AddFishForm addFish={addFish} />
    <button onClick={loadSampleFishes}>Load Sample Fishes</button>
  </div>
);

export default Inventory;