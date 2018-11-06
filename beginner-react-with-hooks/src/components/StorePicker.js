import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import { getFunName } from '../helpers';

const StorePicker = ({ history }) => {
  const inputEl = useRef(null);
  const goToStore = (event) => {
    event.preventDefault();
    const storeName = inputEl.current.value;
    history.push(`/store/${storeName}`)
  };
  return (
    <form className="store-selector" onSubmit={goToStore}>
      <h2>Please Enter A Store</h2>
      <input ref={inputEl} type="text" required placeholder="Store Name" defaultValue={getFunName()} />
      <button type="submit">Visit Store</button>
    </form>
  )
}

StorePicker.propTypes = {
  history: PropTypes.object
}

export default StorePicker;