import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, { firebaseApp } from '../base';

const Inventory = ({ fishes, addFish, updateFish, loadSampleFishes, deleteFish, storeId }) => {
  const [uid, setUid] = useState(null);
  const [owner, setOwner] = useState(null);

  const authenticate = (storeId, provider) => {
    const authProvider = new firebase.auth[`${provider}AuthProvider`]();
    firebaseApp.auth().signInWithPopup(authProvider)
      .then(data => authHandler(data, storeId));
  }

  const authHandler = async (authData, storeId) => {
    const store = await base.fetch(storeId, {})
    if (!store.owner) {
      await base.post(`${storeId}/owner`, { data: authData.user.uid })
    }
    setUid(authData.user.uid);
    setOwner(store.owner || authData.user.uid)
  }

  const handleLogout = async () => {
    await firebase.auth().signOut();
    setUid(null);
  }

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        authHandler({ user }, storeId)
      }
    })
  }, [])

  if (!uid) {
    return <Login authenticate={provider => authenticate(storeId, provider)} />
  }
  if (uid !== owner) {
    return (
      <div>
        <p>Sorry you are not the owner!</p>
        <button onClick={handleLogout}>Log Out!</button>
      </div>
    )
  }

  return (
    <div className="inventory">
      <button onClick={handleLogout}>Log Out!</button>
      <h2>Inventory</h2>
      {Object.entries(fishes).map(([key, fish]) =>
        <EditFishForm key={key} fish={fish} updateFish={(updatedFish) => updateFish(key, updatedFish)} deleteFish={() => deleteFish(key)} />
      )}
      <AddFishForm addFish={addFish} />
      <button onClick={loadSampleFishes}>Load Sample Fishes</button>
    </div>
  );
}

Inventory.propTypes = {
  fishes: PropTypes.object,
  addFish: PropTypes.func,
  updatedFish: PropTypes.func,
  loadSampleFishes: PropTypes.func,
  deleteFish: PropTypes.func,
  storeId: PropTypes.string,
}

export default Inventory;