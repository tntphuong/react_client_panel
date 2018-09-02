import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";
import notifyReducer from "./reducers/notifyReducer";
import settingsReducer from "./reducers/settingsReducer";

const firebaseConfig = {
  apiKey: "AIzaSyB40CxTzcv111L8oO39PBKy3xBFmIF01x8",
  authDomain: "reactclientpanel-b36d6.firebaseapp.com",
  databaseURL: "https://reactclientpanel-b36d6.firebaseio.com",
  projectId: "reactclientpanel-b36d6",
  storageBucket: "reactclientpanel-b36d6.appspot.com",
  messagingSenderId: "771688115937"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Init firebase
firebase.initializeApp(firebaseConfig);

const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig),
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  notify: notifyReducer,
  settings: settingsReducer
});

if (localStorage.getItem("settings") == null) {
  const defaultSettings = {
    disableBalanceOnAdd: false,
    disableBalanceOnEdit: false,
    allowRegistration: true
  };

  localStorage.setItem("settings", JSON.stringify(defaultSettings));
}

// Create intial state
const initialState = { settings: JSON.parse(localStorage.getItem("settings")) };

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
