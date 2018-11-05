import React from 'react';

const EditFishForm = ({ fish, updateFish }) => {
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
    </div>
  );
}

export default EditFishForm;