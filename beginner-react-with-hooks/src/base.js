import Rebase from 're-base';
import { initializeApp } from 'firebase/app';
import database from 'firebase/database';

const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
});

const base = Rebase.createClass(firebaseApp.database())

export { firebaseApp };

export default base;