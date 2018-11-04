import React, { useRef } from 'react';

const AddFishForm = ({ addFish }) => {
  const nameRef = useRef(null);
  const priceRef = useRef(null);
  const statusRef = useRef(null);
  const descRef = useRef(null);
  const imageRef = useRef(null);

  const createFish = (event) => {
    event.preventDefault();
    const fish = {
      name: nameRef.current.value,
      price: Number(priceRef.current.value),
      status: statusRef.current.value,
      desc: descRef.current.value,
      image: imageRef.current.value,
    }
    event.currentTarget.reset();
    addFish(fish);
  }
  return (
    <form className="fish-edit" onSubmit={createFish}>
      <input name="name" ref={nameRef} type="text" placeholder="Name" />
      <input name="price" ref={priceRef} type="text" placeholder="Price" />
      <select name="status" ref={statusRef}>
        <option value="available">Fresh!</option>
        <option value="unavailable">Sold Out!</option>
      </select>
      <textarea name="desc" ref={descRef} placeholder="Desc" />
      <input name="image" ref={imageRef} type="text" placeholder="Image" />
      <button type="submit">Add Fish</button>
    </form>
  )
}

export default AddFishForm;