import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: 'AIzaSyCCkPI7qHrY_W8yo0JDUr93KxDCbTOxPsA',
    databaseURL: 'https://zazislovensko-a83dc.firebaseio.com/',
    storageBucket: 'gs://zazislovensko-a83dc.appspot.com'
};
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
export default storage;