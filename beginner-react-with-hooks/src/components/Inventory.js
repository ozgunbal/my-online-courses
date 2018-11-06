import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';

const Inventory = ({ fishes, addFish, updateFish, loadSampleFishes, deleteFish }) => (
  <div className="inventory">
    <h2>Inventory</h2>
    {Object.entries(fishes).map(([key, fish]) =>
      <EditFishForm key={key} fish={fish} updateFish={(updatedFish) => updateFish(key, updatedFish)} deleteFish={() => deleteFish(key)} />
    )}
    <AddFishForm addFish={addFish} />
    <button onClick={loadSampleFishes}>Load Sample Fishes</button>
  </div>
);

Inventory.propTypes = {
  fishes: PropTypes.object,
  addFish: PropTypes.func,
  updatedFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  deleteFish: PropTypes.func,
}

export default Inventory;