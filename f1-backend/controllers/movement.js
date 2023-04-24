import firebase from '../config/firebase.js';
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore/lite';
import { nanoid } from 'nanoid';

const database = getFirestore(firebase);

const collectionName = 'F1-VehicleMovement';
const realTimeCollectionName = 'F1-RealtimeMovement';

export const getMovements = async (request, response) => {
  try {
    const movementsCollection = collection(database, collectionName);
    const movementsSnapshot = await getDocs(movementsCollection);
    const movements = movementsSnapshot.docs.map(document => document.data());
    response.status(200).json(movements);
  } catch (error) {
    response.status(500).json({
      message: 'Server error',
    });
  }
};

export const addMovement = async (request, response) => {
  try {
    await setDoc(doc(database, collectionName, nanoid()), {
      ...request.body,
      timestamp: serverTimestamp(),
    });
    const deviceDocument = doc(database, realTimeCollectionName, request.body.deviceId);
    await setDoc(deviceDocument, {
      ...request.body,
      timestamp: serverTimestamp(),
    });
    response.status(201).json({
      message: 'data added',
    });
  } catch (error) {
    response.status(500).json({
      message: 'Server error',
    });
  }
};