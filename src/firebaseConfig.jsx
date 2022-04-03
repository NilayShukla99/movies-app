import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyARYBuv2EWJmEmXh6MMYYxWJHnE21DfonU",
  authDomain: "movies-app-154a5.firebaseapp.com",
  projectId: "movies-app-154a5",
  storageBucket: "movies-app-154a5.appspot.com",
  messagingSenderId: "1054134740371",
  appId: "1:1054134740371:web:18809de5fadc0f994cb466"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Get a reference to the database service
const database = getDatabase(app);
// DataSnapshot, Database, OnDisconnect, QueryConstraint, TransactionResult, _QueryImpl, _QueryParams, _ReferenceImpl, _TEST_ACCESS_forceRestClient, _TEST_ACCESS_hijackHash, _repoManagerDatabaseFromApp, _setSDKVersion, _validatePathString, _validateWritablePath, child, connectDatabaseEmulator, enableLogging, endAt, endBefore, equalTo, get, getDatabase, goOffline, goOnline, increment, limitToFirst, limitToLast, off, onChildAdded, onChildChanged, onChildMoved, onChildRemoved, onDisconnect, onValue, orderByChild, orderByKey, orderByPriority, orderByValue, push, query, ref, refFromURL, remove, runTransaction, serverTimestamp, set, setPriority, setWithPriority, startAfter, startAt, update

export default database;