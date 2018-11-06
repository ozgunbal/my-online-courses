import React from 'react';
import PropTypes from 'prop-types';

const EditFishForm = ({ fish, updateFish, deleteFish }) => {
  const handleChange = ({ currentTarget: { name, value } }) => {
    const updatedFish = {
      ...fish,
      [name]: value
    }
    updateFish(updatedFish);
  }
  return (
    <div className="fish-edit" >
      <input type="text" name="name" onChange={handleChange} value={fish.name} />
      <input type="text" name="price" onChange={handleChange} value={fish.price} />
      <select name="status" onChange={handleChange} value={fish.status} >
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" onChange={handleChange} value={fish.desc} />
      <input type="text" name="image" onChange={handleChange} value={fish.image} />
      <button onClick={deleteFish}>Remove Fish</button>
    </div>
  );
}

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    name: PropTypes.string,
    image: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number,
  }),
  updatedFish: PropTypes.func,
  deleteFish: PropTypes.func,
}

export default EditFishForm;