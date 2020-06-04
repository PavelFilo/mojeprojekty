import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    databaseURL: 'https://zazislovensko-a83dc.firebaseio.com/',
    storageBucket: 'gs://zazislovensko-a83dc.appspot.com'
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;