import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig ={
    apiKey: "AIzaSyDMTWtbP82jJOF71QnMewOGWq7HE5k36NU",
    authDomain: "re-vents-216807.firebaseapp.com",
    databaseURL: "https://re-vents-216807.firebaseio.com",
    projectId: "re-vents-216807",
    storageBucket: "",
    messagingSenderId: "1032474503162"
}

firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();
const settings = {
    timestampsInSnapshots: true
}
firestore.settings(settings);
export default firebase;